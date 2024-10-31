<template>
  <div class="character-list">
    <h2>Characters</h2>

    <!-- Mostrar mensaje de error si existe -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <ul>
      <li
        v-for="character in displayedCharacters"
        :key="character.id"
        class="character-item"
      >
        <span class="character-name" @click="selectCharacter(character)">
          {{ character.name }}
        </span>
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

    <!-- Detalles del personaje seleccionado -->
    <div v-if="selectedCharacter" class="character-detail">
      <h3>Detalles de {{ selectedCharacter.name }}</h3>
      <img
        :src="selectedCharacter.image"
        alt="Character Image"
        class="character-image"
      />
      <p>
        <strong>Apodos:</strong>
        {{ selectedCharacter.alternate_names.join(", ") }}
      </p>
      <p><strong>Casa:</strong> {{ selectedCharacter.house }}</p>
      <p><strong>Género:</strong> {{ selectedCharacter.gender }}</p>
      <p><strong>Especie:</strong> {{ selectedCharacter.species }}</p>
      <p><strong>Actor:</strong> {{ selectedCharacter.actor }}</p>
      <p>
        <strong>Fecha de Nacimiento:</strong>
        {{ selectedCharacter.dateOfBirth }}
      </p>
      <p><strong>Patronus:</strong> {{ selectedCharacter.patronus }}</p>
      <p>
        <strong>Wand:</strong> {{ selectedCharacter.wand.wood }} ({{
          selectedCharacter.wand.length
        }}
        inches)
      </p>
      <p><strong>Ancestry:</strong> {{ selectedCharacter.ancestry }}</p>
      <button @click="deselectCharacter">Cerrar</button>
      <!-- Botón para cerrar detalles -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue"; // Agrega computed aquí
import { fetchCharacters } from "@/services/api";

// Define las interfaces para el tipo de personaje
interface Wand {
  wood: string;
  core: string;
  length: number;
}

interface Character {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

export default defineComponent({
  name: "MyComponent",
  setup() {
    const characters = ref<Character[]>([]); // Lista completa de personajes
    const itemsPerPage = ref(10); // Cantidad de personajes a mostrar inicialmente
    const selectedCharacter = ref<Character | null>(null); // Estado para el personaje seleccionado
    const errorMessage = ref<string | null>(null); // Estado para mensajes de error

    // Computed property para mostrar solo los personajes que se deben mostrar
    const displayedCharacters = computed(() => {
      return characters.value.slice(0, itemsPerPage.value);
    });

    // Función para mostrar más personajes
    const showMore = () => {
      itemsPerPage.value += 10; // Incrementa el número de personajes mostrados
    };

    // Función para seleccionar un personaje y mostrar su información
    const selectCharacter = (character: Character) => {
      selectedCharacter.value = character; // Guarda el personaje seleccionado
    };

    // Función para deseleccionar el personaje
    const deselectCharacter = () => {
      selectedCharacter.value = null; // Resetea el personaje seleccionado
    };

    onMounted(async () => {
      try {
        characters.value = await fetchCharacters(); // Carga los personajes al montar
      } catch (error) {
        errorMessage.value =
          "Error al cargar los personajes. Inténtalo de nuevo más tarde."; // Mensaje de error
        console.error(error); // Log del error en la consola para desarrollo
      }
    });

    return {
      characters,
      displayedCharacters,
      showMore,
      selectCharacter,
      deselectCharacter,
      selectedCharacter,
      errorMessage, // Exponer el mensaje de error al template
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
  cursor: pointer; /* Indica que es clickeable */
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

/* Estilos para los detalles del personaje */
.character-detail {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.character-image {
  width: 150px; /* Ajusta el tamaño de la imagen */
  height: auto;
  border-radius: 8px;
  margin: 10px 0;
}

/* Estilo para mensajes de error */
.error-message {
  color: red; /* Color rojo para el mensaje de error */
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
