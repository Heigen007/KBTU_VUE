<template>
    <Header />
    <PostGrid />
  </template>
  
  <script setup lang="ts">
  import Header from './components/Header.vue';
  import PostGrid from './components/PostGrid.vue';
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }
  </style>