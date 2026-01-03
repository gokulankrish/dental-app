// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   RefreshControl,
//   TextInput,
//   Modal,
//   StatusBar
// } from 'react-native';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../../hooks/useAuth';
// import { useChat } from '../../hooks/useChat';
// import { AuthService } from '../../services/auth';
// import { colors } from '../../constants/colors';
// import { USER_ROLES, DEMO_ACCOUNTS } from '../../constants/Config';
// import Avatar from '../../components/ui/Avatar';
// import Loading from '../../components/ui/Loading';
// import { Chat, User } from '../../types';

// export default function ChatListScreen() {
//   const { user, userData } = useAuth();
//   const { chats, loading, subscribeToChats, createChat, getAvailableUsers } = useChat();
//   const [refreshing, setRefreshing] = useState(false);
//   const [availableUsers, setAvailableUsers] = useState<User[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showNewChatModal, setShowNewChatModal] = useState(false);
//   const [showDemoAccounts, setShowDemoAccounts] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   useEffect(() => {
//     if (!user || !userData) return;

//     const unsubscribe = subscribeToChats(user.uid);
//     loadAvailableUsers();

//     return () => unsubscribe();
//   }, [user, userData]);

//   const loadAvailableUsers = async () => {
//     if (!user || !userData) return;

//     const result = await getAvailableUsers(user.uid);
//     if (result.success) {
//       setAvailableUsers(result.users || []);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadAvailableUsers();
//     setRefreshing(false);
//   }, []);

//   const handleStartNewChat = () => {
//     setShowNewChatModal(true);
//   };

//   const handleSelectUser = async (selectedUser: User) => {
//     if (!user || !userData) return;

//     setSelectedUser(selectedUser);

//     const initialMessage = {
//       text: `Hello! I'm ${userData.name}. ${userData.role === 'doctor' ? 'How can I help you today?' : 'Nice to meet you!'}`,
//       senderId: user.uid,
//       senderName: userData.name,
//       read: false
//     };

//     const result = await createChat([user.uid, selectedUser.uid], initialMessage);
//     if (result.success) {
//       setShowNewChatModal(false);
//       setSelectedUser(null);
//       router.push(`/chat/${result.chatId}`);
//     } else {
//       Alert.alert('Error', 'Failed to start chat. Please try again.');
//     }
//   };

//   const handleDemoAccountLogin = async (account: any) => {
//     const result = await AuthService.demoLoginSpecific(account.email, account.password);
//     if (result.success) {
//       setShowDemoAccounts(false);
//       router.replace('/(tabs)');
//     } else {
//       Alert.alert('Error', 'Failed to login with demo account');
//     }
//   };

//   const filteredUsers = availableUsers.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredChats = chats.filter(chat =>
//     chat.otherParticipant?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderChatItem = ({ item }: { item: Chat }) => {
//     const unreadCount = item.unreadCount?.[user?.uid || ''] || 0;

//     return (
//       <TouchableOpacity
//         style={styles.chatItem}
//         onPress={() => router.push(`/chat/${item.id}`)}
//       >
//         <View style={styles.avatarContainer}>
//           <Avatar
//             name={item.otherParticipant?.name || ''}
//             size={56}
//             textSize={20}
//             backgroundColor={item.otherParticipant?.avatarColor || colors.primary}
//             showBorder={unreadCount > 0}
//             borderColor={colors.primary}
//           />
//           {unreadCount > 0 && (
//             <View style={styles.unreadBadge}>
//               <Text style={styles.unreadText}>
//                 {unreadCount > 9 ? '9+' : unreadCount}
//               </Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.chatInfo}>
//           <View style={styles.chatHeader}>
//             <Text style={styles.chatName}>
//               {item.otherParticipant?.name || 'Unknown User'}
//             </Text>
//             <Text style={styles.timestamp}>
//               {item.lastMessageAt
//                 ? new Date(item.lastMessageAt).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })
//                 : ''
//               }
//             </Text>
//           </View>
//           <Text style={styles.lastMessage} numberOfLines={1}>
//             {item.lastMessage || 'No messages yet'}
//           </Text>
//           <View style={styles.chatFooter}>
//             {item.otherParticipant?.role === USER_ROLES.DOCTOR && (
//               <Text style={styles.roleBadge}>👨‍⚕️ Doctor</Text>
//             )}
//             {item.otherParticipant?.role === USER_ROLES.PATIENT && (
//               <Text style={styles.roleBadge}>👤 Patient</Text>
//             )}
//             {item.otherParticipant?.specialty && (
//               <Text style={styles.specialtyBadge}>{item.otherParticipant.specialty}</Text>
//             )}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderUserItem = ({ item }: { item: User }) => (
//     <TouchableOpacity
//       style={styles.userItem}
//       onPress={() => handleSelectUser(item)}
//     >
//       <Avatar
//         name={item.name}
//         size={50}
//         backgroundColor={item.avatarColor || colors.primary}
//       />
//       <View style={styles.userInfo}>
//         <Text style={styles.userName}>{item.name}</Text>
//         <View style={styles.userDetails}>
//           <Text style={styles.userRole}>
//             {item.role === USER_ROLES.DOCTOR ? '👨‍⚕️ Doctor' : '👤 Patient'}
//           </Text>
//           {item.specialty && (
//             <Text style={styles.userSpecialty}>{item.specialty}</Text>
//           )}
//         </View>
//       </View>
//       <Ionicons name="chatbubble-outline" size={24} color={colors.primary} />
//     </TouchableOpacity>
//   );

//   const renderDemoAccount = (account: any, index: number, role: 'doctor' | 'patient') => (
//     <TouchableOpacity
//       key={index}
//       style={styles.demoAccountItem}
//       onPress={() => handleDemoAccountLogin(account)}
//     >
//       <Avatar
//         name={account.name}
//         size={50}
//         backgroundColor={account.avatarColor || colors.primary}
//       />
//       <View style={styles.demoAccountInfo}>
//         <Text style={styles.demoAccountName}>{account.name}</Text>
//         <Text style={styles.demoAccountEmail}>{account.email}</Text>
//         {account.specialty && (
//           <Text style={styles.demoAccountSpecialty}>{account.specialty}</Text>
//         )}
//       </View>
//       <Ionicons name="log-in-outline" size={24} color={colors.primary} />
//     </TouchableOpacity>
//   );

//   if (loading && !refreshing) {
//     return <Loading message="Loading chats..." />;
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

//       {/* WhatsApp-like Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Chats</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity
//             style={styles.headerButton}
//             onPress={() => setShowDemoAccounts(true)}
//           >
//             <Ionicons name="people-outline" size={24} color={colors.white} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.headerButton}
//             onPress={handleStartNewChat}
//           >
//             <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.white} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchIconContainer}>
//           <Ionicons name="search" size={20} color={colors.gray} />
//         </View>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search chats or users..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholderTextColor={colors.gray}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity
//             style={styles.clearButton}
//             onPress={() => setSearchQuery('')}
//           >
//             <Ionicons name="close-circle" size={20} color={colors.gray} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Chats List */}
//       <FlatList
//         data={filteredChats}
//         renderItem={renderChatItem}
//         keyExtractor={item => item.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="chatbubbles-outline" size={80} color={colors.gray} />
//             <Text style={styles.emptyTitle}>No chats yet</Text>
//             <Text style={styles.emptyText}>
//               {searchQuery ? 'No matches found' : 'Start chatting by creating a new chat'}
//             </Text>
//             {!searchQuery && (
//               <TouchableOpacity
//                 style={styles.startChatButton}
//                 onPress={handleStartNewChat}
//               >
//                 <Ionicons name="add" size={20} color={colors.white} />
//                 <Text style={styles.startChatText}>New Chat</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         }
//       />

//       {/* New Chat Floating Button */}
//       <TouchableOpacity
//         style={styles.floatingButton}
//         onPress={handleStartNewChat}
//       >
//         <Ionicons name="chatbubble" size={24} color={colors.white} />
//       </TouchableOpacity>

//       {/* New Chat Modal */}
//       <Modal
//         visible={showNewChatModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowNewChatModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>New Chat</Text>
//               <TouchableOpacity onPress={() => setShowNewChatModal(false)}>
//                 <Ionicons name="close" size={24} color={colors.text} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.searchContainerModal}>
//               <Ionicons name="search" size={20} color={colors.gray} />
//               <TextInput
//                 style={styles.searchInputModal}
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//                 placeholderTextColor={colors.gray}
//               />
//             </View>

//             <FlatList
//               data={filteredUsers}
//               renderItem={renderUserItem}
//               keyExtractor={item => item.uid}
//               ListEmptyComponent={
//                 <View style={styles.noUsersContainer}>
//                   <Ionicons name="people-outline" size={60} color={colors.gray} />
//                   <Text style={styles.noUsersText}>No users found</Text>
//                 </View>
//               }
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* Demo Accounts Modal */}
//       <Modal
//         visible={showDemoAccounts}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowDemoAccounts(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContent, styles.demoModalContent]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Demo Accounts</Text>
//               <TouchableOpacity onPress={() => setShowDemoAccounts(false)}>
//                 <Ionicons name="close" size={24} color={colors.text} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.demoSection}>
//               <View style={styles.demoSectionHeader}>
//                 <Ionicons name="medkit" size={20} color={colors.primary} />
//                 <Text style={styles.demoSectionTitle}>Doctors</Text>
//               </View>
//               {DEMO_ACCOUNTS.DOCTORS.map((doctor, index) =>
//                 renderDemoAccount(doctor, index, 'doctor')
//               )}
//             </View>

//             <View style={styles.demoSection}>
//               <View style={styles.demoSectionHeader}>
//                 <Ionicons name="person" size={20} color={colors.primary} />
//                 <Text style={styles.demoSectionTitle}>Patients</Text>
//               </View>
//               {DEMO_ACCOUNTS.PATIENTS.map((patient, index) =>
//                 renderDemoAccount(patient, index, 'patient')
//               )}
//             </View>

//             <View style={styles.demoHintContainer}>
//               <Text style={styles.demoHint}>
//                 <Ionicons name="information-circle" size={16} color={colors.gray} />
//                 {' '}Password: Doctor@123 / Patient@123
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   header: {
//     backgroundColor: colors.primary,
//     paddingTop: 50,
//     paddingBottom: 15,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: colors.white,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   headerButton: {
//     padding: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.lightBackground,
//     margin: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   searchIconContainer: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: colors.text,
//   },
//   clearButton: {
//     padding: 4,
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     backgroundColor: colors.primary,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     zIndex: 100,
//   },
//   chatItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   avatarContainer: {
//     position: 'relative',
//   },
//   unreadBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: colors.primary,
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//     borderWidth: 2,
//     borderColor: colors.white,
//   },
//   unreadText: {
//     color: colors.white,
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   chatInfo: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   chatHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   chatName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.text,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: colors.gray,
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: colors.textLight,
//     marginBottom: 4,
//   },
//   chatFooter: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   roleBadge: {
//     fontSize: 12,
//     color: colors.primary,
//     backgroundColor: colors.lightBackground,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   specialtyBadge: {
//     fontSize: 12,
//     color: colors.success,
//     backgroundColor: '#e8f5e9',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 100,
//     paddingHorizontal: 40,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: colors.text,
//     marginTop: 20,
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: colors.textLight,
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   startChatButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.primary,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 25,
//     gap: 8,
//   },
//   startChatText: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '80%',
//   },
//   demoModalContent: {
//     maxHeight: '90%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   searchContainerModal: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.lightBackground,
//     margin: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   searchInputModal: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//     color: colors.text,
//   },
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   userInfo: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 2,
//   },
//   userDetails: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   userRole: {
//     fontSize: 14,
//     color: colors.textLight,
//   },
//   userSpecialty: {
//     fontSize: 12,
//     color: colors.primary,
//     backgroundColor: colors.lightBackground,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   noUsersContainer: {
//     alignItems: 'center',
//     padding: 40,
//   },
//   noUsersText: {
//     fontSize: 16,
//     color: colors.gray,
//     marginTop: 16,
//   },
//   demoSection: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   demoSectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 16,
//   },
//   demoSectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   demoAccountItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderRadius: 10,
//     backgroundColor: colors.lightBackground,
//     marginBottom: 8,
//   },
//   demoAccountInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   demoAccountName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 2,
//   },
//   demoAccountEmail: {
//     fontSize: 14,
//     color: colors.textLight,
//     marginBottom: 2,
//   },
//   demoAccountSpecialty: {
//     fontSize: 12,
//     color: colors.primary,
//   },
//   demoHintContainer: {
//     padding: 16,
//     backgroundColor: colors.lightBackground,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },
//   demoHint: {
//     fontSize: 14,
//     color: colors.gray,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
// });

import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  Search,
  Stethoscope,
  Pill,
  Hospital,
  FileText,
  Calculator,
  Activity,
  Apple,
  AlarmClock,
  ClipboardCheck,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { ServiceCard } from "../../components/common/ServiceCard";
import { useAuth } from "../../hooks/useAuth";
import { useNotificationStore } from "@/store/notification-store";
import Avatar from "../../components/ui/Avatar";

const HEALTH_CARDS = [
  {
    title: "Your Health, Your Power 💙",
    quote: "Small healthy choices today build a stronger tomorrow.",
    tip: "Drink enough water and take short walks throughout the day.",
  },
  {
    title: "Consistency Wins ✨",
    quote: "Progress happens when habits become routine.",
    tip: "Try to sleep and wake up at the same time every day.",
  },
  {
    title: "Health Is Wealth 💪",
    quote: "A healthy body fuels a focused mind.",
    tip: "Include fruits or vegetables in at least one meal today.",
  },
  {
    title: "Breathe & Reset 🌿",
    quote: "Taking care of yourself is productive.",
    tip: "Spend 5 minutes doing deep breathing or light stretching.",
  },
  {
    title: "Stronger Every Day 🚀",
    quote: "Your body hears everything your mind says.",
    tip: "Limit screen time before bed for better sleep quality.",
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.89;
const CARD_HEIGHT = 170; // ✅ SAME HEIGHT FOR ALL
const SPACING = 17;


export default function HomeScreen() {
  const router = useRouter();
  const scrollX = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { fetchNotifications, unreadCount } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

const flatListRef = useRef(null);
const currentIndex = useRef(0);

useEffect(() => {
  const interval = setInterval(() => {
    currentIndex.current =
      (currentIndex.current + 1) % HEALTH_CARDS.length;

    flatListRef.current?.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    });
  }, 30000); // ⏱ 30 seconds

  return () => clearInterval(interval);
}, []);



  const navigateToService = (service: string) => {
    alert(`${service} feature coming soon!`);
  };

  const navigateToTool = (tool: string) => {
    alert(`${tool} feature coming soon!`);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* <StatusBar style="dark" /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Avatar name={user?.displayName || ""} size={50} textSize={25} />
            </TouchableOpacity>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>
                {user?.displayName || user?.displayName || "User"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => router.push("/chat")}
          >
            <Bell size={24} color={colors.textDark} />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.gray[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, medicines, etc."
              placeholderTextColor={colors.gray[500]}
            />
          </View>
        </View>

        {/* Motivation & Health Tips Slider */}
        {/* Motivation & Health Tips Slider */}
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Animated.FlatList
            ref={flatListRef}
            data={HEALTH_CARDS}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: SPACING }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT, // ✅ fixed size
                  marginRight: SPACING,
                }}
              >
                <LinearGradient
                  colors={["#3498db", "#7C73E6"]}
                  style={[
                    styles.gradientCard,
                    { height: "100%", justifyContent: "center" },
                  ]}
                >
                  <Text style={styles.summaryTitle}>{item.title}</Text>
                  <Text style={styles.summarySubtitle}>{item.quote}</Text>

                  <View style={styles.tipDivider} />

                  <Text style={styles.tipTitle}>💡 Health Tip</Text>
                  <Text style={styles.tipText}>{item.tip}</Text>
                </LinearGradient>
              </View>
            )}
          />
        </View>

        {/* Services */}
        <View style={styles.servicesGrid}>
          <ServiceCard
            title="Doctors"
            icon={<Stethoscope size={24} color={colors.primary} />}
            // onPress={() => navigateToService('Doctors')}
            onPress={() => router.push(`/doctor/doctors`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Pharmacy"
            icon={<Pill size={24} color={colors.secondary} />}
            // onPress={() => navigateToService('Pharmacy')}
            onPress={() => router.push(`/pharmacy/pharmacy`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Hospitals"
            icon={<Hospital size={24} color={colors.accent} />}
            // onPress={() => navigateToService('hospitals')}
            onPress={() => router.push(`/prescription/healthrecord`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Prescriptions"
            icon={<FileText size={24} color={colors.warning} />}
            // onPress={() => navigateToService('pescription')}
            onPress={() => router.push(`/prescription/prescription`)}
            style={styles.serviceCard}
          />
        </View>

        {/* Health Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tools</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.toolCard, { backgroundColor: colors.primary }]}
              onPress={() => router.push(`/calculator/dosage-main`)}
            >
              <Calculator size={24} color={colors.white} />
              <Text style={styles.toolText}>Dosage Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toolCard, { backgroundColor: colors.secondary }]}
              onPress={() => router.push(`/calculator/bmi`)}
            >
              <Activity size={24} color={colors.white} />
              <Text style={styles.toolText}>BMI Calculator</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.cardGrid}>
            <TouchableOpacity
              style={styles.featureCard}
              // onPress={() => router.push(`/`)}
              //  onPress={() => navigateToService('healthcheck')}
              onPress={() => router.push(`/calculator/checkup-page`)}
            >
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <ClipboardCheck size={24} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Health Check</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push(`/calculator/diet-chart`)}
            >
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: colors.success + "20" },
                ]}
              >
                <Apple size={24} color={colors.success} />
              </View>
              <Text style={styles.featureTitle}>Diet Chart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureCard}
              // onPress={() => navigateToTool('Reminders')}
              onPress={() => router.push(`/calculator/reminder`)}
            >
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: colors.warning + "20" },
                ]}
              >
                <AlarmClock size={24} color={colors.warning} />
              </View>
              <Text style={styles.featureTitle}>Reminders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textLight,
    paddingLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    paddingLeft: 10,
  },
  notificationButton: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    fontSize: 10,
    color: colors.white,
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.textDark,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  serviceCard: {
    width: "47%",
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  toolCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  toolText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 12,
  },
  featureCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: "30%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
  },
  summaryCard: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4, // for Android shadow
  },

  summaryStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#E0E7FF",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 12,
  },

  gradientCard: {
  borderRadius: 18,
  padding: 18,
},

summaryTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 6,
},

summarySubtitle: {
  color: "#fff",
  fontSize: 14,
  opacity: 0.9,
  lineHeight: 20,
},

tipDivider: {
  height: 1,
  backgroundColor: "rgba(255,255,255,0.3)",
  marginVertical: 14,
},

tipTitle: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "600",
  marginBottom: 4,
},

tipText: {
  color: "#fff",
  fontSize: 13,
  opacity: 0.9,
  lineHeight: 18,
},

});
