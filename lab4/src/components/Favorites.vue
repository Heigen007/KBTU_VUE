<template>
  <q-layout class="main">
    <q-page-container class="favorites-container">
      <q-card-section>
        <q-title class="favorites-title">Favorite profiles</q-title>
      </q-card-section>
      <q-list class="favorites-list">
        <q-item v-for="favUser in favoriteUsers" :key="favUser.id" class="favorites-item">
          <Card :user="favUser" />
        </q-item>
      </q-list>
    </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import Card from '@/components/Card.vue'
  import authService from '@/storage/auth';
  
  const favoriteUsers = computed(() => {
    return authService.people.filter(user => authService.currentUser?.favorites?.includes(user.id))
  })
  </script>
  
  <style scoped>
  .main {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .favorites-container {
    padding: 0;
    max-width: 100vw;
    margin: 0 auto;
  }
  
  .favorites-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .favorites-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .favorites-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .favorites-item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  </style>
  