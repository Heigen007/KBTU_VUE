<template>
    <div class="chat-container">
      <!-- Chat messages -->
      <q-scroll-area class="chat-box">
        <div v-for="(message, index) in messages" :key="index" :class="['chat-message', message.isUser ? 'user-message' : 'opponent-message']">
          <q-avatar v-if="!message.isUser" size="50px" class="q-mr-sm">
            <img :src="currentUser.Avatar" alt="Opponent Avatar" />
          </q-avatar>
          <div class="message-content">
            <q-item-label class="message-author">{{ message.isUser ? 'You' : currentUser.PersonName }}</q-item-label>
            <p class="message-text">{{ message.text }}</p>
            <q-item-label caption class="message-status">For now</q-item-label>
          </div>
          <q-avatar v-if="message.isUser" size="50px" class="q-ml-sm">
            <img :src="systemUser.Avatar" alt="User Avatar" style="height: auto" />
          </q-avatar>
        </div>
      </q-scroll-area>
  
      <!-- Message input -->
      <div class="input-container">
        <q-input v-model="newMessage" placeholder="Type a message..." dense outlined class="input-field" />
        <q-btn label="Send" @click="sendMessage" color="primary" class="send-button" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { QInput, QBtn, QAvatar, QScrollArea, QItemLabel } from 'quasar';
  import {useRoute} from 'vue-router';
  import { getByUserId, getCurrentUser } from '@/storage/auth';
  
  const messages = ref([]); // Chat history
  const newMessage = ref(''); // Current message input
  const route = useRoute();
  const currentUser = ref(getByUserId(route.params.userId));
  const systemUser = ref(getCurrentUser());

  // Send message function
  const sendMessage = () => {
    if (newMessage.value.trim() === '') return;
  
    // Add user message to chat
    messages.value.push({
      text: newMessage.value,
      isUser: true,
    });

    // Clear input field
    newMessage.value = '';
  
    // Generate opponent's reply
    setTimeout(() => {
      generateOpponentReply();
    }, 1000); // Delay to simulate typing
  };
  
  // Generate opponent's reply with a stubbed response
  const generateOpponentReply = () => {
    const stubReplies = [
      "Hey! Thanks for following me!",
      "Will you follow my friend Rick?",
      "He's not online, but he's on my friends list!",
    ];
    const randomReply = stubReplies[Math.floor(Math.random() * stubReplies.length)];
  
    messages.value.push({
      text: randomReply,
      isUser: false,
    });
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 88.7vh;
    background-color: aliceblue;
  }
  
  .chat-box {
    flex: 1;
    padding: 10px;
  }
  
  .chat-message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .opponent-message {
    justify-content: flex-start;
  }
  
  .user-message {
    justify-content: flex-end;
    text-align: right;
  }
  
  .message-content {
    max-width: 60%;
    padding: 10px;
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .opponent-message .message-content {
    background: #FFFFFF;
    margin-left: 10px;
  }
  
  .user-message .message-content {
    background: #e0f7fa;
    margin-right: 10px;
  }
  
  .message-author {
    font-weight: bold;
    font-size: 14px;
    margin: 0;
  }
  
  .user-message .message-author {
    color: #0000FF;
  }
  
  .message-text {
    font-size: 16px;
    color: #333;
    margin: 5px 0;
  }
  
  .message-status {
    font-size: 12px;
    color: #4caf50;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: #fff;
  }
  
  .input-field {
    flex: 1;
    margin-right: 10px;
  }
  
  .send-button {
    flex-shrink: 0;
  }
  </style>
  