import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Menu, X, Shield, Award, Gem, Quote } from 'lucide-react';
import { properties } from './data/properties';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    priceRange: '',
    bhk: '',
    type: ''
  });

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // City Filter
      if (filters.city && property.city !== filters.city) return false;
      
      // Type Filter
      if (filters.type && property.type !== filters.type) return false;
      
      // BHK Filter
      if (filters.bhk) {
        if (filters.bhk === '6' && property.bhk < 6) return false;
        if (filters.bhk !== '6' && property.bhk.toString() !== filters.bhk) return false;
      }
      
      // Price Range Filter
      if (filters.priceRange) {
        const [minStr, maxStr] = filters.priceRange.split('-');
        const min = parseInt(minStr);
        const max = maxStr ? parseInt(maxStr) : Infinity;
        
        if (filters.priceRange.endsWith('+')) {
          if (property.price < min) return false;
        } else {
          if (property.price < min || property.price > max) return false;
        }
      }
      
      return true;
    });
  }, [filters]);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-sans">
      
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[var(--color-gold)]" />
            <span className="text-2xl font-serif font-bold text-[var(--color-navy)] tracking-tight">PropView</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider text-gray-500">
            <a href="#properties" className="text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors">Properties</a>
            <a href="#expertise" className="hover:text-[var(--color-gold)] transition-colors">Expertise</a>
            <a href="#testimonials" className="hover:text-[var(--color-gold)] transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-[var(--color-gold)] transition-colors">Contact</a>
          </div>
          
          <button className="hidden md:block bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors">
            List Property
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[var(--color-navy)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-6 text-sm font-semibold uppercase tracking-wider text-gray-500">
                <a href="#properties" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors">Properties</a>
                <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-gold)] transition-colors">Expertise</a>
                <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-gold)] transition-colors">Testimonials</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-gold)] transition-colors">Contact</a>
                <button className="bg-[var(--color-navy)] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors mt-2 w-full">
                  List Property
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper)] via-transparent to-[var(--color-paper)]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold text-[var(--color-navy)] leading-tight mb-6"
          >
            Discover Your <br/>
            <span className="text-[var(--color-gold)] italic font-light">Perfect Sanctuary</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-medium"
          >
            Explore an exclusive collection of premium real estate properties designed for the extraordinary.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FilterBar filters={filters} setFilters={setFilters} />
          </motion.div>
        </div>
      </section>

      {/* Advantage / Expertise Section */}
      <section id="expertise" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-navy)] mb-4">The PropView Advantage</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Elevating the real estate experience through unparalleled service, exclusive access, and absolute discretion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-[var(--color-paper)] group-hover:bg-[var(--color-gold-light)] transition-colors duration-300 rounded-full flex items-center justify-center mb-6">
                <Gem className="w-10 h-10 text-[var(--color-navy)]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[var(--color-navy)] mb-3">Curated Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">Access to off-market properties and the most exclusive homes in the country, meticulously vetted for our clients.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-[var(--color-paper)] group-hover:bg-[var(--color-gold-light)] transition-colors duration-300 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-[var(--color-navy)]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[var(--color-navy)] mb-3">Absolute Discretion</h3>
              <p className="text-gray-600 leading-relaxed">We understand the value of privacy. Our transactions are handled with the utmost confidentiality and security.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-[var(--color-paper)] group-hover:bg-[var(--color-gold-light)] transition-colors duration-300 rounded-full flex items-center justify-center mb-6">
                <Award className="w-10 h-10 text-[var(--color-navy)]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[var(--color-navy)] mb-3">Concierge Service</h3>
              <p className="text-gray-600 leading-relaxed">From legal assistance to interior design consultations, our white-glove service covers every aspect of your journey.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="properties" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-navy)] mb-2">Exclusive Listings</h2>
            <p className="text-gray-500 font-medium text-lg">Showing {filteredProperties.length} premium properties</p>
          </div>
          <div className="flex gap-2">
            <button className="text-sm font-semibold uppercase tracking-wider text-gray-500 hover:text-[var(--color-navy)] transition-colors">Sort by: Featured</button>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onViewDetails={setSelectedPropertyId} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3 className="text-2xl font-serif font-semibold text-[var(--color-navy)] mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => setFilters({ city: '', priceRange: '', bhk: '', type: '' })}
              className="mt-6 text-[var(--color-gold)] font-semibold uppercase tracking-wider hover:text-[var(--color-navy)] transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-[var(--color-navy)] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[var(--color-gold)] blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[100%] bg-blue-400 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Client Experiences</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">Hear from those who have found their perfect sanctuary with PropView.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-sm"
            >
              <Quote className="w-10 h-10 text-[var(--color-gold)] mb-6 opacity-50" />
              <p className="text-lg md:text-xl font-serif leading-relaxed mb-8 text-gray-100">"The level of professionalism and access to exclusive properties is unmatched. PropView found us a home that wasn't even on the market yet. Truly exceptional service."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden border-2 border-[var(--color-gold)]">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Alexander M.</h4>
                  <p className="text-sm text-[var(--color-gold)]">Purchased in Marine Drive</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-sm"
            >
              <Quote className="w-10 h-10 text-[var(--color-gold)] mb-6 opacity-50" />
              <p className="text-lg md:text-xl font-serif leading-relaxed mb-8 text-gray-100">"From the initial consultation to the final paperwork, the team handled everything with absolute discretion and efficiency. A seamless luxury experience."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden border-2 border-[var(--color-gold)]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Sarah V.</h4>
                  <p className="text-sm text-[var(--color-gold)]">Purchased in Lutyens Zone</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-gold)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-multiply">
          <img src="https://images.unsplash.com/photo-1600607687931-ceeb66d11262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-navy)] mb-6">Looking to Sell a Premium Property?</h2>
          <p className="text-lg md:text-xl text-[var(--color-navy)]/80 mb-10 font-medium max-w-2xl mx-auto">List your property with PropView and gain access to our exclusive network of high-net-worth buyers globally.</p>
          <button className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Request a Valuation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[var(--color-navy)] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-8 h-8 text-[var(--color-gold)]" />
              <span className="text-2xl font-serif font-bold text-white tracking-tight">PropView</span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              Curating the world's most extraordinary properties for those who appreciate the finer things in life.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors cursor-pointer">
                <span className="font-serif font-bold italic">in</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors cursor-pointer">
                <span className="font-serif font-bold italic">ig</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors cursor-pointer">
                <span className="font-serif font-bold italic">fb</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#properties" className="hover:text-white transition-colors">Featured Properties</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Our Expertise</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Client Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Insights</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)] mt-1">T:</span> 
                <a href="tel:1800PROPVIEW" className="hover:text-white transition-colors">1-800-PROPVIEW</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)] mt-1">E:</span> 
                <a href="mailto:concierge@propview.com" className="hover:text-white transition-colors">concierge@propview.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)] mt-1">A:</span> 
                <span>123 Luxury Avenue, Suite 100<br/>New York, NY 10022</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PropView Luxury Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty} 
          onClose={() => setSelectedPropertyId(null)} 
        />
      )}
    </div>
  );
}
