<template>
  <div class="character-list">
    <h2>Characters</h2>
    <ul>
      <li
        v-for="character in displayedCharacters"
        :key="character.id"
        class="character-item"
      >
        <span class="character-name">{{ character.name }}</span>
        <span class="character-house">{{ character.house }}</span>
      </li>
    </ul>
    <!-- Botón para mostrar más personajes -->
    <button
      v-if="displayedCharacters.length < characters.length"
      @click="showMore"
    >
      Mostrar más
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue"; // Agrega computed aquí
import { fetchCharacters } from "@/services/api";

export default defineComponent({
  name: "MyComponent",
  setup() {
    const characters = ref([]); // Lista completa de personajes
    const itemsPerPage = ref(10); // Cantidad de personajes a mostrar inicialmente

    // Computed property para mostrar solo los personajes que se deben mostrar
    const displayedCharacters = computed(() => {
      return characters.value.slice(0, itemsPerPage.value);
    });

    // Función para mostrar más personajes
    const showMore = () => {
      itemsPerPage.value += 10; // Incrementa el número de personajes mostrados
    };

    onMounted(async () => {
      characters.value = await fetchCharacters(); // Carga los personajes al montar
    });

    return {
      characters,
      displayedCharacters,
      showMore,
    };
  },
});
</script>

<style scoped>
.character-list {
  font-family: Arial, sans-serif;
  color: #333;
}

.character-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.character-item:last-child {
  border-bottom: none;
}

/* Estilos para el nombre del personaje */
.character-name {
  font-weight: bold;
}

/* Estilos para la "caja" de la casa del personaje */
.character-house {
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: bold;
}

/* Estilo para el botón */
button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #357ab8;
}
</style>
