import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMenuStore } from '@/store/menuStore';
import { useOfferStore } from '@/store/offerStore';

export function OffersTab() {
  const { items } = useMenuStore();
  const { offers, addOffer, deleteOffer } = useOfferStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    menuItemId: '',
    newPrice: '',
    itemsAvailable: '',
    hours: '0',
    minutes: '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUntil = new Date();
    validUntil.setHours(
      validUntil.getHours() + parseInt(newOffer.hours),
      validUntil.getMinutes() + parseInt(newOffer.minutes)
    );

    addOffer({
      menuItemId: newOffer.menuItemId,
      newPrice: parseFloat(newOffer.newPrice),
      itemsAvailable: parseInt(newOffer.itemsAvailable),
      validUntil,
    });
    setNewOffer({ menuItemId: '', newPrice: '', itemsAvailable: '', hours: '', minutes: '' });
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Active Offers</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="menuItem">Select Menu Item</Label>
                <Select
                  value={newOffer.menuItemId}
                  onValueChange={(value) => setNewOffer({ ...newOffer, menuItemId: value })}
                >
                  <SelectTrigger id="menuItem">
                    <SelectValue placeholder="Select a dish" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} - ₹{item.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPrice">New Price in ₹</Label>
                <Input
                  id="newPrice"
                  type="number"
                  placeholder="Enter new price"
                  value={newOffer.newPrice}
                  onChange={(e) => setNewOffer({ ...newOffer, newPrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemsAvailable">Number of Items Available</Label>
                <Input
                  id="itemsAvailable"
                  type="number"
                  placeholder="Enter quantity"
                  value={newOffer.itemsAvailable}
                  onChange={(e) => setNewOffer({ ...newOffer, itemsAvailable: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Offer Duration</Label>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="hours" className="text-sm text-gray-500">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="23"
                      placeholder="Hours"
                      value={newOffer.hours}
                      onChange={(e) => setNewOffer({ ...newOffer, hours: e.target.value })}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="minutes" className="text-sm text-gray-500">Minutes</Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="Minutes"
                      value={newOffer.minutes}
                      onChange={(e) => setNewOffer({ ...newOffer, minutes: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">Create Offer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => {
          const menuItem = items.find((item) => item.id === offer.menuItemId);
          if (!menuItem) return null;

          return (
            <Card key={offer.id}>
              <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg">
                    Original Price: ₹{offer.originalPrice.toFixed(2)}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    Offer Price: ₹{offer.newPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Valid until: {new Date(offer.validUntil).toLocaleString()}
                  </p>
                  <div className="pt-2 border-t mt-2">
                    <p className="text-sm font-medium">Items Available: {offer.itemsAvailable}</p>
                    <p className="text-sm font-medium">Total Enquiries: {offer.enquiries || 0}</p>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full mt-4"
                    onClick={() => deleteOffer(offer.id)}
                  >
                    Delete Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}