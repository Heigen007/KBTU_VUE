<template>
  <q-layout>
  <q-page-container class="registration-container">
    <form @submit.prevent="register">
      <q-input class="custom-input" v-model="personName" placeholder="Name" type="text" required />
<q-input class="custom-input" v-model="email" placeholder="Email" type="email" required />
<q-input class="custom-input" v-model="age" placeholder="Age" type="number" required />
<q-input class="custom-input" v-model="location" placeholder="Location" type="text" required />
<q-input class="custom-input" v-model="password" placeholder="Password" type="password" required />
<q-btn label="Register" type="submit" />
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/storage/auth';

const personName = ref('')
const email = ref('')
const password = ref('')
const age = ref(null)
const location = ref('')
const errorMessage = ref('')
const favorites = ref([])

const router = useRouter()

const register = async () => {
  try {
    await registerUser(personName.value, email.value, password.value, age.value, location.value, favorites.value);
    router.push('/')
  } catch (error) {
  }
}
</script>

<style scoped>
 .registration-container {
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   background-color: #fff;
 }
 
 h2 {
   text-align: center;
   margin-bottom: 20px;
   font-size: 24px;
   color: #333;
   font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-align: center;
 }
 
 form {
   display: flex;
   flex-direction: column;
   gap: 15px;
 }
 
 .custom-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 90%;
}

.custom-input:hover {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 4px rgba(59, 130, 246, 0.2);
}
 
 button[type="submit"] {
   padding: 10px;
   border: none;
   border-radius: 5px;
   background-color:#77FC6B;
   color: #fff;
   font-size: 16px;
   cursor: pointer;
   transition: background-color 0.3s ease;
   font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-align: center;
 }
 
 button[type="submit"]:hover {
  background-color:#479640; }
 
 .error {
   color: #ff4d4f;
   font-size: 14px;
   text-align: center;
   margin-top: 10px;
 }
 </style>
 
 