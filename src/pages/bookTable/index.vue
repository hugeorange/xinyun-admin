<template>
  <div class="bg-white">
    <div class="page-title">用户信息</div>
    <div class="p-4">
      <TableForm
        :fields="[
          { name: '机台编号:', propName: 'name', type: 'text', value: '' },
          { name: '客户名称:', propName: 'name', type: 'text', value: '' },
          { name: '建立时间:', propName: 'date', type: 'date', value: [] },
        ]"
        :onReqApi="requestApi"></TableForm>
    </div>
  </div>
  <div class="page-body">
    <div class="flex items-center mb-4">
      <span class="mr-8 font-bold">数据维度</span>
      <el-radio-group v-model="dateType" @change="handleDateChange">
        <el-radio-button label="day">日</el-radio-button>
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="flex">
      <div id="room"></div>
      <div id="customer"></div>
    </div>
    <div id="book"></div>
    <div class="ml-20 mr-20 mb-20"><book-table></book-table></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import TableForm from '@/components/tableForm/index.vue'
import BookTable from './components/bookTable.vue'
import { onMounted, ref } from 'vue'
const dateType = ref('day')

onMounted(() => {
  initRoomChart()
  initCustomerChart()
  initBookChart()
})

const initRoomChart = () => {
  var roomChart = echarts.init(document.getElementById('room'))
  roomChart.setOption({
    title: {
      show: true,
      text: '机台负载趋势',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月'],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: 'line',
        areaStyle: {
          color: '#DDE7FC',
        },
      },
      {
        data: [25, 14, 23, 35, 10],
        type: 'line',
        areaStyle: {
          color: '#C6DFF1',
        },
      },
    ],
  })
}

const initCustomerChart = () => {
  var roomChart = echarts.init(document.getElementById('customer'))
  roomChart.setOption({
    title: {
      show: true,
      text: '客户预订趋势',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月'],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: 'line',
      },
      {
        data: [25, 14, 23, 35, 10],
        type: 'line',
      },
    ],
  })
}

const initBookChart = () => {
  var roomChart = echarts.init(document.getElementById('book'))
  roomChart.setOption({
    title: {
      show: true,
      text: '客户预定汇总',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 18],
        barGap: '20%',
        barCategoryGap: '40%',
      },
      {
        type: 'bar',
        data: [12, 14, 9, 9, 11],
      },
    ],
  })
}

const handleDateChange = (val: string) => {
  console.log(val)
}
// 请求表格api
const requestApi = (form: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 3000)
  })
}
</script>
<style lang="scss">
#room,
#customer {
  margin: 16px;
  width: 600px;
  height: 400px;
}
#book {
  width: 1200px;
  height: 400px;
}
</style>
