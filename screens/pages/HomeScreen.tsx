import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Layout from '../footer/Layout';

export default function HomeScreen() {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image source={require('../../assets/beef_background.jpg')} style={styles.backgroundImage} /> */}
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Beef Delights</Text>
          <Text style={styles.subtitle}>Your one-stop shop for the finest beef products</Text>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <Text style={styles.sectionContent}>
            At Beef Delights, we offer a variety of high-quality beef cuts, sourced from the best farms. Our products are fresh, delicious, and perfect for any meal. Whether you're looking for premium steaks, ground beef, or specialty cuts, we have something to satisfy every beef lover's palate.
          </Text>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <View style={styles.productsContainer}>
            <View style={styles.productItem}>
              <Image source={require('../../assets/beef1.webp')} style={styles.productImage} />
              <Text style={styles.productText}>Premium Steak</Text>
            </View>
            <View style={styles.productItem}>
              <Image source={require('../../assets/beef4.webp')} style={styles.productImage} />
              <Text style={styles.productText}>Ground Beef</Text>
            </View>
            <View style={styles.productItem}>
              <Image source={require('../../assets/beef23.webp')} style={styles.productImage} />
              <Text style={styles.productText}>Beef Ribs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#800000', // Dark red color
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#800000',
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  productItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
});
