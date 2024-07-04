<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <div class="container mx-auto px-4">
    <RouterView />
  </div>
  <Footer />
</template>
