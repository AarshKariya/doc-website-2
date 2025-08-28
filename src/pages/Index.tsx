import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  Heart, 
  Stethoscope,
  Shield,
  Smile,
  Star,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import Navigation from '@/components/Navigation';
import AppointmentBooking from '@/components/AppointmentBooking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Import images
import drAnuragAggarwal from '@/assets/dr-anurag-aggarwal.jpg';
import drKavyaReddy from '@/assets/dr-kavya-reddy.jpg';
import drVikramSingh from '@/assets/dr-vikram-singh-new.jpg';
import servicePreventive from '@/assets/service-preventive.jpg';
import serviceRestorative from '@/assets/service-restorative.jpg';
import serviceCosmetic from '@/assets/service-cosmetic.jpg';
import serviceOrthodontics from '@/assets/service-orthodontics.jpg';
import servicePeriodontal from '@/assets/service-periodontal.jpg';
import serviceOralSurgery from '@/assets/service-oral-surgery.jpg';
import patient1 from '@/assets/patient-1.jpg';
import patient2 from '@/assets/patient-2.jpg';
import patient3 from '@/assets/patient-3.jpg';
import clinicEntrance from '@/assets/clinic-entrance.jpg';
import clinicReception from '@/assets/clinic-reception.jpg';
import clinicTreatmentRoom from '@/assets/clinic-treatment-room.jpg';
import clinicConsultationOffice from '@/assets/clinic-consultation-office.jpg';
import clinicWaitingArea from '@/assets/clinic-waiting-area.jpg';

const Index = () => {
  console.log('Index component is rendering');
  
  const [currentDoctor, setCurrentDoctor] = useState(0);
  const [currentClinicImage, setCurrentClinicImage] = useState(0);
  
  // Touch/swipe handling for clinic carousel
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Touch/swipe handling for doctors section
  const [doctorTouchStart, setDoctorTouchStart] = useState(0);
  const [doctorTouchEnd, setDoctorTouchEnd] = useState(0);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Anurag Aggarwal',
      specialization: 'Chief Dentist & Oral Surgeon',
      experience: '20+ Years',
      image: drAnuragAggarwal,
      quote: 'Every smile deserves the finest care. My approach combines cutting-edge technology with compassionate treatment to ensure every patient leaves with confidence.',
      description: 'Dr. Anurag Aggarwal is the founder and chief dentist with over two decades of experience in comprehensive dental care. He specializes in oral surgery, dental implants, and complex restorative procedures.'
    },
    {
      id: 2,
      name: 'Dr. Kavya Reddy',
      specialization: 'Cosmetic Dentistry & Orthodontics',
      experience: '15+ Years',
      image: drKavyaReddy,
      quote: 'A beautiful smile is not just about aesthetics—it\'s about boosting your confidence and improving your quality of life through expert cosmetic and orthodontic care.',
      description: 'Dr. Kavya Reddy specializes in cosmetic dentistry and orthodontics, helping patients achieve their dream smiles through advanced techniques like invisible braces and porcelain veneers.'
    },
    {
      id: 3,
      name: 'Dr. Vikram Singh',
      specialization: 'Periodontics & Preventive Care',
      experience: '18+ Years',
      image: drVikramSingh,
      quote: 'Prevention is the best medicine. My focus is on maintaining optimal oral health through preventive care and treating gum diseases with the latest periodontal techniques.',
      description: 'Dr. Vikram Singh is our periodontics specialist, focusing on gum health and preventive care. He has extensive experience in treating gum diseases and maintaining oral hygiene.'
    }
  ];

  const services = [
    {
      title: 'Preventive Care',
      description: 'Regular cleanings, examinations, and preventive treatments to maintain optimal oral health.',
      image: servicePreventive,
      features: ['Professional Cleaning', 'Oral Examinations', 'Fluoride Treatments', 'Sealants']
    },
    {
      title: 'Restorative Procedures',
      description: 'Expert restoration services including fillings, crowns, bridges, and root canal treatments.',
      image: serviceRestorative,
      features: ['Dental Fillings', 'Crowns & Bridges', 'Root Canal Treatment', 'Dental Implants']
    },
    {
      title: 'Cosmetic Treatments',
      description: 'Transform your smile with professional teeth whitening, veneers, and cosmetic procedures.',
      image: serviceCosmetic,
      features: ['Teeth Whitening', 'Porcelain Veneers', 'Smile Makeover', 'Bonding']
    },
    {
      title: 'Orthodontics',
      description: 'Straighten your teeth with traditional braces, clear aligners, and modern orthodontic solutions.',
      image: serviceOrthodontics,
      features: ['Traditional Braces', 'Clear Aligners', 'Retainers', 'Orthodontic Consultations']
    },
    {
      title: 'Periodontal Care',
      description: 'Specialized treatment for gum diseases and maintaining healthy gums and supporting structures.',
      image: servicePeriodontal,
      features: ['Gum Disease Treatment', 'Deep Cleaning', 'Gum Surgery', 'Maintenance Therapy']
    },
    {
      title: 'Oral Surgery',
      description: 'Advanced surgical procedures including extractions, wisdom tooth removal, and jaw surgery.',
      image: serviceOralSurgery,
      features: ['Tooth Extractions', 'Wisdom Tooth Removal', 'Jaw Surgery', 'Dental Implant Surgery']
    }
  ];

  const clinicImages = [
    {
      title: 'Clinic Entrance',
      description: 'Modern and welcoming entrance to our dental facility',
      image: clinicEntrance
    },
    {
      title: 'Reception Area',
      description: 'Professional front desk and comfortable waiting space',
      image: clinicReception
    },
    {
      title: 'Treatment Room',
      description: 'State-of-the-art dental equipment and comfortable patient care',
      image: clinicTreatmentRoom
    },
    {
      title: 'Consultation Office',
      description: 'Private consultation space for treatment discussions',
      image: clinicConsultationOffice
    },
    {
      title: 'Waiting Area',
      description: 'Comfortable seating area for patients and families',
      image: clinicWaitingArea
    }
  ];

  const testimonials = [
    {
      name: 'Fatima Khan',
      age: 45,
      image: patient1,
      profession: 'Teacher',
      rating: 5,
      text: 'Dr. Anurag and his team provided exceptional care during my root canal treatment. The entire process was pain-free and the staff made me feel comfortable throughout. Highly recommend!'
    },
    {
      name: 'Arjun Mehta',
      age: 32,
      image: patient2,
      profession: 'Software Engineer',
      rating: 5,
      text: 'The teeth whitening treatment exceeded my expectations! Dr. Kavya explained every step and the results were amazing. My confidence has improved significantly.'
    },
    {
      name: 'Ramesh Gupta',
      age: 68,
      image: patient3,
      profession: 'Retired Government Officer',
      rating: 5,
      text: 'After losing several teeth, I thought I\'d never smile confidently again. The dental implants Dr. Anurag provided have given me back my smile and ability to eat properly. Excellent work!'
    }
  ];

  const stats = [
    { icon: Award, value: '20+', label: 'Years of Experience' },
    { icon: Users, value: '10,000+', label: 'Patients Treated' },
    { icon: Heart, value: '100+', label: 'Dental Camps Conducted' },
    { icon: Star, value: '4.9/5', label: 'Patient Rating' }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextClinicImage = () => {
    setCurrentClinicImage((prev) => (prev + 1) % clinicImages.length);
  };

  const prevClinicImage = () => {
    setCurrentClinicImage((prev) => (prev - 1 + clinicImages.length) % clinicImages.length);
  };

  // Swipe handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextClinicImage();
    } else if (isRightSwipe) {
      prevClinicImage();
    }
  };

  
  // Doctor swipe handling functions
  const handleDoctorTouchStart = (e: React.TouchEvent) => {
    setDoctorTouchEnd(0); // Reset touchEnd
    setDoctorTouchStart(e.targetTouches[0].clientX);
  };

  const handleDoctorTouchMove = (e: React.TouchEvent) => {
    setDoctorTouchEnd(e.targetTouches[0].clientX);
  };

  const handleDoctorTouchEnd = () => {
    if (!doctorTouchStart || !doctorTouchEnd) return;
    
    const distance = doctorTouchStart - doctorTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextDoctor();
    } else if (isRightSwipe) {
      prevDoctor();
    }
  };

  const nextDoctor = () => {
    setCurrentDoctor((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctor((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Smile, <br />
                <span className="text-accent">Our Priority</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
                Established in 2003, Dr. Anurag's Dental Clinic has been serving the community with 
                exceptional dental care, combining traditional values with modern technology.
              </p>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative">
                <img 
                  src={drAnuragAggarwal} 
                  alt="Dr. Anurag Aggarwal - Chief Dentist"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-medical hover-lift"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operation Hours Bar */}
      <section className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Clinic Hours:</span>
            </div>
            <div className="text-sm md:text-base">
              <span className="font-medium">Monday - Saturday: 9:00 AM - 6:00 PM</span>
              <span className="ml-4 text-accent">Sunday: Closed</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Phone className="w-4 h-4" />
              <span>Emergency: +91-9876543210</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="appointment" className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Book Your Appointment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule your visit with our expert dentists. Choose your preferred doctor, date, and time.
            </p>
          </div>
          
          <div className="scroll-reveal">
            <AppointmentBooking />
          </div>
        </div>
      </section>

      {/* Your Dentist Section */}
      <section id="doctors" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Meet Your Dentists
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced team of dental professionals is committed to providing you with the highest quality care.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto scroll-reveal">
            <div 
              className="bg-gradient-to-br from-background to-muted rounded-3xl p-8 lg:p-12 shadow-medical touch-pan-y"
              onTouchStart={handleDoctorTouchStart}
              onTouchMove={handleDoctorTouchMove}
              onTouchEnd={handleDoctorTouchEnd}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                        {doctors[currentDoctor].name}
                      </h3>
                      <p className="text-lg text-accent mb-1">
                        {doctors[currentDoctor].specialization}
                      </p>
                      <p className="text-primary font-semibold">
                        {doctors[currentDoctor].experience}
                      </p>
                    </div>
                    
                    <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-6">
                      "{doctors[currentDoctor].quote}"
                    </blockquote>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {doctors[currentDoctor].description}
                    </p>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2 relative">
                  <img 
                    src={doctors[currentDoctor].image}
                    alt={doctors[currentDoctor].name}
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-soft hover-lift transition-all duration-500"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
              
              {/* Navigation Controls at Bottom */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <button 
                  onClick={prevDoctor}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center hover:scale-110"
                  aria-label="Previous doctor"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex space-x-2">
                  {doctors.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDoctor(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentDoctor === index ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextDoctor}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center hover:scale-110"
                  aria-label="Next doctor"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center scroll-reveal">
                <div className="flex items-center justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-accent" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Dental Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive dental care services designed to meet all your oral health needs.
            </p>
          </div>

          {/* Services Carousel */}
          <div className="relative">
            <div 
              id="services-scroll"
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-4" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[280px] md:w-[320px] snap-center"
                >
                  <Card className="hover-lift scroll-reveal shadow-soft h-full transition-transform duration-300 hover:scale-105">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Scroll Indicator with Navigation Arrows */}
            <div className="flex justify-center items-center mt-8 space-x-6">
              <button
                onClick={() => {
                  const container = document.getElementById('services-scroll');
                  if (container) {
                    container.scrollBy({ left: -150, behavior: 'smooth' });
                  }
                }}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>


              <button
                onClick={() => {
                  const container = document.getElementById('services-scroll');
                  if (container) {
                    container.scrollBy({ left: 150, behavior: 'smooth' });
                  }
                }}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clinic Section */}
      <section id="clinic" className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Clinic in Pics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take a virtual tour of our facility designed for your comfort and care.
            </p>
          </div>

          {/* Enhanced Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div 
              className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              
              {/* Main Image Display */}
              <div className="relative w-full h-full select-none">
                <img
                  src={clinicImages[currentClinicImage].image}
                  alt={clinicImages[currentClinicImage].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none"
                  loading="lazy"
                  draggable="false"
                />
              </div>

              {/* Preview Thumbnails */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {clinicImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-8 rounded border-2 cursor-pointer transition-all duration-300 ${
                      index === currentClinicImage 
                        ? 'border-white shadow-lg' 
                        : 'border-white/50 hover:border-white/80'
                    }`}
                    onClick={() => setCurrentClinicImage(index)}
                  >
                    <img
                      src={clinicImages[index].image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevClinicImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              >
                <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextClinicImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              >
                <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-center mt-6 space-x-1">
              {clinicImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentClinicImage
                      ? 'w-8 bg-primary'
                      : 'w-4 bg-primary/30 hover:bg-primary/50'
                  }`}
                  onClick={() => setCurrentClinicImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from our satisfied patients who have experienced our quality dental care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft hover-lift scroll-reveal">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic leading-relaxed mb-4">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-lg font-bold text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.profession}, {testimonial.age}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Clinic Info */}
            <div className="scroll-reveal">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DA</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Dr. Anurag's</h3>
                  <p className="text-sm text-muted-foreground">Dental Clinic</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Committed to providing exceptional dental care with compassion, expertise, and cutting-edge technology. 
                Your smile is our priority, and your comfort is our commitment.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="scroll-reveal">
              <h4 className="text-xl font-bold text-primary mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('home');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('appointment');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Book Appointment
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('doctors');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Doctors
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('services');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('clinic');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Clinic
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('testimonials');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="scroll-reveal">
              <h4 className="text-xl font-bold text-primary mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground text-sm">
                      123 Medical Complex, MG Road<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground text-sm">+91-9876543210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">info@dranuragsdentalclinic.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground text-sm">Mon-Sat: 9AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Dr. Anurag's Dental Clinic. All rights reserved. | 
              <span className="ml-2">Designed with care for your dental health.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;