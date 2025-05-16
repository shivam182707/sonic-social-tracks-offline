
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('user@example.com'); // Pre-filled for demo
  const [password, setPassword] = useState('password'); // Pre-filled for demo
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Focus on the login button when the page loads for easier access
  useEffect(() => {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Welcome to Vector',
        description: 'Login successful. Enjoy your music!',
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('user@example.com', 'password');
      toast({
        title: 'Welcome to Vector',
        description: 'Demo login successful. Enjoy your music!',
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Demo Login Failed',
        description: 'Could not log in with demo account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-vector-black to-vector-dark">
      <div className="flex justify-center p-6">
        <div className="text-white text-5xl font-bold">V</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-vector-darkgray rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Log in to Vector</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-vector-lightgray mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vector-lightgray h-5 w-5" />
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="pl-10 w-full px-4 py-2 rounded bg-[#333] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-vector-green"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-vector-lightgray mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vector-lightgray h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="pl-10 w-full px-4 py-2 rounded bg-[#333] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-vector-green"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vector-lightgray"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button
                id="login-button"
                type="submit"
                disabled={isLoading}
                className="w-full bg-vector-green text-black py-3 px-4 rounded-full font-bold hover:bg-opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
              
              <Button
                type="button"
                onClick={handleDemoLogin}
                className="w-full mt-3 bg-transparent border border-white text-white py-3 px-4 rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Quick Demo Login
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-vector-lightgray">
                Don't have an account? 
                <Link to="/signup" className="text-white underline ml-1">
                  Sign up for Vector
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="p-6 text-center text-vector-lightgray text-xs">
        <p>© 2025 Vector Music Platform</p>
      </footer>
    </div>
  );
};

export default Login;
