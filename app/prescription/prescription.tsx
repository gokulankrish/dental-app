
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Plus, Trash2, Mail, CreditCard as Edit3, X, User, Calendar, Weight, Stethoscope, Pill, Clock, Hash, ChevronLeft } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import EmptyState from '@/components/common/EmptyState';

interface Prescription {
  id: string;
  patientName: string;
  patientAge: number;
  patientWeight: number;
  doctorName: string;
  drugName: string;
  dosage: string;
  frequency: string;
  createdDate: string;
  doctorId: string;
}

export default function PrescriptionsScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientName: 'John Smith',
      patientAge: 35,
      patientWeight: 75,
      doctorName: 'Dr. Sarah Wilson',
      drugName: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      createdDate: '2025-01-15',
      doctorId: 'doc1',
    },
    {
      id: '2',
      patientName: 'Emily Johnson',
      patientAge: 28,
      patientWeight: 62,
      doctorName: 'Dr. Michael Brown',
      drugName: 'Ibuprofen',
      dosage: '400mg',
      frequency: '2 times daily',
      createdDate: '2025-01-14',
      doctorId: 'doc2',
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientWeight: '',
    doctorName: '',
    drugName: '',
    dosage: '',
    frequency: '',
  });

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.drugName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      patientName: '',
      patientAge: '',
      patientWeight: '',
      doctorName: '',
      drugName: '',
      dosage: '',
      frequency: '',
    });
    setEditingPrescription(null);
  };

  const handleCreatePrescription = () => {
    if (!formData.patientName || !formData.patientAge || !formData.patientWeight || 
        !formData.doctorName || !formData.drugName || !formData.dosage || !formData.frequency) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newPrescription: Prescription = {
      id: editingPrescription ? editingPrescription.id : Date.now().toString(),
      patientName: formData.patientName,
      patientAge: parseInt(formData.patientAge),
      patientWeight: parseFloat(formData.patientWeight),
      doctorName: formData.doctorName,
      drugName: formData.drugName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      createdDate: editingPrescription ? editingPrescription.createdDate : new Date().toISOString().split('T')[0],
      doctorId: editingPrescription ? editingPrescription.doctorId : `doc${Date.now()}`,
    };

    if (editingPrescription) {
      setPrescriptions(prev => prev.map(p => p.id === editingPrescription.id ? newPrescription : p));
      Alert.alert('Success', 'Prescription updated successfully');
    } else {
      setPrescriptions(prev => [...prev, newPrescription]);
      Alert.alert('Success', 'Prescription created successfully');
    }

    setShowCreateModal(false);
    resetForm();
  };

  const handleEditPrescription = (prescription: Prescription) => {
    setEditingPrescription(prescription);
    setFormData({
      patientName: prescription.patientName,
      patientAge: prescription.patientAge.toString(),
      patientWeight: prescription.patientWeight.toString(),
      doctorName: prescription.doctorName,
      drugName: prescription.drugName,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
    });
    setShowCreateModal(true);
  };

  const handleDeletePrescription = (id: string) => {
    Alert.alert(
      'Delete Prescription',
      'Are you sure you want to delete this prescription?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPrescriptions(prev => prev.filter(p => p.id !== id));
            Alert.alert('Success', 'Prescription deleted successfully');
          },
        },
      ]
    );
  };

  const handleEmailPrescription = (prescription: Prescription) => {
    Alert.alert(
      'Email Prescription',
      `Send prescription for ${prescription.patientName} to their email?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            // In a real app, this would integrate with an email service
            Alert.alert('Success', 'Prescription sent via email successfully');
          },
        },
      ]
    );
  };

  const renderPrescriptionCard = ({ item }: { item: Prescription }) => (
    <View style={styles.prescriptionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.patientDetails}>Age: {item.patientAge} • Weight: {item.patientWeight}kg</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditPrescription(item)}
          >
            <Edit3 size={16} color="#0077B6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEmailPrescription(item)}
          >
            <Mail size={16} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeletePrescription(item.id)}
          >
            <Trash2 size={16} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.doctorSection}>
        <Stethoscope size={16} color="#666" />
        <Text style={styles.doctorName}>{item.doctorName}</Text>
      </View>

      <View style={styles.prescriptionDetails}>
        <View style={styles.detailRow}>
          <Pill size={16} color="#666" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Drug Name</Text>
            <Text style={styles.detailValue}>{item.drugName}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Hash size={16} color="#666" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Dosage</Text>
            <Text style={styles.detailValue}>{item.dosage}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Clock size={16} color="#666" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Frequency</Text>
            <Text style={styles.detailValue}>{item.frequency}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.createdDate}>Created: {new Date(item.createdDate).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prescriptions</Text>
        {userData?.role === 'doctor' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {filteredPrescriptions.length > 0 ? (
        <FlatList
          data={filteredPrescriptions}
          renderItem={renderPrescriptionCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.prescriptionsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          icon={<Pill size={60} color="#ccc" />}
          title="No prescriptions found"
          description={searchQuery ? "No prescriptions match your search" : "No prescriptions available"}
          buttonText={userData?.role === 'doctor' ? "Create Prescription" : "Browse Doctors"}
          onPress={() => {
            if (userData?.role === 'doctor') {
              setShowCreateModal(true);
            } else {
              router.push('/');
            }
          }}
        />
      )}

      {/* Create/Edit Prescription Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingPrescription ? 'Edit Prescription' : 'Create Prescription'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowCreateModal(false);
                resetForm();
              }}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Patient Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Patient Name</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, patientName: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Age</Text>
                  <View style={styles.inputContainer}>
                    <Calendar size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Age"
                      value={formData.patientAge}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, patientAge: text }))}
                      keyboardType="numeric"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <View style={styles.inputContainer}>
                    <Weight size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      value={formData.patientWeight}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, patientWeight: text }))}
                      keyboardType="numeric"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Doctor Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Doctor Name</Text>
                <View style={styles.inputContainer}>
                  <Stethoscope size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter doctor name"
                    value={formData.doctorName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, doctorName: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Prescription Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Drug Name</Text>
                <View style={styles.inputContainer}>
                  <Pill size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter drug name"
                    value={formData.drugName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, drugName: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dosage</Text>
                <View style={styles.inputContainer}>
                  <Hash size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 500mg, 2 tablets"
                    value={formData.dosage}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, dosage: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Frequency</Text>
                <View style={styles.inputContainer}>
                  <Clock size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 3 times daily, twice a day"
                    value={formData.frequency}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, frequency: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowCreateModal(false);
                resetForm();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreatePrescription}
            >
              <Text style={styles.createButtonText}>
                {editingPrescription ? 'Update' : 'Create'} Prescription
              </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0077B6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333',
  },
  prescriptionsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  prescriptionCard: {
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
  patientDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  doctorName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#0077B6',
    marginLeft: 8,
  },
  prescriptionDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#333',
  },
  cardFooter: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  createdDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
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
  formSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
  },
  createButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});