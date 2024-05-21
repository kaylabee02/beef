import React, { useCallback, useEffect, useMemo } from "react";
import { View, Text, FlatList, Button, StyleSheet, Dimensions, Image } from 'react-native';
import useProducts, { Product } from '../../API/ProductService';
import { useQuery } from "react-query";
import Layout from '../footer/Layout';
import { useNavigation } from '@react-navigation/native';
import useCartStore, { CartItem } from '../../API/CartService';
import useUsers from "../../API/UserService";

const CartItemComponent = React.memo(({ item, onAdd, onRemove }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
    <Text style={{ flex: 1 }}>{item.productName}</Text>
    <Button title="-" onPress={onRemove} />
    <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
    <Button title="+" onPress={onAdd} />
  </View>
));

const ProductClient = () => {
  const navigation = useNavigation();
  const { products, fetchProducts } = useProducts();
  const { users, fetchUsers, getLoggedInUser } = useUsers();
  const loggedInUser = getLoggedInUser();

  const { cart, fetchCart, addToCart, removeFromCart, updateCart } = useCartStore();

  const { isLoading, isError, refetch } = useQuery("data", fetchProducts, {
    retry: 3,
  });
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (loggedInUser) {
      fetchCart(loggedInUser.id);
    }
  }, [users, fetchCart]);

  useEffect(() => {
    const intervalId = setInterval(refetch, 5000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  const handleItemPress = useCallback((item: Product) => {
    console.log("Item clicked:", item);
  }, []);

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const updateCartItem = useCallback(async (item: Product, quantity: number) => {
    if (!loggedInUser) {
      console.error('No user found.');
      return;
    }

    const userId = loggedInUser.id;
    const cartItem = cart.find(cartItem => cartItem.product_id === item.id);

    if (cartItem) {
      const newQuantity = cartItem.qty + quantity;
      
      if (newQuantity > 0) {
        updateCart(cartItem.id, { qty: newQuantity });
      } else {
        removeFromCart(cartItem.id); // Remove item from cart if quantity becomes zero
      }
    } else {
      addToCart(userId, item.id, quantity); // Add item to cart if it doesn't exist
    }
  }, [cart, users, addToCart, removeFromCart, updateCart]);

  const memoizedRenderProductItem = useMemo(() => {
    return ({ item }: { item: Product }) => (
      <View style={styles.productContainer}>
        <View style={styles.productItem}>
          <Image
            source={require('./../../assets/206133.webp')}
            style={styles.productImage}
          />
          <Text>{item.item}</Text>
          <Text>${item.price} / lb</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
            <Button title="-" onPress={() => updateCartItem(item, -1)} />
            <Text style={{ marginHorizontal: 10 }}>{cart.find(cartItem => cartItem.product_id === item.id)?.qty || 0}</Text>
            <Button title="+" onPress={() => updateCartItem(item, 1)} />
          </View>
          <Button title="Add to Cart" onPress={() => updateCartItem(item, 1)} />
        </View>
      </View>
    );
  }, [cart, updateCartItem]);

  return (
    <Layout>
      <View>
        <Text>Products</Text>
        <FlatList
          data={products || []}
          keyExtractor={keyExtractor}
          renderItem={memoizedRenderProductItem}
          numColumns={2}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Cart:</Text>
        {cart.map(item => (
          <CartItemComponent
            key={item.id}
            item={item}
            onAdd={() => updateCartItem(item, 1)}
            onRemove={() => updateCartItem(item, -1)}
          />
        ))}
      </View>
    </Layout>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: windowWidth / 2 - 15,
  },
  productItem: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    flex: 1,
    maxHeight: 150,
  },
});

export default ProductClient;
