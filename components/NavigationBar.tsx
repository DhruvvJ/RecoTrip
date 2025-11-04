import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../app/styles/NavBarStyles';

const navTabs = [
  { icon: "⌂", label: "Home", screen: '/home' },
  { icon: "☕︎", label: "Stories", screen: '/stories' },
  { icon: "𐀪", label: "Profile", screen: '/profile' },
  { icon: "♡", label: "Favourites", screen: '/favourites' },
  { icon: "⏣", label: "Settings", screen: '/settings' },
];

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.navBar}>
      {navTabs.map((tab, idx) => {
        // Determine if this tab is the active route
        const isActive =
          pathname === tab.screen ||
          pathname.startsWith(tab.screen + '/'); // to support nested routes

        return (
          <TouchableOpacity
            key={idx}
            style={styles.navItem}
            onPress={() => router.push(tab.screen as any)}
          >
            <View style={[styles.navIconWrap, isActive && styles.activeNavIcon]}>
              <Text style={[styles.navIcon, isActive && styles.activeNavIconText]}>
                {tab.icon}
              </Text>
            </View>
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
