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
    loginError:null,

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

    login: async (email, password) => {

        set({ isLoading: true, loginError: null });

        try {

            const response = await axios.post(`${API_URI}/login`, { email, password });

            set({ user: response.data.user, isAuthenicated: true, loginError: null, isLoading: false })

        } catch (error) {
            set({ loginError: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }

    }
    ,

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {

            await axios.post(`${API_URI}/verify-email`, { code });

            set({ isAuthenicated: true, isLoading: false });



        } catch (error) {
            set({ error: error.response.data.message || "Error verifying Email ", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });

        try {
            const response = await axios.get(`${API_URI}/check-auth`);

            set({ user: response.data.user, isAuthenicated: true, isCheckingAuth: false });

        } catch (error) {
            set({ error: error.response.data.message , isAuthenicated: false, isCheckingAuth: false });
        }
    },

    logout: async ()=> {
        set({isLoading :true ,error : null});

        try {
            await axios.post(`${API_URI}/logout`);

            set({user:null, isAuthenicated:false ,error:null ,isLoading:false});
            
        } catch (error) {
            set({error: "Error logging out ",isLoading:false});
            throw error;

        }
    }


}))

