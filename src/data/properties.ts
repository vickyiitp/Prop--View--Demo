export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  bhk: number;
  type: 'Villa' | 'Apartment';
  area: number;
  images: string[];
  amenities: string[];
  description: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'The Azure Penthouse',
    price: 45000000,
    location: 'Marine Drive',
    city: 'Mumbai',
    bhk: 4,
    type: 'Apartment',
    area: 4500,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687931-ceeb66d11262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Sea View', 'Private Pool', 'Concierge', 'Smart Home'],
    description: 'Experience unparalleled luxury in this exquisite 4 BHK penthouse overlooking the Arabian Sea. Featuring floor-to-ceiling windows, Italian marble flooring, and a private infinity pool.'
  },
  {
    id: '2',
    title: 'Golden Oak Villa',
    price: 85000000,
    location: 'Banjara Hills',
    city: 'Hyderabad',
    bhk: 5,
    type: 'Villa',
    area: 8000,
    images: [
      'https://images.unsplash.com/photo-1613490908574-4b952f915115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Home Theater', 'Landscaped Garden', 'Wine Cellar', 'Elevator'],
    description: 'A masterpiece of modern architecture, this 5 BHK villa offers a sanctuary of peace and opulence. Set amidst lush greenery with state-of-the-art security and bespoke interiors.'
  },
  {
    id: '3',
    title: 'Sapphire Heights',
    price: 28000000,
    location: 'Indiranagar',
    city: 'Bangalore',
    bhk: 3,
    type: 'Apartment',
    area: 2800,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Clubhouse', 'Gymnasium', 'Spa', '24/7 Security'],
    description: 'Sophisticated living in the heart of Bangalore. This premium 3 BHK apartment boasts contemporary design, premium fittings, and access to world-class community amenities.'
  },
  {
    id: '4',
    title: 'The Heritage Estate',
    price: 120000000,
    location: 'Lutyens Zone',
    city: 'Delhi',
    bhk: 6,
    type: 'Villa',
    area: 12000,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Private Driveway', 'Servant Quarters', 'Library', 'Courtyard'],
    description: 'An iconic heritage property offering unmatched grandeur. Featuring colonial architecture, sprawling lawns, and interiors that echo timeless elegance.'
  },
  {
    id: '5',
    title: 'Oasis Residences',
    price: 35000000,
    location: 'Koregaon Park',
    city: 'Pune',
    bhk: 4,
    type: 'Apartment',
    area: 3200,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Rooftop Lounge', 'Infinity Pool', 'Valet Parking', 'Business Center'],
    description: 'A modern sanctuary designed for the elite. Enjoy panoramic city views, bespoke finishes, and exclusive access to premium lifestyle amenities.'
  },
  {
    id: '6',
    title: 'Palm Grove Retreat',
    price: 65000000,
    location: 'ECR',
    city: 'Chennai',
    bhk: 4,
    type: 'Villa',
    area: 6000,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Beach Access', 'Private Garden', 'Outdoor Kitchen', 'Guest House'],
    description: 'A luxurious beachfront villa offering the perfect blend of indoor and outdoor living. Wake up to the sound of waves and enjoy unparalleled privacy.'
  }
];
