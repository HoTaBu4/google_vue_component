<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { client } from './api/client';
import GoogleComponent, { type Item } from './components/GoogleComponent/GoogleComponent.vue';
import ModalComponent from './components/ModalComponent/ModalComponent.vue';

const data = reactive<Item[] >([]);
const openModal = ref(false);
const isLoading = ref(false); 
const currentLanguage = ref<'en' | 'ua'>('en'); 

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'ua' : 'en';
};

const toggleModal = () => {
  openModal.value = !openModal.value;
};

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await client.get('/rating');
    Object.assign(data, response); 
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false; 
  }
});
</script>


<template>
  <main class="main">
    <div class="main__info-block">
      <ModalComponent :isOpen="openModal" :toggleModal="toggleModal">
        <p>Modal content goes here</p>
      </ModalComponent>
      <div class="main__language-toggle">
        <button @click="toggleLanguage" class="main__language-toggle-button">
          {{ currentLanguage === 'en' ? 'Switch to Ukrainian' : 'Переключити на англійську' }}
        </button>
      </div>
      <div v-if="isLoading" class="main__loading"> ..loading</div>
      <GoogleComponent
        v-for="item in data" 
        :key="item.id"
        :item="item"
        :currentLanguage="currentLanguage"
        :toggleModal="toggleModal"
        class="main__google-component"
      />
    </div>
  </main>
</template>


<style scoped scss>
.main {
  padding: 0 20px;
}
.main__info-block {
  display: flex;
  flex-direction: column;
  & > :nth-child(n) {
    justify-self: center;
  }
}


.main__language-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.main__language-toggle-button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #36a8a0;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.main__language-toggle-button:hover {
  background-color: #2b8b7d;
}

.main__loading {
  font-size: 18px;
  text-align: center;
}

.main__google-component {
  margin-top: 20px;
}
</style>
