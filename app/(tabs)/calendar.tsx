// import { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   ScrollView
// } from 'react-native';
// import { Colors } from '../../constants/Colors';
// import { Ionicons } from '@expo/vector-icons';

// interface Appointment {
//   id: string;
//   title: string;
//   doctor: string;
//   date: string;
//   time: string;
//   duration: string;
//   status: 'confirmed' | 'pending' | 'cancelled';
//   type: 'checkup' | 'consultation' | 'followup';
// }

// export default function CalendarScreen() {
//   const [selectedDate, setSelectedDate] = useState('Today');
//   const [appointments, setAppointments] = useState<Appointment[]>([
//     { id: '1', title: 'Annual Checkup', doctor: 'Dr. Sarah Johnson', date: 'Today', time: '10:30 AM', duration: '30 mins', status: 'confirmed', type: 'checkup' },
//     { id: '2', title: 'Cardiology Consultation', doctor: 'Dr. Michael Chen', date: 'Tomorrow', time: '2:00 PM', duration: '45 mins', status: 'confirmed', type: 'consultation' },
//     { id: '3', title: 'Follow-up Visit', doctor: 'Dr. Robert Kim', date: 'Dec 28', time: '11:15 AM', duration: '20 mins', status: 'pending', type: 'followup' },
//     { id: '4', title: 'Dental Cleaning', doctor: 'Dr. Emma Wilson', date: 'Jan 5', time: '9:00 AM', duration: '1 hour', status: 'confirmed', type: 'checkup' },
//   ]);

//   const dates = ['Today', 'Tomorrow', 'Dec 28', 'Dec 29', 'Jan 5', 'Jan 10'];

//   const getStatusColor = (status: Appointment['status']) => {
//     switch (status) {
//       case 'confirmed': return Colors.success;
//       case 'pending': return Colors.warning;
//       case 'cancelled': return Colors.error;
//       default: return Colors.textLight;
//     }
//   };

//   const getTypeIcon = (type: Appointment['type']) => {
//     switch (type) {
//       case 'checkup': return 'medical';
//       case 'consultation': return 'chatbubbles';
//       case 'followup': return 'repeat';
//       default: return 'calendar';
//     }
//   };

//   const renderAppointment = ({ item }: { item: Appointment }) => (
//     <TouchableOpacity style={styles.appointmentCard}>
//       <View style={styles.appointmentHeader}>
//         <View style={styles.typeIcon}>
//           <Ionicons name={getTypeIcon(item.type)} size={20} color={Colors.primary} />
//         </View>
//         <View style={styles.appointmentInfo}>
//           <Text style={styles.appointmentTitle}>{item.title}</Text>
//           <View style={styles.doctorInfo}>
//             <Ionicons name="person" size={14} color={Colors.textLight} />
//             <Text style={styles.doctorName}> {item.doctor}</Text>
//           </View>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
//           <Text style={styles.statusText}>
//             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.appointmentDetails}>
//         <View style={styles.detailItem}>
//           <Ionicons name="time" size={16} color={Colors.textLight} />
//           <Text style={styles.detailText}> {item.time}</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Ionicons name="timer" size={16} color={Colors.textLight} />
//           <Text style={styles.detailText}> {item.duration}</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Ionicons name="location" size={16} color={Colors.textLight} />
//           <Text style={styles.detailText}> Clinic #4</Text>
//         </View>
//       </View>

//       <View style={styles.appointmentActions}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="videocam" size={18} color={Colors.primary} />
//           <Text style={styles.actionText}>Join Video</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
//           <Ionicons name="time" size={18} color={Colors.warning} />
//           <Text style={[styles.actionText, { color: Colors.warning }]}>Reschedule</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
//           <Ionicons name="close-circle" size={18} color={Colors.error} />
//           <Text style={[styles.actionText, { color: Colors.error }]}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Calendar Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Appointments</Text>
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add" size={24} color={Colors.white} />
//         </TouchableOpacity>
//       </View>

//       {/* Date Selector */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.dateSelector}
//       >
//         {dates.map((date) => (
//           <TouchableOpacity
//             key={date}
//             style={[
//               styles.dateButton,
//               selectedDate === date && styles.dateButtonActive
//             ]}
//             onPress={() => setSelectedDate(date)}
//           >
//             <Text style={[
//               styles.dateText,
//               selectedDate === date && styles.dateTextActive
//             ]}>
//               {date}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Appointments List */}
//       <FlatList
//         data={appointments.filter(app => app.date === selectedDate)}
//         renderItem={renderAppointment}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.appointmentsList}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Empty State */}
//       {appointments.filter(app => app.date === selectedDate).length === 0 && (
//         <View style={styles.emptyContainer}>
//           <Ionicons name="calendar-outline" size={80} color={Colors.textLight} />
//           <Text style={styles.emptyText}>No appointments for {selectedDate}</Text>
//           <Text style={styles.emptySubtext}>Schedule an appointment to get started</Text>
//           <TouchableOpacity style={styles.scheduleButton}>
//             <Text style={styles.scheduleButtonText}>Schedule Now</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Upcoming Appointments */}
//       <View style={styles.upcomingSection}>
//         <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
//         <FlatList
//           data={appointments.filter(app => app.date !== selectedDate)}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.upcomingCard}>
//               <Text style={styles.upcomingDate}>{item.date}</Text>
//               <Text style={styles.upcomingTitle}>{item.title}</Text>
//               <Text style={styles.upcomingDoctor}>{item.doctor}</Text>
//               <Text style={styles.upcomingTime}>{item.time}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.upcomingList}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: Colors.white,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: Colors.text,
//   },
//   addButton: {
//     backgroundColor: Colors.primary,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dateSelector: {
//     backgroundColor: Colors.white,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border,
//   },
//   dateButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: Colors.lightGray,
//   },
//   dateButtonActive: {
//     backgroundColor: Colors.primary,
//   },
//   dateText: {
//     fontSize: 14,
//     color: Colors.text,
//   },
//   dateTextActive: {
//     color: Colors.white,
//     fontWeight: '600',
//   },
//   appointmentsList: {
//     padding: 15,
//     paddingBottom: 200,
//   },
//   appointmentCard: {
//     backgroundColor: Colors.white,
//     marginBottom: 15,
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
//   appointmentHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   typeIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.lightGray,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   appointmentInfo: {
//     flex: 1,
//   },
//   appointmentTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: 5,
//   },
//   doctorInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   doctorName: {
//     fontSize: 14,
//     color: Colors.textLight,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//   },
//   statusText: {
//     color: Colors.white,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   appointmentDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border,
//   },
//   detailItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   detailText: {
//     fontSize: 14,
//     color: Colors.text,
//     marginLeft: 5,
//   },
//   appointmentActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: Colors.lightGray,
//   },
//   actionText: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: Colors.primary,
//     fontWeight: '500',
//   },
//   rescheduleButton: {
//     backgroundColor: Colors.lightGray,
//   },
//   cancelButton: {
//     backgroundColor: Colors.lightGray,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 100,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.text,
//     marginTop: 20,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: Colors.textLight,
//     marginTop: 5,
//     marginBottom: 20,
//   },
//   scheduleButton: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 25,
//   },
//   scheduleButtonText: {
//     color: Colors.white,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   upcomingSection: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: Colors.white,
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: Colors.border,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: 10,
//   },
//   upcomingList: {
//     paddingBottom: 10,
//   },
//   upcomingCard: {
//     width: 150,
//     backgroundColor: Colors.lightGray,
//     marginRight: 10,
//     padding: 15,
//     borderRadius: 10,
//   },
//   upcomingDate: {
//     fontSize: 12,
//     color: Colors.primary,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   upcomingTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: 5,
//   },
//   upcomingDoctor: {
//     fontSize: 12,
//     color: Colors.textLight,
//     marginBottom: 5,
//   },
//   upcomingTime: {
//     fontSize: 12,
//     color: Colors.text,
//     fontWeight: '500',
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Plus, Clock, Calendar as CalendarIcon, Settings, X } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '@/contexts/AppointmentContext';
import EmptyState from '@/components/common/EmptyState';

// Define types for marked dates
type MarkedDatesType = {
  [key: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};

export default function AppointmentScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  const { appointments, getPatientAppointments, getDoctorAppointments, cancelAppointmentByPatient } = useAppointments();
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});

  // Get appointments based on user role
  const userAppointments = React.useMemo(() => {
    return userData?.role === 'patient' 
      ? getPatientAppointments(userData.email)
      : userData?.role === 'doctor' 
      ? getDoctorAppointments(userData.uid)
      : [];
  }, [userData, getPatientAppointments, getDoctorAppointments]);

  React.useEffect(() => {
    // Mark dates with appointments
    const dates: MarkedDatesType = {};
    userAppointments.forEach(appointment => {
      dates[appointment.date] = { 
        marked: true, 
        dotColor: appointment.status === 'pending' || appointment.status === 'confirmed' ? '#0077B6' : 
                 appointment.status === 'completed' ? '#4CAF50' : '#FF5252',
      };
    });
    setMarkedDates(dates);
  }, [userAppointments]);

  const handleCancelAppointment = (appointmentId: string, appointmentData: any) => {
    Alert.alert(
      'Cancel Appointment Request',
      `Are you sure you want to cancel your appointment request with ${appointmentData.doctorName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            await cancelAppointmentByPatient(appointmentId);
            Alert.alert('Success', 'Your appointment request has been cancelled.');
          },
        },
      ]
    );
  };

  const filteredAppointments = selectedDate 
    ? userAppointments.filter(appointment => appointment.date === selectedDate)
    : userAppointments.filter(appointment => appointment.status === 'pending' || appointment.status === 'confirmed');

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() =>
        router.push({
          pathname: "/appointment/[id]",
          params: { id: item.id.toString() }, // 👈 must be string
        })
      }
    >
      <View style={styles.appointmentHeader}>
        <Image source={{ uri: item.doctorImage }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          item.status === 'pending' ? styles.pendingBadge :
          item.status === 'confirmed' ? styles.upcomingBadge : 
          item.status === 'completed' ? styles.completedBadge : styles.cancelledBadge
        ]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <View style={styles.appointmentDetail}>
          <CalendarIcon size={16} color="#666" />
          <Text style={styles.appointmentDetailText}>
            {new Date(item.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Clock size={16} color="#666" />
          <Text style={styles.appointmentDetailText}>{item.time}</Text>
        </View>
      </View>

      {/* Patient Cancel Button for Pending Appointments */}
      {userData?.role === 'patient' && item.status === 'pending' && (
        <View style={styles.patientActions}>
          <TouchableOpacity
            style={styles.cancelRequestButton}
            onPress={() => handleCancelAppointment(item.id, item)}
          >
            <X size={16} color="#FF5252" />
            <Text style={styles.cancelRequestButtonText}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Update Notifications */}

      {item.updatedAt && item.updatedBy === 'patient' && item.status === 'cancelled' && (
        <View style={styles.patientCancelNotification}>
          <Text style={styles.patientCancelNotificationText}>
            ❌ You cancelled this appointment request
          </Text>
          <Text style={styles.patientCancelNotificationSubtext}>
            Cancelled on {new Date(item.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerButtons}>
          {userData?.role === 'doctor' && (
            <TouchableOpacity 
              style={styles.dashboardButton}
              onPress={() => router.push(`/appoinments/doctordashboard`)}
            >
              <Settings size={20} color="#0077B6" />
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.newAppointmentButton}
            onPress={() => router.push('/appoinments/newappointment')}
          >
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            ...markedDates,
            [selectedDate]: { 
              ...(markedDates[selectedDate] || {}),
              selected: true, 
              selectedColor: '#0077B6' 
            },
          }}
          theme={{
            todayTextColor: '#0077B6',
            arrowColor: '#0077B6',
            dotColor: '#0077B6',
            selectedDayBackgroundColor: '#0077B6',
          }}
        />
      </View>

      <View style={styles.appointmentsContainer}>
        <View style={styles.appointmentsHeader}>
          <Text style={styles.appointmentsTitle}>
            {selectedDate ? 'Appointments on Selected Date' : 'Upcoming Appointments'}
          </Text>
          {selectedDate && (
            <TouchableOpacity onPress={() => setSelectedDate('')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredAppointments.length > 0 ? (
          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.appointmentsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState 
            icon={<CalendarIcon size={60} color="#ccc" />}
            title="No appointments found"
            description={selectedDate ? "You don't have any appointments on this date" : "You don't have any upcoming appointments"}
            buttonText="Schedule Appointment"
            onPress={() => router.push('/appoinments/newappointment')}
          />
        )}
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dashboardButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0077B6',
  },
  newAppointmentButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0077B6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  appointmentsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  appointmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0077B6',
  },
  appointmentsList: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingBadge: {
    backgroundColor: 'rgba(0, 119, 182, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  cancelledBadge: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#333',
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 12,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDetailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  updateNotification: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  updateNotificationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#2E7D32',
    marginBottom: 4,
  },
  updateNotificationSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#2E7D32',
  },
  patientActions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  cancelRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF5252',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelRequestButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FF5252',
    marginLeft: 6,
  },
  patientCancelNotification: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF5252',
  },
  patientCancelNotificationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#C62828',
    marginBottom: 4,
  },
  patientCancelNotificationSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#C62828',
  },
});