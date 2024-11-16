<template>
    <q-card v-if="person" class="person-card" :key="person.id">
      <q-card-section class="person-info">
        <div class="person-name">
        <router-link :to="`/profile/${person.id}`" class="linkable">
          {{ person.PersonName }}
        </router-link>
          <br />
          {{ formattedPubDate }}
        </div>
  
        <div class="rating">
          <div>RATING</div>
          <div class="rating-stars">
            <span 
                        v-for="star in 5" 
                        :key="star" 
                        class="star"
                        :style="starStyle(star)"
                    >★</span>
          </div>
        </div>
  
        <div class="person-image">
            <router-link :to="`/profile/${person.id}`" class="linkable">
                <img :src="person.Avatar" alt="avatar" />
            </router-link>
        </div>
      </q-card-section>
  
      <q-card-section class="comment-section">
        {{ person.Commentary }}
      </q-card-section>
  
        <q-btn
            v-if="!isRemoveable"
            class="like-button"
            label="LIKE"
            color="green"
            @click="like"
            flat
        />

        <q-btn
            v-if="isRemoveable"
            class="remove-button"
            label="DELETE"
            color="red"
            @click="remove"
            flat
        />
    </q-card>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  const props = defineProps({
    person: {
      type: Object,
      required: true,
      validator(value) {
        const requiredKeys = ['id', 'PersonName', 'Avatar', 'Rating', 'Commentary', 'comments'];
        return requiredKeys.every((key) => key in value);
      },
    },
    isRemoveable: Boolean,
  });
  
  const emit = defineEmits();
  
  const formattedPubDate = computed(() => {
    console.log(props.person);
    
    const date = new Date(props.person.comments[0].PubDate);
    return date.toLocaleDateString();
  });
  
  const starStyle = (star) => {
    if (star <= Math.floor(props.person.Rating)) {
        return { color: '#ffc107' };
    } else if (star === Math.ceil(props.person.Rating) && props.person.Rating % 1 !== 0) {
        const partialWidth = (props.person.Rating % 1) * 100;
        return {
            background: `linear-gradient(90deg, #ffc107 ${partialWidth}%, #ffffff ${partialWidth}%)`,
            '-webkit-background-clip': 'text',
            color: 'transparent'
        };
    } else {
        return { color: '#ffffff' };
    }
  };

  const like = () => {
    emit('like', props.person.id);
  };

  const remove = () => {
    emit('remove', props.person.id);
  };
  
  </script>
  
  <style scoped>
  .person-card {
    width: 362px;
    border-radius: 10px;
    background: #5bb9cd;
    color: aliceblue;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    padding: 10px;
  }
  
  .person-info {
    display: flex;
    justify-content: space-between;
  }
  
  .person-name {
    height: 72px;
    border-radius: 10px;
    background: #fffff526;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 10px;
    color: white;
  }
  .person-name a{
    color: white;
  }
  .linkable {
    text-decoration: none;
    color: #000000;
  }
  
  .rating {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  
  .rating-stars {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .person-image {
    width: 71px;
    height: 92px;
    border-radius: 4px;
  }
  
  .like-button {
    margin-left: 270px;
    margin-top:-15px;
    background: #43ef27;
    color: white;
    border-radius: 8px;
  }

  .remove-button {
    margin-left: 260px;
    margin-top:-15px;
    background: #ff0000;
    color: white;
    border-radius: 8px;
  }
  
  .like-button:hover {
    background: #45c330;
  }

  .comment-section{
    width: 80%;
  }
  </style>

  <style>
  .remove-button span,
  .like-button span {
    color: white !important;
  }
  </style>
  