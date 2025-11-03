import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/RecommendationsStyles';

type Trip = {
  title?: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  // Add any other fields from backend if required
};

const DEFAULT_IMG = require('../../assets/images/defaultimage.png'); // Provide a default image in your assets
const BACKEND_URL = 'https://yourbackend.com/api/recommendations'; // Replace with your API endpoint

export default function RecommendationsScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        setError('Failed to load recommendations.');
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  const swipe = (direction: 'left' | 'right') => {
    Animated.timing(translateAnim, {
      toValue: direction === 'left' ? -Dimensions.get('window').width : Dimensions.get('window').width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
      setCurrent((prev) => {
        if (direction === 'left') return prev < trips.length - 1 ? prev + 1 : prev;
        return prev > 0 ? prev - 1 : prev;
      });
    });
  };

  if (loading) {
    return (
      <ImageBackground source={require('../../assets/images/blackbg.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#42C1FA" />
          <Text style={styles.loadingText}>Loading Recommendations...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error || trips.length === 0) {
    return (
      <ImageBackground source={require('../../assets/images/blackbg.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{error || 'No recommendations available.'}</Text>
        </View>
      </ImageBackground>
    );
  }

  const item = trips[current];

  return (
    <ImageBackground source={require('../../assets/images/blackbg.png')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>Recommendations</Text>
        <View style={styles.carouselContainer}>
          <Animated.View style={[styles.card, { transform: [{ translateX: translateAnim }] }]}>
            <ImageBackground
              source={item.imageUrl ? { uri: item.imageUrl } : DEFAULT_IMG}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title || 'No title'}</Text>
                <Text style={styles.cardDescription}>{item.description || 'No description available.'}</Text>
                <Text style={styles.cardRating}>{item.rating ? `⭐ ${item.rating}` : '⭐ Rating unavailable'}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        </View>
        <View style={styles.swipeRow}>
          <TouchableOpacity
            style={[styles.arrowButton, current === 0 && styles.arrowButtonDisabled]}
            onPress={() => swipe('right')}
            disabled={current === 0}
          >
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrowButton, current === trips.length - 1 && styles.arrowButtonDisabled]}
            onPress={() => swipe('left')}
            disabled={current === trips.length - 1}
          >
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
