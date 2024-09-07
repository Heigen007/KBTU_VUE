<template>
    <header class="header">
      <div class="logo">Mini Blog</div>
      <nav>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Politics</a></li>
          <li><a href="#">Tech</a></li>
          <li><a href="#">Entertainment</a></li>
          <li><a href="#">Travel</a></li>
          <li><a href="#">Sports</a></li>
        </ul>
      </nav>
    </header>
</template>
  
<script setup lang="ts"></script>
  
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: white;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: black;
}

.nav-links a:hover {
    color: gray;
}
</style>