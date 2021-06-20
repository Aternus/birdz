<template>
  <div id="app">
    <Nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Nav from "@/views/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
  computed: {
    ...mapGetters(["isFetchingBirds", "isFetchBirdsError"]),
  },
  methods: {
    ...mapActions(["fetchBirdsFromAPI"]),
  },
  async mounted() {
    if (!this.isFetchingBirds && !this.isFetchBirdsError) {
      await this.fetchBirdsFromAPI();
    }
  },
};
</script>

<style lang="scss">
:root {
  --text-color: #000000;
  --text-alt-color: #ffffff;
  --first-color: #462066;
  --second-color: #ffb85f;
  --third-color: #ff7a5a;
  --fourth-color: #00aaa0;
  --fifth-color: #8ed2c9;
  --sixth-color: #fcf4d9;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--text-color);
}
img.responsive {
  display: block;
  max-width: 100%;
}

#app {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";

  height: 100vh;

  main {
    grid-area: main;
    padding: 0 1em;

    overflow-y: auto;
  }
}
</style>
