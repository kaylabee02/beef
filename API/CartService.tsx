import { create, SetState } from "zustand";
import supabase from "../supabase";

// Define the type for a cart item
interface CartItem {
  id: number;
  user_id: string;
  product_id: string;
  qty: number;
}

interface CartStore {
  cart: CartItem[];
  fetchCart: (user_id: number) => Promise<void>;
  addToCart: (userId: number, productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateCart: (itemId: number, updatedData: Partial<CartItem>) => Promise<void>;
}

const useCartStore = create<CartStore>((set: SetState<CartStore>) => ({
  cart: [],
  fetchCart: async (user_id: number) => {
    try {
      const { data:cartItems, error:cartError } = await supabase.from<CartItem>('cart')
      .select('*').eq('user_id', user_id);;
      if (cartError) {
        throw cartError;
      }
      if(Array.isArray(cartItems)){
        const joinedCart = await Promise.all(
          cartItems.map( async (cart) =>{
            const { data: productData, error: productError } = await supabase
              .from('products')
              .select('id, price,item,sku')
              .eq('id', cart.product_id)
              .single(); // Assuming product_id is unique and fetches a single product

              if (productError) {
                throw productError;
              }
              return {
                ...cart,
                product: productData
              };
          }

          )
        );
        console.log("joined",joinedCart);
        set({ cart: joinedCart });

        
      }
    } catch (error) {
      
    }
  },
  addToCart: async (userId: number, productId: number, quantity: number) => {
    console.log("Product ID:", productId);
    console.log("User ID:", userId);

    const { data, error } = await supabase.from<CartItem>('cart').insert({ user_id: userId, product_id: productId, qty: quantity }).single();

    if (error) {
      console.error('Error adding to cart:', error.message);
      return;
    }
    console.log("Inserted Data:", data);

    set((state) => ({ cart: [...state.cart, data as CartItem] }));
  },
  removeFromCart: async (itemId: number) => {
    const { error } = await supabase.from('cart').delete().match({ id: itemId });
    if (error) {
      console.error('Error removing from cart:', error.message);
      return;
    }
    set((state) => ({ cart: state.cart.filter((item) => item.id !== itemId) }));
  },
  updateCart: async (itemId: number, updatedData: Partial<CartItem>) => {

    try {
      // Destructure user_id from updatedData or default to null
      const { user_id = null, ...restUpdatedData } = updatedData;
  
      const { data, error } = await supabase
        .from('cart')
        .update(restUpdatedData) // Use the rest of the updatedData for updating
        .match({ id: itemId, user_id }); // Match by itemId and user_id
  
      if (error) {
        console.error('Error updating cart:', error.message);
        return;
      }
  
      set((state) => ({
        cart: state.cart.map((item) => (item.id === itemId ? { ...item, ...data } : item)),
      }));
    } catch (error) {
      console.error('Error updating cart:', error.message);
    }

  },
}));

export default useCartStore;
