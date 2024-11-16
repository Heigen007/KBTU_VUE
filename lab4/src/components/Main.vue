<template>
  <q-layout>
      <q-page-container class="main-content">
          <ThemeList :selectedTopic="authService.getSelectedTopic()" />
      </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ThemeList from './ThemeList.vue';
import authService from '@/storage/auth';

</script>

<style scoped>

</style>
