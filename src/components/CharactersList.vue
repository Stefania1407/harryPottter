<template>
  <div class="character-list">
    <h2>Characters</h2>
    <ul>
      <li
        v-for="character in characters"
        :key="character.id"
        class="character-item"
      >
        <span class="character-name">{{ character.name }}</span>
        <span class="character-house">{{ character.house }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchCharacters } from "@/services/api";

export default defineComponent({
  name: "MyComponent",
  setup() {
    const characters = ref([]);

    onMounted(async () => {
      characters.value = await fetchCharacters();
    });

    return {
      characters,
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
</style>
