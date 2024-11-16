<template>
      <HeaderBar :isAuthenticated="isAuthenticated" @toggleMenu="toggleMenu"/>
      <MenuSidebar v-if="isMenuOpen" @selectTopic="selectTopic" />
    <router-view />
</template>
  
  <script setup lang="ts">
import { computed, ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import MenuSidebar from './components/MenuSidebar.vue';
import authService from '@/storage/auth';

const isMenuOpen = ref(false);

const isAuthenticated = computed(() => authService.isAuthenticated);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const selectTopic = (topic: string) => {
    authService.setSelectedTopic(topic);
    isMenuOpen.value = false;
};
</script>
  
  <style>
#app {
    font-family: 'Arial', sans-serif;
    background-color: #6e6e6e;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    display: flex;
    background-color: rgba(255, 255, 255, 0.7);
    height: calc(100vh - 52px);
}

body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
</style>
  