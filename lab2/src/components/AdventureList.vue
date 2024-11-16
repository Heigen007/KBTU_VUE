<template>
    <div class="list-container">
      <!-- Header section: date, topic, sort filter, and pagination -->
      <div class="header">
        <div class="left-section">
          <p class="date">{{ formattedCurrentDate }}</p>
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
  
      <!-- Cards section -->
      <div class="cards">
        <Card
          v-for="person in paginatedPersons"
          :key="person.id"
          :personName="person.PersonName"
          :avatar="person.Avatar"
          :pubDate="person.PubDate"
          :rating="person.Rating"
          :commentary="person.Commentary"
          @like="likePerson(person.id)"
        />
      </div>
  
      <!-- Bottom pagination -->
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Card from './Card.vue';

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
const photoURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=='
const persons = ref<Person[]>([
    { id: 1, PersonName: 'Mark Twen', Avatar: photoURL, PubDate: '2024-09-13T12:00:00', Rating: 4.8, Commentary: 'This is an awesome adventure! Thanks!', Topic: 'Adventure' },
    { id: 2, PersonName: 'Sally Robinson', Avatar: photoURL, PubDate: '2024-09-12T18:30:00', Rating: 5, Commentary: 'Drive and emotions only.', Topic: 'Adventure' },
    { id: 3, PersonName: 'Katherine Johns', Avatar: photoURL, PubDate: '2024-09-08T12:15:00', Rating: 3, Commentary: 'I lost the exit, but the place is amazing.', Topic: 'Adventure' },
    { id: 4, PersonName: 'Stevie', Avatar: photoURL, PubDate: '2024-09-11T09:05:00', Rating: 2, Commentary: 'Something to be upgraded.', Topic: 'Adventure' },
    { id: 5, PersonName: 'John Doe', Avatar: photoURL, PubDate: '2024-09-10T15:20:00', Rating: 4, Commentary: 'Great experience, I recommend it.', Topic: 'Nature' },
    { id: 6, PersonName: 'Jane Smith', Avatar: photoURL, PubDate: '2024-09-09T11:45:00', Rating: 5, Commentary: 'Beautiful scenery, a must-see!', Topic: 'Nature' },
    { id: 7, PersonName: 'Chris Johnson', Avatar: photoURL, PubDate: '2024-09-07T14:00:00', Rating: 3, Commentary: 'Good, but a little crowded.', Topic: 'Nature' },
    { id: 8, PersonName: 'Emily Davis', Avatar: photoURL, PubDate: '2024-09-06T13:30:00', Rating: 2, Commentary: 'Not what I expected.', Topic: 'Fashion' },
    { id: 9, PersonName: 'Michael Brown', Avatar: photoURL, PubDate: '2024-09-04T17:00:00', Rating: 4, Commentary: 'Interesting and stylish.', Topic: 'Fashion' },
    { id: 10, PersonName: 'Olivia Wilson', Avatar: photoURL, PubDate: '2024-09-02T10:30:00', Rating: 5, Commentary: 'Absolutely loved the fashion tips!', Topic: 'Fashion' },
    { id: 11, PersonName: 'Sophia Martinez', Avatar: photoURL, PubDate: '2024-09-01T09:00:00', Rating: 3, Commentary: 'Trendy but expensive.', Topic: 'Fashion' },
    { id: 12, PersonName: 'Ava Hernandez', Avatar: photoURL, PubDate: '2024-08-30T16:00:00', Rating: 2, Commentary: 'Not my style.', Topic: 'Fashion' },
    { id: 13, PersonName: 'Lucas Lee', Avatar: photoURL, PubDate: '2024-08-28T15:45:00', Rating: 4, Commentary: 'Great balance between modern and classic.', Topic: 'Modern' },
    { id: 14, PersonName: 'Mia Clark', Avatar: photoURL, PubDate: '2024-08-26T14:20:00', Rating: 5, Commentary: 'Modern living at its finest!', Topic: 'Modern' },
    { id: 15, PersonName: 'Benjamin Harris', Avatar: photoURL, PubDate: '2024-08-25T11:00:00', Rating: 3, Commentary: 'Good, but missing some key features.', Topic: 'Modern' },
    { id: 16, PersonName: 'Amelia White', Avatar: photoURL, PubDate: '2024-08-23T09:45:00', Rating: 2, Commentary: 'Too minimalist for my taste.', Topic: 'Modern' },
    { id: 17, PersonName: 'Isabella Young', Avatar: photoURL, PubDate: '2024-08-21T16:30:00', Rating: 4, Commentary: 'Loved the clean and modern design.', Topic: 'Modern' },
    { id: 18, PersonName: 'William Scott', Avatar: photoURL, PubDate: '2024-08-19T18:15:00', Rating: 5, Commentary: 'Perfect for modern living.', Topic: 'Modern' },
    { id: 19, PersonName: 'James King', Avatar: photoURL, PubDate: '2024-08-17T14:40:00', Rating: 3, Commentary: 'Good, but needs more space.', Topic: 'Modern' },
    { id: 20, PersonName: 'Henry Adams', Avatar: photoURL, PubDate: '2024-08-15T12:00:00', Rating: 2, Commentary: 'Too cramped.', Topic: 'Modern' }
]);

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
    const person = persons.value.find(person => person.id === id);
    if (!person) return;
    if(person.Rating === 5) return
    // округли
    person.Rating = Number((person.Rating+0.1).toFixed(1));
}

const filteredPersons = computed(() => persons.value.filter(person => person.Topic === props.selectedTopic));

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

.prev-page-btn, .next-page-btn {
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    color: #63c6d9;
    cursor: pointer;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Adjust to 2 or 3 cards per row */
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
    background-color: #00ff91;
    cursor: pointer;
    border-radius: 5px;
}
</style>
  