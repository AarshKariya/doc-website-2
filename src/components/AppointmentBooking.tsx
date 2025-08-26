import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('+91 ');
  const [patientEmail, setPatientEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const doctors = [
    { id: 'anish', name: 'Dr. Anish Kumar' },
    { id: 'priya', name: 'Dr. Priya Sharma' },
    { id: 'rajesh', name: 'Dr. Rajesh Patel' }
  ];

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM']
  };

  // Mock unavailable slots - in a real app, this would come from API
  const unavailableSlots = ['10:30 AM', '11:30 AM', '3:00 PM', '4:30 PM'];

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-IN', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
          })
        });
      }
    }
    return dates;
  };

  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.style.position = 'absolute';
      confettiPiece.style.width = '10px';
      confettiPiece.style.height = '10px';
      confettiPiece.style.backgroundColor = ['#0ea5e9', '#3b82f6', '#1d4ed8', '#1e40af'][i % 4];
      confettiPiece.style.left = Math.random() * 100 + '%';
      confettiPiece.style.animation = `confetti-fall ${Math.random() * 2 + 3}s linear forwards`;
      confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoctor && selectedDate && selectedTime && patientName && patientPhone) {
      setIsSubmitted(true);
      setShowConfetti(true);
      createConfetti();
      
      // Scroll to show the confirmation message with some delay to ensure DOM updates
      setTimeout(() => {
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
          appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      // Reset form after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setShowConfetti(false);
        setSelectedDoctor('');
        setSelectedDate('');
        setSelectedTime('');
        setPatientName('');
        setPatientPhone('+91 ');
        setPatientEmail('');
      }, 8000);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto shadow-medical animate-zoom-in">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-medical-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-4">Appointment Confirmed!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you, {patientName}! Your appointment request has been submitted.
          </p>
          <div className="bg-accent p-4 rounded-lg mb-4">
            <p className="text-sm text-accent-foreground">
              <strong>Doctor:</strong> {doctors.find(d => d.id === selectedDoctor)?.name}<br />
              <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}<br />
              <strong>Time:</strong> {selectedTime}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive a call back or message within the next 12-24 hours for appointment confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-medical">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Book Your Appointment</CardTitle>
        <p className="text-muted-foreground">Schedule your visit with our expert dentists</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Select Doctor
            </Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your preferred doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Select Date
            </Label>
            <Select value={selectedDate} onValueChange={setSelectedDate} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose appointment date" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {generateDateOptions().map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Select Time
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Morning</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.morning.map((time) => {
                    const isUnavailable = unavailableSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => !isUnavailable && setSelectedTime(time)}
                        disabled={isUnavailable}
                        className={`text-xs ${
                          isUnavailable 
                            ? 'bg-muted/50 text-muted-foreground line-through cursor-not-allowed hover:bg-muted/50' 
                            : ''
                        }`}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Afternoon</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.afternoon.map((time) => {
                    const isUnavailable = unavailableSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => !isUnavailable && setSelectedTime(time)}
                        disabled={isUnavailable}
                        className={`text-xs ${
                          isUnavailable 
                            ? 'bg-muted/50 text-muted-foreground line-through cursor-not-allowed hover:bg-muted/50' 
                            : ''
                        }`}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Full Name</Label>
              <Input
                id="patientName"
                type="text"
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientPhone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </Label>
              <Input
                id="patientPhone"
                type="tel"
                placeholder="+91 9876543210"
                value={patientPhone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.startsWith('+91 ')) {
                    setPatientPhone('+91 ' + value.replace(/^\+91\s*/, ''));
                  } else {
                    setPatientPhone(value);
                  }
                }}
                required
              />
            </div>
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="patientEmail" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address (Optional)
            </Label>
            <Input
              id="patientEmail"
              type="email"
              placeholder="your.email@example.com"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-lg py-6"
            disabled={!selectedDoctor || !selectedDate || !selectedTime || !patientName || !patientPhone}
          >
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;