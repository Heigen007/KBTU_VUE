<template>
    <div class="grid">
      <PostItem
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        :class="{ 'big-post': index === 1 }"
      />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import PostItem from './PostItem.vue';

const posts = ref([
    { title: 'The AI magically removes moving objects from videos.', date: 'July 19, 2019', image: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/697/c500/e5d7e52e-ab4d-4d1b-80fe-15e99ffbf6b6.jpeg' },
    { title: 'The 20 Biggest Fintech Companies In America 2019', date: 'July 19, 2019', categories: ['Dogs', 'Travel'], image: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/697/c500/e5d7e52e-ab4d-4d1b-80fe-15e99ffbf6b6.jpeg' },
    { title: 'The 20 Biggest Fintech Companies In America 2019', date: 'July 19, 2019', image: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/697/c500/e5d7e52e-ab4d-4d1b-80fe-15e99ffbf6b6.jpeg' },
    { title: 'The AI magically removes moving objects from videos.', date: 'July 19, 2019', image: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/697/c500/e5d7e52e-ab4d-4d1b-80fe-15e99ffbf6b6.jpeg' },
    { title: 'The 20 Biggest Fintech Companies In America 2019', date: 'July 19, 2019', image: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/697/c500/e5d7e52e-ab4d-4d1b-80fe-15e99ffbf6b6.jpeg' },
]);
</script>
  
<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 25px;
    margin: 50px 80px 50px 80px;
}

.big-post {
    grid-row: span 2;
}

.post {
    background-size: cover;
    background-position: center;
    position: relative;
    height: 100%;
}

.overlay {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
}

h3 {
    margin: 0;
    font-size: 1.2em;
}

p {
    margin: 0;
    font-size: 0.8em;
    color: lightgray;
}
</style>