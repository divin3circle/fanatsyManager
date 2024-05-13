import { create } from "zustand";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export type FormInput = string | null;
type RegisterUserState = {
  register: () => Promise<boolean>;
  email: FormInput;
  fplTeam: FormInput;
  eplTeam: FormInput;
  password: FormInput;

  setEmail: (email: FormInput) => void;
  setFplTeam: (fplTeam: FormInput) => void;
  setEplTeam: (eplTeam: FormInput) => void;
  setPassword: (password: FormInput) => void;

  reset: () => void;
};

const useUseRegisterStore = create<RegisterUserState>((set, get) => ({
  register: async () => {
    const { email, fplTeam, eplTeam, password } = get();
    if (email && fplTeam && eplTeam && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        const userId = userCredential.user.uid;

        await setDoc(doc(FIREBASE_DB, "users", userId), {
          email,
          fplTeam,
          eplTeam,
          password,
          isPro: false,
        });
        set({ email: "", fplTeam: "", eplTeam: "", password: "" });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  },
  email: "",
  fplTeam: "",
  eplTeam: "",
  password: "",
  setEmail: (email: FormInput) => set((state) => ({ ...state, email })),
  setFplTeam: (fplTeam: FormInput) => set((state) => ({ ...state, fplTeam })),
  setEplTeam: (eplTeam: FormInput) => set((state) => ({ ...state, eplTeam })),
  setPassword: (password: FormInput) =>
    set((state) => ({ ...state, password })),
  reset: () => set({ email: "", fplTeam: "", eplTeam: "", password: "" }),
}));

export default useUseRegisterStore;
