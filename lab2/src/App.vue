<template>
    <div id="app">
      <HeaderBar @toggleMenu="toggleMenu" />
      <div class="main-content">
        <MenuSidebar v-if="isMenuOpen" @selectTopic="selectTopic" />
        <AdventureList :selectedTopic="selectedTopic" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import MenuSidebar from './components/MenuSidebar.vue';
import AdventureList from './components/AdventureList.vue';

const isMenuOpen = ref(false);
const selectedTopic = ref('Adventure');

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const selectTopic = (topic: string) => {
    selectedTopic.value = topic;
    isMenuOpen.value = false; // Close menu after selecting topic
};
</script>
  
<style scoped>
#app {
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    display: flex;
}
</style>

<style>
body{
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f4f8;
}
</style>