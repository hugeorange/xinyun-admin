<template>
  <el-form :model="form">
    <el-row>
      <el-form-item label="机台" prop="roomId" class="mr-6 w-68">
        <el-select v-model="form.roomId">
          <el-option label="Test1 (机台1)" value="shanghai" />
          <el-option label="Test2 (机台2)" value="beijing" />
          <el-option label="Test3 (机台3)" value="深圳" />
        </el-select>
      </el-form-item>
      <el-form-item prop="date">
        <el-row>
          <el-text class="mr-2">日期</el-text>
          <el-button @click="onChangeDate(-1)">前一天</el-button>
          <el-date-picker
            class="mx-1"
            v-model="form.date"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" />
          <el-button @click="onChangeDate(0)">后一天</el-button>
        </el-row>
      </el-form-item>
      <el-form-item class="ml-6">
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          确认
        </el-button>
      </el-form-item>
      <el-form-item class="ml-4">
        <div class="flex items-center">
          <el-tag class="mx-2 w-16" color="#F29723" />我预订
          <el-tag class="mx-2 w-16" color="#DCE0E2" />已预订
          <el-tag class="mx-2 w-16" color="#fff" />未预定
        </div>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

const props = defineProps<{
  onReqApi: (args: any) => Promise<boolean>
}>()

const loading = ref(false)

const form = reactive({
  roomId: '',
  date: dayjs().format('YYYY-MM-DD'),
})

const handleSubmit = async () => {
  loading.value = true
  props.onReqApi({ ...form }).finally(() => {
    loading.value = false
  })
}
const onChangeDate = (num: number) => {
  const next = dayjs().add(num, 'days')
  form.date = next.format('YYYY-MM-DD')
}
</script>
<style scoped></style>
