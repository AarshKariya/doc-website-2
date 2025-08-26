import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-soft transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Brand Name Only */}
          <div>
            <h1 className="font-bold text-base lg:text-lg text-white">Dr. Anish's Dental Clinic</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('appointment')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => scrollToSection('doctors')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Our Doctors
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Contact
            </button>
          </div>

          {/* Call Button */}
          <div className="hidden lg:flex">
            <Button onClick={() => scrollToSection('appointment')} variant="secondary" size="sm" className="text-sm">
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-blue-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-primary/95 backdrop-blur-md border-t border-white/20 shadow-soft">
            <div className="px-4 py-6 space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('appointment')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => scrollToSection('doctors')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Our Doctors
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-white/20">
                <Button onClick={() => scrollToSection('appointment')} variant="secondary" size="sm" className="w-full text-sm">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;