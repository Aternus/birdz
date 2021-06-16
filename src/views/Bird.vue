<template>
  <div class="bird">
    <h1 class="title">{{ name }}</h1>
    <img :src="imgSrc" :alt="name" class="img responsive" />
    <hr />
    <h2>Audio</h2>
    <audio :src="audioSrc" controls></audio>
    <template v-if="location">
      <hr />
      <h2>Map</h2>
      <iframe
        class="map"
        loading="lazy"
        allowfullscreen
        :src="googleMapsIframeSrc"
      >
      </iframe>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CONSTS from "@/consts.js";

export default {
  name: "Bird",
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["getBirdById"]),
    getBird() {
      return this.getBirdById(this.id);
    },
    name() {
      return this.getBird.name;
    },
    imgSrc() {
      return this.getBird.image;
    },
    audioSrc() {
      return this.getBird.sound;
    },
    location() {
      return this.getBird.location;
    },
    googleMapsIframeSrc() {
      return (
        `https://www.google.com/maps/embed/v1/place?` +
        `key=${CONSTS.GOOGLE_MAPS_API_KEY}` +
        `&q=${this.location.lat},${this.location.lng}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.bird {
  .title {
    color: var(--first-color);
  }
  .img {
    max-height: 50vh;
  }
  .map {
    width: 100%;
    height: 50vh;
    border: 0 none;
  }
}
</style>
