<template>
  <div class="character-list">
    <!-- Contenedor para la lista de personajes -->
    <div class="character-item-container">
      <h2>Characters</h2>
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
      <button
        v-if="displayedCharacters.length < characters.length"
        @click="showMore"
      >
        Show More
      </button>
    </div>

    <!-- Mostrar mensaje de error si existe -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Contenedor para los detalles del personaje -->
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
/* Contenedor principal con diseño de dos columnas */
.character-list {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2b2b2b;
  background-color: #f3f2ed;
  padding: 20px;
  border-radius: 8px;
  display: flex; /* Activa el diseño en flex */
  gap: 20px; /* Espacio entre la lista y los detalles */
}

/* Columna de la lista de personajes */
.character-item-container {
  flex: 1;
  max-width: 300px; /* Ancho máximo de la columna de la lista */
}

.character-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #d1c7b9;
}

.character-item:last-child {
  border-bottom: none;
}

.character-name {
  font-weight: bold;
  cursor: pointer;
  color: #5a3e2b;
  font-size: 1em;
}

.character-house {
  background-color: #e2d6c1;
  color: #4a2c20;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
}

/* Botón para mostrar más personajes */
button {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 0.9em;
  cursor: pointer;
  background-color: #3e1e10;
  color: #f7f1e3;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5c3b2e;
}

/* Columna de detalles del personaje */
.character-detail {
  flex: 2; /* Mayor espacio para la columna de detalles */
  border: 1px solid #d1c7b9;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9f7f2;
  color: #2b2b2b;
}

.character-detail h3 {
  color: #4a2c20;
}

.character-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.character-detail p {
  margin: 5px 0;
  font-size: 0.9em;
}

.character-detail button {
  margin-top: 15px;
  padding: 8px 16px;
  font-size: 0.9em;
  cursor: pointer;
  background-color: #3e1e10;
  color: #f7f1e3;
  border: none;
  border-radius: 4px;
}

.character-detail button:hover {
  background-color: #5c3b2e;
}

/* Estilo para mensajes de error */
.error-message {
  color: red; /* Color rojo para el mensaje de error */
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
