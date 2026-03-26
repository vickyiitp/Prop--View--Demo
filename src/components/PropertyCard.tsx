import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, BedDouble, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={() => onViewDetails(property.id)}
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={property.images[currentImageIndex]}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImage}
            className="bg-white/70 hover:bg-white p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-sm text-[var(--color-navy)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="bg-white/70 hover:bg-white p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-sm text-[var(--color-navy)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[var(--color-navy)] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-sm">
            {property.type}
          </span>
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {property.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-semibold text-[var(--color-navy)] line-clamp-1">{property.title}</h3>
          <span className="text-lg font-semibold text-[var(--color-gold)] whitespace-nowrap ml-4">
            {formatPrice(property.price)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-[var(--color-gold)]" />
          {property.location}, {property.city}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 border-t border-b border-gray-50 py-3">
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-gray-400" />
            <span>{property.bhk} Beds</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-gray-400" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-gray-50 text-gray-600 text-[11px] px-2.5 py-1 rounded-sm border border-gray-100">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="bg-gray-50 text-gray-600 text-[11px] px-2.5 py-1 rounded-sm border border-gray-100">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(property.id);
            }}
            className="w-full py-3 border border-[var(--color-navy)] text-[var(--color-navy)] font-medium text-sm tracking-wide hover:bg-[var(--color-navy)] hover:text-white transition-colors duration-300 uppercase"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
