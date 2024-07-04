<script setup lang="ts">
  import { useApi } from '@/composables/useApi'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRoute()
  const { data } = useApi(`/movieShows?movie_id=${router.params.id}`)
</script>
<template>

</template>