import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './Button';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone required'),
  address: z.string().optional(),
  purchaseDate: z.string(),
  purchasePrice: z.number().positive('Price must be positive'),
  notes: z.string().optional(),
});

type CustomerForm = z.infer<typeof customerSchema>;

interface CustomerCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerForm) => void;
  listingTitle: string;
  listingPrice: number;
  isLoading?: boolean;
}

export function CustomerCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  listingTitle,
  listingPrice,
  isLoading,
}: CustomerCaptureModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: listingPrice,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border-4 border-gold">
          <div className="bg-gradient-to-r from-gold to-gold-light px-6 py-4">
            <h3 className="text-2xl font-bold text-black">
              🎉 Capture Customer Details
            </h3>
            <p className="text-sm text-black/80 mt-1">Complete the sale of: {listingTitle}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <FormInput
                  label="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <FormInput
                  label="Phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>

              <FormInput
                label="Customer Address"
                {...register('address')}
                error={errors.address?.message}
                placeholder="New address of the buyer"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Purchase Date"
                  type="date"
                  {...register('purchaseDate')}
                  error={errors.purchaseDate?.message}
                />
                <FormInput
                  label="Final Sale Price"
                  type="number"
                  {...register('purchasePrice', { valueAsNumber: true })}
                  error={errors.purchasePrice?.message}
                />
              </div>

              <FormTextarea
                label="Notes"
                rows={3}
                {...register('notes')}
                error={errors.notes?.message}
                placeholder="Any special notes about this customer or sale..."
              />
            </div>

            <div className="mt-6 flex space-x-4">
              <Button type="submit" size="lg" className="flex-1" isLoading={isLoading}>
                💾 Mark as Sold & Save Customer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleClose}
                disabled={isLoading}
              >
                ✕ Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

