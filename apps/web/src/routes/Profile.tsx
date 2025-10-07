import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/auth';
import { authApi } from '../lib/api';
import { updateProfileSchema, UpdateProfileInput } from '../lib/schemas';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { Button } from '../components/Button';

export function Profile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      photoUrl: user?.photoUrl,
      bio: user?.bio,
    },
  });

  const updateMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      toast.success('Profile updated successfully!');
      queryClient.setQueryData(['auth', 'me'], response.data.user);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    updateMutation.mutate(data);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Agent <span className="text-gold">Profile</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-gold mt-2"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gold/10">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src={user.photoUrl || 'https://via.placeholder.com/100'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gold shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {user.role}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gold font-semibold">📞 {user.phone}</p>
                {user.bio && (
                  <p className="text-gray-700 mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gold">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Update Profile Information</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  {...register('name')}
                  error={errors.name?.message}
                />

                <FormInput
                  label="Phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>

              <FormInput
                label="Photo URL"
                {...register('photoUrl')}
                error={errors.photoUrl?.message}
                placeholder="https://example.com/your-photo.jpg"
              />

              <FormTextarea
                label="Bio"
                rows={4}
                {...register('bio')}
                error={errors.bio?.message}
                placeholder="Tell potential clients about yourself..."
              />

              <div className="pt-4 flex space-x-4">
                <Button type="submit" isLoading={updateMutation.isPending} size="lg">
                  💾 Save Changes
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => window.location.reload()}>
                  ↻ Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

