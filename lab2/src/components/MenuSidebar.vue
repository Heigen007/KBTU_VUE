<template>
    <div class="menu-sidebar">
      <h2>Menu</h2>
      <ul>
        <li v-for="topic in topics" :key="topic" @click="$emit('selectTopic', topic)">
          {{ topic }} Blog
        </li>
      </ul>
      <div class="contacts">
        <h3>Contacts</h3>
        <p>Phone: +1(234)-23-45-22</p>
        <p>Address: Green St., Yalow Park</p>
        <p>Email: Yalow@park.info</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const topics = ['Adventure', 'Nature', 'Fashion', 'Modern'];
  </script>
  
  <style scoped>
  .menu-sidebar {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-right: 2px solid #ccc;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 10px 0;
    cursor: pointer;
    background-color: #00ff91;
    margin: 10px 0;
    text-align: center;
    border-radius: 5px;
  }
  
  .contacts {
    background-color: #eaf6ff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
  }
  </style>
  