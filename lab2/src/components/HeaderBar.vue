<template>
    <header class="header-bar">
        <button class="menu-button" @click="$emit('toggleMenu')">Menu</button>
    </header>
</template>
  
<style scoped>
.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    height: 20px;
    background-color: #b8c6ca;
}

.menu-button {
    background-color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>