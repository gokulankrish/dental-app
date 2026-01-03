import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '@/contexts/AppointmentContext';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  availableSlots: string[];
}

interface AppointmentData {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
}

export default function NewAppointmentScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  const { addAppointment } = useAppointments();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    patientName: userData?.name || '',
    patientPhone: '',
    patientEmail: userData?.email || '',
    reason: '',
  });

  const doctors: Doctor[] = [
    {
      id: 'doctor_001', // Match the doctor ID from demo accounts
      name: 'Dr. Aafirin',
      specialty: 'Orthodontist',
      image: 'https://images.pexels.com/photos/5214947/pexels-photo-5214947.jpeg',
      rating: 4.8,
      experience: '8 years',
      availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    },
    // {
    //   id: 'doctor_002', // Match the doctor ID from demo accounts
    //   name: 'Dr. Michael Brown',
    //   specialty: 'Dental Surgeon',
    //   image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    //   rating: 4.9,
    //   experience: '12 years',
    //   availableSlots: ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    // },
    // {
    //   id: 'doctor_003',
    //   name: 'Dr. Emily Johnson',
    //   specialty: 'Periodontist',
    //   image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    //   rating: 4.7,
    //   experience: '6 years',
    //   availableSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:00 PM'],
    // },
  ];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentData(prev => ({
      ...prev,
      doctorId: doctor.id,
      doctorName: doctor.name,
    }));
    setSelectedTime(''); // Reset time when doctor changes
  };

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setAppointmentData(prev => ({
      ...prev,
      date: day.dateString,
    }));
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setAppointmentData(prev => ({
      ...prev,
      time: time,
    }));
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || 
        !appointmentData.patientName || !appointmentData.patientPhone || 
        !appointmentData.patientEmail || !appointmentData.reason) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Add appointment request to context - will appear in doctor dashboard
    addAppointment({
      patientName: appointmentData.patientName,
      patientPhone: appointmentData.patientPhone,
      patientEmail: appointmentData.patientEmail,
      doctorId: selectedDoctor.id, // This ensures it goes to the correct doctor
      doctorName: selectedDoctor.name,
      doctorImage: selectedDoctor.image,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      reason: appointmentData.reason,
      status: 'pending', // Pending status ensures it appears in doctor's pending requests
    });

    Alert.alert(
      'Appointment Request Sent!',
      `Your appointment request has been sent to ${selectedDoctor.name} for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}. The doctor will review and confirm your appointment. You will be notified once the doctor responds.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#0077B6',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
 
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step 1: Select Doctor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select Doctor</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorsContainer}>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={[
                  styles.doctorCard,
                  selectedDoctor?.id === doctor.id && styles.selectedDoctorCard
                ]}
                onPress={() => handleDoctorSelect(doctor)}
              >
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorRating}>⭐ {doctor.rating} {doctor.experience}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Step 2: Select Date */}
        {selectedDoctor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Select Date</Text>
            <View style={styles.calendarContainer}>
              <RNCalendar
                onDayPress={handleDateSelect}
                markedDates={markedDates}
                minDate={new Date().toISOString().split('T')[0]}
                theme={{
                  todayTextColor: '#0077B6',
                  selectedDayBackgroundColor: '#0077B6',
                  selectedDayTextColor: '#FFFFFF',
                  arrowColor: '#0077B6',
                }}
              />
            </View>
          </View>
        )}

        {/* Step 3: Select Time */}
        {selectedDoctor && selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Select Time</Text>
            <View style={styles.timeSlotsContainer}>
              {selectedDoctor.availableSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Clock size={16} color={selectedTime === time ? '#fff' : '#666'} />
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 4: Patient Details */}
        {selectedTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Patient Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={appointmentData.patientName}
                  onChangeText={(text) => setAppointmentData(prev => ({ ...prev, patientName: text }))}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Phone size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  value={appointmentData.patientPhone}
                  onChangeText={(text) => setAppointmentData(prev => ({ ...prev, patientPhone: text }))}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={appointmentData.patientEmail}
                  onChangeText={(text) => setAppointmentData(prev => ({ ...prev, patientEmail: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason for Visit</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <MessageSquare size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your dental concern or reason for visit"
                  value={appointmentData.reason}
                  onChangeText={(text) => setAppointmentData(prev => ({ ...prev, reason: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>
        )}

        {/* Appointment Summary */}
        {selectedDoctor && selectedDate && selectedTime && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Appointment Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Doctor:</Text>
                <Text style={styles.summaryValue}>{selectedDoctor.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Specialty:</Text>
                <Text style={styles.summaryValue}>{selectedDoctor.specialty}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Book Button */}
        {selectedDoctor && selectedDate && selectedTime && (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookAppointment}
          >
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  doctorsContainer: {
    paddingVertical: 8,
  },
  doctorCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDoctorCard: {
    borderColor: '#0077B6',
    backgroundColor: 'rgba(0, 119, 182, 0.05)',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  doctorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  doctorRating: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#0077B6',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    minWidth: 120,
  },
  selectedTimeSlot: {
    backgroundColor: '#0077B6',
    borderColor: '#0077B6',
  },
  timeSlotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#FAFAFA',
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    height: 76,
    textAlignVertical: 'top',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  summaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0077B6',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  bookButton: {
    marginHorizontal: 20,
    backgroundColor: '#0077B6',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  bottomSpacing: {
    height: 40,
  },
});