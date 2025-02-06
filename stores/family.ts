import { defineStore } from "pinia";
import axios from "axios";

type Family = {
  title: string;
  members: string[];
  createdBy: string;
  id: string;
};

type State = {
  _families: Family[];
  _loading: boolean;
};

export const useFamilyStore = defineStore("FamilyStore", {
  state: () =>
    <State>{
      _families: [],
      _loading: true,
    },
  getters: {
    families: (state) => state._families,
    loading: (state) => state._loading,
  },
  actions: {
    setLoading(loading: boolean) {
      this._loading = loading;
    },
    setFamilies(families: Family[]) {
      this._families = families;
    },
    setFamily(family: Family) {
      this._families.push(family);
    },
    removeFamily(id: string) {
      const idx = this._families.findIndex((family) => family.id === id);
      this._families.splice(idx, 1);
    },
    async newFamily(title: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.BASE_URL + "/api/family",
          {
            title,
          }
        );
        if (response.data) {
          this.setFamily(response.data);
        }
      } catch (error) {}
    },
    async deleteFamily(id: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.delete(
          config.public.BASE_URL + "/api/family/" + id
        );
        if (response.data) {
          this.removeFamily(id);
        }
      } catch (error) {}
    },
    async fetchFamilies() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.BASE_URL + "/api/family"
        );
        if (response.data) {
          this.setFamilies(response.data);
          this.setLoading(false);
        }
      } catch (error) {
        this.setLoading(false);
      }
    },
    async inviteToFamily(familyId: string, email: string) {},
  },
});
