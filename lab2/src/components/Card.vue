<template>
    <div class="card">
      <img :src="avatar" alt="Avatar" class="avatar" />
      <div class="details">
        <h3>{{ personName }}</h3>
        <p>{{ pubDate }}</p>
        <div class="rating">
          <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= rating }">★</span>
        </div>
        <p>{{ commentary }}</p>
        <button class="like-button" @click="toggleLike">{{ liked ? 'Liked' : 'Like' }}</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Props {
    personName: string;
    avatar: string;
    pubDate: string;
    rating: number;
    commentary: string;
  }
  
  const props = defineProps<Props>();
  const liked = ref(false);
  
  const toggleLike = () => {
    liked.value = !liked.value;
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #eaf6ff;
    border: 2px solid #c1e4ff;
    border-radius: 15px;
    padding: 15px;
    max-width: 240px;
    text-align: center;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .details {
    padding: 5px;
  }
  
  .rating {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  
  .star {
    font-size: 20px;
    color: #ddd;
  }
  
  .star.filled {
    color: gold;
  }
  
  .like-button {
    background-color: #00ff91;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  </style>
  