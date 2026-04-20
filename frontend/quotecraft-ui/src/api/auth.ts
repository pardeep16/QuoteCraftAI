import { api } from "../lib/api";
import type { AuthResponse } from "../types";


export const signInWithGoogle = async(idToken: string):Promise<AuthResponse> => {

    try{
        const response = await api.post<AuthResponse>('/auth/google', { idToken: idToken });
        return response.data;
    }
    catch(err){
        throw new Error("Failed to sign in with Google");
    }
}