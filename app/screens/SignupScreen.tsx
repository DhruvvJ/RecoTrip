import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/SignupStyles';

export default function SignupScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSignup = () => {
    if (!fullName.trim() || !username.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Signup successful');
    router.push('/screens/LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/backgroundimage.png')} // Place your image in assets/images folder
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#111" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#111" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#111" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#111" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#111" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#111" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
          <Text style={styles.loginLink}>Already registered? Login</Text>
        </TouchableOpacity>

        <Text style={styles.bottomLink}>Connect to RecoTrip app</Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
