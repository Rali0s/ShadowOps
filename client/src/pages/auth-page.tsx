import { useState, useEffect } from "react";
import { useLocation, Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Brain, Lock, Shield, Timer, Zap, TrendingUp, Users, Target, Star } from "lucide-react";
import { FrequencyLogo } from "@/components/frequency-logo";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const loginSchema = insertUserSchema.pick({ username: true, password: true });
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");
  const [resetToken, setResetToken] = useState("");

  // Check for reset token in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
      setActiveTab("forgot");
      resetPasswordForm.setValue("token", token);
    }
  }, [resetPasswordForm]);

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const forgotPasswordForm = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Redirect if already logged in (after all hooks)
  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = async (data: LoginData) => {
    const result = await loginMutation.mutateAsync(data);
    if (result) {
      toast({
        title: "Neural Matrix Connected! 🧠",
        description: `Welcome back, ${result.username}. Redirecting to subscription...`,
      });
      setTimeout(() => setLocation("/subscribe"), 1500);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    const { confirmPassword, ...registerData } = data;
    const result = await registerMutation.mutateAsync(registerData);
    if (result) {
      toast({
        title: "Neural Matrix Access Granted! 🚀",
        description: `Account created successfully, ${result.username}. Redirecting to subscription...`,
      });
      setTimeout(() => setLocation("/subscribe"), 1500);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      const response = await apiRequest("POST", "/api/forgot-password", data);
      const result = await response.json();
      
      toast({
        title: "Reset Email Sent",
        description: result.message,
      });
      
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Error", 
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      const response = await apiRequest("POST", "/api/reset-password", data);
      const result = await response.json();
      
      toast({
        title: "Password Reset",
        description: result.message,
      });
      
      setActiveTab("login");
      setResetToken("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex">
      {/* Left Column - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FrequencyLogo size={64} className="bg-terminal-bg rounded-xl p-2 border border-terminal-red-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Neural Matrix Access</h1>
            <p className="text-gray-400">Join the neurohacker elite</p>
          </div>

          {/* Auth Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register" | "forgot")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card-bg border border-gray-700">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-bg"
                data-testid="tab-login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-bg"
                data-testid="tab-register"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card className="bg-card-bg border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Lock className="mr-2 h-5 w-5 text-red-400" />
                    Access Your Account
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect to your neural enhancement dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username" className="text-gray-300">Username</Label>
                      <Input
                        id="login-username"
                        {...loginForm.register("username")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Enter username"
                        data-testid="input-login-username"
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-red-400 text-sm" data-testid="error-login-username">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        {...loginForm.register("password")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Enter password"
                        data-testid="input-login-password"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-400 text-sm" data-testid="error-login-password">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold"
                      disabled={loginMutation.isPending}
                      data-testid="button-login-submit"
                    >
                      {loginMutation.isPending ? "Connecting..." : "Access Neural Matrix"}
                    </Button>

                    {/* Forgot Password Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setActiveTab("forgot")}
                        className="text-sm text-terminal-red-secondary hover:text-terminal-red-primary transition-colors"
                        data-testid="link-forgot-password"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <Card className="bg-card-bg border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Brain className="mr-2 h-5 w-5 text-red-400" />
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Join 2,847 neurohackers optimizing their cognitive performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="text-gray-300">Username</Label>
                      <Input
                        id="register-username"
                        {...registerForm.register("username")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Choose username"
                        data-testid="input-register-username"
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-red-400 text-sm" data-testid="error-register-username">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-gray-300">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        {...registerForm.register("email")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Enter email"
                        data-testid="input-register-email"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-red-400 text-sm" data-testid="error-register-email">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-gray-300">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        {...registerForm.register("password")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Create password"
                        data-testid="input-register-password"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-red-400 text-sm" data-testid="error-register-password">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm" className="text-gray-300">Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                        placeholder="Confirm password"
                        data-testid="input-register-confirm"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-400 text-sm" data-testid="error-register-confirm">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold"
                      disabled={registerMutation.isPending}
                      data-testid="button-register-submit"
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Join Neural Matrix"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forgot Password Form */}
            <TabsContent value="forgot">
              <Card className="bg-card-bg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {resetToken ? "Set New Password" : "Reset Password"}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {resetToken 
                      ? "Enter your new password below" 
                      : "Enter your email to receive a password reset link"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {resetToken ? (
                    // Reset Password Form (with token)
                    <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
                      <input type="hidden" {...resetPasswordForm.register("token")} />
                      
                      <div className="space-y-2">
                        <Label htmlFor="reset-password" className="text-gray-300">New Password</Label>
                        <Input
                          id="reset-password"
                          type="password"
                          {...resetPasswordForm.register("newPassword")}
                          className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                          placeholder="Enter new password"
                          data-testid="input-reset-password"
                        />
                        {resetPasswordForm.formState.errors.newPassword && (
                          <p className="text-red-400 text-sm" data-testid="error-reset-password">
                            {resetPasswordForm.formState.errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reset-confirm" className="text-gray-300">Confirm New Password</Label>
                        <Input
                          id="reset-confirm"
                          type="password"
                          {...resetPasswordForm.register("confirmPassword")}
                          className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                          placeholder="Confirm new password"
                          data-testid="input-reset-confirm"
                        />
                        {resetPasswordForm.formState.errors.confirmPassword && (
                          <p className="text-red-400 text-sm" data-testid="error-reset-confirm">
                            {resetPasswordForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-terminal-green text-terminal-bg hover:bg-terminal-amber font-semibold"
                        data-testid="button-reset-submit"
                      >
                        Reset Password
                      </Button>
                    </form>
                  ) : (
                    // Forgot Password Form (request reset)
                    <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgot-email" className="text-gray-300">Email</Label>
                        <Input
                          id="forgot-email"
                          type="email"
                          {...forgotPasswordForm.register("email")}
                          className="bg-gray-800 border-gray-600 text-white focus:border-terminal-green"
                          placeholder="Enter your email"
                          data-testid="input-forgot-email"
                        />
                        {forgotPasswordForm.formState.errors.email && (
                          <p className="text-red-400 text-sm" data-testid="error-forgot-email">
                            {forgotPasswordForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-terminal-green text-terminal-bg hover:bg-terminal-amber font-semibold"
                        data-testid="button-forgot-submit"
                      >
                        Send Reset Link
                      </Button>
                    </form>
                  )}

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setResetToken("");
                        // Clear URL parameters
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="text-sm text-terminal-red-secondary hover:text-terminal-red-primary transition-colors"
                      data-testid="link-back-to-login"
                    >
                      Back to Login
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Column - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-900/20 to-red-800/20 items-center justify-center p-8">
        <div className="max-w-lg text-center">
          {/* Urgency Badge */}
          <Badge className="mb-6 bg-red-600/20 text-red-300 border-red-500/50 text-lg px-4 py-2">
            <Timer className="w-4 h-4 mr-2" />
            Limited Time: 70% Off
          </Badge>

          <h2 className="text-4xl font-bold text-white mb-6">
            Unlock Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Neural Potential
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join <strong className="text-red-400">2,847 neurohackers</strong> mastering 
            brainwave frequency optimization and cognitive enhancement protocols.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/20 rounded-lg p-4 border border-red-700/30">
              <Zap className="w-6 h-6 text-red-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white">Alpha Training</div>
              <div className="text-xs text-gray-400">8-12 Hz</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 border border-cyan-700/30">
              <Zap className="w-6 h-6 text-cyan-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white">Beta Training</div>
              <div className="text-xs text-gray-400">12-30 Hz</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 border border-blue-700/30">
              <Zap className="w-6 h-6 text-blue-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white">Theta Training</div>
              <div className="text-xs text-gray-400">4-8 Hz</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 border border-green-700/30">
              <Zap className="w-6 h-6 text-green-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white">Gamma Training</div>
              <div className="text-xs text-gray-400">30-100+ Hz</div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">2,847 members</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-yellow-400 text-sm ml-1">4.9/5</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">94% success</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-red-600/10 to-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
            <div className="text-3xl font-bold text-white mb-2">$5.89/mo</div>
            <div className="text-gray-400 line-through mb-1">Regular: $19.99/mo</div>
            <div className="text-green-400 font-semibold">Save 70% - Limited Time Only</div>
          </div>

          {/* Security Notice */}
          <Alert className="border-blue-500/30 bg-blue-500/5">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-left text-sm">
              <strong>Secure & Private:</strong> Your data is encrypted and never shared. 
              Cancel anytime with our 30-day money-back guarantee.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
