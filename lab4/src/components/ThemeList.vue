<template>
    <div class="list-container">
      <div class="header">
        <div class="left-section">
          <div class="date">{{ formattedCurrentDate }}</div>
          <div class="topic">{{ selectedTopic }}</div>
        </div>
        
        <div class="right-section">
          <div class="filter">
            <span class="filter-icon">⚲</span>
            <select v-model="selectedSort" class="sort-dropdown">
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div class="pagination-indicator">
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button class="prev-page-btn" @click="prevPage" :disabled="currentPage === 1">←</button>
            <button class="next-page-btn" @click="nextPage" :disabled="currentPage === totalPages">→</button>
          </div>
        </div>
      </div>
  
      <div class="cards">
        <Card
            v-for="person in paginatedPersons"
            :key="person.id"
            :person="person"
            @like="likePerson(person.id)"
        />

      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Card from './Card.vue';
import authService from '@/storage/auth';

const props = defineProps<{ selectedTopic: string }>();

interface Person {
    id: number;
    PersonName: string;
    Avatar: string;
    PubDate: string;
    Rating: number;
    Commentary: string;
    Topic: string;
}

const persons = ref(authService.people);

const selectedSort = ref('rating');
const currentPage = ref(1);
const itemsPerPage = 3;

const sortPersons = (personsArray: Person[]) => {
    return personsArray.sort((a, b) => {
        if (selectedSort.value === 'rating') {
            return b.Rating - a.Rating || a.id - b.id;
        } else {
            return new Date(b.PubDate).getTime() - new Date(a.PubDate).getTime();
        }
    });
};

function likePerson(id: number) {
    authService.increaseHumanRating(id);
    persons.value = authService.people;
}

const filteredPersons = computed(() => {
    let personsV = persons.value;
    let finalCommentsArray = [] as any;
    personsV.forEach((person) => {
        if(person.comments) person.comments.forEach((comment) => {
            if (comment.Topic === props.selectedTopic) {
                finalCommentsArray.push({
                    id: person.id,
                    PersonName: person.PersonName,
                    Avatar: person.Avatar,
                    Rating: person.Rating,
                    Commentary: comment.Commentary,
                    Topic: comment.Topic,
                    Password: person.Password,
                    Email: person.Email,
                    Age: person.Age,
                    comments: person.comments,
                    Location: person.Location,
                    favorites: person.favorites,
                })
            }
        });
    });

    return finalCommentsArray;
});

const sortedPersons = computed(() => sortPersons([...filteredPersons.value]));

const totalPages = computed(() => Math.ceil(sortedPersons.value.length / itemsPerPage));

const paginatedPersons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedPersons.value.slice(start, end);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

watch(() => props.selectedTopic, () => {
    currentPage.value = 1;
});

const formattedCurrentDate = computed(() => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
});
</script>
  
  
  <style scoped>
.list-container {
    width: 80%;
    margin: 20px auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left-section {
    display: flex;
    align-items: center;
}

.date {
    font-size: 1.2em;
    font-weight: bold;
    color: #ffffff;
    background-color: rgba(0, 150, 255, 0.3);
    padding: 5px 10px;
    border-radius: 10px;
    margin-right: 15px;
}

.topic {
    background-color: #63c6d9;
    color: #ffffff;
    padding: 5px 15px;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 10px;
}

.right-section {
    display: flex;
    align-items: center;
}

.filter {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.filter-icon {
    font-size: 1.2em;
    margin-right: 5px;
}

.sort-dropdown {
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.pagination-indicator {
    display: flex;
    align-items: center;
}

.prev-page-btn,
.next-page-btn {
    background-color: transparent;
    border: none;
    font-size: 5em;
    color: #5bb9cd;
    cursor: pointer;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
</style>
  