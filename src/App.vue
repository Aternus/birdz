<template>
  <div id="app">
    <nav>
      <router-link
        class="nav-home"
        :to="{ name: 'Home' }"
        exact
        exact-active-class="active"
      >
        <h1 class="nav-title">Birdz</h1>
      </router-link>
      <router-link
        v-for="bird in this.getBirds"
        :key="bird.id"
        :to="`/bird/${bird.id}`"
        exact
        exact-active-class="active"
      >
        <div class="nav-link">
          <div
            class="nav-link-img"
            :style="{ 'background-image': `url('${bird.image}')` }"
          />
          <div class="nav-link-text">
            {{ bird.name }}
          </div>
        </div>
      </router-link>
      <div ref="navLastItem">
        <Loader />
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader.vue";

export default {
  name: "App",
  data() {
    return {
      intersectionObserver: {},
    };
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(["isFetchingBirds", "isFetchBirdsError", "getBirds"]),
  },
  methods: {
    ...mapActions(["fetchBirdsFromAPI"]),
  },
  async mounted() {
    const sentinel = this.$refs["navLastItem"];

    if (!this.isFetchingBirds && !this.isFetchBirdsError) {
      await this.fetchBirdsFromAPI();
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      // If the browser is busy while scrolling happens, multiple entries can
      // accumulate between invocations of this callback.
      // As long as any one of the notifications reports the sentinel within
      // the scrolling viewport, we fetch the content.
      if (entries.some((entry) => entry.intersectionRatio > 0)) {
        if (!this.isFetchingBirds && !this.isFetchBirdsError) {
          this.fetchBirdsFromAPI(10);
        }
      }
    });
    this.intersectionObserver.observe(sentinel);
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

  nav {
    grid-area: sidebar;
    padding: 0 1em;

    overflow-y: auto;

    background-color: var(--second-color);
    color: var(--first-color);

    a {
      display: block;
      margin-bottom: 1em;

      font-weight: bold;
      color: var(--text-alt-color);
      text-shadow: 1px 1px 1px var(--text-color);

      &.active {
        color: var(--fourth-color);
      }

      &.nav-home {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;

        text-align: center;
        text-decoration: none;
        border-radius: 0 0 0.25em 0.25em;
        box-shadow: 0 1px 1px var(--text-alt-color);

        background-color: var(--third-color);
        color: var(--sixth-color);

        .nav-title {
          padding: 0;
          margin: 0;
        }
      }

      .nav-link {
        position: relative;
      }
      .nav-link-img {
        background-color: var(--fifth-color);
        border-radius: 0.5em;

        width: 100%;
        height: 100px;

        background-size: cover;
      }
      .nav-link-text {
        position: absolute;
        top: 0.5em;
        left: 0.25em;
        right: 0.25em;
      }
    }
  }

  main {
    grid-area: main;
    padding: 0 1em;

    overflow-y: auto;
  }
}
</style>
