// import React, { useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Animated,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { StatusBar } from "expo-status-bar";
// import {
//   Bell,
//   Search,
//   Stethoscope,
//   Pill,
//   Hospital,
//   FileText,
//   Calculator,
//   Activity,
//   Apple,
//   AlarmClock,
//   ClipboardCheck,
// } from "lucide-react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { colors } from "../../constants/Colors";
// import { ServiceCard } from "../../components/common/ServiceCard";
// import { useAuth } from "../../hooks/useAuth";
// import { useNotificationStore } from "@/store/notification-store";
// import Avatar from "../../components/ui/Avatar";

// const HEALTH_CARDS = [
//   {
//     title: "Your Health, Your Power 💙",
//     quote: "Small healthy choices today build a stronger tomorrow.",
//     tip: "Drink enough water and take short walks throughout the day.",
//   },
//   {
//     title: "Consistency Wins ✨",
//     quote: "Progress happens when habits become routine.",
//     tip: "Try to sleep and wake up at the same time every day.",
//   },
//   {
//     title: "Health Is Wealth 💪",
//     quote: "A healthy body fuels a focused mind.",
//     tip: "Include fruits or vegetables in at least one meal today.",
//   },
//   {
//     title: "Breathe & Reset 🌿",
//     quote: "Taking care of yourself is productive.",
//     tip: "Spend 5 minutes doing deep breathing or light stretching.",
//   },
//   {
//     title: "Stronger Every Day 🚀",
//     quote: "Your body hears everything your mind says.",
//     tip: "Limit screen time before bed for better sleep quality.",
//   },
// ];

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.89;
// const CARD_HEIGHT = 170; // ✅ SAME HEIGHT FOR ALL
// const SPACING = 17;

// interface HealthCard {
//   title: string;
//   quote: string;
//   tip: string;
// }

// export default function HomeScreen() {
//   const router = useRouter();
//   const scrollX = new Animated.Value(0);
//   const insets = useSafeAreaInsets();
//   const { user } = useAuth();
//   const { fetchNotifications, unreadCount } = useNotificationStore();

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // Fixed: Properly typed ref for Animated.FlatList
//   const flatListRef = useRef<Animated.FlatList<HealthCard>>(null);
//   const currentIndex = useRef(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       currentIndex.current = (currentIndex.current + 1) % HEALTH_CARDS.length;

//       // Safe call with null check
//       if (flatListRef.current) {
//         flatListRef.current.scrollToIndex({
//           index: currentIndex.current,
//           animated: true,
//         });
//       }
//     }, 30000); // ⏱ 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const navigateToService = (service: string) => {
//     alert(`${service} feature coming soon!`);
//   };

//   const navigateToTool = (tool: string) => {
//     alert(`${tool} feature coming soon!`);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       {/* <StatusBar style="dark" /> */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.userInfo}>
//             <TouchableOpacity onPress={() => router.push("/profile")}>
//               <Avatar name={user?.displayName || ""} size={50} textSize={25} />
//             </TouchableOpacity>
//             <View>
//               <Text style={styles.welcomeText}>Welcome back,</Text>
//               <Text style={styles.userName}>
//                 {user?.displayName || user?.displayName || "User"}
//               </Text>
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles.notificationButton}
//             onPress={() => router.push("/chat")}
//           >
//             <Bell size={24} color={colors.textDark} />
//             {unreadCount > 0 && (
//               <View style={styles.notificationBadge}>
//                 <Text style={styles.notificationCount}>{unreadCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Search */}
//         <View style={styles.searchContainer}>
//           <View style={styles.searchBar}>
//             <Search size={20} color={colors.gray[500]} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search doctors, medicines, etc."
//               placeholderTextColor={colors.gray[500]}
//             />
//           </View>
//         </View>

//         {/* Motivation & Health Tips Slider */}
//         <View style={{ marginTop: 10, marginBottom: 20 }}>
//           <Animated.FlatList
//             ref={flatListRef}
//             data={HEALTH_CARDS}
//             keyExtractor={(_, index) => index.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             snapToInterval={CARD_WIDTH + SPACING}
//             decelerationRate="fast"
//             contentContainerStyle={{ paddingHorizontal: SPACING }}
//             renderItem={({ item }) => (
//               <View
//                 style={{
//                   width: CARD_WIDTH,
//                   height: CARD_HEIGHT, // ✅ fixed size
//                   marginRight: SPACING,
//                 }}
//               >
//                 <LinearGradient
//                   colors={["#3498db", "#7C73E6"]}
//                   style={[
//                     styles.gradientCard,
//                     { height: "100%", justifyContent: "center" },
//                   ]}
//                 >
//                   <Text style={styles.summaryTitle}>{item.title}</Text>
//                   <Text style={styles.summarySubtitle}>{item.quote}</Text>

//                   <View style={styles.tipDivider} />

//                   <Text style={styles.tipTitle}>💡 Health Tip</Text>
//                   <Text style={styles.tipText}>{item.tip}</Text>
//                 </LinearGradient>
//               </View>
//             )}
//           />
//         </View>

//         {/* Services */}
//         <View style={styles.servicesGrid}>
//           <ServiceCard
//             title="Doctors"
//             icon={<Stethoscope size={24} color={colors.primary} />}
//             onPress={() => router.push(`/doctor/doctors`)}
//             style={styles.serviceCard}
//           />
//           <ServiceCard
//             title="Pharmacy"
//             icon={<Pill size={24} color={colors.secondary} />}
//             onPress={() => router.push(`/pharmacy/pharmacy`)}
//             style={styles.serviceCard}
//           />
//           <ServiceCard
//             title="Hospitals"
//             icon={<Hospital size={24} color={colors.accent} />}
//             onPress={() => router.push(`/prescription/healthrecord`)}
//             style={styles.serviceCard}
//           />
//           <ServiceCard
//             title="Prescriptions"
//             icon={<FileText size={24} color={colors.warning} />}
//             onPress={() => router.push(`/prescription/prescription`)}
//             style={styles.serviceCard}
//           />
//         </View>

//         {/* Health Tools */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Health Tools</Text>
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={[styles.toolCard, { backgroundColor: colors.primary }]}
//               onPress={() => router.push(`/calculator/dosage-main`)}
//             >
//               <Calculator size={24} color={colors.white} />
//               <Text style={styles.toolText}>Dosage Calculator</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.toolCard, { backgroundColor: colors.secondary }]}
//               onPress={() => router.push(`/calculator/bmi`)}
//             >
//               <Activity size={24} color={colors.white} />
//               <Text style={styles.toolText}>BMI Calculator</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Features */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Features</Text>
//           <View style={styles.cardGrid}>
//             <TouchableOpacity
//               style={styles.featureCard}
//               onPress={() => router.push(`/calculator/checkup-page`)}
//             >
//               <View
//                 style={[
//                   styles.featureIcon,
//                   { backgroundColor: colors.primary + "20" },
//                 ]}
//               >
//                 <ClipboardCheck size={24} color={colors.primary} />
//               </View>
//               <Text style={styles.featureTitle}>Health Check</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.featureCard}
//               onPress={() => router.push(`/calculator/diet-chart`)}
//             >
//               <View
//                 style={[
//                   styles.featureIcon,
//                   { backgroundColor: colors.success + "20" },
//                 ]}
//               >
//                 <Apple size={24} color={colors.success} />
//               </View>
//               <Text style={styles.featureTitle}>Diet Chart</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.featureCard}
//               onPress={() => router.push(`/calculator/reminder`)}
//             >
//               <View
//                 style={[
//                   styles.featureIcon,
//                   { backgroundColor: colors.warning + "20" },
//                 ]}
//               >
//                 <AlarmClock size={24} color={colors.warning} />
//               </View>
//               <Text style={styles.featureTitle}>Reminders</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: colors.textDark,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 1,
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 12,
//   },
//   welcomeText: {
//     fontSize: 14,
//     color: colors.textLight,
//     paddingLeft: 10,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.textDark,
//     paddingLeft: 10,
//   },
//   notificationButton: {
//     position: "relative",
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: colors.white,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   notificationBadge: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: colors.error,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   notificationCount: {
//     fontSize: 10,
//     color: colors.white,
//     fontWeight: "600",
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//     color: colors.textDark,
//   },
//   section: {
//     paddingHorizontal: 16,
//     marginBottom: 32,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: colors.textDark,
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   seeAllText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: colors.primary,
//   },
//   servicesGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 12,
//     paddingHorizontal: 16,
//     marginBottom: 28,
//   },
//   serviceCard: {
//     width: "47%",
//     marginBottom: 16,
//     backgroundColor: colors.white,
//     borderRadius: 16,
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   toolCard: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   toolText: {
//     color: colors.white,
//     fontWeight: "600",
//     fontSize: 15,
//     marginLeft: 12,
//   },
//   featureCard: {
//     backgroundColor: colors.white,
//     borderRadius: 16,
//     width: "30%",
//     paddingVertical: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 12,
//   },
//   featureIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   featureTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: colors.textDark,
//   },
//   summaryCard: {
//     margin: 16,
//     borderRadius: 12,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 4, // for Android shadow
//   },

//   summaryStats: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   statItem: {
//     flex: 1,
//     alignItems: "center",
//   },
//   statValue: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#fff",
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 13,
//     color: "#E0E7FF",
//   },
//   statDivider: {
//     width: 1,
//     height: "100%",
//     backgroundColor: "rgba(255,255,255,0.3)",
//     marginHorizontal: 12,
//   },

//   gradientCard: {
//     borderRadius: 18,
//     padding: 18,
//   },

//   summaryTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 6,
//   },

//   summarySubtitle: {
//     color: "#fff",
//     fontSize: 14,
//     opacity: 0.9,
//     lineHeight: 20,
//   },

//   tipDivider: {
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     marginVertical: 14,
//   },

//   tipTitle: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 4,
//   },

//   tipText: {
//     color: "#fff",
//     fontSize: 13,
//     opacity: 0.9,
//     lineHeight: 18,
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
  FlatList,
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
  Play,
  Video,
  BookOpen,
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
const CARD_HEIGHT = 170;
const SPACING = 17;
const VIDEO_CARD_WIDTH = width * 0.4;

interface HealthCard {
  title: string;
  quote: string;
  tip: string;
}


export default function HomeScreen() {
  const router = useRouter();
  const scrollX = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { fetchNotifications, unreadCount } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const flatListRef = useRef<FlatList<HealthCard>>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % HEALTH_CARDS.length;

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 5000); // Changed to 5 seconds for better testing

    return () => clearInterval(interval);
  }, []);

  const navigateToService = (service: string) => {
    alert(`${service} feature coming soon!`);
  };

  const navigateToTool = (tool: string) => {
    alert(`${tool} feature coming soon!`);
  };

  const navigateToVideos = () => {
    router.push("/videos/DentalVideosScreen");
  };



  const getItemLayout = (data: any, index: number) => ({
    length: CARD_WIDTH + SPACING,
    offset: (CARD_WIDTH + SPACING) * index,
    index,
  });

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
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
                {user?.displayName || "User"}
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
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <FlatList
            ref={flatListRef}
            data={HEALTH_CARDS}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: SPACING }}
            getItemLayout={getItemLayout}
            renderItem={({ item }) => (
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
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
            onPress={() => router.push(`/doctor/doctors`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Pharmacy"
            icon={<Pill size={24} color={colors.secondary} />}
            onPress={() => router.push(`/pharmacy/pharmacy`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Hospitals"
            icon={<Hospital size={24} color={colors.accent} />}
            onPress={() => router.push(`/prescription/healthrecord`)}
            style={styles.serviceCard}
          />
          <ServiceCard
            title="Prescriptions"
            icon={<FileText size={24} color={colors.warning} />}
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

        {/* Videos Section - Moved below Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Videos</Text>
            <TouchableOpacity onPress={navigateToVideos}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Featured Video Card */}
          <TouchableOpacity 
            style={styles.featuredVideoCard}
            onPress={navigateToVideos}
          >
            <LinearGradient
              colors={["#FF6B6B", "#FF8E8E"]}
              style={styles.featuredVideoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredVideoContent}>
                <View>
                  <Text style={styles.featuredVideoTitle}>
                    Video Library
                  </Text>
                  <Text style={styles.featuredVideoSubtitle}>
                    Watch health tips & workouts
                  </Text>
                  <View style={styles.videoStats}>
                    <Text style={styles.videoStatText}>
                      • 45+ videos
                    </Text>
                    <Text style={styles.videoStatText}>
                      • Updated weekly
                    </Text>
                  </View>
                </View>
                <View style={styles.playButton}>
                  <Play size={24} color={colors.white} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Video Categories Horizontal List */}
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
    elevation: 4,
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
  // Video section styles
  videoList: {
    paddingRight: 16,
  },
  videoCard: {
    width: VIDEO_CARD_WIDTH,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 4,
  },
  videoCount: {
    fontSize: 12,
    color: colors.textLight,
  },
  featuredVideoCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  featuredVideoGradient: {
    padding: 20,
  },
  featuredVideoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredVideoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
  featuredVideoSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: "row",
    gap: 12,
  },
  videoStatText: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});