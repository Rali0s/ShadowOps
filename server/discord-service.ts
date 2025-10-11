import { webcrypto } from 'crypto';
import fetch from 'node-fetch';
import { getDiscordConfig } from './config';
import { logger } from './logger';
import { storage } from './storage';

const discordConfig = getDiscordConfig();

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  email?: string;
  verified?: boolean;
}

export interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

/**
 * Discord service for OAuth and interaction handling
 */
export class DiscordService {
  /**
   * Verify Discord signature for interactions
   */
  async verifySignature(
    signature: string,
    timestamp: string,
    body: string
  ): Promise<boolean> {
    try {
      const sig = new Uint8Array(Buffer.from(signature, 'hex'));
      const key = new Uint8Array(Buffer.from(discordConfig.publicKey, 'hex'));
      const message = new TextEncoder().encode(timestamp + body);
      
      const cryptoKey = await webcrypto.subtle.importKey(
        'raw',
        key,
        {
          name: 'Ed25519',
          namedCurve: 'Ed25519',
        },
        false,
        ['verify']
      );
      
      const isValid = await webcrypto.subtle.verify(
        'Ed25519',
        cryptoKey,
        sig,
        message
      );
      
      logger.debug('Discord signature verification', { isValid });
      return isValid;
    } catch (error) {
      logger.error('Discord signature verification error', error);
      return false;
    }
  }
  
  /**
   * Exchange authorization code for access token
   */
  async exchangeCode(code: string): Promise<DiscordTokenResponse> {
    try {
      const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: discordConfig.clientId,
          client_secret: discordConfig.clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: discordConfig.redirectUri,
        }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        logger.error('Discord token exchange failed', {
          status: response.status,
          error,
        });
        throw new Error(`Token exchange failed: ${response.status}`);
      }
      
      const data = await response.json() as DiscordTokenResponse;
      logger.info('Discord token exchange successful');
      return data;
    } catch (error) {
      logger.error('Discord token exchange error', error);
      throw error;
    }
  }
  
  /**
   * Get Discord user information
   */
  async getUser(accessToken: string): Promise<DiscordUser> {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.text();
        logger.error('Failed to fetch Discord user', {
          status: response.status,
          error,
        });
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
      
      const user = await response.json() as DiscordUser;
      logger.info('Discord user fetched', {
        id: user.id,
        username: user.username,
      });
      return user;
    } catch (error) {
      logger.error('Discord user fetch error', error);
      throw error;
    }
  }
  
  /**
   * Check if user is a member of the configured guild
   */
  async checkGuildMembership(accessToken: string): Promise<boolean> {
    if (!discordConfig.guildId) {
      logger.debug('No guild ID configured, skipping membership check');
      return true;
    }
    
    try {
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        logger.error('Failed to fetch user guilds', {
          status: response.status,
        });
        return false;
      }
      
      const guilds = await response.json() as Array<{ id: string }>;
      const isMember = guilds.some(guild => guild.id === discordConfig.guildId);
      
      logger.info('Guild membership check', {
        guildId: discordConfig.guildId,
        isMember,
      });
      
      return isMember;
    } catch (error) {
      logger.error('Guild membership check error', error);
      return false;
    }
  }
  
  /**
   * Process Discord OAuth callback
   */
  async handleOAuthCallback(code: string): Promise<any> {
    try {
      // Exchange code for token
      const tokenData = await this.exchangeCode(code);
      
      // Get user info
      const discordUser = await this.getUser(tokenData.access_token);
      
      // Check guild membership
      const isGuildMember = await this.checkGuildMembership(tokenData.access_token);
      
      // Build avatar URL
      const avatarUrl = discordUser.avatar
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
        : '';
      
      // Upsert user in database
      const user = await storage.upsertUserByDiscord(
        discordUser.id,
        discordUser.username,
        avatarUrl,
        isGuildMember,
        discordUser.email
      );
      
      logger.success('Discord OAuth completed', {
        userId: user.id,
        username: user.username,
        discordVerified: isGuildMember,
      });
      
      return {
        user,
        discordUser,
        isGuildMember,
      };
    } catch (error) {
      logger.error('Discord OAuth callback error', error);
      throw error;
    }
  }
  
  /**
   * Get OAuth authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const url = new URL('https://discord.com/api/oauth2/authorize');
    url.searchParams.set('client_id', discordConfig.clientId);
    url.searchParams.set('redirect_uri', discordConfig.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'identify guilds email');
    url.searchParams.set('state', state);
    
    return url.toString();
  }
  
  /**
   * Handle Discord interaction (for bots/apps)
   */
  async handleInteraction(interaction: any): Promise<any> {
    logger.info('Processing Discord interaction', {
      type: interaction.type,
      id: interaction.id,
    });
    
    // Handle different interaction types
    switch (interaction.type) {
      case 1: // PING
        return { type: 1 };
        
      case 2: // APPLICATION_COMMAND
        return this.handleCommand(interaction);
        
      default:
        logger.warn('Unknown interaction type', { type: interaction.type });
        return {
          type: 4,
          data: {
            content: 'Unknown interaction type',
            flags: 64,
          },
        };
    }
  }
  
  private async handleCommand(interaction: any): Promise<any> {
    const { name, options } = interaction.data;
    
    logger.info('Handling Discord command', { name, options });
    
    // Example command handlers
    switch (name) {
      case 'verify':
        return {
          type: 4,
          data: {
            content: 'Verification successful! You now have access to the Neural Matrix.',
            flags: 64, // Ephemeral message
          },
        };
        
      case 'status':
        return {
          type: 4,
          data: {
            content: 'Your subscription status: Active',
            flags: 64,
          },
        };
        
      default:
        return {
          type: 4,
          data: {
            content: `Command '${name}' not implemented`,
            flags: 64,
          },
        };
    }
  }
}

// Export singleton instance
export const discordService = new DiscordService();