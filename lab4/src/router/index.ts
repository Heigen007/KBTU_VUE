import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authGuard } from '../misc/authGuard';
import MainLayout from '../components/Main.vue';
import UserProfile from '../components/UserProfile.vue';
import RegisterPage from '../components/RegisterPage.vue';
import LoginPopup from '../components/LoginPopup.vue';
import Favorites from '@/components/Favorites.vue';
import EditProfileForm from '@/components/EditProfileForm.vue';
import Friends from '@/components/Friends.vue';
import Statistic from '@/components/Statistic.vue';
import Chat from '@/components/Chat.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
    ]
  },
  { path: '/profile/:userId', component: UserProfile },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPopup },
  { path: '/profile/:userId/edit', component: EditProfileForm, beforeEnter: authGuard },
  { path: '/favorites', component: Favorites, beforeEnter: authGuard },
  { path: '/friends/:userId', component: Friends, beforeEnter: authGuard },
  { path: '/statistics/:userId', component: Statistic, beforeEnter: authGuard },
  { path: '/chat/:userId', component: Chat, beforeEnter: authGuard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
