<template>
  <div class="mb-16">
    <div class="mb-2 text-[#101010]">
      <span>机台编号: {{ roomItem.id }}</span>
      <span class="ml-4">机台名称: {{ roomItem.name }}</span>
    </div>
    <!-- 嘴上一层 分段时间 -->
    <div class="time">
      <div class="time-label head"></div>
      <div class="time-head" v-for="t in timeArrs">
        <span>{{ t }}</span>
      </div>
    </div>
    <!-- 中间表格主题 -->
    <div class="time" v-for="d in roomItem.dates">
      <div class="time-label">{{ d.date }}</div>
      <div
        v-for="n in timeArrs.length"
        :class="['time-item', { invisible: n === timeArrs.length }]"></div>
      <!-- 绝对定位覆盖在上方实现预订信息实现预定时间颜色效果 -->
      <div class="booked">
        <div class="time-label"></div>
        <div
          v-for="item in getBookedTimes(d.books)"
          :class="[
            'book-item',
            {
              'bg-[#DCE0E2]': item.isBooked,
              '!bg-[#F29723]': item.id === '张三',
            },
          ]"
          :style="{ width: item.width * 48 + 'px' }">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { timeArrs } from '../helper/index'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
const { roomItem } = defineProps<{ roomItem: any }>()
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

onMounted(() => {
  // const books = [
  //   { name: '张三', id: '张三', start: '08:00', end: '09:30' },
  //   { name: '张三', id: '张三2', start: '10:00', end: '10:30' },
  //   { name: '张三', id: '张三2', start: '11:00', end: '12:30' },
  //   { name: '赵六', id: '赵六', start: '12:30', end: '14:30' },
  //   { name: '王七', id: '王七', start: '15:00', end: '17:00' },
  // ]
  // const bookInfo = getBookedTimes(books)
  // console.log(bookInfo)
  // bookArrs.value = bookInfo
})

type Tbooks = {
  width: number
  name: string
  id: string
  time: string
  isBooked: boolean
}

// 根据预定信息获取每日各个时间段内的预定数据结构
const getBookedTimes = books => {
  const bookcopy = [...books]
  const arrs: Tbooks[] = []
  // 外层循环的指针
  let tIdx = 0
  while (tIdx < timeArrs.length) {
    const bookItem = bookcopy[0] || {}
    const [it, start, end] = getDayjsTime(timeArrs[tIdx], bookItem)
    let width = 1
    if (bookItem && it.isSameOrAfter(start)) {
      // j 为内层循环的指针
      for (let j = tIdx + 1; j < timeArrs.length; j++) {
        const [jt, start, end] = getDayjsTime(timeArrs[j], bookItem)
        if (jt.isBefore(end)) {
          width++
        } else {
          // 退出内层循环
          tIdx = j - 1
          bookcopy.shift()
          break
        }
      }
      const item = {
        width: width,
        name: bookItem.name,
        id: bookItem.id,
        isBooked: true,
        time: timeArrs[tIdx],
      }
      arrs.push(item)
    } else {
      const item = {
        width: 1,
        name: '',
        id: '',
        isBooked: false,
        time: timeArrs[tIdx],
      }
      arrs.push(item)
    }
    tIdx++
  }

  return arrs
}

// 转换为 dayjs 格式的时间
const getDayjsTime = (t, b) => {
  const it = dayjs(`2023-10-10 ${t}`)
  const start = dayjs(`2023-10-10 ${b.start}`)
  const end = dayjs(`2023-10-10 ${b.end}`)
  return [it, start, end]
}
</script>
<style scoped lang="scss">
.time {
  display: flex;
  position: relative;
  color: #7b8291;
  .time-head {
    width: 48px;
    height: 40px;
    font-size: 12px;
    display: flex;
    align-items: center;
    &:nth-child(odd) {
      span {
        display: none;
      }
    }
    span {
      transform: translateX(-50%);
    }
  }
  .time-label {
    flex-shrink: 0;
    width: 110px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    border-right: 1px solid #ccc;
    &.head {
      border-right: none;
    }
  }
  &:last-child .time-item {
    border-bottom: 1px solid #ccc;
  }
  .time-item {
    width: 48px;
    height: 40px;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }
}

.booked {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  .book-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #010408;
  }
}
</style>
