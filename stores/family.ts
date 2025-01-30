import { defineStore } from "pinia";
import axios from "axios";

type Family = {
  name: string;
  members: string[];
};

type State = {
  family: Family;
};

export const useFamilyStore = defineStore("FamilyStore", {
  state: () =>
    <State>{
      family: {},
    },
  getters: {
    currentFamily: (state) => state.family,
  },
  actions: {
    setUser(family: Family) {
      this.family = family;
    },
    async fetchFamily() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.BASE_URL + "/api/family"
        );
        if (response.data) {
          this.setUser(response.data);
        }
      } catch (error) {}
    },
  },
});
