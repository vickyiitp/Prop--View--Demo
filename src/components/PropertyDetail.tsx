import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, BedDouble, Square, Check, Play, Phone, Mail, User } from 'lucide-react';
import { Property } from '../data/properties';
import EMICalculator from './EMICalculator';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetail({ property, onClose }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'virtual-tour'>('gallery');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto"
      >
        <div className="min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-2xl font-serif font-bold text-[var(--color-navy)]">PropView</h1>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Title & Price */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-[var(--color-navy)] text-white text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-sm">
                    {property.type}
                  </span>
                  <span className="bg-[var(--color-gold-light)] text-[var(--color-navy)] text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-sm">
                    Ready to Move
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-navy)] mb-4 leading-tight">
                  {property.title}
                </h2>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center text-gray-500 text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-[var(--color-gold)]" />
                    {property.location}, {property.city}
                  </div>
                  <div className="text-3xl font-serif font-bold text-[var(--color-gold)]">
                    {formatPrice(property.price)}
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                <div className="flex border-b border-gray-200">
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === 'gallery' ? 'bg-white text-[var(--color-navy)] border-b-2 border-[var(--color-navy)]' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Photo Gallery
                  </button>
                  <button 
                    onClick={() => setActiveTab('virtual-tour')}
                    className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'virtual-tour' ? 'bg-white text-[var(--color-navy)] border-b-2 border-[var(--color-navy)]' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Play className="w-4 h-4" />
                    3D Virtual Tour
                  </button>
                </div>

                <div className="h-[500px] relative">
                  {activeTab === 'gallery' ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-1 relative overflow-hidden">
                        <img 
                          src={property.images[currentImageIndex]} 
                          alt={property.title}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        />
                      </div>
                      <div className="h-24 bg-white flex items-center gap-2 px-4 overflow-x-auto">
                        {property.images.map((img, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-[var(--color-gold)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-gray-900 flex items-center justify-center relative group cursor-pointer">
                      {/* Mock iframe placeholder */}
                      <img 
                        src={property.images[0]} 
                        alt="Virtual Tour"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-2" />
                        </div>
                        <p className="text-white font-medium tracking-wide uppercase text-sm">Click to explore 3D Space</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <BedDouble className="w-8 h-8 text-[var(--color-gold)] mb-3" />
                  <span className="text-2xl font-serif font-semibold text-[var(--color-navy)]">{property.bhk}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Square className="w-8 h-8 text-[var(--color-gold)] mb-3" />
                  <span className="text-2xl font-serif font-semibold text-[var(--color-navy)]">{property.area}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Sq. Ft.</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-8 h-8 text-[var(--color-gold)] mb-3" />
                  <span className="text-xl font-serif font-semibold text-[var(--color-navy)]">{property.city}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Location</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Check className="w-8 h-8 text-[var(--color-gold)] mb-3" />
                  <span className="text-xl font-serif font-semibold text-[var(--color-navy)]">Ready</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Status</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-[var(--color-navy)] mb-6">About the Property</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-[var(--color-navy)] mb-6">Premium Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMI Calculator */}
              <div className="pt-8 border-t border-gray-100">
                <EMICalculator />
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                
                {/* Lead Capture Form */}
                <div className="bg-[var(--color-navy)] text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-serif font-semibold mb-2">Interested?</h3>
                  <p className="text-gray-400 text-sm mb-8">Schedule a private viewing or request more details.</p>
                  
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                      />
                    </div>
                    <button className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] font-bold uppercase tracking-wider py-4 rounded-lg transition-colors mt-4">
                      Request Details
                    </button>
                  </form>
                  
                  <p className="text-center text-xs text-gray-400 mt-6">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>

                {/* Agent Info */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Agent" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Listing Agent</p>
                    <h4 className="text-lg font-serif font-semibold text-[var(--color-navy)]">James Sterling</h4>
                    <p className="text-sm text-[var(--color-gold)] font-medium">PropView Luxury</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
