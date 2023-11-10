<template>
  <el-form :model="form" ref="formRef">
    <el-row>
      <el-form-item
        v-for="item in textProps"
        :label="item.name"
        :prop="item.propName"
        class="w-60 mr-4">
        <el-input v-model="form[item.propName]" />
      </el-form-item>
    </el-row>

    <el-form-item :label="dateProps?.name" prop="date">
      <el-row>
        <el-date-picker
          v-model="form[dateProps!.propName]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" />
        <div class="ml-4">
          <el-button type="primary" link @click="onChangeDate(0)"
            >今日</el-button
          >
          <el-button type="primary" link @click="onChangeDate(1)"
            >昨日</el-button
          >
          <el-button type="primary" link @click="onChangeDate(7)"
            >最近7天</el-button
          >
          <el-button type="primary" link @click="onChangeDate(30)"
            >最近30天</el-button
          >
        </div>
      </el-row>
    </el-form-item>

    <el-form-item class="mb-0 ml-20">
      <el-button type="primary" @click="onSubmit" :loading="loading">
        查询
      </el-button>
      <el-button @click="onReset(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import type { FormInstance } from 'element-plus'

type Tfield = {
  name: string
  type: 'text' | 'date'
  propName: string
  value: any
}
const props = defineProps<{
  fields: Array<Tfield>
  onReqApi: (args: any) => Promise<boolean>
}>()

// 格式化为表单 map
const fieldObj = props.fields.reduce<Record<string, any>>((acc, cur) => {
  acc[cur.propName] = cur.value
  return acc
}, {})

// 文本框数组
const textProps = ref(props.fields.filter(v => v.type === 'text'))
// 日期数组
const dateProps = ref(props.fields.find(v => v.type === 'date'))
// 表单实例
const formRef = ref<FormInstance>()
// 表单数据
const form = reactive(fieldObj)

const loading = ref(false)

const onChangeDate = (num: number) => {
  const prev = dayjs().subtract(num, 'days')
  form.date = [prev.format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
}

const onSubmit = () => {
  loading.value = true
  props.onReqApi({ ...form }).finally(() => {
    loading.value = false
  })
}

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
