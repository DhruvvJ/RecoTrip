import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/FindAttractionsStyles';

// You must place defaultimage.png inside assets/images/
const DEFAULT_IMAGE = require('../../assets/images/defaultimage.png');

const FAKE_ATTRACTIONS = [
  {
    id: '1', name: 'City Museum', image: 'https://your-backend.com/demo1.jpg', reviews: "4.3 stars | 234 reviews"
  },
  {
    id: '2', name: 'Sunset Park', image: '', reviews: "4.7 stars | 189 reviews" // Example: missing image
  }
];

export default function FindAttractionsScreen() {
  const [permissionStatus, setPermissionStatus] = useState<'undetermined' | 'granted' | 'denied'>('undetermined');
  const [servicesEnabled, setServicesEnabled] = useState<boolean | null>(null);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    const enabled = await Location.hasServicesEnabledAsync();
    setServicesEnabled(enabled);

    let { status } = await Location.getForegroundPermissionsAsync();
    setPermissionStatus(status as any);

    if (status === 'granted' && enabled) {
      fetchAttractions();
    } else {
      setAttractions([]);
      setLoading(false);
    }
  };

  const handleAskPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status as any);
    if (status === 'granted') {
      const enabled = await Location.hasServicesEnabledAsync();
      setServicesEnabled(enabled);
      if (enabled) {
        fetchAttractions();
      }
    }
  };

  const handleEnableLocation = async () => {
    await checkStatus();
  };

  const fetchAttractions = async () => {
    // Replace with real fetch/API call
    setAttractions(FAKE_ATTRACTIONS);
    setLoading(false);
  };

  if (permissionStatus !== 'granted') {
    return (
      <ImageBackground source={require('../../assets/images/blacktrolly.png')} style={styles.background}>
        <View style={styles.centered}>
          <Text style={styles.locationWarning}>
            Please allow location permission to find nearby attractions!
          </Text>
          <TouchableOpacity style={styles.enableButton} onPress={handleAskPermission}>
            <Text style={styles.enableButtonText}>Allow Location Permission</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  if (permissionStatus === 'granted' && servicesEnabled === false) {
    return (
      <ImageBackground source={require('../../assets/images/blacktrolly.png')} style={styles.background}>
        <View style={styles.centered}>
          <Text style={styles.locationWarning}>
            Please turn ON your device Location/GPS to see nearby attractions.
          </Text>
          <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
            <Text style={styles.enableButtonText}>I've Turned ON Location</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  if (loading) {
    return (
      <ImageBackground source={require('../../assets/images/blacktrolly.png')} style={styles.background}>
        <View style={styles.centered}>
          <Text style={styles.locationWarning}>Loading attractions...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/images/blacktrolly.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {attractions.length === 0 && (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
            No attractions found near your location.
          </Text>
        )}
        {attractions.map((attraction) => (
          <View key={attraction.id} style={styles.attractionBlock}>
            <View style={styles.imageHolder}>
              <Image
                source={attraction.image ? { uri: attraction.image } : DEFAULT_IMAGE}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.attractionName}>{attraction.name}</Text>
              </View>
            </View>
            <View style={styles.infoHolder}>
              <Text style={styles.reviews}>{attraction.reviews}</Text>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => Alert.alert("More Info", "Show full screen details here.")}
              >
                <Text style={styles.infoButtonText}>more...</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
