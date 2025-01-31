<script setup lang="ts">

export interface Item  {
  rating: number,
  numberOfViews: number,
  id: string
}

const props = defineProps<{ item: Item; currentLanguage: 'en' | 'ua' ;toggleModal: VoidFunction}>();

const title = () => props.currentLanguage === 'en' ? 'Customer Reviews on' : 'Відгуки наших клієнтів у'
const viewName = () => props.currentLanguage === 'en' ? 'views' : 'відгуків';
const watchButton = () => props.currentLanguage === 'en' ? 'watch' : 'Переглянути';
const writeButton = () => props.currentLanguage === 'en' ? 'write' : 'написати';
</script>


<template>
  <div class="googleTemplate">
    <div class="googleTemplate__left">
      <div class="googleTemplate__main">
        <img src="/public/assets/google.svg" alt="" class="googleTemplate__img">
        <h2 class="googleTemplate__title">{{title()}} Google</h2>
      </div>
      <div class="googleTemplate__info">
        <div class="googleTemplate__star-block">
          <div class="googleTemplate__rating">{{ item.rating }}</div>
          <div class="googleTemplate__stars">
            <img src="/public/assets/Star.svg" alt="">
            <img src="/public/assets/Star.svg" alt="">
            <img src="/public/assets/Star.svg" alt="">
            <img src="/public/assets/Star.svg" alt="">
            <img src="/public/assets/Star.svg" alt="">
          </div>
        </div>
        <div class="googleTemplate__numbers-of-views">
          {{item.numberOfViews}} {{ viewName() }}
        </div>
      </div>
    </div>
    <div class="googleTemplate__controls">
      <a href="https://www.google.com/" class=" googleTemplate__button googleTemplate__button--look">{{writeButton()}}</a>
      <button class="googleTemplate__button googleTemplate__button--write" @click="toggleModal">{{watchButton()}} </button> 
    </div>
  </div>
</template>

<style scoped>
@import './GoogleComponentStyle.scss';
</style>
