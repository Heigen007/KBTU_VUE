<template>
    <header class="header-bar">
      <button class="menu-button" @click="$emit('toggleMenu')">Menu</button>
      <h1>{{ selectedTopic }}</h1>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue';
  
  const props = defineProps<{ selectedTopic: string }>();
  const selectedTopic = computed(() => props.selectedTopic);
  </script>
  
  <style scoped>
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #00c3ff;
  }
  
  .menu-button {
    background-color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>