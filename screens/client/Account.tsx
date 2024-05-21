// src/components/AccountScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import useUsers from '../../API/UserService'; // Adjust the path accordingly
import TransactionScreen from './Transaction';

const AccountScreen: React.FC = () => {
  const { users, fetchUsers, getLoggedInUser } = useUsers();
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    if (loggedInUser) {
      fetchUsers(loggedInUser.id);
    }
  }, [loggedInUser]);

  if (!users || users.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No users found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      {users.map((user) => (
        <View style={styles.userContainer} key={user.id}>
          <Text>{user.fname} {user.lname}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Address: {user.address}</Text>
          {/* Add more user information as needed */}
        </View>
      ))}
      <TransactionScreen />
      </View>
     
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    height:'100%'
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  userContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AccountScreen;
