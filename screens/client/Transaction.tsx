import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useTransactions, { Transactions } from '../../API/TransactionService';
import useUsers from '../../API/UserService';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

const TransactionScreen: React.FC = () => {
  const { transactions, fetchTransactions, deleteTransaction } = useTransactions();
  const { getLoggedInUser } = useUsers();
  const loggedInUser = getLoggedInUser();
  const navigation = useNavigation();
  
  useEffect(() => {
    if (loggedInUser) {
      fetchTransactions(loggedInUser.id);
    }
  }, [fetchTransactions, loggedInUser]);

  const viewTransaction = (transaction: Transactions) => {
    navigation.navigate('OrderDetail', { data: transaction });
  };

  const handleDeleteTransaction = (transactionId: number) => {
    deleteTransaction(transactionId);
  };

  const renderTransactionItem = ({ item }: { item: Transactions }) => (
    <TouchableOpacity onPress={() => viewTransaction(item)}>
      <View style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text>Order #: {item.product_id}</Text>
          <Text>$ {item.total} USD</Text>
          <Text>{`\n${Moment(item.created_at).format('MMM D, YYYY  H:mma')}`}</Text>
          <Text>{loggedInUser?.address}</Text>
        </View>
        <View style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText} onPress={() => viewTransaction(item)}>
            View Details
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item: Transactions) => {
    if (item && item.id) {
      return item.id.toString();
    }
    return Math.random().toString(); // fallback key if item.id is undefined
  };

  return (
    <FlatList
      style={styles.container}
      data={transactions}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<Text style={styles.noTransactionsText}>No transactions found</Text>}
      renderItem={renderTransactionItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  noTransactionsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 7,
  },
  transactionDetails: {
    flex: 8,
  },
  viewDetailsButton: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 30,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  viewDetailsText: {
    color: 'white',
    padding: 5,
    fontSize: 13,
  },
});

export default TransactionScreen;
