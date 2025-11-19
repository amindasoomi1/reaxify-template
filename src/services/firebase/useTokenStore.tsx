import { Dispatch } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  firebaseToken: null | string;
  setFirebaseToken: Dispatch<null | string>;
};

const useFirebaseTokenStore = create<Store>()(
  persist(
    (set) => ({
      firebaseToken: null,
      setFirebaseToken: (firebaseToken) => {
        set((s) => ({ ...s, firebaseToken }));
      },
    }),
    { name: "firebase-token" }
  )
);

export default useFirebaseTokenStore;
