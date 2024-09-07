<template>
    <div class="post" :style="{ backgroundImage: 'url(' + post.image + ')' }">
      <div class="overlay">
        <div>
            <template v-if="post.categories">
                <span class="category" v-for="category in post.categories" :key="category" :style="{
                    backgroundColor: category === 'Dogs' ? '#ff6b6b' : '#4a69bd'
                }">{{ category }}</span>
            </template>
            <h3 style="margin:2px">{{ post.title }}</h3>
            <p>{{ post.date }}</p>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    post: {
        type: Object,
        required: true,
    }
});
</script>
  
<style scoped>
.post {
    position: relative;
    height: 300px;
    background-size: cover;
    background-position: center;
    color: white;
    cursor: pointer;
}

.overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

h3 {
    margin: 0;
}

p {
    margin: 0;
    font-size: 14px;
    color: lightgray;
}

.category {
    background-color: #ff6b6b;
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-bottom: 8px;
    display: inline-block;
    margin: 2px;
}
</style>