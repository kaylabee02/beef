import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ListRenderItem, Alert,Image } from 'react-native';
import useCartStore, { CartItem as CartItemType } from '../../API/CartService';
import useUsers from '../../API/UserService';
import Moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons';

const CartScreen: React.FC = () => {
  const { cart, fetchCart, removeFromCart, updateCart } = useCartStore();
  const { users, isLoading: usersLoading, isError: usersError } = useUsers();
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartReloadTrigger, setCartReloadTrigger] = useState(false); // State variable to trigger cart reload

  useEffect(() => {
    if (users.length > 0) {
      fetchCart(users[0].id)
        .then(() => setIsCartLoading(false))
        .catch(() => setIsCartLoading(false));
    } else {
      setIsCartLoading(false);
    }
  }, [users, fetchCart, cartReloadTrigger]); // Include cartReloadTrigger in the dependencies array

  // Function to trigger cart reload
  const reloadCart = () => {
    setCartReloadTrigger((prev) => !prev); // Toggle cartReloadTrigger value to trigger useEffect
  };

  const handleRemoveItem = (itemId: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => removeFromCart(itemId).then(() => reloadCart()) }, // Reload cart after successful removal
      ],
      { cancelable: true }
    );
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
      const updatedQuantity = cartItem.qty + 1;
      updateCartQuantity(itemId, updatedQuantity);
    }
  };

  const handleDecreaseQuantity = (itemId: number) => {
    const cartItem = cart.find(item => item.id === itemId);
    
    if (cartItem && cartItem.qty > 1) {
      const updatedQuantity = cartItem.qty - 1;
      updateCartQuantity(itemId, updatedQuantity);
    }
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (users.length > 0) {
      updateCart(itemId, { qty: quantity, user_id: users[0].id })
        .then(() => reloadCart()); // Reload cart after successful update
    } else {
      console.error('No user found.');
    }
  };

  const renderCartItem: ListRenderItem<CartItemType> = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={{flex:2}}>
      <Image
            source={require('./../../assets/206133.webp')}
            style={styles.productImage}
          />
      </View>
      <View style={[styles.itemDetails, { flex:  3,marginLeft:10}]}>
        <Text style={styles.itemText}>{item['product'].item}</Text>
        <Text style={styles.itemText}>Quantity: {item.qty}</Text>
        <Text style={styles.itemText}>Date Added: {Moment(item.created_at).format('MMM d y  H:mma')}</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 2}}>
        <View style={styles.buttonContainer}>
          <Button title="-" onPress={() => handleDecreaseQuantity(item.id)} />
          <Text style={{ marginHorizontal: 10 ,alignSelf:'center'}}>{item.qty}</Text>
          <Button title="+" onPress={() => handleIncreaseQuantity(item.id)} />
        </View>
        <View style={{backgroundColor:'red',borderRadius:5}}>
        <FontAwesome5 name="trash" size={ 20} color={'white'} onPress={() => handleRemoveItem(item.id)} style={styles.removeButton} />

        </View>
      </View>
    </View>
  );

  if (usersLoading || isCartLoading) {
    return <Text>Loading...</Text>;
  }

  if (usersError) {
    return <Text>Error loading users</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf:'center'
  },
  removeButton: {
    alignSelf:'center',
    padding:5
    
  },
  productImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default CartScreen;
