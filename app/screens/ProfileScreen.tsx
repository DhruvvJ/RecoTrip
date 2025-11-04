import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/ProfileStyles';

const PROFILE_ENDPOINT = 'https://your-api.com/user/profile';
const UPDATE_ENDPOINT = 'https://your-api.com/user/updateProfile';

const defaultProfile = {
  fullName: '',
  userName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    zip: '',
    home: '',
    area: '',
  },
  xp: 0,
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState({
    user: false,
    contact: false,
    address: false,
  });
  const [loading, setLoading] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch(PROFILE_ENDPOINT, { credentials: 'include' });
        const data = await res.json();
        setProfile({
          ...defaultProfile,
          ...data,
          address: {
            ...defaultProfile.address,
            ...((data && data.address) || {}),
          },
        });
      } catch (err) {
        Alert.alert('Error', 'Could not fetch profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const saveBlock = async (block: string) => {
    setIsEditing(prev => ({ ...prev, [block]: false }));
    try {
      await fetch(UPDATE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      Alert.alert('Saved', 'Profile updated');
    } catch {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleToggleLocation = () => {
    setLocationEnabled(enabled => !enabled);
    if (!locationEnabled) {
      Alert.alert('Location Enabled!', 'Location services activated for personalized features.');
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../../assets/images/blackbg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/blackbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.profileRoot}>
        <ScrollView contentContainerStyle={styles.profileScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Text style={styles.screenTitle}>My Profile</Text>
            <TouchableOpacity style={styles.xpTracker} onPress={() => setShowXpPopup(true)}>
              <View style={styles.xpCircle}>
                <Text style={styles.xpLevel}>{profile.xp || 0}</Text>
                <Text style={styles.xpText}>XP</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.centerBlock}>
            <Text style={styles.userName}>{profile.userName}</Text>
            <Text style={styles.subtitle}>Adventure Awaits!</Text>
          </View>

          {/* User Block */}
          <View style={styles.dataBlock}>
            <View style={styles.dataBlockHeader}>
              <Text style={styles.blockLabel}>Full Name & User Name:</Text>
              <TouchableOpacity onPress={() => setIsEditing(s => ({ ...s, user: true }))}>
                <Ionicons name="pencil" size={19} color="#fff" />
              </TouchableOpacity>
            </View>
            {isEditing.user ? (
              <>
                <TextInput
                  style={styles.input}
                  value={profile.fullName}
                  onChangeText={txt => setProfile(p => ({ ...p, fullName: txt }))}
                  placeholder="Full Name"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.userName}
                  onChangeText={txt => setProfile(p => ({ ...p, userName: txt }))}
                  placeholder="User Name"
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={() => saveBlock('user')}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.dataValue}>{profile.fullName}</Text>
                <Text style={styles.dataValue}>{profile.userName}</Text>
              </>
            )}
          </View>

          {/* Contact Block */}
          <View style={styles.dataBlock}>
            <View style={styles.dataBlockHeader}>
              <Text style={styles.blockLabel}>Contact Info:</Text>
              <TouchableOpacity onPress={() => setIsEditing(s => ({ ...s, contact: true }))}>
                <Ionicons name="pencil" size={19} color="#fff" />
              </TouchableOpacity>
            </View>
            {isEditing.contact ? (
              <>
                <TextInput
                  style={styles.input}
                  value={profile.email}
                  onChangeText={txt => setProfile(p => ({ ...p, email: txt }))}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.phone}
                  onChangeText={txt => setProfile(p => ({ ...p, phone: txt }))}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={() => saveBlock('contact')}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.dataValue}>{profile.email}</Text>
                <Text style={styles.dataValue}>{profile.phone}</Text>
              </>
            )}
          </View>

          {/* Address Block */}
          <View style={styles.dataBlock}>
            <View style={styles.dataBlockHeader}>
              <Text style={styles.blockLabel}>Address:</Text>
              <TouchableOpacity onPress={() => setIsEditing(s => ({ ...s, address: true }))}>
                <Ionicons name="pencil" size={19} color="#fff" />
              </TouchableOpacity>
            </View>
            {isEditing.address ? (
              <>
                <TextInput
                  style={styles.input}
                  value={profile.address.street}
                  onChangeText={txt => setProfile(p => ({
                    ...p,
                    address: { ...p.address, street: txt },
                  }))}
                  placeholder="Street"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.address.home}
                  onChangeText={txt => setProfile(p => ({
                    ...p,
                    address: { ...p.address, home: txt },
                  }))}
                  placeholder="Home"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.address.area}
                  onChangeText={txt => setProfile(p => ({
                    ...p,
                    address: { ...p.address, area: txt },
                  }))}
                  placeholder="Area"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.address.city}
                  onChangeText={txt => setProfile(p => ({
                    ...p,
                    address: { ...p.address, city: txt },
                  }))}
                  placeholder="City"
                  placeholderTextColor="#aaa"
                />
                <TextInput
                  style={styles.input}
                  value={profile.address.zip}
                  onChangeText={txt => setProfile(p => ({
                    ...p,
                    address: { ...p.address, zip: txt },
                  }))}
                  placeholder="Zip/Postal Code"
                  keyboardType="numeric"
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.saveBtn} onPress={() => saveBlock('address')}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.dataValue}>{profile.address.street}</Text>
                {profile.address.home ? <Text style={styles.dataValue}>{profile.address.home}</Text> : null}
                {profile.address.area ? <Text style={styles.dataValue}>{profile.address.area}</Text> : null}
                <Text style={styles.dataValue}>
                  {profile.address.city ? `City: ${profile.address.city}` : ''}
                </Text>
                <Text style={styles.dataValue}>
                  {profile.address.zip ? `Zip: ${profile.address.zip}` : ''}
                </Text>
              </>
            )}
          </View>
        </ScrollView>

        {/* Glowing Location Block */}
        <View style={styles.locationBlock}>
          <Ionicons name="location-sharp" size={24} color="#fff" style={styles.locationIcon} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.locationText}>Enable Location</Text>
            <Text style={styles.locationDescription}>
              Location access needed for full features and recommendations.
            </Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={handleToggleLocation}
            thumbColor={locationEnabled ? "#43c8fa" : "#eee"}
            trackColor={{ false: "#333", true: "#80f2ff" }}
          />
        </View>

        {/* XP Info Popup Modal */}
        <Modal
          visible={showXpPopup}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowXpPopup(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>XP</Text>
              <Text style={styles.modalText}>
                Travel 5 km to earn 1 XP and Travel one destination and earn 10 XP.
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowXpPopup(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
