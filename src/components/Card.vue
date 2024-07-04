<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
    <div class="h-72 overflow-hidden relative text-center">
      <img class="w-auto h-full inline-block" :src="props.movie.image" :alt="props.movie.title">
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ props.movie.name }}</div>
      <div class="h-48 overflow-hidden text-gray-700 text-base" v-html="props.movie.description" />
      <Book :id="movie.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Book from '@/components/Book.vue'

const props = defineProps(['movie'])
// export default {
//   name: 'MovieCard',
//   props: {
//     movie: {
//       type: Object,
//       required: true
//     }
//   },
//   data() {
//     return {
//       selectedDate: ''
//     };
//   },
//   methods: {
//     bookMovie() {
//       alert(`Booked ${this.movie.title} for ${this.selectedDate}`);
//     }
//   }
// };
</script>
