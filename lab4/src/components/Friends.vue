<template>
    <div class="friends-container">
      <q-banner class="text-h5 text-primary">My Friends</q-banner>
  
      <!-- Friends List -->
      <div
        v-if="favoriteFriends.length"
        flat
        bordered
        class="q-pa-md shadow-1 q-mb-md friend-item"
        v-for="(friend, index) in favoriteFriends"
        :key="index"
      >
        <div class="row items-center q-py-sm q-px-md">
          <q-avatar size="50px" class="q-mr-md">
            <img :src="friend.Avatar" alt="Avatar" />
          </q-avatar>
          <div class="friend-info col">
            <q-item-label class="text-h6">{{ friend.PersonName }}</q-item-label>
            <q-item-label caption>
              Activity:
              <span :class="isActive(friend.comments[0]? friend.comments[0].PubDate : {}) ? 'text-positive' : 'text-negative'">
                {{ getActivityStatus(friend.comments[0]? friend.comments[0].PubDate : {}) }}
              </span>
            </q-item-label>
          </div>
          <q-space />
          <div class="actions col-auto">
            <q-btn label="UNFOLLOW" color="negative" flat @click="removeFavorite(friend.id)" />
            <!-- <q-btn label="RENAME" color="primary" flat /> -->
            <router-link :to="`/chat/${friend.id}`">
              <q-btn label="CHAT" color="positive" flat />
            </router-link>
          </div>
        </div>
      </div>
  
      <q-banner v-else class="q-my-md text-grey">
        You have no friends in your favorites list.
      </q-banner>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { QBtn, QAvatar, QBanner, QCard, QItemLabel, QSpace } from 'quasar';
  import authService, { removeFavoritePerson, getPeople, getFavorites, getByUserId } from '@/storage/auth';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const people = ref(getPeople());
  const currentUser = ref(getByUserId(route.params.userId));
  const favorites = ref(currentUser.value ? currentUser.value.favorites : []);

  const favoriteFriends = computed(() => {
    return people.value.filter(person => favorites.value.includes(person.id));
  });
  console.log(favoriteFriends.value);
  
  
  const isActive = (pubDate) => {
    const lastActiveDate = new Date(pubDate);
    const now = new Date();
    const diffHours = (now - lastActiveDate) / (1000 * 60 * 60);
    return diffHours <= 24;
  };
  
  const getActivityStatus = (pubDate) => {
    const lastActiveDate = new Date(pubDate);
    const now = new Date();
    const diffHours = (now - lastActiveDate) / (1000 * 60 * 60);
  
    if (diffHours < 1) return 'for now';
    else if (diffHours < 24) return `${Math.floor(diffHours)} hours ago`;
    else return `${Math.floor(diffHours / 24)} days ago`;
  };
  
  const removeFavorite = (friendId) => {
    authService.removeFavoritePersonFromUser(Number(route.params.userId), friendId);
    favorites.value = currentUser.value.favorites || [];
  };
  </script>
  
  <style scoped>
  .friends-container {
    padding: 20px;
    min-height: 90vh;
    background-color: aliceblue;
  }
  
  .friend-item {
    background-color: #ffffff;
    border-radius: 8px;
  }
  
  .text-positive {
    color: #4CAF50;
  }
  
  .text-negative {
    color: #FF4081;
  }
  </style>
  