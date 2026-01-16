// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   Alert,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import {
//   Search,
//   Plus,
//   Trash2,
//   CreditCard as Edit3,
//   X,
//   User,
//   Calendar,
//   MapPin,
//   Phone,
//   Briefcase,
//   Heart,
//   FileText,
//   Eye,
//   Stethoscope,
//   Activity,
//   Clipboard,
//   Camera,
//   Upload,
//   Grid3x3,
//   ChevronLeft
// } from 'lucide-react-native';
// import { useAuth } from '../../hooks/useAuth';
// import EmptyState from '@/components/common/EmptyState';
// import * as ImagePicker from 'expo-image-picker';

// interface HealthRecord {
//   id: string;
//   // Demographic Details
//   patientName: string;
//   age: number;
//   dateOfBirth: string;
//   sex: 'Male' | 'Female' | 'Other';
//   address: string;

//   // Chief Complaint & History
//   chiefComplaint: string;
//   historyOfPresentIllness: string;
//   pastMedicalHistory: string;
//   pastDentalHistory: string;

//   // Personal History
//   oralHygieneProgram: string;
//   toothBrushingAid: string;
//   duration: string;
//   frequency: string;
//   technique: string;
//   toothPasteUsed: string;
//   otherOralHygieneAids: string;
//   abnormalOralHabits: string;

//   // Diet History
//   dietDiary: string;
//   vegNonVegMixed: string;
//   recall24Hour: string;
//   dietCounseling: string;

//   // Behaviour Rating
//   behaviourRatingScale: string;
//   behaviourManagement: string;

//   // General Examination
//   statureBuilt: string;
//   height: string;
//   weight: string;
//   gait: string;
//   speech: string;
//   temperature: string;
//   pulse: string;
//   bp: string;

//   // Extra Oral Examination
//   headForm: string;
//   cephalicIndex: string;
//   faceShape: string;
//   faceProfile: string;
//   faceSymmetry: string;
//   faceHeight: string;
//   faceDivergence: string;
//   lymphNodes: string;
//   tmj: string;
//   mouthOpening: string;
//   swallow: string;
//   lipCompetence: string;
//   nasoLabialAngle: string;
//   chin: string;

//   // Soft Tissue Examination
//   lips: string;
//   labialBuccalMucosa: string;
//   frenum: string;
//   tongue: string;
//   palate: string;
//   floorOfMouth: string;

//   // Gingiva
//   gingivaColor: string;
//   gingivaSize: string;
//   gingivaContour: string;
//   gingivaShape: string;
//   gingivaConsistency: string;
//   gingivaSurfaceTexture: string;
//   gingivaPosition: string;
//   gingivaStippling: string;
//   bleedingOnProbing: string;
//   periodontalEvaluation: string;

//   // Hard Tissue Examination
//   dentition: string;
//   teethNumber: string;
//   malformation: string;
//   teethPresent: string;
//   teethMissing: string;
//   dentalCaries: string;
//   deepCaries: string;
//   fracturedTeeth: string;
//   retainedTeeth: string;
//   mobility: string;
//   orthodonticProblem: string;
//   otherDentalAnomalies: string;
//   fluorosis: string;

//   // Occlusal Relationship
//   primaryMolarLeft: string;
//   primaryMolarRight: string;
//   permanentMolarLeft: string;
//   permanentMolarRight: string;
//   overJet: string;
//   overBite: string;
//   otherMalocclusionFindings: string;

//   // Diagnosis & Treatment
//   provisionalDiagnosis: string;
//   radiographicFindings: string;
//   pulpVitality: string;
//   finalDiagnosis: string;
//   treatmentPlan: string;
//   treatmentDone: string;

//   // FDI Chart Data
//   fdiChartData: { [key: string]: string };

//   // Photos
//   photos: string[];

//   createdDate: string;
//   createdBy: string;
//   patientId: string;
// }

// export default function HealthRecordScreen() {
//   const router = useRouter();
//   const { userData } = useAuth();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);
//   const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
//     {
//       id: '1',
//       patientName: 'John Smith',
//       age: 35,
//       dateOfBirth: '1989-05-15',
//       sex: 'Male',
//       address: '123 Main St, City, State 12345',
//       chiefComplaint: 'Severe toothache in upper right molar',
//       historyOfPresentIllness:
//         'Patient reports sharp, throbbing pain that started 3 days ago. Pain worsens with hot/cold foods.',
//       pastMedicalHistory:
//         'Hypertension, controlled with medication. No known allergies.',
//       pastDentalHistory: 'Regular dental checkups. Last cleaning 6 months ago.',
//       oralHygieneProgram: 'Brushing twice daily',
//       toothBrushingAid: 'Manual toothbrush',
//       duration: '2 minutes',
//       frequency: 'Twice daily',
//       technique: 'Modified Bass technique',
//       toothPasteUsed: 'Fluoride toothpaste',
//       otherOralHygieneAids: 'Dental floss',
//       abnormalOralHabits: 'None reported',
//       dietDiary: 'Regular meals, occasional sweets',
//       vegNonVegMixed: 'Mixed',
//       recall24Hour:
//         'Breakfast: Toast, coffee; Lunch: Sandwich; Dinner: Rice, vegetables',
//       dietCounseling: 'Advised to reduce sugar intake',
//       behaviourRatingScale: 'Cooperative',
//       behaviourManagement: 'Tell-show-do technique',
//       statureBuilt: 'Average',
//       height: '175 cm',
//       weight: '75 kg',
//       gait: 'Normal',
//       speech: 'Clear',
//       temperature: '98.6°F',
//       pulse: '72 bpm',
//       bp: '120/80 mmHg',
//       headForm: 'Normal',
//       cephalicIndex: 'Mesocephalic',
//       faceShape: 'Oval',
//       faceProfile: 'Straight',
//       faceSymmetry: 'Symmetrical',
//       faceHeight: 'Normal',
//       faceDivergence: 'Normal',
//       lymphNodes: 'Non-palpable',
//       tmj: 'Normal function',
//       mouthOpening: '45mm',
//       swallow: 'Normal',
//       lipCompetence: 'Competent',
//       nasoLabialAngle: '90 degrees',
//       chin: 'Normal',
//       lips: 'Normal color and texture',
//       labialBuccalMucosa: 'Pink, moist',
//       frenum: 'Normal attachment',
//       tongue: 'Normal size and mobility',
//       palate: 'Normal arch form',
//       floorOfMouth: 'Normal',
//       gingivaColor: 'Pink',
//       gingivaSize: 'Normal',
//       gingivaContour: 'Scalloped',
//       gingivaShape: 'Knife-edge',
//       gingivaConsistency: 'Firm',
//       gingivaSurfaceTexture: 'Stippled',
//       gingivaPosition: 'Normal',
//       gingivaStippling: 'Present',
//       bleedingOnProbing: 'Minimal',
//       periodontalEvaluation: 'Mild gingivitis',
//       dentition: 'Permanent',
//       teethNumber: '28',
//       malformation: 'None',
//       teethPresent: '28 teeth present',
//       teethMissing: 'Third molars',
//       dentalCaries: 'Tooth #3 - large carious lesion',
//       deepCaries: 'Tooth #3',
//       fracturedTeeth: 'None',
//       retainedTeeth: 'None',
//       mobility: 'Grade 0',
//       orthodonticProblem: 'Mild crowding',
//       otherDentalAnomalies: 'None',
//       fluorosis: 'None',
//       primaryMolarLeft: 'N/A',
//       primaryMolarRight: 'N/A',
//       permanentMolarLeft: 'Class I',
//       permanentMolarRight: 'Class I',
//       overJet: '3mm',
//       overBite: '2mm',
//       otherMalocclusionFindings: 'Mild anterior crowding',
//       provisionalDiagnosis: 'Acute pulpitis tooth #3',
//       radiographicFindings: 'Periapical radiolucency visible on tooth #3',
//       pulpVitality: 'Non-vital tooth #3',
//       finalDiagnosis: 'Acute pulpitis tooth #3 with periapical periodontitis',
//       treatmentPlan: 'Root canal therapy followed by crown restoration',
//       treatmentDone: 'Initial examination completed',
//       fdiChartData: {
//         '11': 'D',
//         '21': 'R',
//         '16': 'M',
//         '26': 'GD',
//       },
//       photos: [
//         'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg',
//         'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
//       ],
//       createdDate: '2025-01-15',
//       createdBy: 'Dr. Aafirin',
//       patientId: 'patient_001',
//     },
//   ]);

//   const [formData, setFormData] = useState<{
//     [key: string]: any;
//     photos: string[];
//     fdiChartData: { [key: string]: string };
//     sex: 'Male' | 'Female' | 'Other';
//   }>({
//     // Demographic Details
//     patientName: '',
//     age: '',
//     dateOfBirth: '',
//     sex: 'Male' as 'Male' | 'Female' | 'Other',
//     address: '',
//     // Chief Complaint & History
//     chiefComplaint: '',
//     historyOfPresentIllness: '',
//     pastMedicalHistory: '',
//     pastDentalHistory: '',
//     // Personal History
//     oralHygieneProgram: '',
//     toothBrushingAid: '',
//     duration: '',
//     frequency: '',
//     technique: '',
//     toothPasteUsed: '',
//     otherOralHygieneAids: '',
//     abnormalOralHabits: '',
//     // Diet History
//     dietDiary: '',
//     vegNonVegMixed: '',
//     recall24Hour: '',
//     dietCounseling: '',
//     // Behaviour Rating
//     behaviourRatingScale: '',
//     behaviourManagement: '',
//     // General Examination
//     statureBuilt: '',
//     height: '',
//     weight: '',
//     gait: '',
//     speech: '',
//     temperature: '',
//     pulse: '',
//     bp: '',
//     // Extra Oral Examination
//     headForm: '',
//     cephalicIndex: '',
//     faceShape: '',
//     faceProfile: '',
//     faceSymmetry: '',
//     faceHeight: '',
//     faceDivergence: '',
//     lymphNodes: '',
//     tmj: '',
//     mouthOpening: '',
//     swallow: '',
//     lipCompetence: '',
//     nasoLabialAngle: '',
//     chin: '',
//     // Soft Tissue Examination
//     lips: '',
//     labialBuccalMucosa: '',
//     frenum: '',
//     tongue: '',
//     palate: '',
//     floorOfMouth: '',
//     // Gingiva
//     gingivaColor: '',
//     gingivaSize: '',
//     gingivaContour: '',
//     gingivaShape: '',
//     gingivaConsistency: '',
//     gingivaSurfaceTexture: '',
//     gingivaPosition: '',
//     gingivaStippling: '',
//     bleedingOnProbing: '',
//     periodontalEvaluation: '',
//     // Hard Tissue Examination
//     dentition: '',
//     teethNumber: '',
//     malformation: '',
//     teethPresent: '',
//     teethMissing: '',
//     dentalCaries: '',
//     deepCaries: '',
//     fracturedTeeth: '',
//     retainedTeeth: '',
//     mobility: '',
//     orthodonticProblem: '',
//     otherDentalAnomalies: '',
//     fluorosis: '',
//     // Occlusal Relationship
//     primaryMolarLeft: '',
//     primaryMolarRight: '',
//     permanentMolarLeft: '',
//     permanentMolarRight: '',
//     overJet: '',
//     overBite: '',
//     otherMalocclusionFindings: '',
//     // Diagnosis & Treatment
//     provisionalDiagnosis: '',
//     radiographicFindings: '',
//     pulpVitality: '',
//     finalDiagnosis: '',
//     treatmentPlan: '',
//     treatmentDone: '',
//     // FDI Chart Data
//     fdiChartData: {},
//     // Photos
//     photos: [],
//   });

//   // Filter records based on user role
//   const filteredRecords = healthRecords.filter((record) => {
//     const matchesSearch =
//       record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.finalDiagnosis.toLowerCase().includes(searchQuery.toLowerCase());

//     // Patients can only see their own records
// const filteredRecords = healthRecords.filter((record) => {
//   const matchesSearch =
//     record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     record.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     record.finalDiagnosis.toLowerCase().includes(searchQuery.toLowerCase());

//   // Patients can only see their own records
//   if (userData?.role === 'patient') {
//    return matchesSearch && record.patientId === userData.uid;
//   }

//   // Doctors can see all records
//   return matchesSearch;
// });

//     // Doctors can see all records
//     return matchesSearch;
//   });

//   const resetForm = () => {
//     setFormData({
//       patientName: '',
//       age: '',
//       dateOfBirth: '',
//       sex: 'Male',
//       address: '',
//       chiefComplaint: '',
//       historyOfPresentIllness: '',
//       pastMedicalHistory: '',
//       pastDentalHistory: '',
//       oralHygieneProgram: '',
//       toothBrushingAid: '',
//       duration: '',
//       frequency: '',
//       technique: '',
//       toothPasteUsed: '',
//       otherOralHygieneAids: '',
//       abnormalOralHabits: '',
//       dietDiary: '',
//       vegNonVegMixed: '',
//       recall24Hour: '',
//       dietCounseling: '',
//       behaviourRatingScale: '',
//       behaviourManagement: '',
//       statureBuilt: '',
//       height: '',
//       weight: '',
//       gait: '',
//       speech: '',
//       temperature: '',
//       pulse: '',
//       bp: '',
//       headForm: '',
//       cephalicIndex: '',
//       faceShape: '',
//       faceProfile: '',
//       faceSymmetry: '',
//       faceHeight: '',
//       faceDivergence: '',
//       lymphNodes: '',
//       tmj: '',
//       mouthOpening: '',
//       swallow: '',
//       lipCompetence: '',
//       nasoLabialAngle: '',
//       chin: '',
//       lips: '',
//       labialBuccalMucosa: '',
//       frenum: '',
//       tongue: '',
//       palate: '',
//       floorOfMouth: '',
//       gingivaColor: '',
//       gingivaSize: '',
//       gingivaContour: '',
//       gingivaShape: '',
//       gingivaConsistency: '',
//       gingivaSurfaceTexture: '',
//       gingivaPosition: '',
//       gingivaStippling: '',
//       bleedingOnProbing: '',
//       periodontalEvaluation: '',
//       dentition: '',
//       teethNumber: '',
//       malformation: '',
//       teethPresent: '',
//       teethMissing: '',
//       dentalCaries: '',
//       deepCaries: '',
//       fracturedTeeth: '',
//       retainedTeeth: '',
//       mobility: '',
//       orthodonticProblem: '',
//       otherDentalAnomalies: '',
//       fluorosis: '',
//       primaryMolarLeft: '',
//       primaryMolarRight: '',
//       permanentMolarLeft: '',
//       permanentMolarRight: '',
//       overJet: '',
//       overBite: '',
//       otherMalocclusionFindings: '',
//       provisionalDiagnosis: '',
//       radiographicFindings: '',
//       pulpVitality: '',
//       finalDiagnosis: '',
//       treatmentPlan: '',
//       treatmentDone: '',
//       fdiChartData: {},
//       photos: [],
//     });
//     setEditingRecord(null);
//   };

//   const handleCreateRecord = () => {
//     if (!formData.patientName || !formData.age) {
//       Alert.alert('Error', 'Please fill in at least Patient Name and Age');
//       return;
//     }

//     const newRecord: HealthRecord = {
//       id: editingRecord ? editingRecord.id : Date.now().toString(),
//       patientName: formData.patientName,
//       age: parseInt(formData.age) || 0,
//       dateOfBirth: formData.dateOfBirth,
//       sex: formData.sex,
//       address: formData.address,
//       chiefComplaint: formData.chiefComplaint,
//       historyOfPresentIllness: formData.historyOfPresentIllness,
//       pastMedicalHistory: formData.pastMedicalHistory,
//       pastDentalHistory: formData.pastDentalHistory,
//       oralHygieneProgram: formData.oralHygieneProgram,
//       toothBrushingAid: formData.toothBrushingAid,
//       duration: formData.duration,
//       frequency: formData.frequency,
//       technique: formData.technique,
//       toothPasteUsed: formData.toothPasteUsed,
//       otherOralHygieneAids: formData.otherOralHygieneAids,
//       abnormalOralHabits: formData.abnormalOralHabits,
//       dietDiary: formData.dietDiary,
//       vegNonVegMixed: formData.vegNonVegMixed,
//       recall24Hour: formData.recall24Hour,
//       dietCounseling: formData.dietCounseling,
//       behaviourRatingScale: formData.behaviourRatingScale,
//       behaviourManagement: formData.behaviourManagement,
//       statureBuilt: formData.statureBuilt,
//       height: formData.height,
//       weight: formData.weight,
//       gait: formData.gait,
//       speech: formData.speech,
//       temperature: formData.temperature,
//       pulse: formData.pulse,
//       bp: formData.bp,
//       headForm: formData.headForm,
//       cephalicIndex: formData.cephalicIndex,
//       faceShape: formData.faceShape,
//       faceProfile: formData.faceProfile,
//       faceSymmetry: formData.faceSymmetry,
//       faceHeight: formData.faceHeight,
//       faceDivergence: formData.faceDivergence,
//       lymphNodes: formData.lymphNodes,
//       tmj: formData.tmj,
//       mouthOpening: formData.mouthOpening,
//       swallow: formData.swallow,
//       lipCompetence: formData.lipCompetence,
//       nasoLabialAngle: formData.nasoLabialAngle,
//       chin: formData.chin,
//       lips: formData.lips,
//       labialBuccalMucosa: formData.labialBuccalMucosa,
//       frenum: formData.frenum,
//       tongue: formData.tongue,
//       palate: formData.palate,
//       floorOfMouth: formData.floorOfMouth,
//       gingivaColor: formData.gingivaColor,
//       gingivaSize: formData.gingivaSize,
//       gingivaContour: formData.gingivaContour,
//       gingivaShape: formData.gingivaShape,
//       gingivaConsistency: formData.gingivaConsistency,
//       gingivaSurfaceTexture: formData.gingivaSurfaceTexture,
//       gingivaPosition: formData.gingivaPosition,
//       gingivaStippling: formData.gingivaStippling,
//       bleedingOnProbing: formData.bleedingOnProbing,
//       periodontalEvaluation: formData.periodontalEvaluation,
//       dentition: formData.dentition,
//       teethNumber: formData.teethNumber,
//       malformation: formData.malformation,
//       teethPresent: formData.teethPresent,
//       teethMissing: formData.teethMissing,
//       dentalCaries: formData.dentalCaries,
//       deepCaries: formData.deepCaries,
//       fracturedTeeth: formData.fracturedTeeth,
//       retainedTeeth: formData.retainedTeeth,
//       mobility: formData.mobility,
//       orthodonticProblem: formData.orthodonticProblem,
//       otherDentalAnomalies: formData.otherDentalAnomalies,
//       fluorosis: formData.fluorosis,
//       primaryMolarLeft: formData.primaryMolarLeft,
//       primaryMolarRight: formData.primaryMolarRight,
//       permanentMolarLeft: formData.permanentMolarLeft,
//       permanentMolarRight: formData.permanentMolarRight,
//       overJet: formData.overJet,
//       overBite: formData.overBite,
//       otherMalocclusionFindings: formData.otherMalocclusionFindings,
//       provisionalDiagnosis: formData.provisionalDiagnosis,
//       radiographicFindings: formData.radiographicFindings,
//       pulpVitality: formData.pulpVitality,
//       finalDiagnosis: formData.finalDiagnosis,
//       treatmentPlan: formData.treatmentPlan,
//       treatmentDone: formData.treatmentDone,
//       fdiChartData: formData.fdiChartData,
//       photos: formData.photos,
//       createdDate: editingRecord
//         ? editingRecord.createdDate
//         : new Date().toISOString().split('T')[0],
//       createdBy: userData?.name || userData?.name || 'Unknown',
//       patientId: userData?.role === 'patient' ? userData.uid : `patient_${Date.now()}`,
//     };

//     if (editingRecord) {
//       setHealthRecords((prev) =>
//         prev.map((r) => (r.id === editingRecord.id ? newRecord : r))
//       );
//       Alert.alert('Success', 'Health record updated successfully');
//     } else {
//       setHealthRecords((prev) => [...prev, newRecord]);
//       Alert.alert('Success', 'Health record created successfully');
//     }

//     setShowCreateModal(false);
//     resetForm();
//   };

//   const handleEditRecord = (record: HealthRecord) => {
//     setEditingRecord(record);
//     setFormData({
//       patientName: record.patientName,
//       age: record.age.toString(),
//       dateOfBirth: record.dateOfBirth,
//       sex: record.sex,
//       address: record.address,
//       chiefComplaint: record.chiefComplaint,
//       historyOfPresentIllness: record.historyOfPresentIllness,
//       pastMedicalHistory: record.pastMedicalHistory,
//       pastDentalHistory: record.pastDentalHistory,
//       oralHygieneProgram: record.oralHygieneProgram,
//       toothBrushingAid: record.toothBrushingAid,
//       duration: record.duration,
//       frequency: record.frequency,
//       technique: record.technique,
//       toothPasteUsed: record.toothPasteUsed,
//       otherOralHygieneAids: record.otherOralHygieneAids,
//       abnormalOralHabits: record.abnormalOralHabits,
//       dietDiary: record.dietDiary,
//       vegNonVegMixed: record.vegNonVegMixed,
//       recall24Hour: record.recall24Hour,
//       dietCounseling: record.dietCounseling,
//       behaviourRatingScale: record.behaviourRatingScale,
//       behaviourManagement: record.behaviourManagement,
//       statureBuilt: record.statureBuilt,
//       height: record.height,
//       weight: record.weight,
//       gait: record.gait,
//       speech: record.speech,
//       temperature: record.temperature,
//       pulse: record.pulse,
//       bp: record.bp,
//       headForm: record.headForm,
//       cephalicIndex: record.cephalicIndex,
//       faceShape: record.faceShape,
//       faceProfile: record.faceProfile,
//       faceSymmetry: record.faceSymmetry,
//       faceHeight: record.faceHeight,
//       faceDivergence: record.faceDivergence,
//       lymphNodes: record.lymphNodes,
//       tmj: record.tmj,
//       mouthOpening: record.mouthOpening,
//       swallow: record.swallow,
//       lipCompetence: record.lipCompetence,
//       nasoLabialAngle: record.nasoLabialAngle,
//       chin: record.chin,
//       lips: record.lips,
//       labialBuccalMucosa: record.labialBuccalMucosa,
//       frenum: record.frenum,
//       tongue: record.tongue,
//       palate: record.palate,
//       floorOfMouth: record.floorOfMouth,
//       gingivaColor: record.gingivaColor,
//       gingivaSize: record.gingivaSize,
//       gingivaContour: record.gingivaContour,
//       gingivaShape: record.gingivaShape,
//       gingivaConsistency: record.gingivaConsistency,
//       gingivaSurfaceTexture: record.gingivaSurfaceTexture,
//       gingivaPosition: record.gingivaPosition,
//       gingivaStippling: record.gingivaStippling,
//       bleedingOnProbing: record.bleedingOnProbing,
//       periodontalEvaluation: record.periodontalEvaluation,
//       dentition: record.dentition,
//       teethNumber: record.teethNumber,
//       malformation: record.malformation,
//       teethPresent: record.teethPresent,
//       teethMissing: record.teethMissing,
//       dentalCaries: record.dentalCaries,
//       deepCaries: record.deepCaries,
//       fracturedTeeth: record.fracturedTeeth,
//       retainedTeeth: record.retainedTeeth,
//       mobility: record.mobility,
//       orthodonticProblem: record.orthodonticProblem,
//       otherDentalAnomalies: record.otherDentalAnomalies,
//       fluorosis: record.fluorosis,
//       primaryMolarLeft: record.primaryMolarLeft,
//       primaryMolarRight: record.primaryMolarRight,
//       permanentMolarLeft: record.permanentMolarLeft,
//       permanentMolarRight: record.permanentMolarRight,
//       overJet: record.overJet,
//       overBite: record.overBite,
//       otherMalocclusionFindings: record.otherMalocclusionFindings,
//       provisionalDiagnosis: record.provisionalDiagnosis,
//       radiographicFindings: record.radiographicFindings,
//       pulpVitality: record.pulpVitality,
//       finalDiagnosis: record.finalDiagnosis,
//       treatmentPlan: record.treatmentPlan,
//       treatmentDone: record.treatmentDone,
//       fdiChartData: record.fdiChartData,
//       photos: record.photos,
//     });
//     setShowCreateModal(true);
//   };

//   const handleDeleteRecord = (id: string) => {
//     Alert.alert(
//       'Delete Health Record',
//       'Are you sure you want to delete this health record?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             setHealthRecords((prev) => prev.filter((r) => r.id !== id));
//             Alert.alert('Success', 'Health record deleted successfully');
//           },
//         },
//       ]
//     );
//   };

//   const handleFDIToothChange = (toothNumber: string, value: string) => {
//     const upperValue = value.toUpperCase();
//     setFormData((prev) => ({
//       ...prev,
//       fdiChartData: {
//         ...prev.fdiChartData,
//         [toothNumber]: upperValue,
//       },
//     }));
//   };

//   const getToothStyle = (value: string) => {
//     switch (value) {
//       case 'D':
//         return { backgroundColor: '#e53935', color: '#fff' }; // Decayed
//       case 'M':
//         return { backgroundColor: '#757575', color: '#fff' }; // Missing
//       case 'R':
//         return { backgroundColor: '#43a047', color: '#fff' }; // Restored
//       case 'RS':
//         return { backgroundColor: '#ff9800', color: '#fff' }; // Root Stump
//       case 'GD':
//         return { backgroundColor: '#8e24aa', color: '#fff' }; // Grossly Decayed
//       case 'O':
//         return { backgroundColor: '#2196f3', color: '#fff' }; // Others
//       default:
//         return { backgroundColor: '#fff', color: '#333' };
//     }
//   };

//   const renderFDIChart = () => {
//     const adultUpper = [
//       18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
//     ];
//     const adultLower = [
//       48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
//     ];
//     const childUpper = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
//     const childLower = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

//     const renderTeethRow = (teeth: number[], label: string) => (
//       <View style={styles.teethSection}>
//         <Text style={styles.teethLabel}>{label}</Text>
//         <View style={styles.teethRow}>
//           {teeth.map((toothNumber) => (
//             <View key={toothNumber} style={styles.toothContainer}>
//               <Text style={styles.toothNumber}>{toothNumber}</Text>
//               <TextInput
//                 style={[
//                   styles.toothInput,
//                   getToothStyle(
//                     formData.fdiChartData[toothNumber.toString()] || ''
//                   ),
//                 ]}
//                 value={formData.fdiChartData[toothNumber.toString()] || ''}
//                 onChangeText={(value) =>
//                   handleFDIToothChange(toothNumber.toString(), value)
//                 }
//                 maxLength={2}
//                 placeholder=""
//                 placeholderTextColor="#999"
//               />
//             </View>
//           ))}
//         </View>
//       </View>
//     );

//     return (
//       <View style={styles.fdiChartContainer}>
//         {renderTeethRow(adultUpper, 'Upper Jaw – Adult Teeth')}
//         {renderTeethRow(childUpper, 'Upper Jaw – Child Teeth')}
//         {renderTeethRow(childLower, 'Lower Jaw – Child Teeth')}
//         {renderTeethRow(adultLower, 'Lower Jaw – Adult Teeth')}

//         <View style={styles.fdiReference}>
//           <Text style={styles.fdiReferenceTitle}>Status Reference:</Text>
//           <View style={styles.fdiReferenceGrid}>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>D</Text> – Decayed (Red)
//             </Text>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>M</Text> – Missing (Gray)
//             </Text>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>R</Text> – Restored (Green)
//             </Text>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>RS</Text> – Root Stump (Orange)
//             </Text>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>GD</Text> – Grossly Decayed (Purple)
//             </Text>
//             <Text style={styles.fdiReferenceItem}>
//               <Text style={styles.bold}>O</Text> – Others (Blue)
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const handleImagePicker = () => {
//     Alert.alert('Select Photo', 'Choose how you want to add a photo', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Camera', onPress: () => openCamera() },
//       { text: 'Gallery', onPress: () => openGallery() },
//     ]);
//   };

//   const openCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission needed',
//         'Camera permission is required to take photos'
//       );
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled && result.assets[0]) {
//       setFormData((prev) => ({
//         ...prev,
//         photos: [...prev.photos, result.assets[0].uri],
//       }));
//     }
//   };

//   const openGallery = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission needed',
//         'Gallery permission is required to select photos'
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled && result.assets[0]) {
//       setFormData((prev) => ({
//         ...prev,
//         photos: [...prev.photos, result.assets[0].uri],
//       }));
//     }
//   };

//   const removePhoto = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//   };

//   const renderRecordCard = ({ item }: { item: HealthRecord }) => (
//     <View style={styles.recordCard}>
//       <View style={styles.cardHeader}>
//         <View style={styles.patientInfo}>
//           <Text style={styles.patientName}>{item.patientName}</Text>
//           <Text style={styles.patientDetails}>
//             {item.age} years • {item.sex} • DOB: {item.dateOfBirth}
//           </Text>
//           <Text style={styles.address} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//         <View style={styles.cardActions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => handleEditRecord(item)}
//           >
//             <Edit3 size={16} color="#0077B6" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => handleDeleteRecord(item.id)}
//           >
//             <Trash2 size={16} color="#FF5252" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.recordDetails}>
//         <View style={styles.detailRow}>
//           <Heart size={16} color="#FF6B6B" />
//           <View style={styles.detailContent}>
//             <Text style={styles.detailLabel}>Chief Complaint</Text>
//             <Text style={styles.detailValue} numberOfLines={2}>
//               {item.chiefComplaint || 'Not specified'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <Clipboard size={16} color="#45B7D1" />
//           <View style={styles.detailContent}>
//             <Text style={styles.detailLabel}>Clinical Findings</Text>
//             <Text style={styles.detailValue} numberOfLines={2}>
//               {Object.keys(item.fdiChartData).length > 0
//                 ? Object.entries(item.fdiChartData)
//                     .map(([tooth, status]) => `${tooth}: ${status}`)
//                     .join(', ')
//                 : 'To be determined'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <Stethoscope size={16} color="#4ECDC4" />
//           <View style={styles.detailContent}>
//             <Text style={styles.detailLabel}>Final Diagnosis</Text>
//             <Text style={styles.detailValue} numberOfLines={2}>
//               {item.finalDiagnosis || 'Pending'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <Clipboard size={16} color="#45B7D1" />
//           <View style={styles.detailContent}>
//             <Text style={styles.detailLabel}>Treatment Plan</Text>
//             <Text style={styles.detailValue} numberOfLines={2}>
//               {item.treatmentPlan || 'To be determined'}
//             </Text>
//           </View>
//         </View>



//         {item.photos && item.photos.length > 0 && (
//           <View style={styles.detailRow}>
//             <Camera size={16} color="#FF9800" />
//             <View style={styles.detailContent}>
//               <Text style={styles.detailLabel}>Photos</Text>
//               <Text style={styles.detailValue}>
//                 {item.photos.length} photo(s) attached
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>

//       <View style={styles.cardFooter}>
//         <Text style={styles.createdBy}>Created by: {item.createdBy}</Text>
//         <Text style={styles.createdDate}>
//           {new Date(item.createdDate).toLocaleDateString()}
//         </Text>
//       </View>
//     </View>
//   );

//   const renderFormSection = (
//     title: string,
//     icon: React.ReactNode,
//     children: React.ReactNode
//   ) => (
//     <View style={styles.formSection}>
//       <View style={styles.sectionHeader}>
//         {icon}
//         <Text style={styles.sectionTitle}>{title}</Text>
//       </View>
//       {children}
//     </View>
//   );

//   const renderInput = (
//     label: string,
//     value: string,
//     onChangeText: (text: string) => void,
//     multiline = false,
//     placeholder?: string
//   ) => (
//     <View style={styles.inputGroup}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         style={[styles.input, multiline && styles.textArea]}
//         placeholder={placeholder || `Enter ${label.toLowerCase()}`}
//         value={value}
//         onChangeText={onChangeText}
//         multiline={multiline}
//         numberOfLines={multiline ? 3 : 1}
//         placeholderTextColor="#999"
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>

//         <Text style={styles.headerTitle}>Health record</Text>
//         {userData?.role === 'doctor' && (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => setShowCreateModal(true)}
//           >
//             <Plus size={20} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Search size={20} color="#999" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search health records..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//         </View>
//       </View>

//       {filteredRecords.length > 0 ? (
//         <FlatList
//           data={filteredRecords}
//           renderItem={renderRecordCard}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.recordsList}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <EmptyState
//           icon={<FileText size={60} color="#ccc" />}
//           title="No health records found"
//           description={
//             searchQuery
//               ? 'No records match your search'
//               : 'No health records available'
//           }
//           buttonText="Create Health Record"
//           onPress={() => setShowCreateModal(true)}
//         />
//       )}

//       {/* Create/Edit Health Record Modal */}
//       <Modal
//         visible={showCreateModal}
//         animationType="slide"
//         presentationStyle="pageSheet"
//         onRequestClose={() => {
//           setShowCreateModal(false);
//           resetForm();
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>
//               {editingRecord ? 'Edit Health Record' : 'Create Health Record'}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => {
//                 setShowCreateModal(false);
//                 resetForm();
//               }}
//             >
//               <X size={24} color="#333" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             style={styles.modalContent}
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Demographic Details */}
//             {renderFormSection(
//               'DEMOGRAPHIC DETAILS',
//               <User size={20} color="#0077B6" />,
//               <>
//                 {renderInput(
//                   'Name of the Patient',
//                   formData.patientName,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, patientName: text }))
//                 )}

//                 <View style={styles.inputRow}>
//                   <View
//                     style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
//                   >
//                     {renderInput('Age', formData.age, (text) =>
//                       setFormData((prev) => ({ ...prev, age: text }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput(
//                       'Date of Birth',
//                       formData.dateOfBirth,
//                       (text) =>
//                         setFormData((prev) => ({ ...prev, dateOfBirth: text })),
//                       false,
//                       'YYYY-MM-DD'
//                     )}
//                   </View>
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Sex</Text>
//                   <View style={styles.pickerContainer}>
//                     {['Male', 'Female', 'Other'].map((sex) => (
//                       <TouchableOpacity
//                         key={sex}
//                         style={[
//                           styles.pickerOption,
//                           formData.sex === sex && styles.pickerOptionSelected,
//                         ]}
//                         onPress={() =>
//                           setFormData((prev) => ({ ...prev, sex: sex as any }))
//                         }
//                       >
//                         <Text
//                           style={[
//                             styles.pickerText,
//                             formData.sex === sex && styles.pickerTextSelected,
//                           ]}
//                         >
//                           {sex}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 {renderInput(
//                   'Address',
//                   formData.address,
//                   (text) => setFormData((prev) => ({ ...prev, address: text })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Chief Complaint & History */}
//             {renderFormSection(
//               'CHIEF COMPLAINT & HISTORY',
//               <Heart size={20} color="#FF6B6B" />,
//               <>
//                 {renderInput(
//                   'Chief Complaint of the Patient',
//                   formData.chiefComplaint,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, chiefComplaint: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'History of Present Illness',
//                   formData.historyOfPresentIllness,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       historyOfPresentIllness: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Past Medical History',
//                   formData.pastMedicalHistory,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       pastMedicalHistory: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Past Dental History',
//                   formData.pastDentalHistory,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       pastDentalHistory: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Personal History */}
//             {renderFormSection(
//               'PERSONAL HISTORY',
//               <User size={20} color="#8E24AA" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Oral Hygiene Program:
//                 </Text>
//                 {renderInput(
//                   'Oral Hygiene Program',
//                   formData.oralHygieneProgram,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       oralHygieneProgram: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Tooth Brushing Aid',
//                   formData.toothBrushingAid,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, toothBrushingAid: text }))
//                 )}
//                 {renderInput('Duration', formData.duration, (text) =>
//                   setFormData((prev) => ({ ...prev, duration: text }))
//                 )}
//                 {renderInput('Frequency', formData.frequency, (text) =>
//                   setFormData((prev) => ({ ...prev, frequency: text }))
//                 )}
//                 {renderInput('Technique', formData.technique, (text) =>
//                   setFormData((prev) => ({ ...prev, technique: text }))
//                 )}
//                 {renderInput(
//                   'Tooth Paste Used',
//                   formData.toothPasteUsed,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, toothPasteUsed: text }))
//                 )}
//                 {renderInput(
//                   'Other Oral Hygiene Aids',
//                   formData.otherOralHygieneAids,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       otherOralHygieneAids: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Abnormal Oral Habits',
//                   formData.abnormalOralHabits,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       abnormalOralHabits: text,
//                     })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Diet History:</Text>
//                 {renderInput(
//                   'Diet Diary / Snacking Habit',
//                   formData.dietDiary,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, dietDiary: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Veg / Non-veg / Mixed',
//                   formData.vegNonVegMixed,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, vegNonVegMixed: text }))
//                 )}
//                 {renderInput(
//                   '24 Hour Recall Period',
//                   formData.recall24Hour,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, recall24Hour: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Diet Counseling',
//                   formData.dietCounseling,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, dietCounseling: text })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Behaviour Rating:</Text>
//                 {renderInput(
//                   'Behaviour Rating Scale',
//                   formData.behaviourRatingScale,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       behaviourRatingScale: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Behaviour Management',
//                   formData.behaviourManagement,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       behaviourManagement: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* General Examination */}
//             {renderFormSection(
//               'EXAMINATION OF PATIENT - GENERAL',
//               <Activity size={20} color="#4CAF50" />,
//               <>
//                 <Text style={styles.subSectionTitle}>General Examination:</Text>
//                 {renderInput('Stature / Built', formData.statureBuilt, (text) =>
//                   setFormData((prev) => ({ ...prev, statureBuilt: text }))
//                 )}
//                 {renderInput('Height', formData.height, (text) =>
//                   setFormData((prev) => ({ ...prev, height: text }))
//                 )}
//                 {renderInput('Weight', formData.weight, (text) =>
//                   setFormData((prev) => ({ ...prev, weight: text }))
//                 )}
//                 {renderInput('Gait', formData.gait, (text) =>
//                   setFormData((prev) => ({ ...prev, gait: text }))
//                 )}
//                 {renderInput('Speech', formData.speech, (text) =>
//                   setFormData((prev) => ({ ...prev, speech: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Vital Signs:</Text>
//                 {renderInput('Temperature', formData.temperature, (text) =>
//                   setFormData((prev) => ({ ...prev, temperature: text }))
//                 )}
//                 {renderInput('Pulse', formData.pulse, (text) =>
//                   setFormData((prev) => ({ ...prev, pulse: text }))
//                 )}
//                 {renderInput('BP', formData.bp, (text) =>
//                   setFormData((prev) => ({ ...prev, bp: text }))
//                 )}
//               </>
//             )}

//             {/* Extra Oral Examination */}
//             {renderFormSection(
//               'EXTRA ORAL EXAMINATION',
//               <Eye size={20} color="#FF9800" />,
//               <>
//                 <Text style={styles.subSectionTitle}>Head:</Text>
//                 {renderInput('Form', formData.headForm, (text) =>
//                   setFormData((prev) => ({ ...prev, headForm: text }))
//                 )}
//                 {renderInput('Cephalic Index', formData.cephalicIndex, (text) =>
//                   setFormData((prev) => ({ ...prev, cephalicIndex: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Face:</Text>
//                 {renderInput('Shape', formData.faceShape, (text) =>
//                   setFormData((prev) => ({ ...prev, faceShape: text }))
//                 )}
//                 {renderInput('Profile', formData.faceProfile, (text) =>
//                   setFormData((prev) => ({ ...prev, faceProfile: text }))
//                 )}
//                 {renderInput('Symmetry', formData.faceSymmetry, (text) =>
//                   setFormData((prev) => ({ ...prev, faceSymmetry: text }))
//                 )}
//                 {renderInput('Height', formData.faceHeight, (text) =>
//                   setFormData((prev) => ({ ...prev, faceHeight: text }))
//                 )}
//                 {renderInput('Divergence', formData.faceDivergence, (text) =>
//                   setFormData((prev) => ({ ...prev, faceDivergence: text }))
//                 )}
//                 {renderInput('Lymph Nodes', formData.lymphNodes, (text) =>
//                   setFormData((prev) => ({ ...prev, lymphNodes: text }))
//                 )}
//                 {renderInput('TMJ', formData.tmj, (text) =>
//                   setFormData((prev) => ({ ...prev, tmj: text }))
//                 )}
//                 {renderInput('Mouth Opening', formData.mouthOpening, (text) =>
//                   setFormData((prev) => ({ ...prev, mouthOpening: text }))
//                 )}
//                 {renderInput('Swallow', formData.swallow, (text) =>
//                   setFormData((prev) => ({ ...prev, swallow: text }))
//                 )}
//                 {renderInput('Lip Competence', formData.lipCompetence, (text) =>
//                   setFormData((prev) => ({ ...prev, lipCompetence: text }))
//                 )}
//                 {renderInput(
//                   'Naso Labial Angle',
//                   formData.nasoLabialAngle,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, nasoLabialAngle: text }))
//                 )}
//                 {renderInput('Chin', formData.chin, (text) =>
//                   setFormData((prev) => ({ ...prev, chin: text }))
//                 )}
//               </>
//             )}

//             {/* Intra Oral Examination */}
//             {renderFormSection(
//               'INTRA ORAL EXAMINATION',
//               <Stethoscope size={20} color="#2196F3" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Soft Tissue Examination:
//                 </Text>
//                 {renderInput('Lips', formData.lips, (text) =>
//                   setFormData((prev) => ({ ...prev, lips: text }))
//                 )}
//                 {renderInput(
//                   'Labial and Buccal Mucosa',
//                   formData.labialBuccalMucosa,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       labialBuccalMucosa: text,
//                     }))
//                 )}
//                 {renderInput('Frenum', formData.frenum, (text) =>
//                   setFormData((prev) => ({ ...prev, frenum: text }))
//                 )}
//                 {renderInput('Tongue', formData.tongue, (text) =>
//                   setFormData((prev) => ({ ...prev, tongue: text }))
//                 )}
//                 {renderInput('Palate', formData.palate, (text) =>
//                   setFormData((prev) => ({ ...prev, palate: text }))
//                 )}
//                 {renderInput(
//                   'Floor of the Mouth',
//                   formData.floorOfMouth,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, floorOfMouth: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Gingiva:</Text>
//                 {renderInput('Color', formData.gingivaColor, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaColor: text }))
//                 )}
//                 {renderInput('Size', formData.gingivaSize, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaSize: text }))
//                 )}
//                 {renderInput('Contour', formData.gingivaContour, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaContour: text }))
//                 )}
//                 {renderInput('Shape', formData.gingivaShape, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaShape: text }))
//                 )}
//                 {renderInput(
//                   'Consistency',
//                   formData.gingivaConsistency,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       gingivaConsistency: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Surface Texture',
//                   formData.gingivaSurfaceTexture,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       gingivaSurfaceTexture: text,
//                     }))
//                 )}
//                 {renderInput('Position', formData.gingivaPosition, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaPosition: text }))
//                 )}
//                 {renderInput('Stippling', formData.gingivaStippling, (text) =>
//                   setFormData((prev) => ({ ...prev, gingivaStippling: text }))
//                 )}
//                 {renderInput(
//                   'Bleeding on Probing',
//                   formData.bleedingOnProbing,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       bleedingOnProbing: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Periodontal Evaluation',
//                   formData.periodontalEvaluation,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       periodontalEvaluation: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Hard Tissue Examination */}
//             {renderFormSection(
//               'HARD TISSUE EXAMINATION',
//               <Clipboard size={20} color="#795548" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Examination of Teeth:
//                 </Text>
//                 {/* FDI Chart */}
//                 {renderFormSection(
//                   'FDI CHART',
//                   <Grid3x3 size={20} color="#607D8B" />,
//                   renderFDIChart()
//                 )}

//                 {renderInput('Dentition', formData.dentition, (text) =>
//                   setFormData((prev) => ({ ...prev, dentition: text }))
//                 )}
//                 {renderInput('Number', formData.teethNumber, (text) =>
//                   setFormData((prev) => ({ ...prev, teethNumber: text }))
//                 )}
//                 {renderInput('Malformation', formData.malformation, (text) =>
//                   setFormData((prev) => ({ ...prev, malformation: text }))
//                 )}
//                 {renderInput(
//                   'Teeth Present',
//                   formData.teethPresent,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, teethPresent: text })),
//                   true
//                 )}
//                 {renderInput('Teeth Missing', formData.teethMissing, (text) =>
//                   setFormData((prev) => ({ ...prev, teethMissing: text }))
//                 )}
//                 {renderInput('Dental Caries', formData.dentalCaries, (text) =>
//                   setFormData((prev) => ({ ...prev, dentalCaries: text }))
//                 )}
//                 {renderInput(
//                   'Deep Caries / Grossly Decayed Teeth',
//                   formData.deepCaries,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, deepCaries: text }))
//                 )}
//                 {renderInput(
//                   'Fractured Teeth',
//                   formData.fracturedTeeth,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, fracturedTeeth: text }))
//                 )}
//                 {renderInput('Retained Teeth', formData.retainedTeeth, (text) =>
//                   setFormData((prev) => ({ ...prev, retainedTeeth: text }))
//                 )}
//                 {renderInput('Mobility', formData.mobility, (text) =>
//                   setFormData((prev) => ({ ...prev, mobility: text }))
//                 )}
//                 {renderInput(
//                   'Orthodontic Problem',
//                   formData.orthodonticProblem,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       orthodonticProblem: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Other Dental Anomalies',
//                   formData.otherDentalAnomalies,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       otherDentalAnomalies: text,
//                     }))
//                 )}
//                 {renderInput('Fluorosis', formData.fluorosis, (text) =>
//                   setFormData((prev) => ({ ...prev, fluorosis: text }))
//                 )}
//               </>
//             )}

//             {/* Occlusal Relationship */}
//             {renderFormSection(
//               'OCCLUSAL RELATIONSHIP',
//               <Activity size={20} color="#9C27B0" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Primary Molar Relation:
//                 </Text>
//                 <View style={styles.inputRow}>
//                   <View
//                     style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
//                   >
//                     {renderInput('Left', formData.primaryMolarLeft, (text) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         primaryMolarLeft: text,
//                       }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput('Right', formData.primaryMolarRight, (text) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         primaryMolarRight: text,
//                       }))
//                     )}
//                   </View>
//                 </View>

//                 <Text style={styles.subSectionTitle}>
//                   Permanent Molar Relation:
//                 </Text>
//                 <View style={styles.inputRow}>
//                   <View
//                     style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
//                   >
//                     {renderInput('Left', formData.permanentMolarLeft, (text) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         permanentMolarLeft: text,
//                       }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput(
//                       'Right',
//                       formData.permanentMolarRight,
//                       (text) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           permanentMolarRight: text,
//                         }))
//                     )}
//                   </View>
//                 </View>

//                 {renderInput('Over Jet', formData.overJet, (text) =>
//                   setFormData((prev) => ({ ...prev, overJet: text }))
//                 )}
//                 {renderInput('Over Bite', formData.overBite, (text) =>
//                   setFormData((prev) => ({ ...prev, overBite: text }))
//                 )}
//                 {renderInput(
//                   'Other Malocclusion Findings',
//                   formData.otherMalocclusionFindings,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       otherMalocclusionFindings: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Diagnosis & Treatment */}
//             {renderFormSection(
//               'DIAGNOSIS & TREATMENT',
//               <FileText size={20} color="#E91E63" />,
//               <>
//                 {renderInput(
//                   'Provisional Diagnosis',
//                   formData.provisionalDiagnosis,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       provisionalDiagnosis: text,
//                     })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Investigations:</Text>
//                 {renderInput(
//                   'Radiographic Findings',
//                   formData.radiographicFindings,
//                   (text) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       radiographicFindings: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Pulp Vitality',
//                   formData.pulpVitality,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, pulpVitality: text })),
//                   true
//                 )}

//                 {renderInput(
//                   'Final Diagnosis',
//                   formData.finalDiagnosis,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, finalDiagnosis: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Treatment Plan',
//                   formData.treatmentPlan,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, treatmentPlan: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Treatment Done',
//                   formData.treatmentDone,
//                   (text) =>
//                     setFormData((prev) => ({ ...prev, treatmentDone: text })),
//                   true
//                 )}
//               </>
//             )}

//             {/* FDI Chart */}
//             {/* {renderFormSection('FDI CHART', <Grid3x3 size={20} color="#607D8B" />, renderFDIChart())} */}

//             {/* Photos Section */}
//             {renderFormSection(
//               'PATIENT PHOTOS',
//               <Camera size={20} color="#FF9800" />,
//               <View style={styles.photosSection}>
//                 <TouchableOpacity
//                   style={styles.addPhotoButton}
//                   onPress={handleImagePicker}
//                 >
//                   <Camera size={20} color="#0077B6" />
//                   <Text style={styles.addPhotoText}>Add Photo</Text>
//                 </TouchableOpacity>

//                 {formData.photos.length > 0 && (
//                   <View style={styles.photosGrid}>
//                     {formData.photos.map((photo, index) => (
//                       <View key={index} style={styles.photoContainer}>
//                         <Image
//                           source={{ uri: photo }}
//                           style={styles.photoPreview}
//                         />
//                         <TouchableOpacity
//                           style={styles.removePhotoButton}
//                           onPress={() => removePhoto(index)}
//                         >
//                           <X size={16} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => {
//                 setShowCreateModal(false);
//                 resetForm();
//               }}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.createButton}
//               onPress={handleCreateRecord}
//             >
//               <Text style={styles.createButtonText}>
//                 {editingRecord ? 'Update' : 'Create'} Record
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 16,
//   },
//   headerTitle: {
//     alignItems: 'center',
//     fontSize: 24,
//     color: '#333',
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     backgroundColor: '#0077B6',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 16,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     height: 48,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontFamily: 'Inter-Regular',
//     fontSize: 15,
//     color: '#333',
//   },
//   recordsList: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   recordCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   patientInfo: {
//     flex: 1,
//   },
//   patientName: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 18,
//     color: '#333',
//     marginBottom: 4,
//   },
//   patientDetails: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 2,
//   },
//   address: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#999',
//   },
//   cardActions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   recordDetails: {
//     gap: 12,
//     marginBottom: 16,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   detailContent: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   detailLabel: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 2,
//   },
//   detailValue: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 18,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   createdBy: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 12,
//     color: '#0077B6',
//   },
//   createdDate: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#999',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   modalTitle: {
//     fontFamily: 'Inter-Bold',
//     fontSize: 20,
//     color: '#333',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   formSection: {
//     marginTop: 24,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     paddingBottom: 8,
//     borderBottomWidth: 2,
//     borderBottomColor: '#E3F2FD',
//   },
//   sectionTitle: {
//     fontFamily: 'Inter-Bold',
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 8,
//   },
//   subSectionTitle: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#0077B6',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputRow: {
//     flexDirection: 'row',
//   },
//   label: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontFamily: 'Inter-Regular',
//     fontSize: 15,
//     color: '#333',
//     backgroundColor: '#FAFAFA',
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   pickerOption: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     backgroundColor: '#FAFAFA',
//   },
//   pickerOptionSelected: {
//     backgroundColor: '#0077B6',
//     borderColor: '#0077B6',
//   },
//   pickerText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 13,
//     color: '#666',
//   },
//   pickerTextSelected: {
//     color: '#fff',
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     gap: 12,
//   },
//   cancelButton: {
//     flex: 1,
//     height: 50,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 16,
//     color: '#666',
//   },
//   createButton: {
//     flex: 1,
//     height: 50,
//     borderRadius: 12,
//     backgroundColor: '#0077B6',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#fff',
//   },
//   fdiChartContainer: {
//     marginTop: 16,
//   },
//   teethSection: {
//     marginBottom: 20,
//   },
//   teethLabel: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   teethRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 4,
//   },
//   toothContainer: {
//     alignItems: 'center',
//     margin: 2,
//   },
//   toothNumber: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 10,
//     color: '#666',
//     marginBottom: 2,
//   },
//   toothInput: {
//     width: 35,
//     height: 35,
//     textAlign: 'center',
//     fontSize: 12,
//     fontFamily: 'Inter-SemiBold',
//     borderWidth: 1,
//     borderColor: '#0077B6',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   fdiReference: {
//     marginTop: 20,
//     padding: 16,
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   fdiReferenceTitle: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   fdiReferenceGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   fdiReferenceItem: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#666',
//     width: '48%',
//   },
//   bold: {
//     fontFamily: 'Inter-Bold',
//   },
//   photosSection: {
//     marginTop: 16,
//   },
//   addPhotoButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 119, 182, 0.1)',
//     borderRadius: 12,
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderWidth: 2,
//     borderColor: '#0077B6',
//     borderStyle: 'dashed',
//   },
//   addPhotoText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#0077B6',
//     marginLeft: 8,
//   },
//   photosGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginTop: 16,
//   },
//   photoContainer: {
//     position: 'relative',
//   },
//     backButton: {
//     padding: 8,
//     marginRight: 8,
//   },
//   photoPreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 12,
//     backgroundColor: '#f0f0f0',
//   },
//   removePhotoButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#FF5252',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// // new begining
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   Alert,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import {
//   Search,
//   Plus,
//   Trash2,
//   CreditCard as Edit3,
//   X,
//   User,
//   Heart,
//   FileText,
//   Eye,
//   Stethoscope,
//   Activity,
//   Clipboard,
//   Camera,
//   Grid3x3,
// } from 'lucide-react-native';
// import { useAuth } from '../../hooks/useAuth';
// import EmptyState from '@/components/common/EmptyState';
// import * as ImagePicker from 'expo-image-picker';
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   Timestamp,
//   onSnapshot,
// } from 'firebase/firestore';
// import { db, storage } from '../../services/firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// // Type Definitions
// interface HealthRecord {
//   id: string;
//   patientName: string;
//   age: number;
//   dateOfBirth: string;
//   sex: 'Male' | 'Female' | 'Other';
//   address: string;
//   chiefComplaint: string;
//   historyOfPresentIllness: string;
//   pastMedicalHistory: string;
//   pastDentalHistory: string;
//   oralHygieneProgram: string;
//   toothBrushingAid: string;
//   duration: string;
//   frequency: string;
//   technique: string;
//   toothPasteUsed: string;
//   otherOralHygieneAids: string;
//   abnormalOralHabits: string;
//   dietDiary: string;
//   vegNonVegMixed: string;
//   recall24Hour: string;
//   dietCounseling: string;
//   behaviourRatingScale: string;
//   behaviourManagement: string;
//   statureBuilt: string;
//   height: string;
//   weight: string;
//   gait: string;
//   speech: string;
//   temperature: string;
//   pulse: string;
//   bp: string;
//   headForm: string;
//   cephalicIndex: string;
//   faceShape: string;
//   faceProfile: string;
//   faceSymmetry: string;
//   faceHeight: string;
//   faceDivergence: string;
//   lymphNodes: string;
//   tmj: string;
//   mouthOpening: string;
//   swallow: string;
//   lipCompetence: string;
//   nasoLabialAngle: string;
//   chin: string;
//   lips: string;
//   labialBuccalMucosa: string;
//   frenum: string;
//   tongue: string;
//   palate: string;
//   floorOfMouth: string;
//   gingivaColor: string;
//   gingivaSize: string;
//   gingivaContour: string;
//   gingivaShape: string;
//   gingivaConsistency: string;
//   gingivaSurfaceTexture: string;
//   gingivaPosition: string;
//   gingivaStippling: string;
//   bleedingOnProbing: string;
//   periodontalEvaluation: string;
//   dentition: string;
//   teethNumber: string;
//   malformation: string;
//   teethPresent: string;
//   teethMissing: string;
//   dentalCaries: string;
//   deepCaries: string;
//   fracturedTeeth: string;
//   retainedTeeth: string;
//   mobility: string;
//   orthodonticProblem: string;
//   otherDentalAnomalies: string;
//   fluorosis: string;
//   primaryMolarLeft: string;
//   primaryMolarRight: string;
//   permanentMolarLeft: string;
//   permanentMolarRight: string;
//   overJet: string;
//   overBite: string;
//   otherMalocclusionFindings: string;
//   provisionalDiagnosis: string;
//   radiographicFindings: string;
//   pulpVitality: string;
//   finalDiagnosis: string;
//   treatmentPlan: string;
//   treatmentDone: string;
//   fdiChartData: Record<string, string>;
//   photos: string[];
//   createdDate: string;
//   createdBy: string;
//   patientId: string;
//   doctorId: string;
//   updatedAt: Timestamp;
// }

// interface FormData {
//   [key: string]: any;
//   photos: string[];
//   fdiChartData: Record<string, string>;
//   sex: 'Male' | 'Female' | 'Other';
// }

// const INITIAL_FORM_DATA: FormData = {
//   patientName: '',
//   age: '',
//   dateOfBirth: '',
//   sex: 'Male',
//   address: '',
//   chiefComplaint: '',
//   historyOfPresentIllness: '',
//   pastMedicalHistory: '',
//   pastDentalHistory: '',
//   oralHygieneProgram: '',
//   toothBrushingAid: '',
//   duration: '',
//   frequency: '',
//   technique: '',
//   toothPasteUsed: '',
//   otherOralHygieneAids: '',
//   abnormalOralHabits: '',
//   dietDiary: '',
//   vegNonVegMixed: '',
//   recall24Hour: '',
//   dietCounseling: '',
//   behaviourRatingScale: '',
//   behaviourManagement: '',
//   statureBuilt: '',
//   height: '',
//   weight: '',
//   gait: '',
//   speech: '',
//   temperature: '',
//   pulse: '',
//   bp: '',
//   headForm: '',
//   cephalicIndex: '',
//   faceShape: '',
//   faceProfile: '',
//   faceSymmetry: '',
//   faceHeight: '',
//   faceDivergence: '',
//   lymphNodes: '',
//   tmj: '',
//   mouthOpening: '',
//   swallow: '',
//   lipCompetence: '',
//   nasoLabialAngle: '',
//   chin: '',
//   lips: '',
//   labialBuccalMucosa: '',
//   frenum: '',
//   tongue: '',
//   palate: '',
//   floorOfMouth: '',
//   gingivaColor: '',
//   gingivaSize: '',
//   gingivaContour: '',
//   gingivaShape: '',
//   gingivaConsistency: '',
//   gingivaSurfaceTexture: '',
//   gingivaPosition: '',
//   gingivaStippling: '',
//   bleedingOnProbing: '',
//   periodontalEvaluation: '',
//   dentition: '',
//   teethNumber: '',
//   malformation: '',
//   teethPresent: '',
//   teethMissing: '',
//   dentalCaries: '',
//   deepCaries: '',
//   fracturedTeeth: '',
//   retainedTeeth: '',
//   mobility: '',
//   orthodonticProblem: '',
//   otherDentalAnomalies: '',
//   fluorosis: '',
//   primaryMolarLeft: '',
//   primaryMolarRight: '',
//   permanentMolarLeft: '',
//   permanentMolarRight: '',
//   overJet: '',
//   overBite: '',
//   otherMalocclusionFindings: '',
//   provisionalDiagnosis: '',
//   radiographicFindings: '',
//   pulpVitality: '',
//   finalDiagnosis: '',
//   treatmentPlan: '',
//   treatmentDone: '',
//   fdiChartData: {},
//   photos: [],
// };

// const TOOTH_STATUS_CODES: Record<string, { backgroundColor: string; color: string }> = {
//   D: { backgroundColor: '#e53935', color: '#fff' },
//   M: { backgroundColor: '#757575', color: '#fff' },
//   R: { backgroundColor: '#43a047', color: '#fff' },
//   RS: { backgroundColor: '#ff9800', color: '#fff' },
//   GD: { backgroundColor: '#8e24aa', color: '#fff' },
//   O: { backgroundColor: '#2196f3', color: '#fff' },
// };

// const FDI_CHART_TEETH = {
//   adultUpper: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
//   adultLower: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
//   childUpper: [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
//   childLower: [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
// };

// // Custom EmptyState wrapper that handles optional props
// interface EmptyStateWrapperProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   buttonText?: string;
//   onPress?: () => void;
// }

// const EmptyStateWrapper: React.FC<EmptyStateWrapperProps> = ({
//   icon,
//   title,
//   description,
//   buttonText,
//   onPress,
// }) => {
//   // Cast to any to bypass TypeScript errors if EmptyState doesn't support optional props
//   const emptyStateProps: any = {
//     icon,
//     title,
//     description,
//   };

//   if (buttonText) {
//     emptyStateProps.buttonText = buttonText;
//   }

//   if (onPress) {
//     emptyStateProps.onPress = onPress;
//   }

//   return <EmptyState {...emptyStateProps} />;
// };

// export default function HealthRecordScreen() {
//   const router = useRouter();
//   const { userData } = useAuth();
  
//   // User role and ID
//   const isDoctor = userData?.role === 'doctor';
//   const isPatient = userData?.role === 'patient';
//   const userId = userData?.uid || '';
//   const userName = userData?.name || userData?.email || 'Unknown';

//   // State
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);
//   const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

//   // Memoized values
//   const filteredRecords = useMemo(() => {
//     if (!searchQuery.trim()) return healthRecords;
    
//     const query = searchQuery.toLowerCase();
//     return healthRecords.filter((record) => {
//       return (
//         record.patientName.toLowerCase().includes(query) ||
//         record.chiefComplaint.toLowerCase().includes(query) ||
//         (record.finalDiagnosis && record.finalDiagnosis.toLowerCase().includes(query))
//       );
//     });
//   }, [healthRecords, searchQuery]);

//   const canEditRecord = useCallback((record: HealthRecord) => {
//     return isDoctor && record.doctorId === userId;
//   }, [isDoctor, userId]);

//   // Fetch health records
//   const fetchHealthRecords = useCallback(async () => {
//     if (!userId) return;

//     try {
//       const healthRecordsRef = collection(db, 'healthRecords');
//       let q;

//       if (isDoctor) {
//         q = query(
//           healthRecordsRef,
//           where('doctorId', '==', userId),
//           orderBy('updatedAt', 'desc')
//         );
//       } else if (isPatient) {
//         q = query(
//           healthRecordsRef,
//           where('patientId', '==', userId),
//           orderBy('updatedAt', 'desc')
//         );
//       } else {
//         return;
//       }

//       const querySnapshot = await getDocs(q);
//       const records = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         updatedAt: doc.data().updatedAt,
//       })) as HealthRecord[];
      
//       setHealthRecords(records);
//     } catch (error) {
//       console.error('Error fetching health records:', error);
//       Alert.alert('Error', 'Failed to fetch health records');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [userId, isDoctor, isPatient]);

//   // Setup real-time listener for doctors
//   useEffect(() => {
//     if (!isDoctor || !userId) {
//       fetchHealthRecords();
//       return;
//     }

//     const healthRecordsRef = collection(db, 'healthRecordshealthRecords');
//     const q = query(
//       healthRecordsRef,
//       where('doctorId', '==', userId),
//       orderBy('updatedAt', 'desc')
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const records = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           updatedAt: doc.data().updatedAt,
//         })) as HealthRecord[];
        
//         setHealthRecords(records);
//         setLoading(false);
//       },
//       (error) => {
//         console.error('Real-time listener error:', error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [userId, isDoctor, fetchHealthRecords]);

//   // Upload image to Firebase Storage
//   const uploadImage = useCallback(async (uri: string, recordId: string, index: number): Promise<string> => {
//     try {
//       const response = await fetch(uri);
//       const blob = await response.blob();
      
//       const fileName = `health-records/${recordId}/${Date.now()}_${index}.jpg`;
//       const storageRef = ref(storage, fileName);
      
//       await uploadBytes(storageRef, blob);
//       return await getDownloadURL(storageRef);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   }, []);

//   // Form handlers
//   const resetForm = useCallback(() => {
//     setFormData(INITIAL_FORM_DATA);
//     setEditingRecord(null);
//   }, []);

//   const handleCreateRecord = useCallback(async () => {
//     if (!formData.patientName.trim() || !formData.age.trim()) {
//       Alert.alert('Error', 'Please fill in at least Patient Name and Age');
//       return;
//     }

//     if (!isDoctor) {
//       Alert.alert('Error', 'Only doctors can create health records');
//       return;
//     }

//     try {
//       setUploading(true);
      
//       const recordId = editingRecord ? editingRecord.id : Date.now().toString();
//       let uploadedPhotos: string[] = [];

//       // Upload photos if any
//       if (formData.photos.length > 0) {
//         const uploadPromises = formData.photos.map((photo, index) => {
//           if (photo.startsWith('http')) return photo;
//           return uploadImage(photo, recordId, index);
//         });
//         uploadedPhotos = await Promise.all(uploadPromises);
//       }

//       const healthRecordData = {
//         patientName: formData.patientName.trim(),
//         age: parseInt(formData.age) || 0,
//         dateOfBirth: formData.dateOfBirth.trim(),
//         sex: formData.sex,
//         address: formData.address.trim(),
//         chiefComplaint: formData.chiefComplaint.trim(),
//         historyOfPresentIllness: formData.historyOfPresentIllness.trim(),
//         pastMedicalHistory: formData.pastMedicalHistory.trim(),
//         pastDentalHistory: formData.pastDentalHistory.trim(),
//         oralHygieneProgram: formData.oralHygieneProgram.trim(),
//         toothBrushingAid: formData.toothBrushingAid.trim(),
//         duration: formData.duration.trim(),
//         frequency: formData.frequency.trim(),
//         technique: formData.technique.trim(),
//         toothPasteUsed: formData.toothPasteUsed.trim(),
//         otherOralHygieneAids: formData.otherOralHygieneAids.trim(),
//         abnormalOralHabits: formData.abnormalOralHabits.trim(),
//         dietDiary: formData.dietDiary.trim(),
//         vegNonVegMixed: formData.vegNonVegMixed.trim(),
//         recall24Hour: formData.recall24Hour.trim(),
//         dietCounseling: formData.dietCounseling.trim(),
//         behaviourRatingScale: formData.behaviourRatingScale.trim(),
//         behaviourManagement: formData.behaviourManagement.trim(),
//         statureBuilt: formData.statureBuilt.trim(),
//         height: formData.height.trim(),
//         weight: formData.weight.trim(),
//         gait: formData.gait.trim(),
//         speech: formData.speech.trim(),
//         temperature: formData.temperature.trim(),
//         pulse: formData.pulse.trim(),
//         bp: formData.bp.trim(),
//         headForm: formData.headForm.trim(),
//         cephalicIndex: formData.cephalicIndex.trim(),
//         faceShape: formData.faceShape.trim(),
//         faceProfile: formData.faceProfile.trim(),
//         faceSymmetry: formData.faceSymmetry.trim(),
//         faceHeight: formData.faceHeight.trim(),
//         faceDivergence: formData.faceDivergence.trim(),
//         lymphNodes: formData.lymphNodes.trim(),
//         tmj: formData.tmj.trim(),
//         mouthOpening: formData.mouthOpening.trim(),
//         swallow: formData.swallow.trim(),
//         lipCompetence: formData.lipCompetence.trim(),
//         nasoLabialAngle: formData.nasoLabialAngle.trim(),
//         chin: formData.chin.trim(),
//         lips: formData.lips.trim(),
//         labialBuccalMucosa: formData.labialBuccalMucosa.trim(),
//         frenum: formData.frenum.trim(),
//         tongue: formData.tongue.trim(),
//         palate: formData.palate.trim(),
//         floorOfMouth: formData.floorOfMouth.trim(),
//         gingivaColor: formData.gingivaColor.trim(),
//         gingivaSize: formData.gingivaSize.trim(),
//         gingivaContour: formData.gingivaContour.trim(),
//         gingivaShape: formData.gingivaShape.trim(),
//         gingivaConsistency: formData.gingivaConsistency.trim(),
//         gingivaSurfaceTexture: formData.gingivaSurfaceTexture.trim(),
//         gingivaPosition: formData.gingivaPosition.trim(),
//         gingivaStippling: formData.gingivaStippling.trim(),
//         bleedingOnProbing: formData.bleedingOnProbing.trim(),
//         periodontalEvaluation: formData.periodontalEvaluation.trim(),
//         dentition: formData.dentition.trim(),
//         teethNumber: formData.teethNumber.trim(),
//         malformation: formData.malformation.trim(),
//         teethPresent: formData.teethPresent.trim(),
//         teethMissing: formData.teethMissing.trim(),
//         dentalCaries: formData.dentalCaries.trim(),
//         deepCaries: formData.deepCaries.trim(),
//         fracturedTeeth: formData.fracturedTeeth.trim(),
//         retainedTeeth: formData.retainedTeeth.trim(),
//         mobility: formData.mobility.trim(),
//         orthodonticProblem: formData.orthodonticProblem.trim(),
//         otherDentalAnomalies: formData.otherDentalAnomalies.trim(),
//         fluorosis: formData.fluorosis.trim(),
//         primaryMolarLeft: formData.primaryMolarLeft.trim(),
//         primaryMolarRight: formData.primaryMolarRight.trim(),
//         permanentMolarLeft: formData.permanentMolarLeft.trim(),
//         permanentMolarRight: formData.permanentMolarRight.trim(),
//         overJet: formData.overJet.trim(),
//         overBite: formData.overBite.trim(),
//         otherMalocclusionFindings: formData.otherMalocclusionFindings.trim(),
//         provisionalDiagnosis: formData.provisionalDiagnosis.trim(),
//         radiographicFindings: formData.radiographicFindings.trim(),
//         pulpVitality: formData.pulpVitality.trim(),
//         finalDiagnosis: formData.finalDiagnosis.trim(),
//         treatmentPlan: formData.treatmentPlan.trim(),
//         treatmentDone: formData.treatmentDone.trim(),
//         fdiChartData: formData.fdiChartData,
//         photos: uploadedPhotos,
//         createdDate: editingRecord ? editingRecord.createdDate : new Date().toISOString().split('T')[0],
//         createdBy: userName,
//         doctorId: userId,
//         patientId: isPatient ? userId : `patient_${Date.now()}`,
//         updatedAt: Timestamp.now(),
//       };

//       if (editingRecord) {
//         const recordRef = doc(db, 'healthRecords', editingRecord.id);
//         await updateDoc(recordRef, healthRecordData);
//         Alert.alert('Success', 'Health record updated successfully');
//       } else {
//         await addDoc(collection(db, 'healthRecords'), healthRecordData);
//         Alert.alert('Success', 'Health record created successfully');
//       }

//       setShowCreateModal(false);
//       resetForm();
      
//       // Refresh if not using real-time updates
//       if (!isDoctor) {
//         fetchHealthRecords();
//       }
//     } catch (error) {
//       console.error('Error saving health record:', error);
//       Alert.alert('Error', 'Failed to save health record. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   }, [formData, editingRecord, isDoctor, isPatient, userId, userName, uploadImage, fetchHealthRecords, resetForm]);

//   const handleEditRecord = useCallback((record: HealthRecord) => {
//     if (!canEditRecord(record)) {
//       Alert.alert('Error', 'You can only edit records you created');
//       return;
//     }

//     setEditingRecord(record);
//     setFormData({
//       ...INITIAL_FORM_DATA,
//       patientName: record.patientName,
//       age: record.age.toString(),
//       dateOfBirth: record.dateOfBirth,
//       sex: record.sex,
//       address: record.address,
//       chiefComplaint: record.chiefComplaint,
//       historyOfPresentIllness: record.historyOfPresentIllness,
//       pastMedicalHistory: record.pastMedicalHistory,
//       pastDentalHistory: record.pastDentalHistory,
//       oralHygieneProgram: record.oralHygieneProgram,
//       toothBrushingAid: record.toothBrushingAid,
//       duration: record.duration,
//       frequency: record.frequency,
//       technique: record.technique,
//       toothPasteUsed: record.toothPasteUsed,
//       otherOralHygieneAids: record.otherOralHygieneAids,
//       abnormalOralHabits: record.abnormalOralHabits,
//       dietDiary: record.dietDiary,
//       vegNonVegMixed: record.vegNonVegMixed,
//       recall24Hour: record.recall24Hour,
//       dietCounseling: record.dietCounseling,
//       behaviourRatingScale: record.behaviourRatingScale,
//       behaviourManagement: record.behaviourManagement,
//       statureBuilt: record.statureBuilt,
//       height: record.height,
//       weight: record.weight,
//       gait: record.gait,
//       speech: record.speech,
//       temperature: record.temperature,
//       pulse: record.pulse,
//       bp: record.bp,
//       headForm: record.headForm,
//       cephalicIndex: record.cephalicIndex,
//       faceShape: record.faceShape,
//       faceProfile: record.faceProfile,
//       faceSymmetry: record.faceSymmetry,
//       faceHeight: record.faceHeight,
//       faceDivergence: record.faceDivergence,
//       lymphNodes: record.lymphNodes,
//       tmj: record.tmj,
//       mouthOpening: record.mouthOpening,
//       swallow: record.swallow,
//       lipCompetence: record.lipCompetence,
//       nasoLabialAngle: record.nasoLabialAngle,
//       chin: record.chin,
//       lips: record.lips,
//       labialBuccalMucosa: record.labialBuccalMucosa,
//       frenum: record.frenum,
//       tongue: record.tongue,
//       palate: record.palate,
//       floorOfMouth: record.floorOfMouth,
//       gingivaColor: record.gingivaColor,
//       gingivaSize: record.gingivaSize,
//       gingivaContour: record.gingivaContour,
//       gingivaShape: record.gingivaShape,
//       gingivaConsistency: record.gingivaConsistency,
//       gingivaSurfaceTexture: record.gingivaSurfaceTexture,
//       gingivaPosition: record.gingivaPosition,
//       gingivaStippling: record.gingivaStippling,
//       bleedingOnProbing: record.bleedingOnProbing,
//       periodontalEvaluation: record.periodontalEvaluation,
//       dentition: record.dentition,
//       teethNumber: record.teethNumber,
//       malformation: record.malformation,
//       teethPresent: record.teethPresent,
//       teethMissing: record.teethMissing,
//       dentalCaries: record.dentalCaries,
//       deepCaries: record.deepCaries,
//       fracturedTeeth: record.fracturedTeeth,
//       retainedTeeth: record.retainedTeeth,
//       mobility: record.mobility,
//       orthodonticProblem: record.orthodonticProblem,
//       otherDentalAnomalies: record.otherDentalAnomalies,
//       fluorosis: record.fluorosis,
//       primaryMolarLeft: record.primaryMolarLeft,
//       primaryMolarRight: record.primaryMolarRight,
//       permanentMolarLeft: record.permanentMolarLeft,
//       permanentMolarRight: record.permanentMolarRight,
//       overJet: record.overJet,
//       overBite: record.overBite,
//       otherMalocclusionFindings: record.otherMalocclusionFindings,
//       provisionalDiagnosis: record.provisionalDiagnosis,
//       radiographicFindings: record.radiographicFindings,
//       pulpVitality: record.pulpVitality,
//       finalDiagnosis: record.finalDiagnosis,
//       treatmentPlan: record.treatmentPlan,
//       treatmentDone: record.treatmentDone,
//       fdiChartData: record.fdiChartData || {},
//       photos: record.photos || [],
//     });
//     setShowCreateModal(true);
//   }, [canEditRecord]);

//   const handleDeleteRecord = useCallback(async (id: string, doctorId: string) => {
//     if (!isDoctor || doctorId !== userId) {
//       Alert.alert('Error', 'You can only delete records you created');
//       return;
//     }

//     Alert.alert(
//       'Delete Health Record',
//       'Are you sure you want to delete this health record?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await deleteDoc(doc(db, 'healthRecords', id));
//               Alert.alert('Success', 'Health record deleted successfully');
//             } catch (error) {
//               console.error('Error deleting health record:', error);
//               Alert.alert('Error', 'Failed to delete health record');
//             }
//           },
//         },
//       ]
//     );
//   }, [isDoctor, userId]);

//   // FDI Chart Handlers
//   const handleFDIToothChange = useCallback((toothNumber: string, value: string) => {
//     const upperValue = value.toUpperCase().slice(0, 2);
//     setFormData(prev => ({
//       ...prev,
//       fdiChartData: {
//         ...prev.fdiChartData,
//         [toothNumber]: upperValue,
//       },
//     }));
//   }, []);

//   const getToothStyle = useCallback((value: string) => {
//     const style = TOOTH_STATUS_CODES[value as keyof typeof TOOTH_STATUS_CODES];
//     return style || { backgroundColor: '#fff', color: '#333' };
//   }, []);

//   const renderFDIChart = useCallback(() => {
//     const renderTeethRow = (teeth: number[], label: string) => (
//       <View style={styles.teethSection}>
//         <Text style={styles.teethLabel}>{label}</Text>
//         <View style={styles.teethRow}>
//           {teeth.map((toothNumber) => (
//             <View key={toothNumber} style={styles.toothContainer}>
//               <Text style={styles.toothNumber}>{toothNumber}</Text>
//               <TextInput
//                 style={[
//                   styles.toothInput,
//                   getToothStyle(formData.fdiChartData[toothNumber.toString()] || ''),
//                 ]}
//                 value={formData.fdiChartData[toothNumber.toString()] || ''}
//                 onChangeText={(value) => handleFDIToothChange(toothNumber.toString(), value)}
//                 maxLength={2}
//                 placeholder=""
//                 placeholderTextColor="#999"
//               />
//             </View>
//           ))}
//         </View>
//       </View>
//     );

//     return (
//       <View style={styles.fdiChartContainer}>
//         {renderTeethRow(FDI_CHART_TEETH.adultUpper, 'Upper Jaw – Adult Teeth')}
//         {renderTeethRow(FDI_CHART_TEETH.childUpper, 'Upper Jaw – Child Teeth')}
//         {renderTeethRow(FDI_CHART_TEETH.childLower, 'Lower Jaw – Child Teeth')}
//         {renderTeethRow(FDI_CHART_TEETH.adultLower, 'Lower Jaw – Adult Teeth')}

//         <View style={styles.fdiReference}>
//           <Text style={styles.fdiReferenceTitle}>Status Reference:</Text>
//           <View style={styles.fdiReferenceGrid}>
//             {Object.entries(TOOTH_STATUS_CODES).map(([code, style]) => (
//               <Text key={code} style={styles.fdiReferenceItem}>
//                 <Text style={[styles.bold, { color: style.backgroundColor }]}>{code}</Text> –{' '}
//                 {code === 'D' && 'Decayed'}
//                 {code === 'M' && 'Missing'}
//                 {code === 'R' && 'Restored'}
//                 {code === 'RS' && 'Root Stump'}
//                 {code === 'GD' && 'Grossly Decayed'}
//                 {code === 'O' && 'Others'}
//               </Text>
//             ))}
//           </View>
//         </View>
//       </View>
//     );
//   }, [formData.fdiChartData, getToothStyle, handleFDIToothChange]);

//   // Image Handlers
//   const handleImagePicker = useCallback(() => {
//     Alert.alert('Select Photo', 'Choose how you want to add a photo', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Camera', onPress: openCamera },
//       { text: 'Gallery', onPress: openGallery },
//     ]);
//   }, []);

//   const openCamera = useCallback(async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission needed', 'Camera permission is required to take photos');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled && result.assets[0]) {
//       setFormData(prev => ({
//         ...prev,
//         photos: [...prev.photos, result.assets[0].uri],
//       }));
//     }
//   }, []);

//   const openGallery = useCallback(async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission needed', 'Gallery permission is required to select photos');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled && result.assets[0]) {
//       setFormData(prev => ({
//         ...prev,
//         photos: [...prev.photos, result.assets[0].uri],
//       }));
//     }
//   }, []);

//   const removePhoto = useCallback((index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//   }, []);

//   // Render functions
//   const renderRecordCard = useCallback(({ item }: { item: HealthRecord }) => (
//     <View style={styles.recordCard}>
//       <View style={styles.cardHeader}>
//         <View style={styles.patientInfo}>
//           <Text style={styles.patientName}>{item.patientName}</Text>
//           <Text style={styles.patientDetails}>
//             {item.age} years • {item.sex} • DOB: {item.dateOfBirth}
//           </Text>
//           <Text style={styles.address} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//         {canEditRecord(item) && (
//           <View style={styles.cardActions}>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleEditRecord(item)}
//             >
//               <Edit3 size={16} color="#0077B6" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleDeleteRecord(item.id, item.doctorId)}
//             >
//               <Trash2 size={16} color="#FF5252" />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       <View style={styles.recordDetails}>
//         <View style={styles.detailRow}>
//           <Heart size={16} color="#FF6B6B" />
//           <View style={styles.detailContent}>
//             <Text style={styles.detailLabel}>Chief Complaint</Text>
//             <Text style={styles.detailValue} numberOfLines={2}>
//               {item.chiefComplaint || 'Not specified'}
//             </Text>
//           </View>
//         </View>

//         {Object.keys(item.fdiChartData || {}).length > 0 && (
//           <View style={styles.detailRow}>
//             <Clipboard size={16} color="#45B7D1" />
//             <View style={styles.detailContent}>
//               <Text style={styles.detailLabel}>Clinical Findings</Text>
//               <Text style={styles.detailValue} numberOfLines={2}>
//                 {Object.entries(item.fdiChartData)
//                   .map(([tooth, status]) => `${tooth}: ${status}`)
//                   .join(', ')}
//               </Text>
//             </View>
//           </View>
//         )}

//         {item.finalDiagnosis && (
//           <View style={styles.detailRow}>
//             <Stethoscope size={16} color="#4ECDC4" />
//             <View style={styles.detailContent}>
//               <Text style={styles.detailLabel}>Final Diagnosis</Text>
//               <Text style={styles.detailValue} numberOfLines={2}>
//                 {item.finalDiagnosis}
//               </Text>
//             </View>
//           </View>
//         )}

//         {item.treatmentPlan && (
//           <View style={styles.detailRow}>
//             <Clipboard size={16} color="#45B7D1" />
//             <View style={styles.detailContent}>
//               <Text style={styles.detailLabel}>Treatment Plan</Text>
//               <Text style={styles.detailValue} numberOfLines={2}>
//                 {item.treatmentPlan}
//               </Text>
//             </View>
//           </View>
//         )}

//         {item.photos && item.photos.length > 0 && (
//           <View style={styles.detailRow}>
//             <Camera size={16} color="#FF9800" />
//             <View style={styles.detailContent}>
//               <Text style={styles.detailLabel}>Photos</Text>
//               <Text style={styles.detailValue}>
//                 {item.photos.length} photo(s) attached
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>

//       <View style={styles.cardFooter}>
//         <Text style={styles.createdBy}>Created by: {item.createdBy}</Text>
//         <Text style={styles.createdDate}>
//           {item.updatedAt?.toDate?.().toLocaleDateString() || new Date(item.createdDate).toLocaleDateString()}
//         </Text>
//       </View>
//     </View>
//   ), [canEditRecord, handleEditRecord, handleDeleteRecord]);

//   const renderFormSection = useCallback((
//     title: string,
//     icon: React.ReactNode,
//     children: React.ReactNode
//   ) => (
//     <View style={styles.formSection}>
//       <View style={styles.sectionHeader}>
//         {icon}
//         <Text style={styles.sectionTitle}>{title}</Text>
//       </View>
//       {children}
//     </View>
//   ), []);

//   const renderInput = useCallback((
//     label: string,
//     value: string,
//     onChangeText: (text: string) => void,
//     multiline = false,
//     placeholder?: string
//   ) => (
//     <View style={styles.inputGroup}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         style={[styles.input, multiline && styles.textArea]}
//         placeholder={placeholder || `Enter ${label.toLowerCase()}`}
//         value={value}
//         onChangeText={onChangeText}
//         multiline={multiline}
//         numberOfLines={multiline ? 3 : 1}
//         placeholderTextColor="#999"
//       />
//     </View>
//   ), []);

//   const handleRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchHealthRecords();
//   }, [fetchHealthRecords]);

//   // Loading state
//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#0077B6" />
//         <Text style={styles.loadingText}>Loading health records...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Health Records</Text>
//         {isDoctor && (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => setShowCreateModal(true)}
//           >
//             <Plus size={20} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Search size={20} color="#999" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search health records..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//         </View>
//       </View>

//       {filteredRecords.length > 0 ? (
//         <FlatList
//           data={filteredRecords}
//           renderItem={renderRecordCard}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.recordsList}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//           }
//         />
//       ) : (
//         <View style={styles.emptyStateContainer}>
//           <EmptyStateWrapper
//             icon={<FileText size={60} color="#ccc" />}
//             title="No health records found"
//             description={
//               searchQuery
//                 ? 'No records match your search'
//                 : isDoctor
//                 ? 'Create your first health record'
//                 : 'No health records available'
//             }
//             buttonText={isDoctor ? 'Create Health Record' : undefined}
//             onPress={isDoctor ? () => setShowCreateModal(true) : undefined}
//           />
//         </View>
//       )}

//       {/* Create/Edit Health Record Modal */}
//       <Modal
//         visible={showCreateModal}
//         animationType="slide"
//         presentationStyle="pageSheet"
//         onRequestClose={() => {
//           setShowCreateModal(false);
//           resetForm();
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>
//               {editingRecord ? 'Edit Health Record' : 'Create Health Record'}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => {
//                 setShowCreateModal(false);
//                 resetForm();
//               }}
//               disabled={uploading}
//             >
//               <X size={24} color="#333" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             style={styles.modalContent}
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Demographic Details */}
//             {renderFormSection(
//               'DEMOGRAPHIC DETAILS',
//               <User size={20} color="#0077B6" />,
//               <>
//                 {renderInput(
//                   'Name of the Patient',
//                   formData.patientName,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, patientName: text }))
//                 )}

//                 <View style={styles.inputRow}>
//                   <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
//                     {renderInput('Age', formData.age, (text) =>
//                       setFormData(prev => ({ ...prev, age: text }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput(
//                       'Date of Birth',
//                       formData.dateOfBirth,
//                       (text) =>
//                         setFormData(prev => ({ ...prev, dateOfBirth: text })),
//                       false,
//                       'YYYY-MM-DD'
//                     )}
//                   </View>
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Sex</Text>
//                   <View style={styles.pickerContainer}>
//                     {(['Male', 'Female', 'Other'] as const).map((sex) => (
//                       <TouchableOpacity
//                         key={sex}
//                         style={[
//                           styles.pickerOption,
//                           formData.sex === sex && styles.pickerOptionSelected,
//                         ]}
//                         onPress={() =>
//                           setFormData(prev => ({ ...prev, sex }))
//                         }
//                       >
//                         <Text
//                           style={[
//                             styles.pickerText,
//                             formData.sex === sex && styles.pickerTextSelected,
//                           ]}
//                         >
//                           {sex}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 {renderInput(
//                   'Address',
//                   formData.address,
//                   (text) => setFormData(prev => ({ ...prev, address: text })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Chief Complaint & History */}
//             {renderFormSection(
//               'CHIEF COMPLAINT & HISTORY',
//               <Heart size={20} color="#FF6B6B" />,
//               <>
//                 {renderInput(
//                   'Chief Complaint of the Patient',
//                   formData.chiefComplaint,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, chiefComplaint: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'History of Present Illness',
//                   formData.historyOfPresentIllness,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       historyOfPresentIllness: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Past Medical History',
//                   formData.pastMedicalHistory,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       pastMedicalHistory: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Past Dental History',
//                   formData.pastDentalHistory,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       pastDentalHistory: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Personal History */}
//             {renderFormSection(
//               'PERSONAL HISTORY',
//               <User size={20} color="#8E24AA" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Oral Hygiene Program:
//                 </Text>
//                 {renderInput(
//                   'Oral Hygiene Program',
//                   formData.oralHygieneProgram,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       oralHygieneProgram: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Tooth Brushing Aid',
//                   formData.toothBrushingAid,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, toothBrushingAid: text }))
//                 )}
//                 {renderInput('Duration', formData.duration, (text) =>
//                   setFormData(prev => ({ ...prev, duration: text }))
//                 )}
//                 {renderInput('Frequency', formData.frequency, (text) =>
//                   setFormData(prev => ({ ...prev, frequency: text }))
//                 )}
//                 {renderInput('Technique', formData.technique, (text) =>
//                   setFormData(prev => ({ ...prev, technique: text }))
//                 )}
//                 {renderInput(
//                   'Tooth Paste Used',
//                   formData.toothPasteUsed,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, toothPasteUsed: text }))
//                 )}
//                 {renderInput(
//                   'Other Oral Hygiene Aids',
//                   formData.otherOralHygieneAids,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       otherOralHygieneAids: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Abnormal Oral Habits',
//                   formData.abnormalOralHabits,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       abnormalOralHabits: text,
//                     })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Diet History:</Text>
//                 {renderInput(
//                   'Diet Diary / Snacking Habit',
//                   formData.dietDiary,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, dietDiary: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Veg / Non-veg / Mixed',
//                   formData.vegNonVegMixed,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, vegNonVegMixed: text }))
//                 )}
//                 {renderInput(
//                   '24 Hour Recall Period',
//                   formData.recall24Hour,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, recall24Hour: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Diet Counseling',
//                   formData.dietCounseling,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, dietCounseling: text })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Behaviour Rating:</Text>
//                 {renderInput(
//                   'Behaviour Rating Scale',
//                   formData.behaviourRatingScale,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       behaviourRatingScale: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Behaviour Management',
//                   formData.behaviourManagement,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       behaviourManagement: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* General Examination */}
//             {renderFormSection(
//               'EXAMINATION OF PATIENT - GENERAL',
//               <Activity size={20} color="#4CAF50" />,
//               <>
//                 <Text style={styles.subSectionTitle}>General Examination:</Text>
//                 {renderInput('Stature / Built', formData.statureBuilt, (text) =>
//                   setFormData(prev => ({ ...prev, statureBuilt: text }))
//                 )}
//                 {renderInput('Height', formData.height, (text) =>
//                   setFormData(prev => ({ ...prev, height: text }))
//                 )}
//                 {renderInput('Weight', formData.weight, (text) =>
//                   setFormData(prev => ({ ...prev, weight: text }))
//                 )}
//                 {renderInput('Gait', formData.gait, (text) =>
//                   setFormData(prev => ({ ...prev, gait: text }))
//                 )}
//                 {renderInput('Speech', formData.speech, (text) =>
//                   setFormData(prev => ({ ...prev, speech: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Vital Signs:</Text>
//                 {renderInput('Temperature', formData.temperature, (text) =>
//                   setFormData(prev => ({ ...prev, temperature: text }))
//                 )}
//                 {renderInput('Pulse', formData.pulse, (text) =>
//                   setFormData(prev => ({ ...prev, pulse: text }))
//                 )}
//                 {renderInput('BP', formData.bp, (text) =>
//                   setFormData(prev => ({ ...prev, bp: text }))
//                 )}
//               </>
//             )}

//             {/* Extra Oral Examination */}
//             {renderFormSection(
//               'EXTRA ORAL EXAMINATION',
//               <Eye size={20} color="#FF9800" />,
//               <>
//                 <Text style={styles.subSectionTitle}>Head:</Text>
//                 {renderInput('Form', formData.headForm, (text) =>
//                   setFormData(prev => ({ ...prev, headForm: text }))
//                 )}
//                 {renderInput('Cephalic Index', formData.cephalicIndex, (text) =>
//                   setFormData(prev => ({ ...prev, cephalicIndex: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Face:</Text>
//                 {renderInput('Shape', formData.faceShape, (text) =>
//                   setFormData(prev => ({ ...prev, faceShape: text }))
//                 )}
//                 {renderInput('Profile', formData.faceProfile, (text) =>
//                   setFormData(prev => ({ ...prev, faceProfile: text }))
//                 )}
//                 {renderInput('Symmetry', formData.faceSymmetry, (text) =>
//                   setFormData(prev => ({ ...prev, faceSymmetry: text }))
//                 )}
//                 {renderInput('Height', formData.faceHeight, (text) =>
//                   setFormData(prev => ({ ...prev, faceHeight: text }))
//                 )}
//                 {renderInput('Divergence', formData.faceDivergence, (text) =>
//                   setFormData(prev => ({ ...prev, faceDivergence: text }))
//                 )}
//                 {renderInput('Lymph Nodes', formData.lymphNodes, (text) =>
//                   setFormData(prev => ({ ...prev, lymphNodes: text }))
//                 )}
//                 {renderInput('TMJ', formData.tmj, (text) =>
//                   setFormData(prev => ({ ...prev, tmj: text }))
//                 )}
//                 {renderInput('Mouth Opening', formData.mouthOpening, (text) =>
//                   setFormData(prev => ({ ...prev, mouthOpening: text }))
//                 )}
//                 {renderInput('Swallow', formData.swallow, (text) =>
//                   setFormData(prev => ({ ...prev, swallow: text }))
//                 )}
//                 {renderInput('Lip Competence', formData.lipCompetence, (text) =>
//                   setFormData(prev => ({ ...prev, lipCompetence: text }))
//                 )}
//                 {renderInput(
//                   'Naso Labial Angle',
//                   formData.nasoLabialAngle,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, nasoLabialAngle: text }))
//                 )}
//                 {renderInput('Chin', formData.chin, (text) =>
//                   setFormData(prev => ({ ...prev, chin: text }))
//                 )}
//               </>
//             )}

//             {/* Intra Oral Examination */}
//             {renderFormSection(
//               'INTRA ORAL EXAMINATION',
//               <Stethoscope size={20} color="#2196F3" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Soft Tissue Examination:
//                 </Text>
//                 {renderInput('Lips', formData.lips, (text) =>
//                   setFormData(prev => ({ ...prev, lips: text }))
//                 )}
//                 {renderInput(
//                   'Labial and Buccal Mucosa',
//                   formData.labialBuccalMucosa,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       labialBuccalMucosa: text,
//                     }))
//                 )}
//                 {renderInput('Frenum', formData.frenum, (text) =>
//                   setFormData(prev => ({ ...prev, frenum: text }))
//                 )}
//                 {renderInput('Tongue', formData.tongue, (text) =>
//                   setFormData(prev => ({ ...prev, tongue: text }))
//                 )}
//                 {renderInput('Palate', formData.palate, (text) =>
//                   setFormData(prev => ({ ...prev, palate: text }))
//                 )}
//                 {renderInput(
//                   'Floor of the Mouth',
//                   formData.floorOfMouth,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, floorOfMouth: text }))
//                 )}

//                 <Text style={styles.subSectionTitle}>Gingiva:</Text>
//                 {renderInput('Color', formData.gingivaColor, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaColor: text }))
//                 )}
//                 {renderInput('Size', formData.gingivaSize, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaSize: text }))
//                 )}
//                 {renderInput('Contour', formData.gingivaContour, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaContour: text }))
//                 )}
//                 {renderInput('Shape', formData.gingivaShape, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaShape: text }))
//                 )}
//                 {renderInput(
//                   'Consistency',
//                   formData.gingivaConsistency,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       gingivaConsistency: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Surface Texture',
//                   formData.gingivaSurfaceTexture,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       gingivaSurfaceTexture: text,
//                     }))
//                 )}
//                 {renderInput('Position', formData.gingivaPosition, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaPosition: text }))
//                 )}
//                 {renderInput('Stippling', formData.gingivaStippling, (text) =>
//                   setFormData(prev => ({ ...prev, gingivaStippling: text }))
//                 )}
//                 {renderInput(
//                   'Bleeding on Probing',
//                   formData.bleedingOnProbing,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       bleedingOnProbing: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Periodontal Evaluation',
//                   formData.periodontalEvaluation,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       periodontalEvaluation: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Hard Tissue Examination */}
//             {renderFormSection(
//               'HARD TISSUE EXAMINATION',
//               <Clipboard size={20} color="#795548" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Examination of Teeth:
//                 </Text>
//                 {renderFormSection(
//                   'FDI CHART',
//                   <Grid3x3 size={20} color="#607D8B" />,
//                   renderFDIChart()
//                 )}

//                 {renderInput('Dentition', formData.dentition, (text) =>
//                   setFormData(prev => ({ ...prev, dentition: text }))
//                 )}
//                 {renderInput('Number', formData.teethNumber, (text) =>
//                   setFormData(prev => ({ ...prev, teethNumber: text }))
//                 )}
//                 {renderInput('Malformation', formData.malformation, (text) =>
//                   setFormData(prev => ({ ...prev, malformation: text }))
//                 )}
//                 {renderInput(
//                   'Teeth Present',
//                   formData.teethPresent,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, teethPresent: text })),
//                   true
//                 )}
//                 {renderInput('Teeth Missing', formData.teethMissing, (text) =>
//                   setFormData(prev => ({ ...prev, teethMissing: text }))
//                 )}
//                 {renderInput('Dental Caries', formData.dentalCaries, (text) =>
//                   setFormData(prev => ({ ...prev, dentalCaries: text }))
//                 )}
//                 {renderInput(
//                   'Deep Caries / Grossly Decayed Teeth',
//                   formData.deepCaries,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, deepCaries: text }))
//                 )}
//                 {renderInput(
//                   'Fractured Teeth',
//                   formData.fracturedTeeth,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, fracturedTeeth: text }))
//                 )}
//                 {renderInput('Retained Teeth', formData.retainedTeeth, (text) =>
//                   setFormData(prev => ({ ...prev, retainedTeeth: text }))
//                 )}
//                 {renderInput('Mobility', formData.mobility, (text) =>
//                   setFormData(prev => ({ ...prev, mobility: text }))
//                 )}
//                 {renderInput(
//                   'Orthodontic Problem',
//                   formData.orthodonticProblem,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       orthodonticProblem: text,
//                     }))
//                 )}
//                 {renderInput(
//                   'Other Dental Anomalies',
//                   formData.otherDentalAnomalies,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       otherDentalAnomalies: text,
//                     }))
//                 )}
//                 {renderInput('Fluorosis', formData.fluorosis, (text) =>
//                   setFormData(prev => ({ ...prev, fluorosis: text }))
//                 )}
//               </>
//             )}

//             {/* Occlusal Relationship */}
//             {renderFormSection(
//               'OCCLUSAL RELATIONSHIP',
//               <Activity size={20} color="#9C27B0" />,
//               <>
//                 <Text style={styles.subSectionTitle}>
//                   Primary Molar Relation:
//                 </Text>
//                 <View style={styles.inputRow}>
//                   <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
//                     {renderInput('Left', formData.primaryMolarLeft, (text) =>
//                       setFormData(prev => ({
//                         ...prev,
//                         primaryMolarLeft: text,
//                       }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput('Right', formData.primaryMolarRight, (text) =>
//                       setFormData(prev => ({
//                         ...prev,
//                         primaryMolarRight: text,
//                       }))
//                     )}
//                   </View>
//                 </View>

//                 <Text style={styles.subSectionTitle}>
//                   Permanent Molar Relation:
//                 </Text>
//                 <View style={styles.inputRow}>
//                   <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
//                     {renderInput('Left', formData.permanentMolarLeft, (text) =>
//                       setFormData(prev => ({
//                         ...prev,
//                         permanentMolarLeft: text,
//                       }))
//                     )}
//                   </View>
//                   <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
//                     {renderInput(
//                       'Right',
//                       formData.permanentMolarRight,
//                       (text) =>
//                         setFormData(prev => ({
//                           ...prev,
//                           permanentMolarRight: text,
//                         }))
//                     )}
//                   </View>
//                 </View>

//                 {renderInput('Over Jet', formData.overJet, (text) =>
//                   setFormData(prev => ({ ...prev, overJet: text }))
//                 )}
//                 {renderInput('Over Bite', formData.overBite, (text) =>
//                   setFormData(prev => ({ ...prev, overBite: text }))
//                 )}
//                 {renderInput(
//                   'Other Malocclusion Findings',
//                   formData.otherMalocclusionFindings,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       otherMalocclusionFindings: text,
//                     })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Diagnosis & Treatment */}
//             {renderFormSection(
//               'DIAGNOSIS & TREATMENT',
//               <FileText size={20} color="#E91E63" />,
//               <>
//                 {renderInput(
//                   'Provisional Diagnosis',
//                   formData.provisionalDiagnosis,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       provisionalDiagnosis: text,
//                     })),
//                   true
//                 )}

//                 <Text style={styles.subSectionTitle}>Investigations:</Text>
//                 {renderInput(
//                   'Radiographic Findings',
//                   formData.radiographicFindings,
//                   (text) =>
//                     setFormData(prev => ({
//                       ...prev,
//                       radiographicFindings: text,
//                     })),
//                   true
//                 )}
//                 {renderInput(
//                   'Pulp Vitality',
//                   formData.pulpVitality,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, pulpVitality: text })),
//                   true
//                 )}

//                 {renderInput(
//                   'Final Diagnosis',
//                   formData.finalDiagnosis,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, finalDiagnosis: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Treatment Plan',
//                   formData.treatmentPlan,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, treatmentPlan: text })),
//                   true
//                 )}
//                 {renderInput(
//                   'Treatment Done',
//                   formData.treatmentDone,
//                   (text) =>
//                     setFormData(prev => ({ ...prev, treatmentDone: text })),
//                   true
//                 )}
//               </>
//             )}

//             {/* Photos Section */}
//             {renderFormSection(
//               'PATIENT PHOTOS',
//               <Camera size={20} color="#FF9800" />,
//               <View style={styles.photosSection}>
//                 <TouchableOpacity
//                   style={styles.addPhotoButton}
//                   onPress={handleImagePicker}
//                   disabled={uploading}
//                 >
//                   <Camera size={20} color="#0077B6" />
//                   <Text style={styles.addPhotoText}>Add Photo</Text>
//                 </TouchableOpacity>

//                 {uploading && (
//                   <View style={styles.uploadingContainer}>
//                     <ActivityIndicator size="small" color="#0077B6" />
//                     <Text style={styles.uploadingText}>Uploading...</Text>
//                   </View>
//                 )}

//                 {formData.photos.length > 0 && (
//                   <View style={styles.photosGrid}>
//                     {formData.photos.map((photo, index) => (
//                       <View key={index} style={styles.photoContainer}>
//                         <Image
//                           source={{ uri: photo }}
//                           style={styles.photoPreview}
//                         />
//                         <TouchableOpacity
//                           style={styles.removePhotoButton}
//                           onPress={() => removePhoto(index)}
//                           disabled={uploading}
//                         >
//                           <X size={16} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => {
//                 setShowCreateModal(false);
//                 resetForm();
//               }}
//               disabled={uploading}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.createButton,
//                 uploading && styles.createButtonDisabled,
//               ]}
//               onPress={handleCreateRecord}
//               disabled={uploading}
//             >
//               {uploading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.createButtonText}>
//                   {editingRecord ? 'Update' : 'Create'} Record
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: '#666',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   addButton: {
//     backgroundColor: '#0077B6',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 44,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   recordsList: {
//     padding: 20,
//   },
//   recordCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   patientInfo: {
//     flex: 1,
//   },
//   patientName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   patientDetails: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   address: {
//     fontSize: 13,
//     color: '#888',
//     marginBottom: 4,
//   },
//   cardActions: {
//     flexDirection: 'row',
//   },
//   actionButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#f8f9fa',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   recordDetails: {
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//     paddingTop: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   detailContent: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#333',
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//   },
//   createdBy: {
//     fontSize: 12,
//     color: '#666',
//   },
//   createdDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   modalContent: {
//     flex: 1,
//   },
//   formSection: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 8,
//   },
//   subSectionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     marginTop: 12,
//     marginBottom: 8,
//     textTransform: 'uppercase',
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#fff',
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   inputRow: {
//     flexDirection: 'row',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     overflow: 'hidden',
//   },
//   pickerOption: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   pickerOptionSelected: {
//     backgroundColor: '#0077B6',
//   },
//   pickerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   pickerTextSelected: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   fdiChartContainer: {
//     marginVertical: 16,
//   },
//   teethSection: {
//     marginBottom: 20,
//   },
//   teethLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     marginBottom: 8,
//   },
//   teethRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   toothContainer: {
//     alignItems: 'center',
//     width: 40,
//   },
//   toothNumber: {
//     fontSize: 10,
//     color: '#666',
//     marginBottom: 4,
//   },
//   toothInput: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: 'bold',
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   fdiReference: {
//     marginTop: 20,
//     padding: 16,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 8,
//   },
//   fdiReferenceTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   fdiReferenceGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   fdiReferenceItem: {
//     fontSize: 12,
//     color: '#666',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   photosSection: {
//     marginTop: 8,
//   },
//   addPhotoButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderWidth: 2,
//     borderColor: '#0077B6',
//     borderStyle: 'dashed',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   addPhotoText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0077B6',
//   },
//   photosGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   photoContainer: {
//     position: 'relative',
//     width: 80,
//     height: 80,
//   },
//   photoPreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   removePhotoButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#FF5252',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   uploadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#666',
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//   },
//   cancelButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#666',
//   },
//   createButton: {
//     flex: 2,
//     paddingVertical: 14,
//     borderRadius: 8,
//     backgroundColor: '#0077B6',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   createButtonDisabled: {
//     opacity: 0.7,
//   },
//   createButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


/////////////////////////////
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  X,
  User,
  Heart,
  FileText,
  Stethoscope,
  Clipboard,
  Camera,
  Activity,
  Ruler,
  Thermometer,
  Brain,
  Smile,
  Eye,
  Clock,
  Calendar,
  ChevronRight,
  Filter,
  MoreVertical,
  Shield,
  AlertCircle,
  ChevronLeft,
  ChevronDown,
  Upload,
  Download,
  Printer,
  Share2,
  Star,
  CheckCircle,
  Info,
} from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import EmptyState from '@/components/common/EmptyState';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../services/firebase';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Type Definitions
interface HealthRecord {
  id: string;
  patientName: string;
  age: number;
  dateOfBirth: string;
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string;
  pastDentalHistory: string;
  oralHygieneProgram: string;
  toothBrushingAid: string;
  duration: string;
  frequency: string;
  technique: string;
  toothPasteUsed: string;
  otherOralHygieneAids: string;
  abnormalOralHabits: string;
  dietDiary: string;
  vegNonVegMixed: string;
  recall24Hour: string;
  dietCounseling: string;
  behaviourRatingScale: string;
  behaviourManagement: string;
  statureBuilt: string;
  height: string;
  weight: string;
  gait: string;
  speech: string;
  temperature: string;
  pulse: string;
  bp: string;
  headForm: string;
  cephalicIndex: string;
  faceShape: string;
  faceProfile: string;
  faceSymmetry: string;
  faceHeight: string;
  faceDivergence: string;
  lymphNodes: string;
  tmj: string;
  mouthOpening: string;
  swallow: string;
  lipCompetence: string;
  nasoLabialAngle: string;
  chin: string;
  lips: string;
  labialBuccalMucosa: string;
  frenum: string;
  tongue: string;
  palate: string;
  floorOfMouth: string;
  gingivaColor: string;
  gingivaSize: string;
  gingivaContour: string;
  gingivaShape: string;
  gingivaConsistency: string;
  gingivaSurfaceTexture: string;
  gingivaPosition: string;
  gingivaStippling: string;
  bleedingOnProbing: string;
  periodontalEvaluation: string;
  dentition: string;
  teethNumber: string;
  malformation: string;
  teethPresent: string;
  teethMissing: string;
  dentalCaries: string;
  deepCaries: string;
  fracturedTeeth: string;
  retainedTeeth: string;
  mobility: string;
  orthodonticProblem: string;
  otherDentalAnomalies: string;
  fluorosis: string;
  primaryMolarLeft: string;
  primaryMolarRight: string;
  permanentMolarLeft: string;
  permanentMolarRight: string;
  overJet: string;
  overBite: string;
  otherMalocclusionFindings: string;
  provisionalDiagnosis: string;
  radiographicFindings: string;
  pulpVitality: string;
  finalDiagnosis: string;
  treatmentPlan: string;
  treatmentDone: string;
  fdiChartData: Record<string, string>;
  photos: string[];
  createdDate: string;
  createdBy: string;
  patientId: string;
  doctorId: string;
  updatedAt: Timestamp;
}

interface FormData {
  [key: string]: any;
  photos: string[];
  fdiChartData: Record<string, string>;
  sex: 'Male' | 'Female' | 'Other';
}

const INITIAL_FORM_DATA: FormData = {
  patientName: '',
  age: '',
  dateOfBirth: '',
  sex: 'Male',
  address: '',
  chiefComplaint: '',
  historyOfPresentIllness: '',
  pastMedicalHistory: '',
  pastDentalHistory: '',
  oralHygieneProgram: '',
  toothBrushingAid: '',
  duration: '',
  frequency: '',
  technique: '',
  toothPasteUsed: '',
  otherOralHygieneAids: '',
  abnormalOralHabits: '',
  dietDiary: '',
  vegNonVegMixed: '',
  recall24Hour: '',
  dietCounseling: '',
  behaviourRatingScale: '',
  behaviourManagement: '',
  statureBuilt: '',
  height: '',
  weight: '',
  gait: '',
  speech: '',
  temperature: '',
  pulse: '',
  bp: '',
  headForm: '',
  cephalicIndex: '',
  faceShape: '',
  faceProfile: '',
  faceSymmetry: '',
  faceHeight: '',
  faceDivergence: '',
  lymphNodes: '',
  tmj: '',
  mouthOpening: '',
  swallow: '',
  lipCompetence: '',
  nasoLabialAngle: '',
  chin: '',
  lips: '',
  labialBuccalMucosa: '',
  frenum: '',
  tongue: '',
  palate: '',
  floorOfMouth: '',
  gingivaColor: '',
  gingivaSize: '',
  gingivaContour: '',
  gingivaShape: '',
  gingivaConsistency: '',
  gingivaSurfaceTexture: '',
  gingivaPosition: '',
  gingivaStippling: '',
  bleedingOnProbing: '',
  periodontalEvaluation: '',
  dentition: '',
  teethNumber: '',
  malformation: '',
  teethPresent: '',
  teethMissing: '',
  dentalCaries: '',
  deepCaries: '',
  fracturedTeeth: '',
  retainedTeeth: '',
  mobility: '',
  orthodonticProblem: '',
  otherDentalAnomalies: '',
  fluorosis: '',
  primaryMolarLeft: '',
  primaryMolarRight: '',
  permanentMolarLeft: '',
  permanentMolarRight: '',
  overJet: '',
  overBite: '',
  otherMalocclusionFindings: '',
  provisionalDiagnosis: '',
  radiographicFindings: '',
  pulpVitality: '',
  finalDiagnosis: '',
  treatmentPlan: '',
  treatmentDone: '',
  fdiChartData: {},
  photos: [],
};

const TOOTH_STATUS_CODES: Record<string, { backgroundColor: string; color: string; label: string }> = {
  D: { backgroundColor: '#ef4444', color: '#fff', label: 'Decayed' },
  M: { backgroundColor: '#6b7280', color: '#fff', label: 'Missing' },
  R: { backgroundColor: '#10b981', color: '#fff', label: 'Restored' },
  RS: { backgroundColor: '#f59e0b', color: '#fff', label: 'Root Stump' },
  GD: { backgroundColor: '#8b5cf6', color: '#fff', label: 'Grossly Decayed' },
  O: { backgroundColor: '#3b82f6', color: '#fff', label: 'Others' },
};

const FDI_CHART_TEETH = {
  adultUpper: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  adultLower: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  childUpper: [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
  childLower: [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
};
const sections = [
  'demographic', 'chiefComplaint', 'medicalHistory', 'oralHygiene',
  'dietHabits', 'behaviour', 'generalExam', 'craniofacial',
  'extraoral', 'intraoral', 'gingival', 'dentalExam',
  'malocclusion', 'fdiChart', 'diagnosis', 'treatment'
];
// Animation constants
const MODAL_ANIMATION_DURATION = 300;
const SECTION_TRANSITION_DURATION = 200;

// Helper component for emoji icons
const EmojiIcon = ({ emoji }: { emoji: string }) => (
  <Text style={{ fontSize: 18, lineHeight: 24 }}>{emoji}</Text>
);

// Custom Empty State Component
const HealthRecordsEmptyState = ({ 
  isDoctor, 
  searchQuery, 
  onCreatePress,
  onRefreshPress
}: { 
  isDoctor: boolean; 
  searchQuery: string; 
  onCreatePress: () => void;
  onRefreshPress: () => void;
}) => {
  const icon = <FileText size={80} color="#9ca3af" />;
  const title = "No health records found";
  
  if (searchQuery) {
    return (
      <EmptyState
        icon={icon}
        title={title}
        description="No records match your search"
        buttonText={isDoctor ? "Clear Search & Create New" : "Clear Search"}
        onPress={isDoctor ? onCreatePress : onRefreshPress}
      />
    );
  }
  
  if (isDoctor) {
    return (
      <EmptyState
        icon={icon}
        title={title}
        description="Create your first health record"
        buttonText="Create Health Record"
        onPress={onCreatePress}
      />
    );
  }
  
  return (
    <EmptyState
      icon={icon}
      title={title}
      description="No health records available"
      buttonText="Refresh"
      onPress={onRefreshPress}
    />
  );
};

// Animated Form Navigation Component
const FormNavigation = ({ 
  activeSection, 
  onSectionChange,
  sectionAnimations 
}: { 
  activeSection: string; 
  onSectionChange: (sectionId: string) => void;
  sectionAnimations: Record<string, Animated.Value>;
}) => {
  const navSections = [
    { id: 'demographic', label: 'Patient', icon: <User size={18} color="#3b82f6" /> },
    { id: 'chiefComplaint', label: 'Complaint', icon: <Heart size={18} color="#ef4444" /> },
    { id: 'medicalHistory', label: 'Medical History', icon: <Activity size={18} color="#10b981" /> },
    { id: 'oralHygiene', label: 'Oral Hygiene', icon: <Clock size={18} color="#0ea5e9" /> },
    { id: 'dietHabits', label: 'Diet', icon: <Brain size={18} color="#f59e0b" /> },
    { id: 'behaviour', label: 'Behaviour', icon: <Smile size={18} color="#8b5cf6" /> },
    { id: 'generalExam', label: 'General Exam', icon: <Eye size={18} color="#06b6d4" /> },
    { id: 'craniofacial', label: 'Craniofacial', icon: <Ruler size={18} color="#8b5cf6" /> },
    { id: 'extraoral', label: 'Extraoral', icon: <Eye size={18} color="#64748b" /> },
    { id: 'intraoral', label: 'Intraoral', icon: <Smile size={18} color="#ec4899" /> },
    { id: 'gingival', label: 'Gingival', icon: <Clipboard size={18} color="#6366f1" /> },
    { id: 'dentalExam', label: 'Dental', icon: <Clipboard size={18} color="#f97316" /> },
    { id: 'malocclusion', label: 'Malocclusion', icon: <Ruler size={18} color="#22c55e" /> },
    { id: 'fdiChart', label: 'FDI Chart', icon: <Clipboard size={18} color="#3b82f6" /> },
    { id: 'diagnosis', label: 'Diagnosis', icon: <Stethoscope size={18} color="#8b5cf6" /> },
    { id: 'treatment', label: 'Treatment', icon: <Clipboard size={18} color="#ef4444" /> },
  ];

  return (
    <Animated.ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.navScroll}
      contentContainerStyle={styles.navContainer}
    >
      {navSections.map((section) => {
        const animation = sectionAnimations[section.id] || new Animated.Value(1);
        const scale = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1]
        });
        const opacity = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1]
        });

        return (
          <Animated.View
            key={section.id}
            style={[
              styles.navItemContainer,
              {
                transform: [{ scale }],
                opacity
              }
            ]}
          >
            <TouchableOpacity
              style={[
                styles.navItem,
                activeSection === section.id && styles.navItemActive
              ]}
              onPress={() => {
                Animated.sequence([
                  Animated.timing(animation, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true,
                  }),
                  Animated.timing(animation, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                  })
                ]).start();
                onSectionChange(section.id);
              }}
            >
              {section.icon}
              <Text style={[
                styles.navText,
                activeSection === section.id && styles.navTextActive
              ]}>
                {section.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

// Animated Form Section Component
const FormSection = ({
  title,
  icon,
  children,
  isActive,
  animationValue,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  animationValue: Animated.Value;
}) => {
  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (!isActive) return null;

  return (
    <Animated.View style={[
      styles.formSection,
      {
        transform: [{ translateY }],
        opacity,
      }
    ]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          {icon}
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </Animated.View>
  );
};

// Enhanced Stats Card Component
const StatsCard = ({ icon, value, label, color, animationDelay = 0 }: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
  color: string;
  animationDelay?: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: animationDelay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: animationDelay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.statsCard,
      {
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
        borderLeftColor: color,
      }
    ]}>
      <View style={[styles.statsIconContainer, { backgroundColor: `${color}15` }]}>
        {icon}
      </View>
      <Text style={[styles.statsValue, { color }]}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </Animated.View>
  );
};

// Enhanced Patient Record Card Component
const PatientRecordCard = ({ 
  item, 
  isDoctor, 
  onEdit, 
  onDelete,
  index 
}: { 
  item: HealthRecord; 
  isDoctor: boolean; 
  onEdit: () => void; 
  onDelete: () => void;
  index: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.patientCard,
        {
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayPressIn={50}
      >
        <View style={styles.cardHeader}>
          <View style={styles.patientInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <View style={styles.patientBadges}>
                <View style={[styles.sexBadge, { backgroundColor: item.sex === 'Male' ? '#3b82f6' : '#ec4899' }]}>
                  <Text style={styles.sexBadgeText}>{item.sex.charAt(0)}</Text>
                </View>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{item.age} yrs</Text>
                </View>
                {item.chiefComplaint.toLowerCase().includes('pain') && (
                  <View style={styles.urgentBadge}>
                    <AlertCircle size={12} color="#fff" />
                    <Text style={styles.urgentBadgeText}>Urgent</Text>
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.patientDetails}>
              DOB: {item.dateOfBirth} • {item.address}
            </Text>
          </View>
          
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={onEdit}
            >
              <MoreVertical size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.complaintContainer}>
            <Heart size={16} color="#ef4444" style={styles.contentIcon} />
            <View style={styles.complaintContent}>
              <Text style={styles.contentLabel}>Chief Complaint</Text>
              <Text style={styles.contentValue} numberOfLines={2}>
                {item.chiefComplaint || 'Not specified'}
              </Text>
            </View>
          </View>

          {item.finalDiagnosis && (
            <View style={styles.complaintContainer}>
              <Stethoscope size={16} color="#10b981" style={styles.contentIcon} />
              <View style={styles.complaintContent}>
                <Text style={styles.contentLabel}>Diagnosis</Text>
                <Text style={styles.contentValue} numberOfLines={2}>
                  {item.finalDiagnosis}
                </Text>
              </View>
            </View>
          )}

          {item.treatmentPlan && (
            <View style={styles.complaintContainer}>
              <Clipboard size={16} color="#3b82f6" style={styles.contentIcon} />
              <View style={styles.complaintContent}>
                <Text style={styles.contentLabel}>Treatment Plan</Text>
                <Text style={styles.contentValue} numberOfLines={2}>
                  {item.treatmentPlan.substring(0, 80)}...
                </Text>
              </View>
            </View>
          )}

          {Object.keys(item.fdiChartData || {}).length > 0 && (
            <View style={styles.dentalFindings}>
              <Text style={styles.dentalTitle}>Dental Findings</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.toothStatusContainer}>
                  {Object.entries(item.fdiChartData).slice(0, 6).map(([tooth, status]) => (
                    <View key={tooth} style={[styles.toothStatus, 
                      { backgroundColor: TOOTH_STATUS_CODES[status]?.backgroundColor || '#e5e7eb' }
                    ]}>
                      <Text style={[styles.toothStatusText, 
                        { color: TOOTH_STATUS_CODES[status]?.color || '#374151' }
                      ]}>
                        {tooth}:{status}
                      </Text>
                    </View>
                  ))}
                  {Object.keys(item.fdiChartData).length > 6 && (
                    <View style={styles.moreTeethBadge}>
                      <Text style={styles.moreTeethText}>+{Object.keys(item.fdiChartData).length - 6}</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <View style={styles.createdByContainer}>
              <User size={12} color="#9ca3af" />
              <Text style={styles.createdBy}>
                {item.createdBy}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Calendar size={12} color="#9ca3af" />
              <Text style={styles.updatedDate}>
                {item.updatedAt?.toDate?.().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                }) || new Date(item.createdDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          {isDoctor && (
            <View style={styles.footerActions}>
              <TouchableOpacity
                style={[styles.footerButton, styles.editButton]}
                onPress={onEdit}
              >
                <Edit3 size={16} color="#3b82f6" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerButton, styles.deleteButton]}
                onPress={onDelete}
              >
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Enhanced Input Component - FIXED VERSION
const EnhancedInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  keyboardType = 'default',
  icon,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: any;
  icon?: React.ReactNode;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderColorAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#3b82f6']
  });

  return (
    <Animated.View style={[styles.inputGroup, { borderColor }]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.inputIcon}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            multiline && styles.textArea,
            icon ? { paddingLeft: 45 } : {}
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
        />
      </View>
    </Animated.View>
  );
};

// Enhanced Picker Component
const EnhancedPicker = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.pickerOption,
              value === option && styles.pickerOptionSelected,
            ]}
            onPress={() => onChange(option)}
          >
            <Text
              style={[
                styles.pickerText,
                value === option && styles.pickerTextSelected,
              ]}
            >
              {option}
            </Text>
            {value === option && (
              <CheckCircle size={16} color="#fff" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function HealthRecordScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  
  const isDoctor = userData?.role === 'doctor';
  const isPatient = userData?.role === 'patient';
  const userId = userData?.uid || '';
  const userName = userData?.name || userData?.email || 'Unknown';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [activeSection, setActiveSection] = useState('demographic');
  
  // Animation refs
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(5)).current;
  const sectionAnimations = useRef<Record<string, Animated.Value>>({}).current;
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Initialize section animations
  useEffect(() => {
    const sections = [
      'demographic', 'chiefComplaint', 'medicalHistory', 'oralHygiene',
      'dietHabits', 'behaviour', 'generalExam', 'craniofacial',
      'extraoral', 'intraoral', 'gingival', 'dentalExam',
      'malocclusion', 'fdiChart', 'diagnosis', 'treatment'
    ];
    
    sections.forEach(section => {
      if (!sectionAnimations[section]) {
        sectionAnimations[section] = new Animated.Value(0);
      }
    });
  }, []);

  // Animate section when changed
  useEffect(() => {
    if (showCreateModal) {
      Animated.timing(sectionAnimations[activeSection], {
        toValue: 1,
        duration: SECTION_TRANSITION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [activeSection, showCreateModal]);

  // Modal animation
  useEffect(() => {
    if (showCreateModal) {
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: MODAL_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: MODAL_ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: MODAL_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 50,
          duration: MODAL_ANIMATION_DURATION,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [showCreateModal]);

  // Memoized values
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return healthRecords;
    
    const query = searchQuery.toLowerCase();
    return healthRecords.filter((record) => {
      return (
        record.patientName.toLowerCase().includes(query) ||
        record.chiefComplaint.toLowerCase().includes(query) ||
        (record.finalDiagnosis && record.finalDiagnosis.toLowerCase().includes(query))
      );
    });
  }, [healthRecords, searchQuery]);

  const canEditRecord = useCallback((record: HealthRecord) => {
    return isDoctor && record.doctorId === userId;
  }, [isDoctor, userId]);

  // Statistics
  const stats = useMemo(() => ({
    total: healthRecords.length,
    today: healthRecords.filter(record => {
      const today = new Date().toISOString().split('T')[0];
      return record.createdDate === today;
    }).length,
    urgent: healthRecords.filter(record => 
      record.chiefComplaint.toLowerCase().includes('pain') ||
      record.chiefComplaint.toLowerCase().includes('emergency')
    ).length,
    completed: healthRecords.filter(record => 
      record.treatmentDone && record.treatmentDone.length > 0
    ).length,
  }), [healthRecords]);

  // Fetch health records
  const fetchHealthRecords = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const healthRecordsRef = collection(db, 'healthRecords');
      const q = query(healthRecordsRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const records = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        updatedAt: doc.data().updatedAt,
      })) as HealthRecord[];
      
      const filteredRecords = records.filter(record => {
        if (isDoctor) return record.doctorId === userId;
        if (isPatient) return record.patientId === userId;
        return false;
      });
      
      setHealthRecords(filteredRecords);
      
    } catch (error) {
      console.error('Error fetching health records:', error);
      Alert.alert('Error', 'Failed to fetch health records.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId, isDoctor, isPatient]);

  // Setup real-time listener
  useEffect(() => {
    if (!userId) {
      fetchHealthRecords();
      return;
    }

    const healthRecordsRef = collection(db, 'healthRecords');
    const q = query(healthRecordsRef, orderBy('updatedAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          updatedAt: doc.data().updatedAt,
        })) as HealthRecord[];
        
        const filteredRecords = records.filter(record => {
          if (isDoctor) return record.doctorId === userId;
          if (isPatient) return record.patientId === userId;
          return false;
        });
        
        setHealthRecords(filteredRecords);
        setLoading(false);
      },
      (error) => {
        console.error('Real-time listener error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, isDoctor, isPatient]);

  // Form handlers
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setEditingRecord(null);
    setActiveSection('demographic');
  }, []);

  const handleCreateRecord = useCallback(async () => {
    if (!formData.patientName.trim() || !formData.age.trim()) {
      Alert.alert('Error', 'Please fill in at least Patient Name and Age');
      return;
    }

    if (!isDoctor) {
      Alert.alert('Error', 'Only doctors can create health records');
      return;
    }

    try {
      setSubmitting(true);
      
      const healthRecordData = {
        patientName: formData.patientName.trim(),
        age: parseInt(formData.age) || 0,
        dateOfBirth: formData.dateOfBirth.trim(),
        sex: formData.sex,
        address: formData.address.trim(),
        chiefComplaint: formData.chiefComplaint.trim(),
        historyOfPresentIllness: formData.historyOfPresentIllness.trim(),
        pastMedicalHistory: formData.pastMedicalHistory.trim(),
        pastDentalHistory: formData.pastDentalHistory.trim(),
        oralHygieneProgram: formData.oralHygieneProgram.trim(),
        toothBrushingAid: formData.toothBrushingAid.trim(),
        duration: formData.duration.trim(),
        frequency: formData.frequency.trim(),
        technique: formData.technique.trim(),
        toothPasteUsed: formData.toothPasteUsed.trim(),
        otherOralHygieneAids: formData.otherOralHygieneAids.trim(),
        abnormalOralHabits: formData.abnormalOralHabits.trim(),
        dietDiary: formData.dietDiary.trim(),
        vegNonVegMixed: formData.vegNonVegMixed.trim(),
        recall24Hour: formData.recall24Hour.trim(),
        dietCounseling: formData.dietCounseling.trim(),
        behaviourRatingScale: formData.behaviourRatingScale.trim(),
        behaviourManagement: formData.behaviourManagement.trim(),
        statureBuilt: formData.statureBuilt.trim(),
        height: formData.height.trim(),
        weight: formData.weight.trim(),
        gait: formData.gait.trim(),
        speech: formData.speech.trim(),
        temperature: formData.temperature.trim(),
        pulse: formData.pulse.trim(),
        bp: formData.bp.trim(),
        headForm: formData.headForm.trim(),
        cephalicIndex: formData.cephalicIndex.trim(),
        faceShape: formData.faceShape.trim(),
        faceProfile: formData.faceProfile.trim(),
        faceSymmetry: formData.faceSymmetry.trim(),
        faceHeight: formData.faceHeight.trim(),
        faceDivergence: formData.faceDivergence.trim(),
        lymphNodes: formData.lymphNodes.trim(),
        tmj: formData.tmj.trim(),
        mouthOpening: formData.mouthOpening.trim(),
        swallow: formData.swallow.trim(),
        lipCompetence: formData.lipCompetence.trim(),
        nasoLabialAngle: formData.nasoLabialAngle.trim(),
        chin: formData.chin.trim(),
        lips: formData.lips.trim(),
        labialBuccalMucosa: formData.labialBuccalMucosa.trim(),
        frenum: formData.frenum.trim(),
        tongue: formData.tongue.trim(),
        palate: formData.palate.trim(),
        floorOfMouth: formData.floorOfMouth.trim(),
        gingivaColor: formData.gingivaColor.trim(),
        gingivaSize: formData.gingivaSize.trim(),
        gingivaContour: formData.gingivaContour.trim(),
        gingivaShape: formData.gingivaShape.trim(),
        gingivaConsistency: formData.gingivaConsistency.trim(),
        gingivaSurfaceTexture: formData.gingivaSurfaceTexture.trim(),
        gingivaPosition: formData.gingivaPosition.trim(),
        gingivaStippling: formData.gingivaStippling.trim(),
        bleedingOnProbing: formData.bleedingOnProbing.trim(),
        periodontalEvaluation: formData.periodontalEvaluation.trim(),
        dentition: formData.dentition.trim(),
        teethNumber: formData.teethNumber.trim(),
        malformation: formData.malformation.trim(),
        teethPresent: formData.teethPresent.trim(),
        teethMissing: formData.teethMissing.trim(),
        dentalCaries: formData.dentalCaries.trim(),
        deepCaries: formData.deepCaries.trim(),
        fracturedTeeth: formData.fracturedTeeth.trim(),
        retainedTeeth: formData.retainedTeeth.trim(),
        mobility: formData.mobility.trim(),
        orthodonticProblem: formData.orthodonticProblem.trim(),
        otherDentalAnomalies: formData.otherDentalAnomalies.trim(),
        fluorosis: formData.fluorosis.trim(),
        primaryMolarLeft: formData.primaryMolarLeft.trim(),
        primaryMolarRight: formData.primaryMolarRight.trim(),
        permanentMolarLeft: formData.permanentMolarLeft.trim(),
        permanentMolarRight: formData.permanentMolarRight.trim(),
        overJet: formData.overJet.trim(),
        overBite: formData.overBite.trim(),
        otherMalocclusionFindings: formData.otherMalocclusionFindings.trim(),
        provisionalDiagnosis: formData.provisionalDiagnosis.trim(),
        radiographicFindings: formData.radiographicFindings.trim(),
        pulpVitality: formData.pulpVitality.trim(),
        finalDiagnosis: formData.finalDiagnosis.trim(),
        treatmentPlan: formData.treatmentPlan.trim(),
        treatmentDone: formData.treatmentDone.trim(),
        fdiChartData: formData.fdiChartData,
        photos: formData.photos || [],
        createdDate: editingRecord ? editingRecord.createdDate : new Date().toISOString().split('T')[0],
        createdBy: userName,
        doctorId: userId,
        patientId: isPatient ? userId : `patient_${Date.now()}`,
        updatedAt: Timestamp.now(),
      };

      if (editingRecord) {
        const recordRef = doc(db, 'healthRecords', editingRecord.id);
        await updateDoc(recordRef, healthRecordData);
        Alert.alert('Success', 'Health record updated successfully');
      } else {
        await addDoc(collection(db, 'healthRecords'), healthRecordData);
        Alert.alert('Success', 'Health record created successfully');
      }

      setShowCreateModal(false);
      resetForm();
      fetchHealthRecords();
      
    } catch (error: any) {
      console.error('Error saving health record:', error);
      Alert.alert('Error', 'Failed to save health record. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [formData, editingRecord, isDoctor, isPatient, userId, userName, fetchHealthRecords, resetForm]);

  const handleEditRecord = useCallback((record: HealthRecord) => {
    if (!canEditRecord(record)) {
      Alert.alert('Error', 'You can only edit records you created');
      return;
    }

    setEditingRecord(record);
    setFormData({
      ...INITIAL_FORM_DATA,
      patientName: record.patientName,
      age: record.age.toString(),
      dateOfBirth: record.dateOfBirth,
      sex: record.sex,
      address: record.address,
      chiefComplaint: record.chiefComplaint,
      historyOfPresentIllness: record.historyOfPresentIllness,
      pastMedicalHistory: record.pastMedicalHistory,
      pastDentalHistory: record.pastDentalHistory,
      oralHygieneProgram: record.oralHygieneProgram,
      toothBrushingAid: record.toothBrushingAid,
      duration: record.duration,
      frequency: record.frequency,
      technique: record.technique,
      toothPasteUsed: record.toothPasteUsed,
      otherOralHygieneAids: record.otherOralHygieneAids,
      abnormalOralHabits: record.abnormalOralHabits,
      dietDiary: record.dietDiary,
      vegNonVegMixed: record.vegNonVegMixed,
      recall24Hour: record.recall24Hour,
      dietCounseling: record.dietCounseling,
      behaviourRatingScale: record.behaviourRatingScale,
      behaviourManagement: record.behaviourManagement,
      statureBuilt: record.statureBuilt,
      height: record.height,
      weight: record.weight,
      gait: record.gait,
      speech: record.speech,
      temperature: record.temperature,
      pulse: record.pulse,
      bp: record.bp,
      headForm: record.headForm,
      cephalicIndex: record.cephalicIndex,
      faceShape: record.faceShape,
      faceProfile: record.faceProfile,
      faceSymmetry: record.faceSymmetry,
      faceHeight: record.faceHeight,
      faceDivergence: record.faceDivergence,
      lymphNodes: record.lymphNodes,
      tmj: record.tmj,
      mouthOpening: record.mouthOpening,
      swallow: record.swallow,
      lipCompetence: record.lipCompetence,
      nasoLabialAngle: record.nasoLabialAngle,
      chin: record.chin,
      lips: record.lips,
      labialBuccalMucosa: record.labialBuccalMucosa,
      frenum: record.frenum,
      tongue: record.tongue,
      palate: record.palate,
      floorOfMouth: record.floorOfMouth,
      gingivaColor: record.gingivaColor,
      gingivaSize: record.gingivaSize,
      gingivaContour: record.gingivaContour,
      gingivaShape: record.gingivaShape,
      gingivaConsistency: record.gingivaConsistency,
      gingivaSurfaceTexture: record.gingivaSurfaceTexture,
      gingivaPosition: record.gingivaPosition,
      gingivaStippling: record.gingivaStippling,
      bleedingOnProbing: record.bleedingOnProbing,
      periodontalEvaluation: record.periodontalEvaluation,
      dentition: record.dentition,
      teethNumber: record.teethNumber,
      malformation: record.malformation,
      teethPresent: record.teethPresent,
      teethMissing: record.teethMissing,
      dentalCaries: record.dentalCaries,
      deepCaries: record.deepCaries,
      fracturedTeeth: record.fracturedTeeth,
      retainedTeeth: record.retainedTeeth,
      mobility: record.mobility,
      orthodonticProblem: record.orthodonticProblem,
      otherDentalAnomalies: record.otherDentalAnomalies,
      fluorosis: record.fluorosis,
      primaryMolarLeft: record.primaryMolarLeft,
      primaryMolarRight: record.primaryMolarRight,
      permanentMolarLeft: record.permanentMolarLeft,
      permanentMolarRight: record.permanentMolarRight,
      overJet: record.overJet,
      overBite: record.overBite,
      otherMalocclusionFindings: record.otherMalocclusionFindings,
      provisionalDiagnosis: record.provisionalDiagnosis,
      radiographicFindings: record.radiographicFindings,
      pulpVitality: record.pulpVitality,
      finalDiagnosis: record.finalDiagnosis,
      treatmentPlan: record.treatmentPlan,
      treatmentDone: record.treatmentDone,
      fdiChartData: record.fdiChartData || {},
      photos: record.photos || [],
    });
    
    setShowCreateModal(true);
  }, [canEditRecord]);

  const handleDeleteRecord = useCallback(async (id: string, doctorId: string) => {
    if (!isDoctor || doctorId !== userId) {
      Alert.alert('Error', 'You can only delete records you created');
      return;
    }

    Alert.alert(
      'Delete Health Record',
      'Are you sure you want to delete this health record? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'healthRecords', id));
              Alert.alert('Success', 'Health record deleted successfully');
              fetchHealthRecords();
            } catch (error) {
              console.error('Error deleting health record:', error);
              Alert.alert('Error', 'Failed to delete health record');
            }
          },
        },
      ]
    );
  }, [isDoctor, userId, fetchHealthRecords]);

  // FDI Chart Handlers
  const handleFDIToothChange = useCallback((toothNumber: string, value: string) => {
    const upperValue = value.toUpperCase().slice(0, 2);
    setFormData(prev => ({
      ...prev,
      fdiChartData: {
        ...prev.fdiChartData,
        [toothNumber]: upperValue,
      },
    }));
  }, []);

  const getToothStyle = useCallback((value: string) => {
    const style = TOOTH_STATUS_CODES[value as keyof typeof TOOTH_STATUS_CODES];
    return style || { backgroundColor: '#fff', color: '#333' };
  }, []);

  const renderFDIChart = useCallback(() => {
    const renderTeethRow = (teeth: number[], label: string) => (
      <View style={styles.teethSection}>
        <Text style={styles.teethLabel}>{label}</Text>
        <View style={styles.teethRow}>
          {teeth.map((toothNumber) => (
            <View key={toothNumber} style={styles.toothContainer}>
              <Text style={styles.toothNumber}>{toothNumber}</Text>
              <TextInput
                style={[
                  styles.toothInput,
                  getToothStyle(formData.fdiChartData[toothNumber.toString()] || ''),
                ]}
                value={formData.fdiChartData[toothNumber.toString()] || ''}
                onChangeText={(value) => handleFDIToothChange(toothNumber.toString(), value)}
                maxLength={2}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>
          ))}
        </View>
      </View>
    );

    return (
      <View style={styles.fdiChartContainer}>
        {renderTeethRow(FDI_CHART_TEETH.adultUpper, 'Upper Jaw – Adult Teeth')}
        {renderTeethRow(FDI_CHART_TEETH.childUpper, 'Upper Jaw – Child Teeth')}
        {renderTeethRow(FDI_CHART_TEETH.childLower, 'Lower Jaw – Child Teeth')}
        {renderTeethRow(FDI_CHART_TEETH.adultLower, 'Lower Jaw – Adult Teeth')}

        <View style={styles.fdiReference}>
          <Text style={styles.fdiReferenceTitle}>Status Reference:</Text>
          <View style={styles.fdiReferenceGrid}>
            {Object.entries(TOOTH_STATUS_CODES).map(([code, style]) => (
              <View key={code} style={styles.fdiReferenceItem}>
                <View style={[styles.statusIndicator, { backgroundColor: style.backgroundColor }]}>
                  <Text style={[styles.statusCode, { color: style.color }]}>{code}</Text>
                </View>
                <Text style={styles.statusLabel}>{style.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }, [formData.fdiChartData, getToothStyle, handleFDIToothChange]);

  // Navigation sections
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionAnimations[activeSection]) {
      Animated.timing(sectionAnimations[activeSection], {
        toValue: 0,
        duration: SECTION_TRANSITION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        setActiveSection(sectionId);
      });
    } else {
      setActiveSection(sectionId);
    }
  }, [activeSection]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHealthRecords();
  }, [fetchHealthRecords]);

  // Loading state
  if (loading && healthRecords.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading health records...</Text>
      </View>
    );
  }

  // Form content renderer
  const renderFormContent = () => {
    const renderInputRow = (
      leftLabel: string, 
      leftValue: string, 
      leftKey: string, 
      rightLabel: string, 
      rightValue: string, 
      rightKey: string,
      leftPlaceholder = '', 
      rightPlaceholder = '',
      leftKeyboardType: any = 'default',
      rightKeyboardType: any = 'default',
      leftIcon?: React.ReactNode,
      rightIcon?: React.ReactNode
    ) => (
      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <EnhancedInput
            label={leftLabel}
            value={leftValue}
            onChange={(text) => setFormData(prev => ({ ...prev, [leftKey]: text }))}
            placeholder={leftPlaceholder}
            keyboardType={leftKeyboardType}
            icon={leftIcon}
          />
        </View>
        <View style={{ width: 16 }} />
        <View style={{ flex: 1 }}>
          <EnhancedInput
            label={rightLabel}
            value={rightValue}
            onChange={(text) => setFormData(prev => ({ ...prev, [rightKey]: text }))}
            placeholder={rightPlaceholder}
            keyboardType={rightKeyboardType}
            icon={rightIcon}
          />
        </View>
      </View>
    );

    const renderFormSection = (sectionId: string, title: string, icon: React.ReactNode, children: React.ReactNode) => (
      <FormSection
        key={sectionId}
        title={title}
        icon={icon}
        isActive={activeSection === sectionId}
        animationValue={sectionAnimations[sectionId] || new Animated.Value(0)}
      >
        {children}
      </FormSection>
    );

    return (
      <ScrollView style={styles.formContent}>
        {renderFormSection('demographic', 'PATIENT DETAILS', <User size={24} color="#3b82f6" />, (
          <>
            <EnhancedInput
              label="Full Name"
              value={formData.patientName}
              onChange={(text) => setFormData(prev => ({ ...prev, patientName: text }))}
              placeholder="Enter patient's full name"
              icon={<User size={20} color="#6b7280" />}
            />
            {renderInputRow(
              'Age', formData.age, 'age',
              'Date of Birth', formData.dateOfBirth, 'dateOfBirth',
              'Enter age', 'YYYY-MM-DD',
              'numeric', 'default',
              <Text style={{ fontSize: 16, color: '#6b7280' }}>Age</Text>,
              <Calendar size={20} color="#6b7280" />
            )}
            <EnhancedPicker
              label="Gender"
              value={formData.sex}
              options={['Male', 'Female', 'Other'] as const}
              onChange={(value) => setFormData(prev => ({ ...prev, sex: value as 'Male' | 'Female' | 'Other' }))}
            />
            <EnhancedInput
              label="Address"
              value={formData.address}
              onChange={(text) => setFormData(prev => ({ ...prev, address: text }))}
              placeholder="Enter complete address"
              multiline={true}
              icon={<EmojiIcon emoji="📍" />}
            />
          </>
        ))}

        {renderFormSection('chiefComplaint', 'CHIEF COMPLAINT', <Heart size={24} color="#ef4444" />, (
          <>
            <EnhancedInput
              label="Chief Complaint"
              value={formData.chiefComplaint}
              onChange={(text) => setFormData(prev => ({ ...prev, chiefComplaint: text }))}
              placeholder="Describe the main complaint"
              multiline={true}
              icon={<Heart size={20} color="#ef4444" />}
            />
            <EnhancedInput
              label="History of Present Illness"
              value={formData.historyOfPresentIllness}
              onChange={(text) => setFormData(prev => ({ ...prev, historyOfPresentIllness: text }))}
              placeholder="Detailed history of the complaint"
              multiline={true}
              icon={<Clock size={20} color="#6b7280" />}
            />
          </>
        ))}

        {renderFormSection('medicalHistory', 'MEDICAL HISTORY', <Activity size={24} color="#10b981" />, (
          <>
            <EnhancedInput
              label="Past Medical History"
              value={formData.pastMedicalHistory}
              onChange={(text) => setFormData(prev => ({ ...prev, pastMedicalHistory: text }))}
              placeholder="Any previous medical conditions"
              multiline={true}
              icon={<Activity size={20} color="#10b981" />}
            />
            <EnhancedInput
              label="Past Dental History"
              value={formData.pastDentalHistory}
              onChange={(text) => setFormData(prev => ({ ...prev, pastDentalHistory: text }))}
              placeholder="Previous dental treatments"
              multiline={true}
              icon={<Clipboard size={20} color="#6b7280" />}
            />
          </>
        ))}

        {renderFormSection('oralHygiene', 'ORAL HYGIENE', <Clock size={24} color="#0ea5e9" />, (
          <>
            <EnhancedInput
              label="Oral Hygiene Program"
              value={formData.oralHygieneProgram}
              onChange={(text) => setFormData(prev => ({ ...prev, oralHygieneProgram: text }))}
              placeholder="Oral hygiene habits"
              multiline={true}
              icon={<Clipboard size={20} color="#0ea5e9" />}
            />
            {renderInputRow(
              'Tooth Brushing Aid', formData.toothBrushingAid, 'toothBrushingAid',
              'Toothpaste Used', formData.toothPasteUsed, 'toothPasteUsed',
              'Type of brush', 'Brand/Type',
              'default', 'default',
              <EmojiIcon emoji="🪥" />,
              <EmojiIcon emoji="🧴" />
            )}
            {renderInputRow(
              'Duration', formData.duration, 'duration',
              'Frequency', formData.frequency, 'frequency',
              'e.g., 2 mins', 'Times per day',
              'numeric', 'numeric',
              <Clock size={20} color="#6b7280" />,
              <Activity size={20} color="#6b7280" />
            )}
            <EnhancedInput
              label="Brushing Technique"
              value={formData.technique}
              onChange={(text) => setFormData(prev => ({ ...prev, technique: text }))}
              placeholder="Type of brushing technique"
              icon={<EmojiIcon emoji="👐" />}
            />
            <EnhancedInput
              label="Other Oral Hygiene Aids"
              value={formData.otherOralHygieneAids}
              onChange={(text) => setFormData(prev => ({ ...prev, otherOralHygieneAids: text }))}
              placeholder="Floss, mouthwash, etc."
              multiline={true}
              icon={<EmojiIcon emoji="🦷" />}
            />
          </>
        ))}

        {renderFormSection('dietHabits', 'DIET & HABITS', <Brain size={24} color="#f59e0b" />, (
          <>
            <EnhancedInput
              label="Abnormal Oral Habits"
              value={formData.abnormalOralHabits}
              onChange={(text) => setFormData(prev => ({ ...prev, abnormalOralHabits: text }))}
              placeholder="Thumb sucking, bruxism, etc."
              multiline={true}
              icon={<Brain size={20} color="#f59e0b" />}
            />
            <EnhancedInput
              label="Diet Diary"
              value={formData.dietDiary}
              onChange={(text) => setFormData(prev => ({ ...prev, dietDiary: text }))}
              placeholder="Daily food intake"
              multiline={true}
              icon={<EmojiIcon emoji="🍎" />}
            />
            <EnhancedPicker
              label="Diet Type"
              value={formData.vegNonVegMixed}
              options={['Vegetarian', 'Non-Vegetarian', 'Mixed']}
              onChange={(value) => setFormData(prev => ({ ...prev, vegNonVegMixed: value }))}
            />
            <EnhancedInput
              label="24-Hour Recall"
              value={formData.recall24Hour}
              onChange={(text) => setFormData(prev => ({ ...prev, recall24Hour: text }))}
              placeholder="Detailed food recall for 24 hours"
              multiline={true}
              icon={<Clock size={20} color="#6b7280" />}
            />
            <EnhancedInput
              label="Diet Counseling"
              value={formData.dietCounseling}
              onChange={(text) => setFormData(prev => ({ ...prev, dietCounseling: text }))}
              placeholder="Dietary recommendations"
              multiline={true}
              icon={<EmojiIcon emoji="💬" />}
            />
          </>
        ))}

        {renderFormSection('behaviour', 'BEHAVIOUR MANAGEMENT', <Smile size={24} color="#8b5cf6" />, (
          <>
            <EnhancedInput
              label="Behaviour Rating Scale"
              value={formData.behaviourRatingScale}
              onChange={(text) => setFormData(prev => ({ ...prev, behaviourRatingScale: text }))}
              placeholder="Behaviour assessment scale"
              icon={<Smile size={20} color="#8b5cf6" />}
            />
            <EnhancedInput
              label="Behaviour Management"
              value={formData.behaviourManagement}
              onChange={(text) => setFormData(prev => ({ ...prev, behaviourManagement: text }))}
              placeholder="Behaviour management strategies"
              multiline={true}
              icon={<EmojiIcon emoji="🧠" />}
            />
          </>
        ))}

        {renderFormSection('generalExam', 'GENERAL EXAMINATION', <Eye size={24} color="#06b6d4" />, (
          <>
            {renderInputRow(
              'Height', formData.height, 'height',
              'Weight', formData.weight, 'weight',
              'cm', 'kg',
              'numeric', 'numeric',
              <Ruler size={20} color="#6b7280" />,
              <EmojiIcon emoji="⚖️" />
            )}
            {renderInputRow(
              'Temperature', formData.temperature, 'temperature',
              'Pulse', formData.pulse, 'pulse',
              '°C', 'bpm',
              'decimal-pad', 'numeric',
              <Thermometer size={20} color="#6b7280" />,
              <Activity size={20} color="#6b7280" />
            )}
            <EnhancedInput
              label="Blood Pressure"
              value={formData.bp}
              onChange={(text) => setFormData(prev => ({ ...prev, bp: text }))}
              placeholder="e.g., 120/80 mmHg"
              icon={<Activity size={20} color="#ef4444" />}
            />
            <EnhancedInput
              label="Stature/Built"
              value={formData.statureBuilt}
              onChange={(text) => setFormData(prev => ({ ...prev, statureBuilt: text }))}
              placeholder="Body type description"
              icon={<EmojiIcon emoji="👤" />}
            />
            <EnhancedInput
              label="Gait"
              value={formData.gait}
              onChange={(text) => setFormData(prev => ({ ...prev, gait: text }))}
              placeholder="Walking pattern"
              icon={<EmojiIcon emoji="🚶" />}
            />
            <EnhancedInput
              label="Speech"
              value={formData.speech}
              onChange={(text) => setFormData(prev => ({ ...prev, speech: text }))}
              placeholder="Speech characteristics"
              icon={<EmojiIcon emoji="🗣️" />}
            />
          </>
        ))}

        {renderFormSection('craniofacial', 'CRANIOFACIAL EXAMINATION', <Ruler size={24} color="#8b5cf6" />, (
          <>
            {renderInputRow(
              'Head Form', formData.headForm, 'headForm',
              'Cephalic Index', formData.cephalicIndex, 'cephalicIndex',
              'Head shape', 'Index value',
              'default', 'numeric',
              <EmojiIcon emoji="🧠" />,
              <Ruler size={20} color="#6b7280" />
            )}
            {renderInputRow(
              'Face Shape', formData.faceShape, 'faceShape',
              'Face Profile', formData.faceProfile, 'faceProfile',
              'e.g., Oval', 'e.g., Straight',
              'default', 'default',
              <EmojiIcon emoji="😊" />,
              <Eye size={20} color="#6b7280" />
            )}
            <EnhancedInput
              label="Face Symmetry"
              value={formData.faceSymmetry}
              onChange={(text) => setFormData(prev => ({ ...prev, faceSymmetry: text }))}
              placeholder="Symmetry assessment"
              icon={<EmojiIcon emoji="⚖️" />}
            />
            {renderInputRow(
              'Face Height', formData.faceHeight, 'faceHeight',
              'Face Divergence', formData.faceDivergence, 'faceDivergence',
              'mm', 'Type',
              'numeric', 'default',
              <Ruler size={20} color="#6b7280" />,
              <EmojiIcon emoji="↕️" />
            )}
          </>
        ))}

        {renderFormSection('extraoral', 'EXTRAORAL EXAMINATION', <Eye size={24} color="#64748b" />, (
          <>
            <EnhancedInput
              label="Lymph Nodes"
              value={formData.lymphNodes}
              onChange={(text) => setFormData(prev => ({ ...prev, lymphNodes: text }))}
              placeholder="Lymph node assessment"
              icon={<Activity size={20} color="#6b7280" />}
            />
            {renderInputRow(
              'TMJ', formData.tmj, 'tmj',
              'Mouth Opening', formData.mouthOpening, 'mouthOpening',
              'TMJ assessment', 'mm',
              'default', 'numeric',
              <EmojiIcon emoji="🦷" />,
              <EmojiIcon emoji="😮" />
            )}
            <EnhancedInput
              label="Swallow Pattern"
              value={formData.swallow}
              onChange={(text) => setFormData(prev => ({ ...prev, swallow: text }))}
              placeholder="Swallowing assessment"
              icon={<EmojiIcon emoji="👅" />}
            />
            {renderInputRow(
              'Lip Competence', formData.lipCompetence, 'lipCompetence',
              'Naso-Labial Angle', formData.nasoLabialAngle, 'nasoLabialAngle',
              'Lip seal assessment', 'Degrees',
              'default', 'numeric',
              <EmojiIcon emoji="👄" />,
              <Ruler size={20} color="#6b7280" />
            )}
            <EnhancedInput
              label="Chin"
              value={formData.chin}
              onChange={(text) => setFormData(prev => ({ ...prev, chin: text }))}
              placeholder="Chin assessment"
              icon={<EmojiIcon emoji="👤" />}
            />
            <EnhancedInput
              label="Lips"
              value={formData.lips}
              onChange={(text) => setFormData(prev => ({ ...prev, lips: text }))}
              placeholder="Lip assessment"
              icon={<EmojiIcon emoji="💋" />}
            />
          </>
        ))}

        {renderFormSection('intraoral', 'INTRAORAL EXAMINATION', <Smile size={24} color="#ec4899" />, (
          <>
            <EnhancedInput
              label="Labial/Buccal Mucosa"
              value={formData.labialBuccalMucosa}
              onChange={(text) => setFormData(prev => ({ ...prev, labialBuccalMucosa: text }))}
              placeholder="Mucosa assessment"
              multiline={true}
              icon={<Eye size={20} color="#6b7280" />}
            />
            <EnhancedInput
              label="Frenum"
              value={formData.frenum}
              onChange={(text) => setFormData(prev => ({ ...prev, frenum: text }))}
              placeholder="Frenum assessment"
              icon={<EmojiIcon emoji="👅" />}
            />
            <EnhancedInput
              label="Tongue"
              value={formData.tongue}
              onChange={(text) => setFormData(prev => ({ ...prev, tongue: text }))}
              placeholder="Tongue assessment"
              multiline={true}
              icon={<EmojiIcon emoji="👅" />}
            />
            <EnhancedInput
              label="Palate"
              value={formData.palate}
              onChange={(text) => setFormData(prev => ({ ...prev, palate: text }))}
              placeholder="Palate assessment"
              icon={<EmojiIcon emoji="🦷" />}
            />
            <EnhancedInput
              label="Floor of Mouth"
              value={formData.floorOfMouth}
              onChange={(text) => setFormData(prev => ({ ...prev, floorOfMouth: text }))}
              placeholder="Floor of mouth assessment"
              icon={<EmojiIcon emoji="👇" />}
            />
          </>
        ))}

        {renderFormSection('gingival', 'GINGIVAL EXAMINATION', <Clipboard size={24} color="#6366f1" />, (
          <>
            {renderInputRow(
              'Color', formData.gingivaColor, 'gingivaColor',
              'Size', formData.gingivaSize, 'gingivaSize',
              'e.g., Pink', 'e.g., Normal',
              'default', 'default',
              <EmojiIcon emoji="🎨" />,
              <Ruler size={20} color="#6b7280" />
            )}
            {renderInputRow(
              'Contour', formData.gingivaContour, 'gingivaContour',
              'Shape', formData.gingivaShape, 'gingivaShape',
              'e.g., Scalloped', 'e.g., Knife-edge',
              'default', 'default',
              <EmojiIcon emoji="📐" />,
              <EmojiIcon emoji="🔺" />
            )}
            <EnhancedInput
              label="Consistency"
              value={formData.gingivaConsistency}
              onChange={(text) => setFormData(prev => ({ ...prev, gingivaConsistency: text }))}
              placeholder="e.g., Firm"
              icon={<EmojiIcon emoji="🫳" />}
            />
            {renderInputRow(
              'Surface Texture', formData.gingivaSurfaceTexture, 'gingivaSurfaceTexture',
              'Position', formData.gingivaPosition, 'gingivaPosition',
              'e.g., Stippled', 'e.g., Coronal',
              'default', 'default',
              <EmojiIcon emoji="🔍" />,
              <EmojiIcon emoji="📍" />
            )}
            {renderInputRow(
              'Stippling', formData.gingivaStippling, 'gingivaStippling',
              'Bleeding on Probing', formData.bleedingOnProbing, 'bleedingOnProbing',
              'e.g., Present', 'Yes/No',
              'default', 'default',
              <EmojiIcon emoji="🔘" />,
              <EmojiIcon emoji="🩸" />
            )}
            <EnhancedInput
              label="Periodontal Evaluation"
              value={formData.periodontalEvaluation}
              onChange={(text) => setFormData(prev => ({ ...prev, periodontalEvaluation: text }))}
              placeholder="Periodontal assessment"
              multiline={true}
              icon={<Clipboard size={20} color="#6366f1" />}
            />
          </>
        ))}

        {renderFormSection('dentalExam', 'DENTAL EXAMINATION', <Clipboard size={24} color="#f97316" />, (
          <>
            {renderInputRow(
              'Dentition', formData.dentition, 'dentition',
              'Teeth Number', formData.teethNumber, 'teethNumber',
              'e.g., Mixed', 'Count',
              'default', 'numeric',
              <EmojiIcon emoji="🦷" />,
              <EmojiIcon emoji="#️⃣" />
            )}
            {renderInputRow(
              'Teeth Present', formData.teethPresent, 'teethPresent',
              'Teeth Missing', formData.teethMissing, 'teethMissing',
              'Count', 'Count',
              'numeric', 'numeric',
              <CheckCircle size={20} color="#10b981" />,
              <X size={20} color="#ef4444" />
            )}
            <EnhancedInput
              label="Dental Caries"
              value={formData.dentalCaries}
              onChange={(text) => setFormData(prev => ({ ...prev, dentalCaries: text }))}
              placeholder="Caries assessment"
              multiline={true}
              icon={<EmojiIcon emoji="🦷" />}
            />
            {renderInputRow(
              'Deep Caries', formData.deepCaries, 'deepCaries',
              'Fractured Teeth', formData.fracturedTeeth, 'fracturedTeeth',
              'Teeth numbers', 'Teeth numbers',
              'default', 'default',
              <AlertCircle size={20} color="#ef4444" />,
              <EmojiIcon emoji="💥" />
            )}
            {renderInputRow(
              'Retained Teeth', formData.retainedTeeth, 'retainedTeeth',
              'Mobility', formData.mobility, 'mobility',
              'Teeth numbers', 'Grade',
              'default', 'numeric',
              <EmojiIcon emoji="🦷" />,
              <Activity size={20} color="#6b7280" />
            )}
            <EnhancedInput
              label="Orthodontic Problem"
              value={formData.orthodonticProblem}
              onChange={(text) => setFormData(prev => ({ ...prev, orthodonticProblem: text }))}
              placeholder="Orthodontic issues"
              multiline={true}
              icon={<Ruler size={20} color="#f97316" />}
            />
            <EnhancedInput
              label="Other Dental Anomalies"
              value={formData.otherDentalAnomalies}
              onChange={(text) => setFormData(prev => ({ ...prev, otherDentalAnomalies: text }))}
              placeholder="Any other anomalies"
              multiline={true}
              icon={<AlertCircle size={20} color="#6b7280" />}
            />
            <EnhancedInput
              label="Fluorosis"
              value={formData.fluorosis}
              onChange={(text) => setFormData(prev => ({ ...prev, fluorosis: text }))}
              placeholder="Fluorosis assessment"
              icon={<EmojiIcon emoji="💎" />}
            />
            <EnhancedInput
              label="Malformation"
              value={formData.malformation}
              onChange={(text) => setFormData(prev => ({ ...prev, malformation: text }))}
              placeholder="Tooth malformations"
              multiline={true}
              icon={<EmojiIcon emoji="⚠️" />}
            />
          </>
        ))}

        {renderFormSection('malocclusion', 'MALOCCLUSION FINDINGS', <Ruler size={24} color="#22c55e" />, (
          <>
            {renderInputRow(
              'Primary Molar Left', formData.primaryMolarLeft, 'primaryMolarLeft',
              'Primary Molar Right', formData.primaryMolarRight, 'primaryMolarRight',
              'Relation', 'Relation',
              'default', 'default',
              <EmojiIcon emoji="🦷" />,
              <EmojiIcon emoji="🦷" />
            )}
            {renderInputRow(
              'Permanent Molar Left', formData.permanentMolarLeft, 'permanentMolarLeft',
              'Permanent Molar Right', formData.permanentMolarRight, 'permanentMolarRight',
              'Relation', 'Relation',
              'default', 'default',
              <EmojiIcon emoji="🦷" />,
              <EmojiIcon emoji="🦷" />
            )}
            {renderInputRow(
              'Overjet', formData.overJet, 'overJet',
              'Overbite', formData.overBite, 'overBite',
              'mm', 'mm',
              'numeric', 'numeric',
              <Ruler size={20} color="#22c55e" />,
              <Ruler size={20} color="#22c55e" />
            )}
            <EnhancedInput
              label="Other Malocclusion Findings"
              value={formData.otherMalocclusionFindings}
              onChange={(text) => setFormData(prev => ({ ...prev, otherMalocclusionFindings: text }))}
              placeholder="Additional findings"
              multiline={true}
              icon={<Clipboard size={20} color="#22c55e" />}
            />
          </>
        ))}

        {renderFormSection('fdiChart', 'FDI CHART', <Clipboard size={24} color="#3b82f6" />, (
          <View style={styles.fdiSection}>
            <Text style={styles.sectionDescription}>
              Enter tooth status codes for each tooth number. Use the legend below for reference.
            </Text>
            {renderFDIChart()}
          </View>
        ))}

        {renderFormSection('diagnosis', 'DIAGNOSIS', <Stethoscope size={24} color="#8b5cf6" />, (
          <>
            <EnhancedInput
              label="Provisional Diagnosis"
              value={formData.provisionalDiagnosis}
              onChange={(text) => setFormData(prev => ({ ...prev, provisionalDiagnosis: text }))}
              placeholder="Initial diagnosis"
              multiline={true}
              icon={<Stethoscope size={20} color="#8b5cf6" />}
            />
            <EnhancedInput
              label="Radiographic Findings"
              value={formData.radiographicFindings}
              onChange={(text) => setFormData(prev => ({ ...prev, radiographicFindings: text }))}
              placeholder="X-ray findings"
              multiline={true}
              icon={<Camera size={20} color="#6b7280" />}
            />
            <EnhancedInput
              label="Pulp Vitality"
              value={formData.pulpVitality}
              onChange={(text) => setFormData(prev => ({ ...prev, pulpVitality: text }))}
              placeholder="Pulp vitality test results"
              icon={<Activity size={20} color="#10b981" />}
            />
            <EnhancedInput
              label="Final Diagnosis"
              value={formData.finalDiagnosis}
              onChange={(text) => setFormData(prev => ({ ...prev, finalDiagnosis: text }))}
              placeholder="Confirmed diagnosis"
              multiline={true}
              icon={<CheckCircle size={20} color="#10b981" />}
            />
          </>
        ))}

        {renderFormSection('treatment', 'TREATMENT PLAN', <Clipboard size={24} color="#ef4444" />, (
          <>
            <EnhancedInput
              label="Treatment Plan"
              value={formData.treatmentPlan}
              onChange={(text) => setFormData(prev => ({ ...prev, treatmentPlan: text }))}
              placeholder="Proposed treatment steps"
              multiline={true}
              icon={<Clipboard size={20} color="#ef4444" />}
            />
            <EnhancedInput
              label="Treatment Done"
              value={formData.treatmentDone}
              onChange={(text) => setFormData(prev => ({ ...prev, treatmentDone: text }))}
              placeholder="Completed treatments"
              multiline={true}
              icon={<CheckCircle size={20} color="#10b981" />}
            />
          </>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[
        styles.header,
        {
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, -50],
              extrapolate: 'clamp',
            })
          }],
          opacity: scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [1, 0.8, 0.6],
            extrapolate: 'clamp',
          })
        }
      ]}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Health Records</Text>
          {isDoctor && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowCreateModal(true)}
              activeOpacity={0.7}
            >
              <Plus size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Statistics Cards */}
        {isDoctor && (
          <Animated.ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsScroll}
            contentContainerStyle={styles.statsContainer}
            scrollEnabled={false}
          >
            <StatsCard
              icon={<FileText size={20} color="#3b82f6" />}
              value={stats.total.toString()}
              label="Total Records"
              color="#3b82f6"
              animationDelay={0}
            />
            <StatsCard
              icon={<Calendar size={20} color="#10b981" />}
              value={stats.today.toString()}
              label="Today"
              color="#10b981"
              animationDelay={100}
            />

          </Animated.ScrollView>
        )}
      </Animated.View>

      {/* Search Bar */}
      <Animated.View style={[
        styles.searchContainer,
        {
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, -30],
              extrapolate: 'clamp',
            })
          }]
        }
      ]}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, complaint, or diagnosis..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchButton}
            >
              <X size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Patient Records List */}
      <Animated.FlatList
        ref={flatListRef}
        data={filteredRecords}
        renderItem={({ item, index }) => (
          <PatientRecordCard
            item={item}
            isDoctor={isDoctor}
            onEdit={() => handleEditRecord(item)}
            onDelete={() => handleDeleteRecord(item.id, item.doctorId)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recordsList}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor="#3b82f6"
            colors={['#3b82f6']}
            progressBackgroundColor="#fff"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <HealthRecordsEmptyState
              isDoctor={isDoctor}
              searchQuery={searchQuery}
              onCreatePress={() => setShowCreateModal(true)}
              onRefreshPress={handleRefresh}
            />
          </View>
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
      />

      {/* Create/Edit Health Record Modal */}
<Modal
  visible={showCreateModal}
  animationType="slide"
  transparent={false}
  statusBarTranslucent={true}
  onRequestClose={() => {
    setShowCreateModal(false);
    resetForm();
  }}
>
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.fullScreenContainer}
  >
    <View style={styles.fullScreenHeader}>
      <View style={styles.fullScreenHeaderContent}>
        <Text style={styles.fullScreenTitle}>
          {editingRecord ? 'Edit Health Record' : 'Create New Health Record'}
        </Text>
        <Text style={styles.fullScreenSubtitle}>
          {editingRecord ? `Editing ${editingRecord.patientName}'s record` : 'Complete all sections below'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.fullScreenCloseButton}
        onPress={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        disabled={submitting}
      >
        <X size={24} color="#374151" />
      </TouchableOpacity>
    </View>

    {/* Form Navigation */}
    <View style={styles.fullScreenNavContainer}>
      <FormNavigation 
        activeSection={activeSection}
        onSectionChange={scrollToSection}
        sectionAnimations={sectionAnimations}
      />
    </View>

    <View style={styles.fullScreenContent}>
      <ScrollView 
        style={styles.fullScreenScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.fullScreenScrollContent}
      >
        {renderFormContent()}
      </ScrollView>
    </View>

    <View style={styles.fullScreenFooter}>
      <View style={styles.fullScreenNavButtons}>
        <TouchableOpacity
          style={[styles.fullScreenNavButton, styles.fullScreenPrevButton]}
          onPress={() => {
            const sections = [
              'demographic', 'chiefComplaint', 'medicalHistory', 'oralHygiene',
              'dietHabits', 'behaviour', 'generalExam', 'craniofacial',
              'extraoral', 'intraoral', 'gingival', 'dentalExam',
              'malocclusion', 'fdiChart', 'diagnosis', 'treatment'
            ];
            const currentIndex = sections.indexOf(activeSection);
            if (currentIndex > 0) {
              scrollToSection(sections[currentIndex - 1]);
            }
          }}
          disabled={activeSection === 'demographic'}
        >
          <ChevronLeft size={20} color="#3b82f6" />
          <Text style={styles.fullScreenNavButtonText}>Previous</Text>
        </TouchableOpacity>
        
        <View style={styles.sectionIndicator}>
          <Text style={styles.sectionIndicatorText}>
            Section {sections.indexOf(activeSection) + 1} of {sections.length}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.fullScreenNavButton, styles.fullScreenNextButton]}
          onPress={() => {
            const sections = [
              'demographic', 'chiefComplaint', 'medicalHistory', 'oralHygiene',
              'dietHabits', 'behaviour', 'generalExam', 'craniofacial',
              'extraoral', 'intraoral', 'gingival', 'dentalExam',
              'malocclusion', 'fdiChart', 'diagnosis', 'treatment'
            ];
            const currentIndex = sections.indexOf(activeSection);
            if (currentIndex < sections.length - 1) {
              scrollToSection(sections[currentIndex + 1]);
            }
          }}
          disabled={activeSection === 'treatment'}
        >
          <Text style={styles.fullScreenNavButtonText}>Next</Text>
          <ChevronRight size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.fullScreenSubmitButtons}>
        <TouchableOpacity
          style={styles.fullScreenCancelButton}
          onPress={() => {
            setShowCreateModal(false);
            resetForm();
          }}
          disabled={submitting}
        >
          <Text style={styles.fullScreenCancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fullScreenSubmitButton,
            submitting && styles.fullScreenSubmitButtonDisabled,
          ]}
          onPress={handleCreateRecord}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              {editingRecord ? (
                <>
                  <Edit3 size={20} color="#fff" />
                  <Text style={styles.fullScreenSubmitButtonText}>Update Record</Text>
                </>
              ) : (
                <>
                  <Plus size={20} color="#fff" />
                  <Text style={styles.fullScreenSubmitButtonText}>Create Record</Text>
                </>
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 100,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  statsScroll: {
    marginHorizontal: -24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 4,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statsLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  clearSearchButton: {
    padding: 4,
  },
  recordsList: {
    padding: 24,
    paddingTop: 16,
  },
  patientCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 20,
  },
  patientInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  patientBadges: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 12,
  },
  sexBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ageBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ageBadgeText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '600',
  },
  urgentBadge: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  urgentBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  patientDetails: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
  },
  cardActions: {
    marginLeft: 12,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  complaintContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  contentIcon: {
    marginTop: 2,
  },
  complaintContent: {
    flex: 1,
    marginLeft: 16,
  },
  contentLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentValue: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '500',
  },
  dentalFindings: {
    marginTop: 16,
  },
  dentalTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  toothStatusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toothStatus: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toothStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  moreTeethBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  moreTeethText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  footerLeft: {
    flex: 1,
  },
  createdByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  createdBy: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  updatedDate: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  footerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  editButtonText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.92,
    minHeight: height * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  navScroll: {
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  navContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  navItemContainer: {
    marginHorizontal: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navItemActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  navText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  navTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    flex: 1,
  },
  formSection: {
    padding: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  fdiSection: {
    padding: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionDescription: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  input: {
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    fontWeight: '500',
    minHeight: 56,
  },
  textArea: {
    minHeight: 120,
    maxHeight: 200,
    textAlignVertical: 'top',
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
  },
  pickerOption: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#3b82f6',
  },
  pickerText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  pickerTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: -4,
  },
  fdiChartContainer: {
    marginVertical: 20,
  },
  teethSection: {
    marginBottom: 32,
  },
  teethLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    paddingVertical: 10,
    borderRadius: 12,
  },
  teethRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  toothContainer: {
    alignItems: 'center',
    width: 56,
  },
  toothNumber: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  toothInput: {
    width: 56,
    height: 56,
    borderRadius: 28,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  fdiReference: {
    marginTop: 32,
    padding: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
  },
  fdiReferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  fdiReferenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  fdiReferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    width: '48%',
  },
  statusIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCode: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    gap: 8,
  },
  prevButton: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff',
  },
  nextButton: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff',
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3b82f6',
  },
  submitContainer: {
    flexDirection: 'row',
    padding: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  createButton: {
    flex: 2,
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptyStateContainer: {
    paddingVertical: 80,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  fullScreenHeaderContent: {
    flex: 1,
  },
  fullScreenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  fullScreenSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  fullScreenCloseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginLeft: 12,
  },
  fullScreenNavContainer: {
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  fullScreenContent: {
    flex: 1,
  },
  fullScreenScrollView: {
    flex: 1,
  },
  fullScreenScrollContent: {
    paddingBottom: 40,
  },
  fullScreenFooter: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  fullScreenNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  fullScreenNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    gap: 8,
    minWidth: 120,
  },
  fullScreenPrevButton: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff',
  },
  fullScreenNextButton: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff',
    justifyContent: 'flex-end',
  },
  fullScreenNavButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3b82f6',
  },
  sectionIndicator: {
    alignItems: 'center',
  },
  sectionIndicatorText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  fullScreenSubmitButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  fullScreenCancelButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fullScreenCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  fullScreenSubmitButton: {
    flex: 2,
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  fullScreenSubmitButtonDisabled: {
    opacity: 0.7,
  },
  fullScreenSubmitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});