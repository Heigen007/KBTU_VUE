<template>
<q-modal class="main" v-model="isEditing" persistent>
    <template v-slot:default>
      <div class="modal-content">
        <h3>Edit Profile</h3>
        <form @submit.prevent="saveProfile">
          <q-input v-model="editData.PersonName" placeholder="Name" />
          <q-input v-model="editData.Age" placeholder="Age" type="number" />
          <q-input v-model="editData.Location" placeholder="Location" />
          <q-input v-model="editData.Commentary" placeholder="Commentary" />
          <br><br>
          <q-uploader
            @added="handleAvatarUpload"
            :url="''"
            :hide-upload-btn="true"
            accept="image/*"
            label="Avatar"
            v-model="previewImage"
          />
          <q-img :src="previewImage" alt="Avatar preview" class="avatar-preview" v-if="previewImage" />
          <br><br>
          <q-btn type="submit" label="Save" color="green" />
          <q-btn type="button" label="Cancel" @click=redirect color="red" />
        </form>
      </div>
    </template>
  </q-modal>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { QBtn, QInput, QUploader, QImg } from 'quasar';
import authService from '@/storage/auth';

  const props = defineProps({
    user: Object,
  })

  const isEditing = ref(false);
const editData = ref({ ...props.user });
const previewImage = ref('');

const redirect = () => {
  isEditing.value = false;
  window.location.href = '/profile/' + editData.value.id;
};

const saveProfile = () => {
  authService.updateProfile(editData.value);
  isEditing.value = false;
  window.location.href = '/profile/' + editData.value.id;
};

const handleAvatarUpload = (file) => {
  // previewImage.value = URL.createObjectURL(file);
};
  </script>
  
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
}
.profile-container{
   display: flex;
   flex-direction: column;
   align-items: center;
   background: rgb(165, 213, 255);
   width: 100vw;
   font-family: Inknut Antiqua;
}
.profileh1{
   width: 221px;
   height: 5px;
   margin-right: -1000px; 
  color: white;
   font-size: 24px;
   font-weight: 400;
   text-align: left;


}
.fol {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
  
}

.fol button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 193px;
  height: 44px;
  top: 1427px;
  left: 254px;
  gap: 0px;
  opacity: 0px;
  font-family: Inknut Antiqua;
  font-size: 32px;
  font-weight: 400;
  line-height: 22.53px;
  text-align: center;

}

button:first-child {
  background-color:#77FC6B;

  color: #fff;
}

button:first-child:hover {
  background-color:#77FC6B;}

button:last-child {
  background-color:#77FC6B;  color: #fff;
}

button:last-child:hover {
  background-color:#77FC6B;}
.rating-stars{
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
}

.star-empty {
  color: white;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  font-family: Arial, sans-serif;
}

h3 {
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="button"]:hover {
  background-color: #e53935;
}

.filled {
  color: yellow;
}
.details h1{
  color: #294BFF;
}
.dd{
  width: 218px;
height: 41px;
top: 2289px;
left: -200px;
gap: 0px;
opacity: 40px;
background: #45D2FF;
width: 148px;
height: 41px;
top: 2289px;
left: -162px;
gap: 0px;
opacity: 0px;
color: white;
}
.ddd{
  color: #FCFF62;
}
.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px auto;
  object-fit: cover;
  border: 1px solid #ddd;
}
</style>