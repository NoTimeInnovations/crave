import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/store/authStore';
import { useLocationStore } from '@/store/locationStore';
import { MapPin } from 'lucide-react';

export function PartnerDialog() {
  const navigate = useNavigate();
  const { signUpAsPartner } = useAuthStore();
  const { locations } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: '',
    area: '',
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
        formData.area,
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
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input
              id="hotelName"
              placeholder="Enter hotel name"
              value={formData.hotelName}
              onChange={(e) =>
                setFormData({ ...formData, hotelName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select
              value={formData.area}
              onValueChange={(value) => setFormData({ ...formData, area: value })}
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Detailed Location</Label>
            <div className="relative">
              <Textarea
                id="location"
                placeholder="Enter detailed address"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
                className="pr-10 min-h-[100px]"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={openGoogleMaps}
              >
                <MapPin className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
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