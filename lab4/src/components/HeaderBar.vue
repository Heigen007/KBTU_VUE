<template>
    <header class="header-bar">
        <button class="menu-button" @click="$emit('toggleMenu')">≡</button>
            <div class="text">
                <div style="font-size: 20px;">New trips on Fall season! Full details on our Instagram accounts.</div>
            </div>
            
            <div v-if="getIsAuthenticated()" class="profile">
            <q-btn flat round :to="`/profile/${currentUserId}`" class="profile-button">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
                       alt="Profile Icon" class="profile-icon" />
            </q-btn>
            <q-btn @click="logout" class="auth-link" label="Sign out"/>
            </div>
            <div v-else class="auth-links row q-gutter-sm">
                <q-btn flat to="/login" label="LOGIN" class="auth-link bg-green text-white q-pa-xs" />
                <q-btn flat to="/register" label="REGISTER" class="auth-link bg-green text-white q-pa-xs" />
            </div>
    </header>
</template>

<script setup lang="ts">

import { getCurrentUserId, getIsAuthenticated, logoutUser } from '@/storage/auth';

const currentUserId = getCurrentUserId();

const logout = () => {
    logoutUser();
    window.location.reload();
};

</script>

<style scoped>
.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #b8c6ca;
}

.menu-button {
    border-radius: 15px;
    background-color: black;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1.25em;
}

.profile-button {
    padding: 0;
    width: 45px;
    height: 45px;
    overflow: hidden;
    background-color: transparent;
}

.profile-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.auth-link {
    margin: 0 10px;
    color: #000;
    text-decoration: none;
    font-size: 16px;
    background-color: #797979;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: Inknut Antiqua;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    padding: 2px;
    border-radius: 10px;
}

.text {
    background-color: #ffffe5;
    font-size: 9px;
    color: rgb(238, 147, 111);
    font-family: 'Times New Roman', Times, serif;
    padding: 3px;
    border-radius: 10px;
}
</style>