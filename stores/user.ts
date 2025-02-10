import { defineStore } from "pinia";
import axios from "axios";

type User = {
  email: string;
  id: string;
  picture: string;
  displayName: string;
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
    updateUser(user: Partial<User>) {
      this.user = { ...this.user, ...user };
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
    async patchUser(displayName: string) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.patch(
          config.public.BASE_URL + "/api/user",
          { displayName }
        );
        if (response.data) {
          this.updateUser({
            displayName,
          });
        }
      } catch (error) {}
    },
  },
});
