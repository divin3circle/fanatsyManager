import { signInWithEmailAndPassword } from "firebase/auth";
import { create } from "zustand";
import { FormInput } from "./userRegister";
import { FIREBASE_AUTH } from "../firebaseConfig";

type LoginUserState = {
  login: () => Promise<boolean>;
  userEmail: FormInput;
  userPassword: FormInput;
  setUserEmail: (email: FormInput) => void;
  setUserPassWord: (password: FormInput) => void;
  reset: () => void;
};

const useUserLoginStore = create<LoginUserState>((set, get) => ({
  login: async () => {
    const { userEmail, userPassword } = get();
    if (userEmail && userPassword) {
      try {
        await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          userEmail,
          userPassword
        );
        set({ userEmail: "", userPassword: "" });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  },
  userEmail: "",
  userPassword: "",
  setUserEmail: (userEmail: FormInput) =>
    set((state) => ({ ...state, userEmail })),
  setUserPassWord: (userPassword: FormInput) =>
    set((state) => ({ ...state, userPassword })),
  reset: () => set({ userEmail: "", userPassword: "" }),
}));
export default useUserLoginStore;
