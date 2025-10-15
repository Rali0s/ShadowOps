import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { 
  MapPin, 
  Clock, 
  Globe, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Lock,
  Crown,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

export default function GroundingMethods() {
  const { isSubscribed } = useAuth();
  const [, setLocation] = useLocation();
  
  // GPS Coordinates State
  const [userLat, setUserLat] = useState('');
  const [userLon, setUserLon] = useState('');
  const [actualLat, setActualLat] = useState<number | null>(null);
  const [actualLon, setActualLon] = useState<number | null>(null);
  const [gpsMatch, setGpsMatch] = useState<boolean | null>(null);

  // Time States
  const [currentUTC, setCurrentUTC] = useState('');
  const [currentZulu, setCurrentZulu] = useState('');

  // Solo Inception State
  const [objectDescription, setObjectDescription] = useState('');
  const [hidingLocation, setHidingLocation] = useState('');
  const [objectHidden, setObjectHidden] = useState(false);
  const [searchResult, setSearchResult] = useState<'found' | 'missing' | null>(null);

  // Update clocks every second
  useEffect(() => {
    if (!isSubscribed) return;
    
    const updateTime = () => {
      const now = new Date();
      setCurrentUTC(now.toUTCString());
      
      // Zulu time format: DDHHMMZ MMM YY
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hour = String(now.getUTCHours()).padStart(2, '0');
      const minute = String(now.getUTCMinutes()).padStart(2, '0');
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = monthNames[now.getUTCMonth()];
      const year = String(now.getUTCFullYear()).slice(-2);
      setCurrentZulu(`${day}${hour}${minute}Z ${month} ${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isSubscribed]);

  const getGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setActualLat(position.coords.latitude);
          setActualLon(position.coords.longitude);
        },
        (error) => {
          console.error('GPS Error:', error);
          alert('Unable to get GPS location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const checkGPSMatch = () => {
    if (!actualLat || !actualLon || !userLat || !userLon) {
      alert('Please enter coordinates and get GPS location first.');
      return;
    }

    const lat1 = parseFloat(userLat);
    const lon1 = parseFloat(userLon);
    const lat2 = actualLat;
    const lon2 = actualLon;

    // Calculate distance in meters using Haversine formula
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    // Match if within 100 meters
    setGpsMatch(distance < 100);
  };

  const hideObject = () => {
    if (!objectDescription || !hidingLocation) {
      alert('Please describe the object and where you hid it.');
      return;
    }
    setObjectHidden(true);
    setSearchResult(null);
  };

  const resetInception = () => {
    setObjectDescription('');
    setHidingLocation('');
    setObjectHidden(false);
    setSearchResult(null);
  };

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card-bg border-terminal-red-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center space-y-4 p-6">
                <Lock className="w-16 h-16 text-yellow-500 mx-auto" />
                <h3 className="text-2xl font-bold text-terminal-red-bright">Researcher Tier Required</h3>
                <p className="text-terminal-red-secondary max-w-md">
                  Subscribe to unlock advanced grounding methods including GPS verification, 
                  time synchronization, and reality-anchoring techniques.
                </p>
                <div className="pt-4">
                  <Link href="/subscribe">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                      data-testid="button-upgrade-grounding"
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Upgrade to Researcher Tier
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500">
                  $5.89/month • Cancel anytime
                </p>
              </div>
            </div>
            <CardContent className="p-12 opacity-30">
              <div className="space-y-6">
                <div className="h-40 bg-terminal-red-dark/20 rounded-lg"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-terminal-red-dark/20 rounded-lg"></div>
                  <div className="h-32 bg-terminal-red-dark/20 rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-terminal-red-muted/30 bg-card-bg/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-terminal-red-bright mb-2">
                Grounding Methods
              </h1>
              <p className="text-terminal-red-secondary">
                Reality-anchoring techniques for cognitive clarity
              </p>
            </div>
            <Badge className="bg-yellow-600/20 border-yellow-500 text-yellow-400">
              <Crown className="w-3 h-3 mr-1" />
              Researcher Tier
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Introduction */}
        <Alert className="border-terminal-red-primary/30 bg-terminal-red-dark/10">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="text-terminal-red-bright">Reality Anchoring</AlertTitle>
          <AlertDescription className="text-terminal-red-secondary text-sm">
            These techniques help verify your current reality state through physical verification, 
            time synchronization, and environmental validation. Use them when transitioning between 
            mental states or after deep cognitive work.
          </AlertDescription>
        </Alert>

        {/* GPS Coordinates Method */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-terminal-red-primary/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-terminal-red-primary" />
              </div>
              <div>
                <CardTitle className="text-terminal-red-bright">GPS Coordinates & Match</CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Verify your physical location through GPS matching
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user-lat" className="text-terminal-red-secondary">Your Latitude</Label>
                <Input
                  id="user-lat"
                  type="number"
                  step="any"
                  placeholder="37.7749"
                  value={userLat}
                  onChange={(e) => setUserLat(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  data-testid="input-gps-lat"
                />
              </div>
              <div>
                <Label htmlFor="user-lon" className="text-terminal-red-secondary">Your Longitude</Label>
                <Input
                  id="user-lon"
                  type="number"
                  step="any"
                  placeholder="-122.4194"
                  value={userLon}
                  onChange={(e) => setUserLon(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  data-testid="input-gps-lon"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={getGPSLocation}
                variant="outline"
                className="border-terminal-red-muted hover:bg-terminal-red-dark/20"
                data-testid="button-get-gps"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get GPS Location
              </Button>
              <Button 
                onClick={checkGPSMatch}
                className="bg-terminal-red-primary hover:bg-terminal-red-primary/80"
                data-testid="button-check-gps"
              >
                Check Match
              </Button>
            </div>

            {actualLat && actualLon && (
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400">
                  <strong className="text-terminal-red-bright">Actual GPS:</strong> {actualLat.toFixed(6)}, {actualLon.toFixed(6)}
                </p>
              </div>
            )}

            {gpsMatch !== null && (
              <Alert className={gpsMatch ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}>
                {gpsMatch ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                <AlertTitle className={gpsMatch ? "text-green-500" : "text-red-500"}>
                  {gpsMatch ? "Location Match Confirmed" : "Location Mismatch Detected"}
                </AlertTitle>
                <AlertDescription className="text-sm">
                  {gpsMatch 
                    ? "Your coordinates match your actual GPS location. Reality anchor verified."
                    : "Coordinates do not match GPS. You may be in a different location or simulation state."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* UTC & Zulu Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card-bg border-terminal-red-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-terminal-red-primary/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-terminal-red-primary" />
                </div>
                <div>
                  <CardTitle className="text-terminal-red-bright">UTC Time Clock</CardTitle>
                  <CardDescription className="text-terminal-red-secondary">
                    Universal Coordinated Time
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-800 rounded-lg text-center">
                <p className="text-2xl font-mono text-terminal-red-bright" data-testid="text-utc-time">{currentUTC}</p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                UTC is the global time standard. Use it to synchronize with objective reality.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-terminal-red-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-terminal-red-primary/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-terminal-red-primary" />
                </div>
                <div>
                  <CardTitle className="text-terminal-red-bright">Zulu Time</CardTitle>
                  <CardDescription className="text-terminal-red-secondary">
                    Military & Aviation standard
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-800 rounded-lg text-center">
                <p className="text-2xl font-mono text-terminal-red-bright" data-testid="text-zulu-time">{currentZulu}</p>
              </div>
              <Alert className="mt-3 border-blue-500/30 bg-blue-500/10">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-xs text-blue-300">
                  <strong>Zulu Time Format:</strong> DDHHMMZ MMM YY
                  <br />Example: 15140530Z OCT 25 = Day 15, 14:05:30 UTC, October 2025
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Solo Inception */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-terminal-red-primary/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-terminal-red-primary" />
              </div>
              <div>
                <CardTitle className="text-terminal-red-bright">Solo Inception</CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Environmental reality verification
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-yellow-600/50 bg-yellow-600/10">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertTitle className="text-yellow-500">How It Works</AlertTitle>
              <AlertDescription className="text-sm text-gray-300">
                1. Choose a small object before leaving a location
                <br />2. Hide it in a specific spot
                <br />3. When you return, try to find the object
                <br />4. <strong>IF FOUND:</strong> Reality anchor confirmed
                <br />5. <strong>IF MISSING:</strong> Use MANUAL mental grounding
              </AlertDescription>
            </Alert>

            {!objectHidden ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="object-desc" className="text-terminal-red-secondary">Object Description</Label>
                  <Input
                    id="object-desc"
                    placeholder="Small red keychain"
                    value={objectDescription}
                    onChange={(e) => setObjectDescription(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    data-testid="input-object-description"
                  />
                </div>
                <div>
                  <Label htmlFor="hiding-spot" className="text-terminal-red-secondary">Hiding Location</Label>
                  <Input
                    id="hiding-spot"
                    placeholder="Behind the coffee maker"
                    value={hidingLocation}
                    onChange={(e) => setHidingLocation(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    data-testid="input-hiding-location"
                  />
                </div>
                <Button 
                  onClick={hideObject}
                  className="w-full bg-terminal-red-primary hover:bg-terminal-red-primary/80"
                  data-testid="button-hide-object"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Hide Object & Leave
                </Button>
              </div>
            ) : searchResult === null ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    <strong className="text-terminal-red-bright">Hidden Object:</strong> {objectDescription}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className="text-terminal-red-bright">Location:</strong> {hidingLocation}
                  </p>
                </div>
                <p className="text-sm text-terminal-red-secondary italic">
                  Now leave the location. When you return, try to find the object...
                </p>
                <Separator className="bg-gray-700" />
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setSearchResult('found')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    data-testid="button-object-found"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Found It
                  </Button>
                  <Button 
                    onClick={() => setSearchResult('missing')}
                    variant="destructive"
                    className="flex-1"
                    data-testid="button-object-missing"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Missing
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert className={searchResult === 'found' ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}>
                  {searchResult === 'found' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                  <AlertTitle className={searchResult === 'found' ? "text-green-500" : "text-red-500"}>
                    {searchResult === 'found' ? "Reality Anchor Confirmed" : "Reality Drift Detected"}
                  </AlertTitle>
                  <AlertDescription className="text-sm">
                    {searchResult === 'found' 
                      ? "Object found in expected location. Your reality state is stable and grounded."
                      : "Object missing from hiding spot. Initiate MANUAL mental grounding: Focus on breath, identify 5 physical sensations, verify your identity and current location verbally."}
                  </AlertDescription>
                </Alert>
                <Button 
                  onClick={resetInception}
                  variant="outline"
                  className="w-full border-terminal-red-muted hover:bg-terminal-red-dark/20"
                  data-testid="button-reset-inception"
                >
                  Reset & Try New Object
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 p-4 bg-terminal-red-primary/10 rounded-lg">
          <p className="text-sm italic text-center text-terminal-red-secondary">
            "Think for yourself. Question everything. DYOR."
          </p>
          <p className="text-xs text-center text-gray-500 mt-2">
            Use grounding methods responsibly to maintain cognitive clarity and reality awareness.
          </p>
        </div>
      </div>
    </div>
  );
}
