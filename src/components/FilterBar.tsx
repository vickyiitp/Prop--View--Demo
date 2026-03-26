import React from 'react';
import { Search, MapPin, Home, IndianRupee, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  filters: {
    city: string;
    priceRange: string;
    bhk: string;
    type: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    city: string;
    priceRange: string;
    bhk: string;
    type: string;
  }>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-none md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 md:gap-2 w-full max-w-5xl mx-auto relative z-20">
      
      {/* City Filter */}
      <div className="flex items-center gap-3 px-4 py-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-100">
        <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Location</label>
          <select 
            name="city" 
            value={filters.city} 
            onChange={handleChange}
            className="bg-transparent text-sm font-medium text-[var(--color-navy)] focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center gap-3 px-4 py-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-100">
        <IndianRupee className="w-5 h-5 text-[var(--color-gold)]" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Price Range</label>
          <select 
            name="priceRange" 
            value={filters.priceRange} 
            onChange={handleChange}
            className="bg-transparent text-sm font-medium text-[var(--color-navy)] focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">Any Price</option>
            <option value="0-30000000">Under ₹3 Cr</option>
            <option value="30000000-60000000">₹3 Cr - ₹6 Cr</option>
            <option value="60000000-100000000">₹6 Cr - ₹10 Cr</option>
            <option value="100000000+">Above ₹10 Cr</option>
          </select>
        </div>
      </div>

      {/* BHK Filter */}
      <div className="flex items-center gap-3 px-4 py-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-100">
        <SlidersHorizontal className="w-5 h-5 text-[var(--color-gold)]" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Bedrooms</label>
          <select 
            name="bhk" 
            value={filters.bhk} 
            onChange={handleChange}
            className="bg-transparent text-sm font-medium text-[var(--color-navy)] focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">Any BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5 BHK</option>
            <option value="6">6+ BHK</option>
          </select>
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="flex items-center gap-3 px-4 py-2 w-full md:w-auto md:flex-1">
        <Home className="w-5 h-5 text-[var(--color-gold)]" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Property Type</label>
          <select 
            name="type" 
            value={filters.type} 
            onChange={handleChange}
            className="bg-transparent text-sm font-medium text-[var(--color-navy)] focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full md:w-auto bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white p-4 md:px-8 md:py-4 rounded-none md:rounded-full transition-colors flex items-center justify-center gap-2 font-medium tracking-wide">
        <Search className="w-4 h-4" />
        <span className="md:hidden">Search Properties</span>
      </button>
    </div>
  );
}
