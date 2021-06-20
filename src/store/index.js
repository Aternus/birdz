import Vue from "vue";
import Vuex from "vuex";

import { fetchBirds, fetchBirdsTransformer } from "@/services/zapariAPI.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isError: false,
    errorMessage: "",
    isFetchingBirds: false,
    birds: [],
  },
  mutations: {
    setError(state, payload) {
      state.isError = true;
      state.errorMessage = payload;
    },
    setFetchingBirds(state, payload) {
      state.isFetchingBirds = payload;
    },
    setBirds(state, payload) {
      state.birds = payload;
    },
  },
  getters: {
    isFetchBirdsError(state) {
      return state.isError;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    isFetchingBirds(state) {
      return state.isFetchingBirds;
    },
    getBirds(state) {
      return state.birds;
    },
    getBirdById(state) {
      return (birdId) => {
        return state.birds[birdId] || {};
      };
    },
  },
  actions: {
    async fetchBirdsFromAPI({ state, commit }, numberOfBirds = 20) {
      try {
        commit("setFetchingBirds", true);
        const birds = await fetchBirds(numberOfBirds);
        const currentIdx = state.birds.length;
        const newBirds = birds.map((bird, idx) =>
          fetchBirdsTransformer(bird, currentIdx + idx)
        );
        commit("setBirds", [...state.birds, ...newBirds]);
      } catch (error) {
        commit("setError", String(error));
      } finally {
        commit("setFetchingBirds", false);
      }
    },
  },
  modules: {},
});
