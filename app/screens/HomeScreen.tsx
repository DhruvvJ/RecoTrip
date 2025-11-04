import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from '../styles/HomeStyles';

const username = "Explorer";

const navTabs = [
  { icon: "⌂", label: "Home", active: true },
  { icon: "☕︎", label: "Stories" },
  { icon: "𐀪", label: "Profile" },
  { icon: "♡", label: "Favourites" },
  { icon: "⏣", label: "Settings" },
];

type HomeButtonProps = {
  label: string;
  description?: string | null;
  icon: string;
  image: any;
  onPress?: () => void;
};

function HomeButton({ label, description, icon, image, onPress }: HomeButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.buttonImage}
        imageStyle={{ borderRadius: 20, opacity: 0.18 }}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonIcon}>{icon}</Text>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.buttonLabel}>{label}</Text>
            {description && (
              <Text style={styles.buttonDescription}>{description}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const checkLocationPrompt = async () => {
      const value = await AsyncStorage.getItem('locationPromptShown');
      if (!value) {
        setShowLocationModal(true);
      }
    };
    checkLocationPrompt();
  }, []);

  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    await AsyncStorage.setItem('locationPromptShown', 'true');
    // Location permission logic here
  };

  const handleDenyLocation = async () => {
    setShowLocationModal(false);
    await AsyncStorage.setItem('locationPromptShown', 'true');
    // Optionally show info
  };

  return (
    <ImageBackground
      source={require('../../assets/images/blackbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text style={styles.recoTripName}>RecoTrip ᯓ ✈︎</Text>
          <Text style={styles.lovelyDescription}>Helps you find amazing destinations.</Text>
        </View>
        <Animated.Text style={[styles.helloText, { opacity: fadeAnim }]}>
          Hello! {username}
        </Animated.Text>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <HomeButton
            label="Select your next Trip"
            description="Your Recommendations!"
            icon="ᨒ"
            image={require('../../assets/images/selectTripbg.jpg')}
            onPress={() => router.push('/screens/RecommendationsScreen')}
          />
          <HomeButton
            label="Bookings"
            description={null}
            icon="𝄜"
            image={require('../../assets/images/bookingsbg.jpg')}
            onPress={() => router.push('/')}
          />
          <HomeButton
            label="Find nearby attractions"
            description={null}
            icon="⚲"
            image={require('../../assets/images/attractionsbg.jpg')}
            onPress={() => router.push('/')}
          />
        </ScrollView>
        <View style={styles.navBar}>
          {navTabs.map((tab, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.navItem}
              onPress={() => {
                if (tab.label === "Profile") {
                  router.push('/screens/ProfileScreen');
                }
                // You can add other navigation handlers here for other tabs
              }}
            >
              <View style={[styles.navIconWrap, tab.active && styles.activeNavIcon]}>
                <Text style={styles.navIcon}>{tab.icon}</Text>
              </View>
              <Text style={[styles.navText, tab.active && styles.activeNavText]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location Modal */}
        <Modal visible={showLocationModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Allow Location Access</Text>
              <Text style={styles.modalDescription}>
                RecoTrip would like to access your real-time location to suggest trip destinations and nearby attractions.
              </Text>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.allowButton} onPress={handleAllowLocation}>
                  <Text style={styles.allowButtonText}>Allow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.denyButton} onPress={handleDenyLocation}>
                  <Text style={styles.denyButtonText}>Not Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
