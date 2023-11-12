<template>
  <div class="bg-white">
    <div class="page-title">机台预览</div>
    <div class="p-4">
      <preview-form :onReqApi="requestApi"></preview-form>
    </div>
  </div>
  <div class="page-body">
    <book-info v-for="item in room_book_info" :roomItem="item" />
  </div>
</template>
<script setup lang="ts">
import PreviewForm from './components/form.vue'
import BookInfo from './components/bookInfo.vue'
import { room_book_info } from './helper/index'
// 请求表格api
const requestApi = (form: any): Promise<boolean> => {
  console.log('form-->', form)
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 3000)
  })
}
</script>
<style scoped lang="scss"></style>
