import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FaqScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I create an account?</Text>
        <Text style={styles.answer}>A: To create an account, go to the signup page and follow the instructions.</Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I reset my password?</Text>
        <Text style={styles.answer}>A: You can reset your password by clicking on the "Forgot Password" link on the login page.</Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: Can I change my email address?</Text>
        <Text style={styles.answer}>A: Yes, you can change your email address in the account settings.</Text>
      </View>
      {/* Add more FAQ items here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
  },
});

export default FaqScreen;
