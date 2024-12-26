<template>
  <q-layout>
  <q-page-container class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
        <input v-model="email" type="email" class="input" placeholder="Email" required />
        <input v-model="password" type="password" class="input" placeholder="Password" required />
        <button type="submit" class="input">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </q-page-container>
  </q-layout>
</template>
 
 <script setup lang="ts">
 import { QBtn } from 'quasar';
 import { ref } from 'vue'
 import { useRouter } from 'vue-router'
 import { loginUser } from '@/storage/auth'
 
 const email = ref('')
 const password = ref('')
 const errorMessage = ref('')
 
 const router = useRouter();

  const login = async () => {
    try {
      await loginUser(email.value, password.value);
      router.push('/');
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Login failed. Please try again.';
    }
  };
</script>
 
 
<style scoped>
.login-container {
  position: absolute;
  inset: 190px;
  margin: 0 auto;
  max-width: 400px;
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
  align-items: center;
  gap: 15px;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 90%;
}

.input:hover {
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
  background-color:#77FC6B;
}

.error {
  color: #ff4d4f;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
