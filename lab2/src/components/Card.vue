<template>
    <div class="card">
        <div class="card-content">
            <div class="text-content">
                <h3 class="name">{{ personName }}</h3>
                <p class="pub-date">{{ formattedDate }}, {{ formattedTime }}</p>
            </div>
            <div class="rating-section">
                <p class="rating-text">Rating</p>
                <div class="rating">
                    <span 
                        v-for="star in 5" 
                        :key="star" 
                        class="star"
                        :style="starStyle(star)"
                    >★</span>
                </div>
            </div>
            <img :src="avatar" alt="Avatar" class="avatar" />
        </div>
        <p class="commentary">{{ commentary }}</p>
        <button class="like-button" @click="emitLike">{{ 'Like' }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

interface Props {
    personName: string;
    avatar: string;
    pubDate: string;
    rating: number;
    commentary: string;
}

const props = defineProps<Props>();

// Emit event instead of toggling like state
const emit = defineEmits(['like']);
const emitLike = () => {
    emit('like');
};

// Function to get style for each star
const starStyle = (star: number) => {
    if (star <= Math.floor(props.rating)) {
        // Full star
        return { color: '#ffc107' };
    } else if (star === Math.ceil(props.rating) && props.rating % 1 !== 0) {
        // Partial star
        const partialWidth = (props.rating % 1) * 100;
        return {
            background: `linear-gradient(90deg, #ffc107 ${partialWidth}%, #ffffff ${partialWidth}%)`,
            '-webkit-background-clip': 'text',
            color: 'transparent'
        };
    } else {
        // Empty star
        return { color: '#ffffff' };
    }
};

// Format date and time
const formattedDate = computed(() => {
    const currentDate = new Date();
    const date = new Date(props.pubDate);
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return '1 day ago';
    } else {
        return `${diffDays} days ago`;
    }
});

const formattedTime = computed(() => {
    const date = new Date(props.pubDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
});
</script>

<style scoped>
.card {
    background-color: #5ecff2;
    border: 2px solid #71c0ff;
    border-radius: 15px;
    padding: 15px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.text-content {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 1em;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
}

.pub-date {
    font-size: 0.85em;
    color: #f3ffe1;
    margin: 5px 0;
}

.rating-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rating-text {
    font-size: 0.85em;
    color: #ffffff;
    margin-bottom: 5px;
}

.rating {
    display: flex;
}

.star {
    font-size: 18px;
    color: #ffffff;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 10px;
}

.commentary {
    font-size: 0.85em;
    color: #f3ffe1;
    margin-top: 10px;
}

.like-button {
    background-color: #00ff91;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 0.9em;
}
</style>
