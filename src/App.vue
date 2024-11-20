<template>
  <div id="app">
    <h1>Harry Potter API</h1>
    <h2>Juan Sebastian Sanchez Hincapie</h2>
    <h2>Miguel Angel Patiño Franco</h2>
    <h2>Andres Felipe Hernandez</h2>
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

<style scoped>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2b2b2b; /* Color oscuro para el texto */
  background-color: #f3f2ed; /* Color de fondo claro */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Estilos para el título principal */
h1 {
  font-size: 2.5em;
  color: #3e1e10; /* Color oscuro para el título */
  margin: 0;
  animation: glow 1.5s infinite alternate; /* Animación de resplandor */
  text-shadow: 0 0 10px #f7f1e3, 0 0 20px #d1c7b9; /* Resplandor */
}

/* Animación de resplandor del título */
@keyframes glow {
  0% {
    text-shadow: 0 0 10px #f7f1e3, 0 0 20px #d1c7b9;
  }
  100% {
    text-shadow: 0 0 20px #f7f1e3, 0 0 30px #d1c7b9, 0 0 40px #a58d7b; /* Resplandor más intenso */
  }
}

/* Estilos para los nombres */
h2 {
  font-size: 1.2em;
  color: #4a2c20; /* Color más claro para los nombres */
  margin: 0;
  padding: 5px 0;
  font-style: italic; /* Cursiva para los nombres */
  font-weight: normal;
}
</style>
