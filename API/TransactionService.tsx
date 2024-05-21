import { create } from "zustand";
import supabase from "../supabase";

interface Transactions {
  id: number;
  product_id: number;
  user_id: number;
  qty: number;
  status: string;
}

interface TransactionState {
  transactions: Transactions[];
  fetchTransactions: (user_id: number) => Promise<void>;
  addTransaction: (newTransaction: Transactions) => Promise<void>;
  updateTransaction: (updatedTransaction: Transactions) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const useTransactions = create<TransactionState>((set) => ({
  transactions: [],
  fetchTransactions: async (user_id: number) => {
    try {
      const { data: transactionsData, error: transactionsError } = await supabase
        .from("transactions")
        .select('*')
        .eq("user_id", user_id);
      console.log("fetcg",transactionsData);
      
      if (transactionsError) {
        throw transactionsError;
      }

      if (Array.isArray(transactionsData)) {
        const joinedData = await Promise.all(
          transactionsData.map(async (transaction) => {
            const { data: productData, error: productError } = await supabase
              .from('products')
              .select('id, price,item,sku')
              .eq('id', transaction.product_id)
              .single(); // Assuming product_id is unique and fetches a single product

            if (productError) {
              throw productError;
            }

            return {
              ...transaction,
              product: productData
            };
          })
        );
        console.log("joined trans",joinedData);
        
        set({ transactions: joinedData });
      }
    } catch (error) {
      handleSupabaseError("fetching transactions", error);
    }
  },
  addTransaction: async (newTransaction: Transactions) => {
    try {
      const { data, error } = await supabase.from<Transactions>("transactions").insert([newTransaction]);
      console.log("Added data:", data);
      if (error) {
        throw error;
      }
      set((prevState) => ({
        ...prevState,
        transactions: [...prevState.transactions, data![0]],
      }));
    } catch (error) {
      handleSupabaseError("adding transaction", error);
    }
  },
  updateTransaction: async (updatedTransaction: Transactions) => {
    try {
      const { data, error } = await supabase
        .from<Transactions>("transactions")
        .update(updatedTransaction)
        .eq("id", updatedTransaction.id);
      console.log("Updated data:", data);
      if (error) {
        throw error;
      }
      set((prevState) => ({
        ...prevState,
        transactions: prevState.transactions.map((transaction) =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        ),
      }));
    } catch (error) {
      handleSupabaseError("updating transaction", error);
    }
  },
  deleteTransaction: async (id: number) => {
    try {
      const { error } = await supabase.from<Transactions>("transactions").delete().eq("id", id);
      console.log("Deleted transaction with ID:", id);
      if (error) {
        throw error;
      }
      set((prevState) => ({
        ...prevState,
        transactions: prevState.transactions.filter((transaction) => transaction.id !== id),
      }));
    } catch (error) {
      handleSupabaseError("deleting transaction", error);
    }
  },
}));

function handleSupabaseError(operation: string, error: any) {
  console.error(`Error ${operation}:`, error.message);
}

export default useTransactions;
