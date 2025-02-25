import { defineStore } from "pinia";
import type { App } from "~/types/App";

type State = {
  _apps: App[];
  _appState: {
    [appId: string]: {
      [stateId: string]: any;
    };
  };
  _favourites: App[];
  _shortCuts: { label: string; route: string; id: string }[];
};

export const useAppsStore = defineStore("AppsStore", {
  state: () =>
    <State>{
      _apps: [
        {
          id: "budget",
          icon: "lucide:chart-no-axes-combined",
          name: "Budget",
        },
        {
          id: "todo",
          icon: "lucide:list-todo",
          name: "Todo",
          components: [
            {
              name: "Todo",
              props: {
                title: "My todo lists",
              },
            },
          ],
        },
        {
          id: "economy",
          icon: "lucide:dollar-sign",
          name: "Economy",
        },
      ],
      _appState: {},
    },
  getters: {
    apps: (state) => state._apps,
    appById: (state) => {
      return (id: string) => {
        return state._apps.find((app) => app.id === id);
      };
    },
    stateByApp: (state) => {
      return (appId: string) => {
        return state._appState?.[appId] || {};
      };
    },
    stateById: (state) => {
      return (appId: string, stateId: string) => {
        return state._appState?.[appId]?.[stateId] || {};
      };
    },
    favourites: (state) => {
      return state._favourites;
    },
    shortCuts: (state) => {
      return state._shortCuts;
    },
  },
  actions: {
    setState(appId: string, stateId: string, patchState: any) {
      if (!this._appState[appId]) this._appState[appId] = {};
      if (!this._appState[appId][stateId]) this._appState[appId][stateId] = {};
      const currentState = this._appState[appId][stateId];
      this._appState[appId][stateId] = { ...currentState, ...patchState };
    },

    setAppState(appId: string, patch: any) {
      if (!this._appState[appId]) this._appState[appId] = {};
      const currentState = this._appState[appId];
      this._appState[appId] = { ...currentState, ...patch };
    },

    setFavourite(appId: string) {
      const app = this.appById(appId);
      if (app) this._favourites.push(app);
    },
    removeFavourite(appId: string) {
      const idx = this._favourites.findIndex(
        (favourite) => favourite.id === appId
      );
      if (idx > -1) this._favourites.slice(idx, 1);
    },
    setShortCut(label: string, route: string) {
      const id = crypto.randomUUID();
      this._shortCuts.push({ label, route, id });
    },
    removeShortCut(id: string) {
      const idx = this._shortCuts.findIndex((shortCut) => shortCut.id === id);
      if (idx > -1) this._shortCuts.slice(idx, 1);
    },

    async getStatesByApp(appId: string) {},

    async saveState(id: string, state: any) {
      // Id = state id
    },

    async getState(id: string) {
      // Get state based on state id
    },
  },
});
