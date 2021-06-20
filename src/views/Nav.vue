<template>
  <nav :class="navClass">
    <div ref="navTopItem"></div>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "@/components/Loader.vue";

export default {
  name: "Nav",
  data() {
    return {
      navClass: "",
      intersectionObservers: {
        topItem: {},
        lastItem: {},
      },
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
  mounted() {
    const navTopItem = this.$refs["navTopItem"];
    const navLastItem = this.$refs["navLastItem"];

    this.intersectionObservers.lastItem = new IntersectionObserver(
      (entries) => {
        // If the browser is busy while scrolling happens, multiple entries can
        // accumulate between invocations of this callback.
        // As long as any one of the notifications reports the sentinel within
        // the scrolling viewport, we fetch the content.
        if (entries.some((entry) => entry.intersectionRatio > 0)) {
          if (!this.isFetchingBirds && !this.isFetchBirdsError) {
            this.fetchBirdsFromAPI(10);
          }
        }
      }
    );
    this.intersectionObservers.topItem = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.intersectionRatio <= 0)) {
        this.navClass = "scrolled";
      } else {
        this.navClass = "";
      }
    });

    this.intersectionObservers.topItem.observe(navTopItem);
    this.intersectionObservers.lastItem.observe(navLastItem);
  },
};
</script>

<style lang="scss" scoped>
nav {
  grid-area: sidebar;
  padding: 0 1em;

  overflow-y: auto;

  background-color: var(--second-color);
  color: var(--first-color);

  &.scrolled {
    .nav-home {
      box-shadow: 0 1px 1px var(--text-color);
    }
  }

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
      background-position: center;
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
</style>
