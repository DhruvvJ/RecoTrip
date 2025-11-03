import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  iceBlue: '#d6f3fb',
  black: '#242424',
  navGray: '#312f2f',
  white: '#fff',
  sunsetOrange: '#ff9450',
};

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: colors.iceBlue,
  },
  safeArea: {
    flex: 1,
    paddingTop: 38,
    paddingHorizontal: 8,
  },
  topBar: {
    position: 'absolute',
    left: 10,
    top: 20,
    zIndex: 2,
  },
  recoTripName: {
    fontFamily: 'Brush Script MT',
    fontSize: 18,
    color: colors.white,
  },
  helloText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginLeft: 16,
    marginBottom: 12,
  },
  lovelyDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  scrollContent: {
  flexGrow: 1,
  justifyContent: 'flex-start', // stack from top, so padding pushes last button up
  alignItems: 'center',
  paddingTop: 8,
  paddingBottom: 80,           // enough for nav bar plus extra so last button shows above it
  },
  buttonContainer: {
  width: width - 30,
  marginVertical: 7,          // was 12, now just a tiny gap!
  borderRadius: 20,
  overflow: 'hidden',
  alignSelf: 'center',
  backgroundColor: colors.black,
  elevation: 8,
  },
  buttonImage: {
  width: '100%',
  minHeight: 140,           // was 95, increases button height from top and bottom
  justifyContent: 'center',
  },
  buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 50,      // was 18, makes icons/text sit higher/lower within the button
  paddingLeft: 22,
  },
  buttonIcon: {
    fontSize: 32,
    color: '#fff',
    marginRight: 12,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 2,
  },
  buttonDescription: {
    color: '#f7f7f7',
    fontSize: 13,
  },
  navBar: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: width - 30,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 3,
    borderRadius: 45,
    shadowColor: '#0b0b0bff',
    shadowOpacity: 0.55,
    shadowRadius: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconWrap: {
    backgroundColor: '#131313',
    borderRadius: 5000,
    padding: 5,
    marginBottom: 2,
  },
  activeNavIcon: {
    backgroundColor: colors.sunsetOrange,
  },
  navIcon: {
    fontSize: 25,
    color: colors.white,
  },
  navText: {
    fontSize: 8,
    color: '#aaa',
  },
  activeNavText: {
    color: colors.sunsetOrange,
  },

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.47)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
},
modalContent: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 24,
  alignItems: 'center',
  elevation: 10,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#222',
  marginBottom: 10,
  textAlign: 'center',
},
modalDescription: {
  fontSize: 15,
  color: '#333',
  marginBottom: 20,
  textAlign: 'center',
},
modalButtonRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
},
allowButton: {
  backgroundColor: '#42C1FA',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 24,
  marginHorizontal: 4,
},
allowButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
denyButton: {
  backgroundColor: '#ddd',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 20,
  marginHorizontal: 4,
},
denyButtonText: {
  color: '#444',
  fontWeight: 'bold',
  fontSize: 16,
},
});
