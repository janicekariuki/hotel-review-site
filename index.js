import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import Image from 'next/image';

const hotels = [
  {
    id: 1,
    name: 'Palm Grove Resort',
    location: '123 Beach Rd, Miami',
    rating: 4.5,
    topDishes: ['Grilled Snapper', 'Tropical Smoothie'],
    delivery: ['In-house', 'Uber Eats'],
    reservationLink: 'https://opentable.com/palmgrove',
    contact: {
      email: 'info@palmgrove.com',
      phone: '+1234567890',
    },
    images: [
      '/hotel1.jpg',
      '/hotel2.jpg'
    ],
    reviews: [
      {
        user: 'Jane Doe',
        rating: 5,
        comment: 'Amazing food and service!'
      }
    ]
  }
];

export default function HomePage() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Hotel Review Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(hotel => (
          <Card key={hotel.id} onClick={() => setSelectedHotel(hotel)} className="cursor-pointer">
            <CardContent>
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <div className="flex items-center text-yellow-500">
                {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500" />
                ))}
                <span className="ml-2 text-sm text-gray-700">{hotel.rating}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedHotel && (
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
          <p>{selectedHotel.location}</p>
          <p><strong>Top Dishes:</strong> {selectedHotel.topDishes.join(', ')}</p>
          <p><strong>Delivery Options:</strong> {selectedHotel.delivery.join(', ')}</p>
          <p><strong>Reservation:</strong> <a className="text-blue-600 underline" href={selectedHotel.reservationLink} target="_blank">Book Here</a></p>
          <p><strong>Contact:</strong> {selectedHotel.contact.email}, {selectedHotel.contact.phone}</p>
          <div className="grid grid-cols-2 gap-4">
            {selectedHotel.images.map((img, idx) => (
              <Image key={idx} src={img} alt="Hotel Image" width={300} height={200} className="rounded-xl" />
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">User Reviews</h3>
            {selectedHotel.reviews.map((rev, idx) => (
              <div key={idx} className="border p-3 rounded-lg my-2">
                <div className="flex items-center space-x-2">
                  <strong>{rev.user}</strong>
                  <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                </div>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}