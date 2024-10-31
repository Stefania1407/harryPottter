<template>
  <div id="app">
    <h1>Harry Potter API</h1>
    <h2>Juan Sebastian Sanchez Hincapie</h2>
    <h2>Miguel Angel Patiño Franco</h2>
    <CharactersList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharactersList from "./components/CharactersList.vue";

export default defineComponent({
  name: "App",
  components: {
    CharactersList,
  },
});
</script>
