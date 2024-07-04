<script setup lang="ts">
  import Card from '@/components/Card.vue'
  import { ref } from 'vue'
  import { genreData } from '@/mock'
  import { useMovies } from '@/composables/useMovies'

  const { state, load } = useMovies()
  const searchQuery = ref('')
  const selectedGenre = ref('')
</script>

<template>
  <div class="flex items-center my-4">
    <div class="mr-2">Filters:</div>
    <input v-model="searchQuery" placeholder="Search by name" class="border border-gray-300 p-2 rounded w-1/5 mr-4 h-10" />
    <select v-model="selectedGenre" class="border border-gray-300 p-2 rounded w-1/5 h-10">
      <option value="">All Genres</option>
      <option v-for="genre in genreData" :key="genre.id" :value="genre.id">{{ genre.title }}</option>
    </select>
    <button @click="load({name: searchQuery, genres: selectedGenre})" class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white h-10 ml-2">Filter</button>
  </div>
  <div class="flex flex-wrap justify-center">
    <template v-if="state">
      <Card v-for="movie in state.value" :key="movie.id" :movie="movie" />
    </template>
  </div>
</template>
