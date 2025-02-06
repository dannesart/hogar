import { defineStore } from "pinia";
import axios from "axios";

type User = {
  email: string;
  id: string;
  user_metadata: {
    picture: string;
  };
};

type State = {
  user: User;
};

export const useUserStore = defineStore("UserStore", {
  state: () =>
    <State>{
      user: {},
    },
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    async fetchUser() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(config.public.BASE_URL + "/api/user");
        if (response.data) {
          this.setUser(response.data);
        }
      } catch (error) {}
    },
  },
});
