import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, Image, Alert, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, User, Phone, CheckCircle, XCircle, RotateCcw, Filter, X, Trash2 } from 'lucide-react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '@/contexts/AppointmentContext';

type ViewMode = 'today' | 'weekly' | 'monthly';

export default function DoctorDashboardScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  const { getDoctorAppointments, updateAppointmentStatus, rescheduleAppointment, getPendingAppointments, deleteAppointment } = useAppointments();
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleAppointmentData, setRescheduleAppointmentData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Get doctor's appointments
  const appointments = userData ? getDoctorAppointments(userData.uid) : [];
  const pendingAppointments = userData ? getPendingAppointments(userData?.uid) : [];

  // Debug log to ensure appointments are being received
  React.useEffect(() => {
    console.log('Doctor appointments:', appointments.length);
    console.log('Pending appointments:', pendingAppointments.length);
    console.log('Doctor ID:', userData?.uid);
  }, [appointments, pendingAppointments, userData]);

  const getFilteredAppointments = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (viewMode) {
      case 'today':
        return appointments.filter(apt => apt.date === todayStr);
      
      case 'weekly':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= weekStart && aptDate <= weekEnd;
        });
      
      case 'monthly':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= monthStart && aptDate <= monthEnd;
        });
      
      default:
        return appointments;
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    const actionText = newStatus === 'confirmed' ? 'confirm' : 'cancel';
    
    Alert.alert(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Appointment`,
      `Are you sure you want to ${actionText} the appointment with ${appointment.patientName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            updateAppointmentStatus(appointmentId, newStatus);
            Alert.alert('Success', `Appointment ${newStatus} successfully. Patient has been notified.`);
          },
        },
      ]
    );
  };

  const handleReschedule = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setRescheduleAppointmentData(appointment);
      setSelectedDate(appointment.date);
      setSelectedTime(appointment.time);
      setShowRescheduleModal(true);
    }
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleAppointmentData || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select both date and time');
      return;
    }

    Alert.alert(
      'Confirm Reschedule',
      `Reschedule appointment with ${rescheduleAppointmentData.patientName} to ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reschedule',
          onPress: async () => {
            await rescheduleAppointment(rescheduleAppointmentData.id, selectedDate, selectedTime);
            setShowRescheduleModal(false);
            setRescheduleAppointmentData(null);
            setSelectedDate('');
            setSelectedTime('');
            Alert.alert('Success', 'Appointment rescheduled successfully. Patient has been notified.');
          },
        },
      ]
    );
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    Alert.alert(
      'Delete Appointment',
      `Are you sure you want to delete the appointment with ${appointment.patientName}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAppointment(appointmentId);
            Alert.alert('Success', 'Appointment deleted successfully. Patient has been notified.');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#FF5252';
      case 'completed': return '#2196F3';
      default: return '#999';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} color="#FF9800" />;
      case 'confirmed': return <CheckCircle size={16} color="#4CAF50" />;
      case 'cancelled': return <XCircle size={16} color="#FF5252" />;
      case 'completed': return <CheckCircle size={16} color="#2196F3" />;
      default: return <Clock size={16} color="#999" />;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const renderAppointmentCard = ({ item }: { item: any }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <View style={styles.contactInfo}>
            <Phone size={14} color="#666" />
            <Text style={styles.contactText}>{item.patientPhone}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#666" />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>

      <View style={styles.reasonContainer}>
        <Text style={styles.reasonLabel}>Reason:</Text>
        <Text style={styles.reasonText}>{item.reason}</Text>
      </View>

      {item.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleStatusChange(item.id, 'confirmed')}
          >
            <CheckCircle size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Confirm</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => handleReschedule(item.id)}
          >
            <RotateCcw size={16} color="#0077B6" />
            <Text style={[styles.actionButtonText, { color: '#0077B6' }]}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleDeleteAppointment(item.id)}
          >
            <Trash2 size={16} color="#FF5252" />
            <Text style={[styles.actionButtonText, { color: '#FF5252' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'confirmed' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => handleReschedule(item.id)}
          >
            <RotateCcw size={16} color="#0077B6" />
            <Text style={[styles.actionButtonText, { color: '#0077B6' }]}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleDeleteAppointment(item.id)}
          >
            <Trash2 size={16} color="#FF5252" />
            <Text style={[styles.actionButtonText, { color: '#FF5252' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.updatedAt && item.updatedBy === 'doctor' && (
        <View style={styles.updateInfo}>
          <Text style={styles.updateText}>
            Updated by doctor on {new Date(item.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Doctor Dashboard</Text>
      </View>

      {/* View Mode Selector */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'today' && styles.activeViewMode]}
          onPress={() => setViewMode('today')}
        >
          <Text style={[styles.viewModeText, viewMode === 'today' && styles.activeViewModeText]}>
            Today
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'weekly' && styles.activeViewMode]}
          onPress={() => setViewMode('weekly')}
        >
          <Text style={[styles.viewModeText, viewMode === 'weekly' && styles.activeViewModeText]}>
            This Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'monthly' && styles.activeViewMode]}
          onPress={() => setViewMode('monthly')}
        >
          <Text style={[styles.viewModeText, viewMode === 'monthly' && styles.activeViewModeText]}>
            This Month
          </Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{filteredAppointments.filter(apt => apt.status === 'pending').length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{filteredAppointments.filter(apt => apt.status === 'confirmed').length}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{filteredAppointments.filter(apt => apt.status === 'completed').length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{filteredAppointments.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Appointments List */}
      <View style={styles.appointmentsContainer}>
        {/* Pending Requests Section */}
        {pendingAppointments.length > 0 && (
          <View style={styles.pendingSection}>
            <Text style={styles.pendingSectionTitle}>
              🔔 New Patient Appointment Requests ({pendingAppointments.length})
            </Text>
            <Text style={styles.pendingSectionSubtitle}>
              Review and approve patient appointment requests below
            </Text>
            <FlatList
              data={pendingAppointments}
              renderItem={renderAppointmentCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        <Text style={styles.appointmentsTitle}>
          {viewMode === 'today' ? "Today's Appointments" :
           viewMode === 'weekly' ? "This Week's Appointments" :
           "This Month's Appointments"}
        </Text>

        {filteredAppointments.length > 0 ? (
          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointmentCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.appointmentsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Calendar size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>No appointments found</Text>
            <Text style={styles.emptyDescription}>
              No appointments scheduled for the selected time period
            </Text>
          </View>
        )}
      </View>
      {/* Reschedule Modal */}
      <Modal
        visible={showRescheduleModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowRescheduleModal(false);
          setRescheduleAppointmentData(null);
          setSelectedDate('');
          setSelectedTime('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reschedule Appointment</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowRescheduleModal(false);
                setRescheduleAppointmentData(null);
                setSelectedDate('');
                setSelectedTime('');
              }}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {rescheduleAppointmentData && (
              <View style={styles.patientInfoCard}>
                <Text style={styles.patientInfoTitle}>Patient Information</Text>
                <Text style={styles.patientInfoText}>
                  <Text style={styles.patientInfoLabel}>Name:</Text> {rescheduleAppointmentData.patientName}
                </Text>
                <Text style={styles.patientInfoText}>
                  <Text style={styles.patientInfoLabel}>Phone:</Text> {rescheduleAppointmentData.patientPhone}
                </Text>
                <Text style={styles.patientInfoText}>
                  <Text style={styles.patientInfoLabel}>Current Date:</Text> {new Date(rescheduleAppointmentData.date).toLocaleDateString()}
                </Text>
                <Text style={styles.patientInfoText}>
                  <Text style={styles.patientInfoLabel}>Current Time:</Text> {rescheduleAppointmentData.time}
                </Text>
              </View>
            )}

            <View style={styles.rescheduleSection}>
              <Text style={styles.rescheduleSectionTitle}>Select New Date</Text>
              <RNCalendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: '#0077B6',
                  },
                }}
                minDate={new Date().toISOString().split('T')[0]}
                theme={{
                  todayTextColor: '#0077B6',
                  selectedDayBackgroundColor: '#0077B6',
                  selectedDayTextColor: '#FFFFFF',
                  arrowColor: '#0077B6',
                }}
              />
            </View>

            {selectedDate && (
              <View style={styles.rescheduleSection}>
                <Text style={styles.rescheduleSectionTitle}>Select New Time</Text>
                <View style={styles.timeSlotsContainer}>
                  {availableTimeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        selectedTime === time && styles.selectedTimeSlot
                      ]}
                      onPress={() => setSelectedTime(time)}
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
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={() => {
                setShowRescheduleModal(false);
                setRescheduleAppointmentData(null);
                setSelectedDate('');
                setSelectedTime('');
              }}
            >
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmRescheduleButton,
                (!selectedDate || !selectedTime) && styles.disabledButton
              ]}
              onPress={handleConfirmReschedule}
              disabled={!selectedDate || !selectedTime}
            >
              <Text style={styles.confirmRescheduleButtonText}>Confirm Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  viewModeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeViewMode: {
    backgroundColor: '#0077B6',
    borderColor: '#0077B6',
  },
  viewModeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeViewModeText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0077B6',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#666',
  },
  appointmentsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  appointmentsList: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  reasonContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  reasonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  reasonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  rescheduleButton: {
    backgroundColor: '#fff',
    borderColor: '#0077B6',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderColor: '#FF5252',
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  pendingSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  pendingSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 12,
  },
  pendingSectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  updateInfo: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
  },
  updateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#1976D2',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  patientInfoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  patientInfoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  patientInfoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  patientInfoLabel: {
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  rescheduleSection: {
    marginBottom: 24,
  },
  rescheduleSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
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
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  cancelModalButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
  },
  confirmRescheduleButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmRescheduleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  
});