import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: width - 30,
    backgroundColor: '#1f1e1eff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: '#0b0b0b',
    shadowOpacity: 0.55,
    shadowRadius: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconWrap: {
    backgroundColor: '#131313',
    borderRadius: 10000,
    padding: 7,
    marginBottom: 2,
  },
  navIcon: {
    fontSize: 20,
    color: '#fff',
  },
  navText: {
    fontSize: 8,
    color: '#aaa',
  },
  // Add these for active tab highlight:
  activeNavIcon: {
    backgroundColor: '#e7e7e7ff', // highlight color
  },
  activeNavIconText: {
    color: '#010101ff', // Or keep #43c8fa if you want colored icon
    fontWeight: 'bold',
  },
  activeNavText: {
    color: '#e7e7e7ff', // highlight color
    fontWeight: 'bold',
  },
});
