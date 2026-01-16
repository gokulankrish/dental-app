const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBaja9Oaus9kobKh5gCcs_4Zw0n2o01CZ4",
  authDomain: "dental-chat-app-2a7fd.firebaseapp.com",
  projectId: "dental-chat-app-2a7fd",
  storageBucket: "dental-chat-app-2a7fd.firebasestorage.app",
  messagingSenderId: "112519937828",
  appId: "1:112519937828:web:7029c0789e0d77dcb5bdb1",
  measurementId: "G-4SDGG5D3YM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleRecord = {
  patientName: "John Smith",
  age: 35,
  dateOfBirth: "1989-05-15",
  sex: "Male",
  address: "123 Main St, City, State 12345",
  chiefComplaint: "Severe toothache in upper right molar",
  historyOfPresentIllness: "Patient reports sharp, throbbing pain that started 3 days ago. Pain worsens with hot/cold foods.",
  pastMedicalHistory: "Hypertension, controlled with medication. No known allergies.",
  pastDentalHistory: "Regular dental checkups. Last cleaning 6 months ago.",
  oralHygieneProgram: "Brushing twice daily",
  toothBrushingAid: "Manual toothbrush",
  duration: "2 minutes",
  frequency: "Twice daily",
  technique: "Modified Bass technique",
  toothPasteUsed: "Fluoride toothpaste",
  otherOralHygieneAids: "Dental floss",
  abnormalOralHabits: "None reported",
  dietDiary: "Regular meals, occasional sweets",
  vegNonVegMixed: "Mixed",
  recall24Hour: "Breakfast: Toast, coffee; Lunch: Sandwich; Dinner: Rice, vegetables",
  dietCounseling: "Advised to reduce sugar intake",
  behaviourRatingScale: "Cooperative",
  behaviourManagement: "Tell-show-do technique",
  statureBuilt: "Average",
  height: "175 cm",
  weight: "75 kg",
  gait: "Normal",
  speech: "Clear",
  temperature: "98.6°F",
  pulse: "72 bpm",
  bp: "120/80 mmHg",
  headForm: "Normal",
  cephalicIndex: "Mesocephalic",
  faceShape: "Oval",
  faceProfile: "Straight",
  faceSymmetry: "Symmetrical",
  faceHeight: "Normal",
  faceDivergence: "Normal",
  lymphNodes: "Non-palpable",
  tmj: "Normal function",
  mouthOpening: "45mm",
  swallow: "Normal",
  lipCompetence: "Competent",
  nasoLabialAngle: "90 degrees",
  chin: "Normal",
  lips: "Normal color and texture",
  labialBuccalMucosa: "Pink, moist",
  frenum: "Normal attachment",
  tongue: "Normal size and mobility",
  palate: "Normal arch form",
  floorOfMouth: "Normal",
  gingivaColor: "Pink",
  gingivaSize: "Normal",
  gingivaContour: "Scalloped",
  gingivaShape: "Knife-edge",
  gingivaConsistency: "Firm",
  gingivaSurfaceTexture: "Stippled",
  gingivaPosition: "Normal",
  gingivaStippling: "Present",
  bleedingOnProbing: "Minimal",
  periodontalEvaluation: "Mild gingivitis",
  dentition: "Permanent",
  teethNumber: "28",
  malformation: "None",
  teethPresent: "28 teeth present",
  teethMissing: "Third molars",
  dentalCaries: "Tooth #3 - large carious lesion",
  deepCaries: "Tooth #3",
  fracturedTeeth: "None",
  retainedTeeth: "None",
  mobility: "Grade 0",
  orthodonticProblem: "Mild crowding",
  otherDentalAnomalies: "None",
  fluorosis: "None",
  primaryMolarLeft: "N/A",
  primaryMolarRight: "N/A",
  permanentMolarLeft: "Class I",
  permanentMolarRight: "Class I",
  overJet: "3mm",
  overBite: "2mm",
  otherMalocclusionFindings: "Mild anterior crowding",
  provisionalDiagnosis: "Acute pulpitis tooth #3",
  radiographicFindings: "Periapical radiolucency visible on tooth #3",
  pulpVitality: "Non-vital tooth #3",
  finalDiagnosis: "Acute pulpitis tooth #3 with periapical periodontitis",
  treatmentPlan: "Root canal therapy followed by crown restoration",
  treatmentDone: "Initial examination completed",
  fdiChartData: { "11": "D", "21": "R", "16": "M", "26": "GD" },
  photos: [
    "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg",
    "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg"
  ],
  createdDate: "2025-01-15",
  createdBy: "Dr. Aafirin",
  patientId: "patient_001",
  doctorId: "doctor_001",
  updatedAt: Timestamp.now(),
};

async function createHealthRecord() {
  try {
    const docRef = await addDoc(collection(db, "healthRecords"), sampleRecord);
    console.log("✅ Health record created with ID: ", docRef.id);
  } catch (error) {
    console.error("❌ Error creating health record: ", error);
  }
}

createHealthRecord();