import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/authStore';
import { MapPin } from 'lucide-react';

export function PartnerDialog() {
  const navigate = useNavigate();
  const { signUpAsPartner } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpAsPartner(
        formData.email,
        formData.password,
        formData.hotelName,
        formData.location
      );
      setIsOpen(false);
      navigate('/admin');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Partner with Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register as Partner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Input
              placeholder="Hotel Name"
              value={formData.hotelName}
              onChange={(e) =>
                setFormData({ ...formData, hotelName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2 relative">
            <div className="relative">
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={openGoogleMaps}
              >
                <MapPin className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}