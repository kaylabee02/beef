import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import useUsers from '../../API/UserService'; 
import { useNavigation } from '@react-navigation/native';

const User: React.FC = () => {
  // Access the navigation object
  const navigation = useNavigation();

  // Destructure the custom hook useUser to access addUser and loginUser functions
  const { addUser, loginUser } = useUsers();

  console.log();
  
  // State variables to hold user input values and manage the view
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Call the loginUser function from the custom hook
      await loginUser(email, password);
      // Navigate to the HomeScreen upon successful login
      navigation.navigate('HomeScreen');
    } catch (error) {
      // Display an error alert if login fails
      Alert.alert('Login Failed', error.message);
    }
  };

  // Function to handle account creation
  const handleCreateAccount = async () => {
    try {
      // Call the addUser function from the custom hook to add a new user
      await addUser({ email: email, password: password, fname: fname, lname: lname });
      // Display a success alert upon successful account creation
      Alert.alert('Account Created', 'Your account has been created successfully. Please login to continue.');
      // Switch back to the login view after account creation
      setIsLoginView(true);
    } catch (error) {
      // Display an error alert if account creation fails
      Alert.alert('Account Creation Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isLoginView ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButton} onPress={() => setIsLoginView(false)}>
            <Text style={styles.switchButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={fname}
            onChangeText={setFname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lname}
            onChangeText={setLname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButton} onPress={() => setIsLoginView(true)}>
            <Text style={styles.switchButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default User;
