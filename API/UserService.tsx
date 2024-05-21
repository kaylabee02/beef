import { create } from "zustand";
import supabase from "../supabase";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  address: string;
  isLoggedIn: boolean;
}

interface UsersState {
  users: User[];
  loggedInUser: User | null; // Track the logged-in user
  fetchUsers: (user_id: number) => Promise<void>;
  addUser: (newUser: Omit<User, 'id' | 'isLoggedIn'>) => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<User | null>;
  getLoggedInUser: () => User | null;
}

const useUsers = create<UsersState>((set, get) => ({
  users: [],
  loggedInUser: null,

  fetchUsers: async (user_id: number) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user_id);

      if (error) {
        throw error;
      }

      console.log("Fetched users:", data);

      set((state) => ({ ...state, users: data || [] }));
    } catch (error) {
      handleSupabaseError("fetching users", error);
    }
  },

  addUser: async (newUser: Omit<User, 'id' | 'isLoggedIn'>) => {
    try {
      const { data, error } = await supabase.from("users").insert([newUser]);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Added user:", data[0]);

        set((state) => ({
          ...state,
          users: [...state.users, data[0]],
        }));
      }
    } catch (error) {
      handleSupabaseError("adding user", error);
    }
  },

  updateUser: async (updatedUser: User) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updatedUser)
        .eq("id", updatedUser.id);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Updated user:", updatedUser);

        set((state) => ({
          ...state,
          users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
        }));
      }
    } catch (error) {
      handleSupabaseError("updating user", error);
    }
  },

  deleteUser: async (id: number) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) {
        throw error;
      }

      console.log("Deleted user with id:", id);

      set((state) => ({
        ...state,
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      handleSupabaseError("deleting user", error);
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password);

      if (error) {
        throw error;
      }

      if (data && data.length === 1) {
        const loggedInUser = { ...data[0], isLoggedIn: true };

        console.log("Logged in user:", loggedInUser);

        set((state) => ({
          ...state,
          users: state.users.map((user) =>
            user.id === loggedInUser.id ? loggedInUser : user
          ),
          loggedInUser,
        }));

        return loggedInUser;
      } else {
        throw new Error("User not found or invalid credentials");
      }
    } catch (error) {
      handleSupabaseError("logging in user", error);
      return null;
    }
  },

  getLoggedInUser: () => {
    const { loggedInUser } = get();
    return loggedInUser;
  },
}));

function handleSupabaseError(operation: string, error: any) {
  console.error(`Error ${operation}:`, error.message || error);
}

export default useUsers;
