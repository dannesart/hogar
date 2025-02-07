import { defineStore } from "pinia";
import axios from "axios";
import type { Family } from "~/models/family";

type State = {
  _families: Family[];
  _loading: boolean;
  _invites: Family[];
};

export const useFamilyStore = defineStore("FamilyStore", {
  state: () =>
    <State>{
      _families: [],
      _loading: true,
      _invites: [],
    },
  getters: {
    families: (state) => state._families,
    loading: (state) => state._loading,
    invites: (state) => state._invites,
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
    setInvites(invites: Family[]) {
      this._invites = invites;
    },
    removeFamily(id: string) {
      const idx = this._families.findIndex((family) => family.id === id);
      this._families.splice(idx, 1);
    },
    removeInvite(id: string) {
      const idx = this._invites.findIndex((invite) => invite.id === id);
      this._invites.splice(idx, 1);
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
    async fetchInvites() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.BASE_URL + "/api/invite"
        );
        if (response.data) {
          this.setInvites(response.data);
        }
      } catch (error) {}
    },
    async acceptInvite(familyId: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.BASE_URL + "/api/invite",
          {
            id: familyId,
          }
        );
        if (response.data) {
          this.removeInvite(familyId);
          await this.fetchFamilies();
        }
      } catch (error) {
        this.setLoading(false);
      }
    },
    async inviteToFamily(familyId: string, email: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.post(
          config.public.BASE_URL + "/api/invite",
          {
            id: familyId,
            email,
          }
        );
        if (response.data) {
        }
      } catch (error) {
        this.setLoading(false);
      }
    },
  },
});
