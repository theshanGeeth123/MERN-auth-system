import { create } from "zustand";
import axios from "axios";

const API_URI = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenicated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenicated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up ", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {

            await axios.post(`${API_URI}/verify-email`, { code });

            set({ isAuthenicated: true, isLoading: false });



        } catch (error) {
            set({ error: error.response.data.message || "Error verifying Email ", isLoading: false });
            throw error;
        }
    }
}))

