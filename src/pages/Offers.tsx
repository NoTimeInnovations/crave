import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Tag, Loader2 } from "lucide-react";
import { useOfferStore, type Offer } from "@/store/offerStore";
import { CountdownTimer } from "@/components/CountdownTimer";
import { OfferTicket } from "@/components/OfferTicket";

export default function Offers() {
  const { offers, loading, error, subscribeToOffers, unsubscribeFromOffers,incrementEnquiry } = useOfferStore();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    subscribeToOffers();
    return () => unsubscribeFromOffers();
  }, [subscribeToOffers, unsubscribeFromOffers]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-lg text-gray-600">Loading offers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md text-center">
          <p>Error loading offers: {error}</p>
        </div>
      </div>
    );
  }

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
              const discount = Math.round(
                ((offer.originalPrice - offer.newPrice) / offer.originalPrice) * 100
              );

              return (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={offer.dishImage} 
                    alt={offer.dishName} 
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{offer.dishName}</CardTitle>
                        <p className="text-sm text-gray-500">{offer.hotelName}</p>
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
                          ₹{offer.originalPrice.toFixed(2)}
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
                          {offer.hotelLocation}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            <Tag className="w-3 h-3 mr-1" />
                            {offer.itemsAvailable} items left
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setSelectedOffer(offer)
                          incrementEnquiry(offer.id,offer.hotelId)
                        }} 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        Claim Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {selectedOffer && (
          <OfferTicket
            isOpen={!!selectedOffer}
            onClose={() => setSelectedOffer(null)}
            offer={selectedOffer}
          />
        )}
      </div>
    </div>
  );
}