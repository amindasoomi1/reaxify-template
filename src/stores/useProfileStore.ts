import { Dispatch } from "react";
import { create } from "zustand";

type Profile = { fullname: string };

type Store = {
  profile: null | Profile;
  setProfile: Dispatch<null | Profile>;
};

const useProfileStore = create<Store>()((set) => ({
  profile: null,
  setProfile: (profile) => {
    set((s) => ({ ...s, profile }));
  },
}));

export default useProfileStore;
