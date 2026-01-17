
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   Modal,
//   Platform,
// } from 'react-native';
// import { router, Stack } from 'expo-router';
// import { MapPin, CreditCard, FileText, Upload, CircleCheck as CheckCircle, ArrowLeft, Camera, Image as ImageIcon, Receipt } from 'lucide-react-native';
// import { useCart } from '@/hooks/useCart';
// import { useOrders } from '../../hooks/useOrder';
// import * as ImagePicker from 'expo-image-picker';
// import { colors } from '../../constants/Colors';

// export default function CheckoutPage() {
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { addOrder } = useOrders();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     pincode: '',
//     phone: '',
//   });
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [prescriptionImages, setPrescriptionImages] = useState<string[]>([]);
//   const [showImagePicker, setShowImagePicker] = useState(false);

//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Required', 'Camera permission is required to take photos.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const requestGalleryPermission = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleTakePhoto = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) return;

//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setPrescriptionImages([...prescriptionImages, result.assets[0].uri]);
//         setShowImagePicker(false);
//         Alert.alert('Success', 'Prescription image captured successfully!');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     }
//   };

//   const handleSelectFromGallery = async () => {
//     const hasPermission = await requestGalleryPermission();
//     if (!hasPermission) return;

//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setPrescriptionImages([...prescriptionImages, result.assets[0].uri]);
//         setShowImagePicker(false);
//         Alert.alert('Success', 'Prescription image selected successfully!');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select image. Please try again.');
//     }
//   };

//   const prescriptionItems = cartItems.filter(item => item.requiresPrescription);
//   const needsPrescription = prescriptionItems.length > 0;

//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => {
//       const itemPrice = item.discount 
//         ? Math.round(item.price * (1 - item.discount / 100))
//         : item.price;
//       return total + (itemPrice * item.quantity);
//     }, 0);
//   };

//   const calculateDiscount = () => {
//     return cartItems.reduce((total, item) => {
//       if (item.discount) {
//         const discountAmount = Math.round(item.price * (item.discount / 100));
//         return total + (discountAmount * item.quantity);
//       }
//       return total;
//     }, 0);
//   };

//   const calculateGST = () => {
//     const subtotal = calculateSubtotal();
//     return Math.round(subtotal * 0.18); // 18% GST
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateGST();
//   };

//   const handleNextStep = () => {
//     if (currentStep === 1) {
//       // Validate address
//       if (!address.street || !address.city || !address.state || !address.pincode || !address.phone) {
//         Alert.alert('Incomplete Address', 'Please fill in all address fields.');
//         return;
//       }
//     } else if (currentStep === 2) {
//       // Payment step - no validation needed for COD
//     } else if (currentStep === 3 && needsPrescription) {
//       // Prescription step
//       if (prescriptionImages.length === 0) {
//         Alert.alert('Prescription Required', 'Please upload at least one prescription image to continue.');
//         return;
//       }
//     }
    
//     if (currentStep < (needsPrescription ? 4 : 3)) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       handlePlaceOrder();
//     }
//   };

// const handlePlaceOrder = () => {
//   const order = {
//     id: Date.now().toString(),
//     items: cartItems,
//     subtotal: calculateSubtotal(),
//     discount: calculateDiscount(),
//     gst: calculateGST(),
//     total: calculateTotal(),
//     address,
//     paymentMethod,
//     status: (needsPrescription ? 'pending_approval' : 'confirmed') as 'pending_approval' | 'confirmed' | 'rejected',
//     needsPrescription,
//     prescriptionUploaded: prescriptionImages.length > 0,
//     createdAt: new Date().toISOString(),
//   };

//   addOrder(order);
//   clearCart();
  
//   Alert.alert(
//     'Order Placed Successfully!',
//     needsPrescription 
//       ? 'Your order is pending doctor approval. You will receive a notification once approved.'
//       : 'Your order has been confirmed and will be processed shortly.',
//     [
//       { text: 'OK', onPress: () => router.replace('/') }
//     ]
//   );
// };

//   const handleImageUpload = (source: 'camera' | 'gallery') => {
//     if (source === 'camera') {
//       handleTakePhoto();
//     } else {
//       handleSelectFromGallery();
//     }
//   };

//   const removePrescriptionImage = (index: number) => {
//     const newImages = prescriptionImages.filter((_, i) => i !== index);
//     setPrescriptionImages(newImages);
//   };

//   const renderStepIndicator = () => {
//     const totalSteps = needsPrescription ? 4 : 3;
//     return (
//       <View style={styles.stepIndicator}>
//         {Array.from({ length: totalSteps }, (_, i) => (
//           <View key={i} style={styles.stepRow}>
//             <View style={[
//               styles.stepCircle,
//               currentStep > i + 1 ? styles.stepCompleted :
//               currentStep === i + 1 ? styles.stepActive : styles.stepInactive
//             ]}>
//               {currentStep > i + 1 ? (
//                 <CheckCircle size={16} color="#ffffff" />
//               ) : (
//                 <Text style={[
//                   styles.stepNumber,
//                   currentStep === i + 1 ? styles.stepNumberActive : styles.stepNumberInactive
//                 ]}>{i + 1}</Text>
//               )}
//             </View>
//             {i < totalSteps - 1 && <View style={styles.stepLine} />}
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const renderAddressStep = () => (
//     <View style={styles.stepContent}>
//       <View style={styles.stepHeader}>
//         <MapPin size={24} color={colors.primary} />
//         <Text style={styles.stepTitle}>Delivery Address</Text>
//       </View>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Street Address"
//         value={address.street}
//         onChangeText={(text) => setAddress({...address, street: text})}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="City"
//         value={address.city}
//         onChangeText={(text) => setAddress({...address, city: text})}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="State"
//         value={address.state}
//         onChangeText={(text) => setAddress({...address, state: text})}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="PIN Code"
//         value={address.pincode}
//         onChangeText={(text) => setAddress({...address, pincode: text})}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={address.phone}
//         onChangeText={(text) => setAddress({...address, phone: text})}
//         keyboardType="phone-pad"
//       />
//     </View>
//   );

//   const renderPaymentStep = () => (
//     <View style={styles.stepContent}>
//       <View style={styles.stepHeader}>
//         <CreditCard size={24} color={colors.primary} />
//         <Text style={styles.stepTitle}>Payment Method</Text>
//       </View>
      
//       <TouchableOpacity
//         style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentOptionSelected]}
//         onPress={() => setPaymentMethod('cod')}
//       >
//         <View style={styles.radioButton}>
//           {paymentMethod === 'cod' && <View style={styles.radioButtonSelected} />}
//         </View>
//         <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[styles.paymentOption, paymentMethod === 'online' && styles.paymentOptionSelected]}
//         onPress={() => setPaymentMethod('online')}
//       >
//         <View style={styles.radioButton}>
//           {paymentMethod === 'online' && <View style={styles.radioButtonSelected} />}
//         </View>
//         <Text style={styles.paymentOptionText}>Online Payment</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderPrescriptionStep = () => (
//     <View style={styles.stepContent}>
//       <View style={styles.stepHeader}>
//         <FileText size={24} color={colors.primary} />
//         <Text style={styles.stepTitle}>Upload Prescription</Text>
//       </View>
      
//       <Text style={styles.prescriptionNote}>
//         The following medicines require a prescription:
//       </Text>
      
//       {prescriptionItems.map(item => (
//         <View key={item.id} style={styles.prescriptionItem}>
//           <Image source={{ uri: item.image }} style={styles.prescriptionItemImage} />
//           <Text style={styles.prescriptionItemName}>{item.name}</Text>
//         </View>
//       ))}
      
//       <Text style={styles.uploadInstructions}>
//         Please upload clear images of your prescription(s):
//       </Text>
      
//       {prescriptionImages.length > 0 && (
//         <View style={styles.uploadedImages}>
//           {prescriptionImages.map((imageUri, index) => (
//             <View key={index} style={styles.uploadedImageContainer}>
//               <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//               <TouchableOpacity
//                 style={styles.removeImageButton}
//                 onPress={() => removePrescriptionImage(index)}
//               >
//                 <Text style={styles.removeImageText}>×</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       )}
      
//       <TouchableOpacity 
//         style={styles.uploadButton}
//         onPress={() => setShowImagePicker(true)}
//       >
//         <Upload size={20} color="#6b7280" />
//         <Text style={styles.uploadButtonText}>
//           Add Prescription Image
//         </Text>
//       </TouchableOpacity>
      
//       {/* Image Picker Modal */}
//       <Modal
//         visible={showImagePicker}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowImagePicker(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.imagePickerModal}>
//             <Text style={styles.imagePickerTitle}>Select Image Source</Text>
            
//             <TouchableOpacity
//               style={styles.imagePickerOption}
//               onPress={() => handleImageUpload('camera')}
//             >
//               <Camera size={24} color={colors.primary} />
//               <Text style={styles.imagePickerOptionText}>Take Photo</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={styles.imagePickerOption}
//               onPress={() => handleImageUpload('gallery')}
//             >
//               <ImageIcon size={24} color={colors.primary} />
//               <Text style={styles.imagePickerOptionText}>Choose from Gallery</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={styles.imagePickerCancel}
//               onPress={() => setShowImagePicker(false)}
//             >
//               <Text style={styles.imagePickerCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );

//   const renderReviewStep = () => (
//     <View style={styles.stepContent}>
//       <View style={styles.stepHeader}>
//         <CheckCircle size={24} color={colors.primary} />
//         <Text style={styles.stepTitle}>Review Order</Text>
//       </View>
      
//       <View style={styles.orderSummary}>
//         <Text style={styles.summaryTitle}>Order Summary</Text>
//         {cartItems.map(item => (
//           <View key={item.id} style={styles.summaryItem}>
//             <View style={styles.summaryItemInfo}>
//               <Text style={styles.summaryItemName}>{item.name} x{item.quantity}</Text>
//               {item.discount && (
//                 <Text style={styles.summaryItemDiscount}>{item.discount}% OFF</Text>
//               )}
//             </View>
//             <View style={styles.summaryItemPrices}>
//               {item.discount && (
//                 <Text style={styles.summaryItemOriginalPrice}>₹{item.price * item.quantity}</Text>
//               )}
//               <Text style={styles.summaryItemPrice}>
//                 ₹{item.discount 
//                   ? Math.round(item.price * (1 - item.discount / 100)) * item.quantity
//                   : item.price * item.quantity}
//               </Text>
//             </View>
//           </View>
//         ))}
        
//         <View style={styles.billingSummary}>
//           <View style={styles.billingRow}>
//             <Text style={styles.billingLabel}>Subtotal:</Text>
//             <Text style={styles.billingValue}>₹{calculateSubtotal()}</Text>
//           </View>
          
//           {calculateDiscount() > 0 && (
//             <View style={styles.billingRow}>
//               <Text style={[styles.billingLabel, styles.discountLabel]}>Discount:</Text>
//               <Text style={[styles.billingValue, styles.discountValue]}>-₹{calculateDiscount()}</Text>
//             </View>
//           )}
          
//           <View style={styles.billingRow}>
//             <Text style={styles.billingLabel}>GST (18%):</Text>
//             <Text style={styles.billingValue}>₹{calculateGST()}</Text>
//           </View>
          
//           <View style={styles.billingDivider} />
          
//           <View style={styles.billingRow}>
//             <Text style={styles.billingTotalLabel}>Total Amount:</Text>
//             <Text style={styles.billingTotalValue}>₹{calculateTotal()}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <>
//       <Stack.Screen 
//         options={{ 
//           headerShown: true,
//           title: 'Checkout',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => router.back()}>
//               <ArrowLeft size={24} color={colors.primary} />
//             </TouchableOpacity>
//           ),
//         }} 
//       />
//       <View style={styles.container}>
//         {renderStepIndicator()}
        
//         <ScrollView style={styles.content}>
//           {currentStep === 1 && renderAddressStep()}
//           {currentStep === 2 && renderPaymentStep()}
//           {currentStep === 3 && needsPrescription && renderPrescriptionStep()}
//           {((currentStep === 3 && !needsPrescription) || (currentStep === 4 && needsPrescription)) && renderReviewStep()}
//         </ScrollView>
        
//         <View style={styles.footer}>
//           <TouchableOpacity 
//             style={styles.nextButton} 
//             onPress={handleNextStep}
//           >
//             <Text style={styles.nextButtonText}>
//               {((currentStep === 3 && !needsPrescription) || (currentStep === 4 && needsPrescription)) ? 'Place Order' : 'Next'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   stepIndicator: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     backgroundColor: '#ffffff',
//   },
//   stepRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   stepCircle: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stepCompleted: {
//     backgroundColor: '#059669',
//   },
//   stepActive: {
//     backgroundColor: colors.primary,
//   },
//   stepInactive: {
//     backgroundColor: '#e5e7eb',
//   },
//   stepNumber: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   stepNumberActive: {
//     color: '#ffffff',
//   },
//   stepNumberInactive: {
//     color: '#6b7280',
//   },
//   stepLine: {
//     width: 40,
//     height: 2,
//     backgroundColor: '#e5e7eb',
//     marginHorizontal: 10,
//   },
//   content: {
//     flex: 1,
//   },
//   stepContent: {
//     padding: 20,
//   },
//   stepHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   stepTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginLeft: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: '#ffffff',
//   },
//   paymentOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   paymentOptionSelected: {
//     borderColor: colors.primary,
//     backgroundColor: '#eff6ff',
//   },
//   radioButton: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#d1d5db',
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButtonSelected: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: colors.primary,
//   },
//   paymentOptionText: {
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   prescriptionNote: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 15,
//   },
//   prescriptionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   prescriptionItemImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 6,
//     backgroundColor: '#f3f4f6',
//     marginRight: 12,
//   },
//   prescriptionItemName: {
//     fontSize: 14,
//     color: '#1f2937',
//   },
//   uploadInstructions: {
//     fontSize: 14,
//     color: '#374151',
//     marginTop: 20,
//     marginBottom: 15,
//     fontWeight: '500',
//   },
//   uploadedImages: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginBottom: 15,
//   },
//   uploadedImageContainer: {
//     position: 'relative',
//   },
//   uploadedImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     backgroundColor: '#f3f4f6',
//   },
//   removeImageButton: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: '#dc2626',
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   removeImageText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f3f4f6',
//     borderRadius: 8,
//     paddingVertical: 16,
//     marginTop: 15,
//     borderWidth: 2,
//     borderStyle: 'dashed',
//     borderColor: '#d1d5db',
//   },
//   uploadButtonText: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginLeft: 8,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   imagePickerModal: {
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//   },
//   imagePickerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   imagePickerOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     backgroundColor: '#f9fafb',
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   imagePickerOptionText: {
//     fontSize: 16,
//     color: '#1f2937',
//     marginLeft: 16,
//   },
//   imagePickerCancel: {
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   imagePickerCancelText: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   orderSummary: {
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 16,
//   },
//   summaryTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
//   summaryItemInfo: {
//     flex: 1,
//   },
//   summaryItemName: {
//     fontSize: 14,
//     color: '#4b5563',
//   },
//   summaryItemDiscount: {
//     fontSize: 12,
//     color: '#059669',
//     fontWeight: '500',
//     marginTop: 2,
//   },
//   summaryItemPrices: {
//     alignItems: 'flex-end',
//   },
//   summaryItemOriginalPrice: {
//     fontSize: 12,
//     color: '#6b7280',
//     textDecorationLine: 'line-through',
//   },
//   summaryItemPrice: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#1f2937',
//   },
//   billingSummary: {
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//     paddingTop: 12,
//     marginTop: 8,
//   },
//   billingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   billingLabel: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   billingValue: {
//     fontSize: 14,
//     color: '#1f2937',
//     fontWeight: '500',
//   },
//   discountLabel: {
//     color: '#059669',
//   },
//   discountValue: {
//     color: '#059669',
//   },
//   billingDivider: {
//     height: 1,
//     backgroundColor: '#e5e7eb',
//     marginVertical: 8,
//   },
//   billingTotalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   billingTotalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#059669',
//   },
//   footer: {
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//   },
//   nextButton: {
//     backgroundColor: colors.primary,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   nextButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { 
  MapPin, 
  CreditCard, 
  FileText, 
  Upload, 
  CircleCheck as CheckCircle, 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  Receipt,
  ChevronRight,
  Home,
  Phone,
  Mail,
  Package,
  Shield
} from 'lucide-react-native';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '../../hooks/useOrder';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [prescriptionImages, setPrescriptionImages] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take photos.');
        return false;
      }
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
        return false;
      }
    }
    return true;
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPrescriptionImages([...prescriptionImages, result.assets[0].uri]);
        setShowImagePicker(false);
        Alert.alert('Success', 'Prescription image captured successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleSelectFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPrescriptionImages([...prescriptionImages, result.assets[0].uri]);
        setShowImagePicker(false);
        Alert.alert('Success', 'Prescription image selected successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const prescriptionItems = cartItems.filter(item => item.requiresPrescription);
  const needsPrescription = prescriptionItems.length > 0;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount 
        ? Math.round(item.price * (1 - item.discount / 100))
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount) {
        const discountAmount = Math.round(item.price * (item.discount / 100));
        return total + (discountAmount * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.18);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleNextStep = () => {
    animateButton();
    
    if (currentStep === 1) {
      if (!address.street || !address.city || !address.state || !address.pincode || !address.phone) {
        Alert.alert('Incomplete Address', 'Please fill in all address fields.');
        return;
      }
    } else if (currentStep === 3 && needsPrescription) {
      if (prescriptionImages.length === 0) {
        Alert.alert('Prescription Required', 'Please upload at least one prescription image to continue.');
        return;
      }
    }
    
    if (currentStep < (needsPrescription ? 4 : 3)) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      gst: calculateGST(),
      total: calculateTotal(),
      address,
      paymentMethod,
      status: (needsPrescription ? 'pending_approval' : 'confirmed') as 'pending_approval' | 'confirmed' | 'rejected',
      needsPrescription,
      prescriptionUploaded: prescriptionImages.length > 0,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    
    Alert.alert(
      '🎉 Order Placed Successfully!',
      needsPrescription 
        ? 'Your order is pending doctor approval. You will receive a notification once approved.'
        : 'Your order has been confirmed and will be processed shortly.',
      [
        { text: 'OK', onPress: () => router.replace('/') }
      ]
    );
  };

  const handleImageUpload = (source: 'camera' | 'gallery') => {
    if (source === 'camera') {
      handleTakePhoto();
    } else {
      handleSelectFromGallery();
    }
  };

  const removePrescriptionImage = (index: number) => {
    const newImages = prescriptionImages.filter((_, i) => i !== index);
    setPrescriptionImages(newImages);
  };

  const renderStepIndicator = () => {
    const totalSteps = needsPrescription ? 4 : 3;
    const stepLabels = ['Address', 'Payment', needsPrescription ? 'Prescription' : 'Review', 'Review'];
    
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepIndicator}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <View key={i} style={styles.stepItem}>
              <View style={styles.stepCircleContainer}>
                <View style={[
                  styles.stepCircle,
                  currentStep > i + 1 && styles.stepCircleCompleted,
                  currentStep === i + 1 && styles.stepCircleActive,
                ]}>
                  {currentStep > i + 1 ? (
                    <CheckCircle size={18} color="#ffffff" />
                  ) : (
                    <Text style={[
                      styles.stepNumber,
                      currentStep === i + 1 ? styles.stepNumberActive : styles.stepNumberInactive
                    ]}>{i + 1}</Text>
                  )}
                </View>
                {i < totalSteps - 1 && (
                  <View style={[
                    styles.stepLine,
                    currentStep > i + 1 && styles.stepLineCompleted
                  ]} />
                )}
              </View>
              <Text style={[
                styles.stepLabel,
                currentStep === i + 1 && styles.stepLabelActive,
                currentStep > i + 1 && styles.stepLabelCompleted
              ]}>
                {stepLabels[i]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderAddressStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={[styles.iconContainer, styles.addressIcon]}>
          <MapPin size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.stepTitle}>Delivery Address</Text>
          <Text style={styles.stepSubtitle}>Where should we deliver your order?</Text>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <Home size={18} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            placeholderTextColor="#9ca3af"
            value={address.street}
            onChangeText={(text) => setAddress({...address, street: text})}
          />
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputWithIcon, { flex: 1, marginRight: 10 }]}>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="#9ca3af"
              value={address.city}
              onChangeText={(text) => setAddress({...address, city: text})}
            />
          </View>
          <View style={[styles.inputWithIcon, { flex: 1 }]}>
            <TextInput
              style={styles.input}
              placeholder="State"
              placeholderTextColor="#9ca3af"
              value={address.state}
              onChangeText={(text) => setAddress({...address, state: text})}
            />
          </View>
        </View>
        
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="PIN Code"
            placeholderTextColor="#9ca3af"
            value={address.pincode}
            onChangeText={(text) => setAddress({...address, pincode: text})}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputWithIcon}>
          <Phone size={18} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#9ca3af"
            value={address.phone}
            onChangeText={(text) => setAddress({...address, phone: text})}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      
      <View style={styles.infoCard}>
        <Shield size={18} color={colors.primary} />
        <Text style={styles.infoText}>
          Your information is secure and will only be used for delivery purposes
        </Text>
      </View>
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={[styles.iconContainer, styles.paymentIcon]}>
          <CreditCard size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.stepTitle}>Payment Method</Text>
          <Text style={styles.stepSubtitle}>Choose your preferred payment option</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod('cod')}
        activeOpacity={0.8}
      >
        <View style={styles.paymentOptionContent}>
          <View style={styles.paymentOptionIcon}>
            <Receipt size={20} color={paymentMethod === 'cod' ? colors.primary : "#9ca3af"} />
          </View>
          <View style={styles.paymentOptionTexts}>
            <Text style={[styles.paymentOptionText, paymentMethod === 'cod' && styles.paymentOptionTextSelected]}>
              Cash on Delivery
            </Text>
            <Text style={styles.paymentOptionDescription}>
              Pay when you receive your order
            </Text>
          </View>
        </View>
        {paymentMethod === 'cod' && <CheckCircle size={20} color={colors.primary} />}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === 'online' && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod('online')}
        activeOpacity={0.8}
      >
        <View style={styles.paymentOptionContent}>
          <View style={[styles.paymentOptionIcon, styles.onlinePaymentIcon]}>
            <CreditCard size={18} color={paymentMethod === 'online' ? "#ffffff" : "#9ca3af"} />
          </View>
          <View style={styles.paymentOptionTexts}>
            <Text style={[styles.paymentOptionText, paymentMethod === 'online' && styles.paymentOptionTextSelected]}>
              Online Payment
            </Text>
            <Text style={styles.paymentOptionDescription}>
              Pay securely with cards, UPI or wallets
            </Text>
          </View>
        </View>
        {paymentMethod === 'online' && <CheckCircle size={20} color={colors.primary} />}
      </TouchableOpacity>
      
      <View style={styles.securityNote}>
        <Shield size={16} color="#10b981" />
        <Text style={styles.securityText}>All payments are 100% secure and encrypted</Text>
      </View>
    </View>
  );

  const renderPrescriptionStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={[styles.iconContainer, styles.prescriptionIcon]}>
          <FileText size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.stepTitle}>Upload Prescription</Text>
          <Text style={styles.stepSubtitle}>Required for prescription medicines</Text>
        </View>
      </View>
      
      <View style={styles.infoBox}>
        <Package size={18} color={colors.primary} />
        <Text style={styles.infoBoxText}>
          {prescriptionItems.length} medicine{prescriptionItems.length > 1 ? 's' : ''} require{prescriptionItems.length === 1 ? 's' : ''} a prescription
        </Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.prescriptionItems}>
        {prescriptionItems.map(item => (
          <View key={item.id} style={styles.prescriptionItem}>
            <Image source={{ uri: item.image }} style={styles.prescriptionItemImage} />
            <Text style={styles.prescriptionItemName} numberOfLines={2}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
      
      <Text style={styles.uploadInstructions}>
        📸 Upload clear images of your prescription
      </Text>
      
      {prescriptionImages.length > 0 && (
        <View style={styles.uploadedImages}>
          {prescriptionImages.map((imageUri, index) => (
            <View key={index} style={styles.uploadedImageContainer}>
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removePrescriptionImage(index)}
                activeOpacity={0.8}
              >
                <Text style={styles.removeImageText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.uploadButton}
        onPress={() => setShowImagePicker(true)}
        activeOpacity={0.8}
      >
        <View style={styles.uploadIcon}>
          <Upload size={24} color={colors.primary} />
        </View>
        <View style={styles.uploadButtonContent}>
          <Text style={styles.uploadButtonText}>
            Add Prescription Image
          </Text>
          <Text style={styles.uploadButtonSubtext}>
            Take a photo or choose from gallery
          </Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </TouchableOpacity>
      
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.imagePickerModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Prescription</Text>
              <Text style={styles.modalSubtitle}>Choose an option to upload</Text>
            </View>
            
            <TouchableOpacity
              style={styles.imagePickerOption}
              onPress={() => handleImageUpload('camera')}
              activeOpacity={0.8}
            >
              <View style={[styles.imagePickerIcon, styles.cameraIcon]}>
                <Camera size={24} color="#ffffff" />
              </View>
              <View style={styles.imagePickerTexts}>
                <Text style={styles.imagePickerOptionText}>Take Photo</Text>
                <Text style={styles.imagePickerOptionSubtext}>Use camera to capture</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.imagePickerOption}
              onPress={() => handleImageUpload('gallery')}
              activeOpacity={0.8}
            >
              <View style={[styles.imagePickerIcon, styles.galleryIcon]}>
                <ImageIcon size={24} color="#ffffff" />
              </View>
              <View style={styles.imagePickerTexts}>
                <Text style={styles.imagePickerOptionText}>Choose from Gallery</Text>
                <Text style={styles.imagePickerOptionSubtext}>Select from device</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.imagePickerCancel}
              onPress={() => setShowImagePicker(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.imagePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={[styles.iconContainer, styles.reviewIcon]}>
          <CheckCircle size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.stepTitle}>Review Order</Text>
          <Text style={styles.stepSubtitle}>Check your order details before placing</Text>
        </View>
      </View>
      
      <View style={styles.orderSummaryCard}>
        <Text style={styles.summaryTitle}>Order Items</Text>
        {cartItems.map(item => (
          <View key={item.id} style={styles.summaryItem}>
            <Image source={{ uri: item.image }} style={styles.summaryItemImage} />
            <View style={styles.summaryItemInfo}>
              <Text style={styles.summaryItemName}>{item.name}</Text>
              <Text style={styles.summaryItemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <View style={styles.summaryItemPrices}>
              {item.discount && (
                <Text style={styles.summaryItemOriginalPrice}>₹{item.price * item.quantity}</Text>
              )}
              <Text style={styles.summaryItemPrice}>
                ₹{item.discount 
                  ? Math.round(item.price * (1 - item.discount / 100)) * item.quantity
                  : item.price * item.quantity}
              </Text>
              {item.discount && (
                <Text style={styles.discountBadge}>{item.discount}% OFF</Text>
              )}
            </View>
          </View>
        ))}
        
        <View style={styles.billingSummary}>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>Subtotal</Text>
            <Text style={styles.billingValue}>₹{calculateSubtotal()}</Text>
          </View>
          
          {calculateDiscount() > 0 && (
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Discount</Text>
              <Text style={styles.discountValue}>-₹{calculateDiscount()}</Text>
            </View>
          )}
          
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>GST (18%)</Text>
            <Text style={styles.billingValue}>₹{calculateGST()}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.deliveryCard}>
        <View style={styles.deliveryHeader}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.deliveryTitle}>Delivery Address</Text>
        </View>
        <Text style={styles.deliveryText}>
          {address.street}, {address.city}, {address.state} - {address.pincode}
        </Text>
        <Text style={styles.deliveryPhone}>📱 {address.phone}</Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: 'Checkout',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={styles.container}>
        {renderStepIndicator()}
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 1 && renderAddressStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && needsPrescription && renderPrescriptionStep()}
          {((currentStep === 3 && !needsPrescription) || (currentStep === 4 && needsPrescription)) && renderReviewStep()}
        </ScrollView>
        
        <View style={styles.footer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.nextButton, needsPrescription && currentStep === 3 && styles.prescriptionNextButton]} 
              onPress={handleNextStep}
              activeOpacity={0.9}
            >
              <Text style={styles.nextButtonText}>
                {((currentStep === 3 && !needsPrescription) || (currentStep === 4 && needsPrescription)) 
                  ? 'Place Order' 
                  : 'Continue'}
              </Text>
              {((currentStep === 3 && !needsPrescription) || (currentStep === 4 && needsPrescription)) && (
                <View style={styles.nextButtonIcon}>
                  <CheckCircle size={20} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  headerButton: {
    padding: 8,
    marginLeft: -8,
  },
  stepContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  stepCircleCompleted: {
    backgroundColor: '#10b981',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepNumberInactive: {
    color: '#64748b',
  },
  stepLine: {
    width: width * 0.15,
    height: 3,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
    position: 'absolute',
    left: 36,
    top: 16,
  },
  stepLineCompleted: {
    backgroundColor: '#10b981',
  },
  stepLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 4,
  },
  stepLabelActive: {
    color: colors.primary,
  },
  stepLabelCompleted: {
    color: '#10b981',
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressIcon: {
    backgroundColor: '#3b82f6',
  },
  paymentIcon: {
    backgroundColor: '#8b5cf6',
  },
  prescriptionIcon: {
    backgroundColor: '#10b981',
  },
  reviewIcon: {
    backgroundColor: '#f59e0b',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  row: {
    flexDirection: 'row',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#0369a1',
    marginLeft: 12,
    fontWeight: '500',
  },
  paymentOption: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  paymentOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#f0f9ff',
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentOptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  onlinePaymentIcon: {
    backgroundColor: '#7c3aed',
  },
  paymentOptionTexts: {
    flex: 1,
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  paymentOptionTextSelected: {
    color: colors.primary,
  },
  paymentOptionDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  securityText: {
    fontSize: 14,
    color: '#166534',
    marginLeft: 12,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoBoxText: {
    fontSize: 14,
    color: '#0369a1',
    marginLeft: 12,
    fontWeight: '600',
  },
  prescriptionItems: {
    marginBottom: 25,
  },
  prescriptionItem: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  prescriptionItemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
  prescriptionItemName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
  },
  uploadInstructions: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 16,
  },
  uploadedImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  uploadedImageContainer: {
    position: 'relative',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  removeImageButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#dc2626',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  removeImageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  uploadButtonContent: {
    flex: 1,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  uploadButtonSubtext: {
    fontSize: 13,
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePickerModal: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  imagePickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  imagePickerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cameraIcon: {
    backgroundColor: '#3b82f6',
  },
  galleryIcon: {
    backgroundColor: '#8b5cf6',
  },
  imagePickerTexts: {
    flex: 1,
  },
  imagePickerOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  imagePickerOptionSubtext: {
    fontSize: 13,
    color: '#64748b',
  },
  imagePickerCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  imagePickerCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  orderSummaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  summaryItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginRight: 16,
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  summaryItemQuantity: {
    fontSize: 13,
    color: '#64748b',
  },
  summaryItemPrices: {
    alignItems: 'flex-end',
  },
  summaryItemOriginalPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  summaryItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  discountBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  billingSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  billingLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  billingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#059669',
  },
  deliveryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 12,
  },
  deliveryText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 8,
  },
  deliveryPhone: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  prescriptionNextButton: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  nextButtonIcon: {
    marginLeft: 10,
  },
});