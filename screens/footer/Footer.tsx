import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Image 
        source={require('./../../assets/footer.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff', // Optional: background color for the footer
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
});
