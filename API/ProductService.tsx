import { create } from "zustand";
import supabase from "../supabase";

interface Product {
  id: number;
  item: string;
  price: number;
  qty: number;
}

interface ProductsState {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Product) => Promise<void>;
  updateProduct: (updatedProduct: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const useProducts = create<ProductsState>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const { data, error } = await supabase.from<Product>("products").select("*");
      if (error) {
        throw error;
      }
      set((prevState) => ({ ...prevState, products: data || [] }));
    } catch (error) {
      handleSupabaseError("fetching products", error);
    }
  },
  addProduct: async (newProduct: Product) => {
    try {
      const { data, error } = await supabase.from<Product>("products").insert([newProduct]);
      console.log("Added data:", data); // Added logging
      // if (error) {
      //   throw error;
      // }
      // set((prevState) => ({
      //   ...prevState,
      //   products: [...prevState.products, data![0]],
      // }));
    } catch (error) {
      handleSupabaseError("adding product", error);
    }
  },
  updateProduct: async (updatedProduct: Product) => {
    try {
      const { data, error } = await supabase
        .from<Product>("products")
        .update(updatedProduct)
        .eq("id", updatedProduct.id);
      console.log("Updated data:", data); // Added logging
      if (error) {
        throw error;
      }
      set((prevState) => ({
        ...prevState,
        products: prevState.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
      }));
    } catch (error) {
      handleSupabaseError("updating product", error);
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const { error } = await supabase.from<Product>("products").delete().eq("id", id);
      console.log("Deleted product with ID:", id); // Added logging
      if (error) {
        throw error;
      }
      set((prevState) => ({
        ...prevState,
        products: prevState.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      handleSupabaseError("deleting product", error);
    }
  },
}));

function handleSupabaseError(operation: string, error: any) { // Changed to any type for error
  console.error(`Error ${operation}:`, error.message);
}


export default useProducts;
