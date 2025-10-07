import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/auth';
import { loginSchema, LoginInput } from '../lib/schemas';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import profileImage from '../assets/topchoicerealtypfp.jpg';

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  const handleQuickLogin = async () => {
    try {
      await login('john.doe@topchoicerealty.com', 'test12345');
      toast.success('Quick login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Quick login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Profile */}
          <div className="hidden md:block">
            <div className="text-center mb-8">
              <div className="inline-block mb-6">
                <img
                  src={profileImage}
                  alt="Top Choice Realty"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gold shadow-2xl shadow-gold/30 mx-auto"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-5xl font-bold text-gold tracking-wider mb-2">TOP CHOICE</h1>
                  <p className="text-gold/80 text-lg tracking-widest">REALTY LLC</p>
                </div>
                <div className="border-t border-gold/30 pt-4">
                  <p className="text-gray-300 text-lg mb-2">Our Passion is Our Clients</p>
                  <p className="text-gold/90 text-sm">🏠 Serving New York & New Jersey</p>
                  <p className="text-gold font-semibold text-xl mt-4">📞 929-488-3666</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-gold/20">
              <div className="text-center mb-8">
                <div className="inline-block md:hidden mb-4">
                  <img
                    src={profileImage}
                    alt="Top Choice Realty"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gold shadow-lg mx-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Agent <span className="text-gold">Login</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-gold mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Access your dashboard and manage listings
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="agent@topchoicerealty.com"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <FormInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />

                <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                  Sign In to Dashboard
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Quick Access</span>
                  </div>
                </div>

                <button
                  onClick={handleQuickLogin}
                  type="button"
                  className="mt-4 w-full px-4 py-3 border-2 border-gold/30 rounded-lg text-gray-700 hover:bg-gold/5 hover:border-gold transition-all font-medium"
                >
                  🚀 Demo Login (John Doe)
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg border border-gold/20">
                <p className="text-sm text-gray-700 font-medium mb-2">📝 Demo Credentials:</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• john.doe@topchoicerealty.com / test12345</p>
                  <p>• jane.lee@topchoicerealty.com / test12345</p>
                </div>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-400 text-sm">
              Protected by session-based authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

