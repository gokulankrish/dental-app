// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Colors } from '../constants/Colors';
//  // Adjust path as needed
// import { AppointmentProvider } from '../contexts/AppointmentContext'; // Adjust path as needed
// import { AuthProvider } from '../contexts/AuthContext';


// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       {/* Wrap everything with AuthProvider first */}
//      <AuthProvider>
//         {/* Then wrap with AppointmentProvider */}
//         <AppointmentProvider>
//           <Stack
//             screenOptions={{
//               headerStyle: {
//                 backgroundColor: Colors.primary,
//               },
//               headerTintColor: Colors.white,
//               headerTitleStyle: {
//                 fontWeight: 'bold',
//               },
//               contentStyle: {
//                 backgroundColor: Colors.background,
//               },
//             }}
//           >
//             <Stack.Screen 
//               name="index" 
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//               name="auth" 
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//               name="(tabs)" 
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//               name="chat/[id]" 
//               options={{ 
//                 title: 'Chat',
//                 headerBackTitle: 'Back'
//               }}
//             />
//             {/* Add more screens as needed */}
//           </Stack>
//           <StatusBar style="light" />
//         </AppointmentProvider>
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }

// app/_layout.tsx
import { Stack } from 'expo-router';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { AuthProvider, useAuth } from '../hooks/AuthContext';
import { useEffect, useState } from 'react';

function RootLayoutNav() {
  const { user, userData, loading } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Give Firebase a moment to initialize
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while auth is initializing
  if (loading || !initialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Debug log to see what's happening
  console.log('Auth State:', { 
    hasUser: !!user, 
    hasUserData: !!userData,
    userRole: userData?.role 
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        // Not logged in - show auth screens
        <Stack.Screen 
          name="auth/login" 
          options={{ 
            title: 'Login',
            animation: 'fade' 
          }} 
        />
      ) : !userData ? (
        // Logged in but still loading user data
        <Stack.Screen 
          name="loading" 
          options={{ 
            title: 'Loading',
            animation: 'fade' 
          }} 
        />
      ) : (
        // Fully authenticated - show main app
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            title: 'Home',
            animation: 'fade'
          }} 
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.text,
    fontSize: 16,
  },
});