import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Tag } from "lucide-react";
import { useOfferStore } from "@/store/offerStore";
import { useMenuStore } from "@/store/menuStore";
import { CountdownTimer } from "@/components/CountdownTimer";

export default function Offers() {
  const { offers } = useOfferStore();
  const { items: menuItems } = useMenuStore();

  const activeOffers = offers.filter(
    (offer) => new Date(offer.validUntil) > new Date()
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Today's Special Offers</h1>
        
        {activeOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No active offers at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeOffers.map((offer) => {
              const menuItem = menuItems.find((item) => item.id === offer.menuItemId);
              if (!menuItem) return null;

              const discount = Math.round(
                ((menuItem.price - offer.newPrice) / menuItem.price) * 100
              );

              return (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={menuItem.image} 
                    alt={menuItem.name} 
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{menuItem.name}</CardTitle>
                        <p className="text-sm text-gray-500">Special Offer</p>
                      </div>
                      <Badge variant="destructive" className="bg-orange-600">
                        {discount}% OFF
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 line-through">
                          ₹{menuItem.price.toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{offer.newPrice.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <CountdownTimer endTime={offer.validUntil} />
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          Available for Dine-in & Takeaway
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            <Tag className="w-3 h-3 mr-1" />
                            Limited Time
                          </Badge>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        Claim Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}