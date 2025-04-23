import { Dispatch } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: Dispatch<{ accessToken: string; refreshToken: string } | null>;
};

const useTokenStore = create<Store>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setToken: (result) => {
        const accessToken = result?.accessToken ?? null;
        const refreshToken = result?.refreshToken ?? null;
        set((s) => ({ ...s, accessToken, refreshToken }));
      },
    }),
    { name: "token" }
  )
);

export default useTokenStore;
