import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 56,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  carouselContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - 38,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#222',
    elevation: 15,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundColor: 'rgba(0,0,0,0.48)',
    padding: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 3,
  },
  cardDescription: {
    color: '#f3f3f3',
    fontSize: 14,
    marginBottom: 8,
  },
  cardRating: {
    color: '#ffda79',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 13,
  },
  detailsButton: {
    backgroundColor: '#42C1FA',
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    width: 108,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  swipeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 38,
  },
  arrowButton: {
    backgroundColor: '#333',
    borderRadius: 18,
    padding: 8,
    marginHorizontal: 26,
  },
  arrowText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  arrowButtonDisabled: {
    backgroundColor: '#666',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
  },
});
