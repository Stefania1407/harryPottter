<!-- src/components/CharacterDetails.vue -->
<template>
  <div class="character-details">
    <img :src="character.image" :alt="character.name" class="character-image" />
    <h2>{{ character.name }}</h2>
    <p><strong>Species:</strong> {{ character.species }}</p>
    <p><strong>Gender:</strong> {{ character.gender }}</p>
    <p><strong>House:</strong> {{ character.house }}</p>
    <p><strong>Date of Birth:</strong> {{ character.dateOfBirth }}</p>
    <p><strong>Ancestry:</strong> {{ character.ancestry }}</p>
    <p><strong>Eye Color:</strong> {{ character.eyeColour }}</p>
    <p><strong>Hair Color:</strong> {{ character.hairColour }}</p>
    <p><strong>Patronus:</strong> {{ character.patronus }}</p>
    <p><strong>Actor:</strong> {{ character.actor }}</p>
    <p><strong>Alive:</strong> {{ character.alive ? "Yes" : "No" }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchCharacterById } from "@/services/api";

export default defineComponent({
  name: "CharacterDetails",
  setup() {
    const route = useRoute();
    const character = ref(null);

    onMounted(async () => {
      const characterId = route.params.id as string;
      character.value = await fetchCharacterById(characterId);
    });

    return {
      character,
    };
  },
});
</script>

<style scoped>
.character-details {
  text-align: left;
  max-width: 600px;
  margin: auto;
}

.character-image {
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
}
</style>
