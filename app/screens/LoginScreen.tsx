import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LoginStyles';
import TravelAnimationScreen from './TravelAnimationScreen';

export default function LoginScreen() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!usernameOrEmail.trim() || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setShowAnimation(true);
  };

  if (showAnimation) {
    return <TravelAnimationScreen onAnimationFinish={() => router.push('../screens/HomeScreen')} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/backgroundimage.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#111"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#111"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.bottomLink}>Connect to RecoTrip app</Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
