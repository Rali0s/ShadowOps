import { useState } from "react";
import { useLocation, Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Code, Lock, Shield, Terminal } from "lucide-react";

const loginSchema = insertUserSchema.pick({ username: true, password: true });
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Redirect if already logged in (after hooks)
  if (user) {
    return <Redirect to="/" />;
  }

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

  const handleLogin = async (data: LoginData) => {
    const result = await loginMutation.mutateAsync(data);
    if (result) {
      setLocation("/");
    }
  };

  const handleRegister = async (data: RegisterData) => {
    const { confirmPassword, ...registerData } = data;
    const result = await registerMutation.mutateAsync(registerData);
    if (result) {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex">
      {/* Left Column - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-terminal-green rounded-xl flex items-center justify-center">
                <Code className="text-terminal-bg text-2xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-terminal-green font-mono">BlackRaven OS</h1>
            <p className="text-gray-400 mt-2">Access the PsychProject Training Platform</p>
          </div>

          {/* Auth Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <CardTitle className="text-white">Welcome Back</CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter your credentials to access the terminal
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
                      className="w-full bg-terminal-green text-terminal-bg hover:bg-terminal-amber font-semibold"
                      disabled={loginMutation.isPending}
                      data-testid="button-login-submit"
                    >
                      {loginMutation.isPending ? "Authenticating..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <Card className="bg-card-bg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Create Account</CardTitle>
                  <CardDescription className="text-gray-400">
                    Join the elite cybersecurity training program
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
                      className="w-full bg-terminal-green text-terminal-bg hover:bg-terminal-amber font-semibold"
                      disabled={registerMutation.isPending}
                      data-testid="button-register-submit"
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Column - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-terminal-bg items-center justify-center p-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="terminal-scanline"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-terminal-green to-cyber-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="text-4xl text-terminal-bg" />
            </div>
            <h2 className="text-4xl font-bold text-terminal-green mb-4 font-mono">PSYCHPROJECT</h2>
            <p className="text-terminal-amber font-mono">CLASSIFIED TRAINING SYSTEM</p>
          </div>

          <div className="space-y-6 text-left max-w-sm">
            <div className="flex items-start space-x-3">
              <Shield className="text-terminal-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Advanced Security Training</h3>
                <p className="text-gray-400 text-sm">Master penetration testing and digital forensics</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Terminal className="text-cyber-blue mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Terminal-Based Learning</h3>
                <p className="text-gray-400 text-sm">Real-world command-line training environment</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Code className="text-terminal-amber mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Elite Certification</h3>
                <p className="text-gray-400 text-sm">Industry-recognized cybersecurity credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
