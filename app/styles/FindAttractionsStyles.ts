import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationWarning: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
  },
  enableButton: {
    backgroundColor: '#43c8fa',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 22,
  },
  enableButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  attractionBlock: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 20,
    marginVertical: 12,
    width: width - 32,
    alignSelf: 'center',
    shadowColor: '#161e2b',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  imageHolder: {
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(34,34,34,0.44)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  attractionName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoHolder: {
    padding: 16,
    backgroundColor: 'rgba(44,44,44,0.85)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'relative',
  },
  reviews: {
    color: '#eee',
    fontSize: 13,
    flex: 1,
  },
  infoButton: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(67,200,250,0.09)',
  },
  infoButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1,
  },
});
