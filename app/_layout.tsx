import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function Layout() {
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);

  const hideNavBarOn = [
    '/login',
    '/screens/LoginScreen',
    '/travelanimation',
    '/screens/TravelAnimationScreen',
  ];

  const shouldShowNavBar =
    pathname !== '/' && // 👈 Hide nav on signup (root)
    !hideNavBarOn.some((path) =>
      pathname.toLowerCase().includes(path.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <Stack />
      {shouldShowNavBar && <NavigationBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
