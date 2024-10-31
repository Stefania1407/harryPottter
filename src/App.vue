<template>
  <div id="app">
    <h1>Harry Potter API</h1>
    <CharactersList />
    <h3>Juan Sebastian Sanchez Hincapie</h3>
    <h3>Miguel Angel Patiño Franco</h3>
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
