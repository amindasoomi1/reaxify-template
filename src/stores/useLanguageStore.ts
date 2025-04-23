import { appConfig } from "@/constants";
import { Dispatch } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  language: "en";
  setLanguage: Dispatch<"en">;
};

const useLanguageStore = create<Store>()(
  persist(
    (set) => ({
      language: appConfig.lang as Store["language"],
      setLanguage: (language) => {
        set({ language });
      },
    }),
    { name: "language" }
  )
);

export default useLanguageStore;
