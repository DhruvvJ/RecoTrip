import { StyleSheet } from 'react-native';

export const colors = {
  black: '#000000',
  fieldUnderline: '#000000',
  text: '#000000',
  placeholder: '#111',
};

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
  input: {
    width: 230,
    borderBottomWidth: 2,
    borderColor: colors.fieldUnderline,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    marginBottom: 14,
    borderRadius: 8,
  },
  button: {
    width: 120,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomLink: {
    color: colors.black,
    fontSize: 13,
    marginTop: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
