<template>
    <div class="profile-container">
      <div class="profile-header">
        <div style="font-size: 54px">{{ isCurrentUser ? 'My Profile' : 'Profile' }}</div>
      </div>
      <div class="content">
        <!-- Left Column: User Info -->
        <div class="left-column">
          <div class="img">
            <img :src="user?.Avatar" alt="Avatar" class="avatar" />
          </div>
          <div class="details">
            <div class="text-white" style="font-size: 24px">{{ user?.PersonName }}</div>
            <div class="ddd">Age: <span class="dd">{{ user?.Age }}</span></div>
            <div class="ddd">Location: <span class="dd">{{ user?.Location }}</span></div>
            <div :class="isCurrentUser ? 'active' : 'inactive'" class="ddd">
              Activity: <span class="dd">{{ isCurrentUser ? 'active for now' : 'was active 5 minutes ago' }}</span>
            </div>
            <div class="rating-stars">
              <div class="ddd">Current rating:</div>
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :style="starStyle(star)"
              >★</span>
            </div>
          </div>
        </div>
  
        <!-- Right Column: Buttons -->
        <div class="right-column">
          <button @click="toggleFavorite" :class="isFavorite ? 'unfollow-btn' : 'follow-btn'">
            {{ isFavorite ? 'UNFOLLOW' : 'FOLLOW' }}
          </button>
          <button @click="editProfile" v-if="isCurrentUser" class="edit-btn">EDIT</button>
            <router-link :to="`/statistics/${userId}`" class="linkable">
                <button class="stats-btn">Statistic</button>
            </router-link>
            <router-link :to="`/friends/${userId}`" class="linkable">
                <button class="friends-btn">FRIENDS</button>
            </router-link>
        </div>
      </div>
  
      <!-- Bottom: Latest Posts -->
      <div class="latest-posts">
        <h3>Latest posts</h3>
        <div class="cards">
            <Card
                v-for="(person, index) in posts"
                :key="person.id"
                :person="person"
                :isRemoveable="true"
                style="margin-top: 10px;"
                @remove="deletePost(index)"
            />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue';
import Card from './Card.vue';
import { getCurrentUserId, getByUserId, getCurrentUser, removeFavoritePerson, addFavoritePerson, getFavorites } from '@/storage/auth';
import { useRoute } from 'vue-router';
import authService from '@/storage/auth';


const route = useRoute();
const userId = ref(route.params.userId);
const user = ref(null);
if (getCurrentUserId() === userId.value) {
    user.value = getCurrentUser();
} else {
    user.value = getByUserId(userId.value);
}


const isCurrentUser = computed(() => getCurrentUserId() == userId.value);
const isFavorite = computed(() => {
    const favorites = getFavorites();
    const id = Number(userId.value);
    return favorites.includes(id);
});

const editProfile = () => {
    window.location.href = `/profile/${userId.value}/edit`;
};

const toggleFavorite = () => {
    if (isFavorite.value) {
        removeFavoritePerson(userId.value);
    } else {
        addFavoritePerson(userId.value);
    }
    window.location.reload();
};

const deletePost = (index) => {
    authService.deleteComment(user.value.id, index);
};

const starStyle = (star) => {
    if (star <= Math.floor(user.value?.Rating)) {
        return { color: '#ffc107' };
    } else if (star === Math.ceil(user.value?.Rating) && user.value?.Rating % 1 !== 0) {
        const partialWidth = (user.value?.Rating % 1) * 100;
        return {
            background: `linear-gradient(90deg, #ffc107 ${partialWidth}%, #ffffff ${partialWidth}%)`,
            '-webkit-background-clip': 'text',
            color: 'transparent'
        };
    } else {
        return { color: '#ffffff' };
    }
};

const posts = computed(() => {
    let finalCommentsArray = [];
        if(user.value?.comments) user.value.comments.forEach((comment) => {
            finalCommentsArray.push({
                id: user.value.id,
                PersonName: user.value.PersonName,
                Avatar: user.value.Avatar,
                Rating: user.value.Rating,
                Commentary: comment.Commentary,
                Topic: comment.Topic,
                Password: user.value.Password,
                Email: user.value.Email,
                Age: user.value.Age,
                comments: user.value.comments,
                Location: user.value.Location,
                favorites: user.value.favorites,
            })
        });

    return finalCommentsArray;
});
</script>
  
  <style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(165, 213, 255);
    width: 100vw;
    min-height: 88.7vh;
    font-family: Inknut Antiqua;
}

.profile-header {
    color: white;
    font-size: 24px;
    font-weight: 400;
    text-align: left;
}

.content {
    display: flex;
    width: 80%;
    justify-content: space-between;
}

.left-column,
.right-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.left-column {
    align-items: flex-start;
}

.details h1 {
    color: #294BFF;
}

.dd {
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}

.ddd {
    color: #FCFF62;
}

.img {
    width: 100px;
    height: 100px;
}

.rating-stars {
    display: flex;
    justify-content: space-between;
}

.filled {
    color: yellow;
}

.star-empty {
    color: white;
}

button {
    padding: 10px 15px;
    margin: 10px 0;
    width: 150px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.follow-btn {
    background-color: #77FC6B;
    color: #fff;
}

.unfollow-btn {
    background-color: #f44336;
    color: #fff;
}

.edit-btn,
.stats-btn,
.save-btn,
.friends-btn {
    background-color: #294BFF;
    color: white;
}

.latest-posts {
    margin-top: 30px;
    width: 80%;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.post {
    background: #e0f7fa;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
}

.delete-btn {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: #d32f2f;
}
</style>
  