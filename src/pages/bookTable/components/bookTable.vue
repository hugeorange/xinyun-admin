<template>
  <div class="mb-4">
    <span class="font-bold">预订明细</span>
  </div>
  <el-table
    ref="multipleTableRef"
    :stripe="true"
    :border="true"
    :data="tableData"
    style="width: 100%">
    <el-table-column property="name" label="序号" />
    <el-table-column property="name" label="预订编号" />
    <el-table-column property="name" label="预订说明" />
    <el-table-column property="name" label="客户名称" />
    <el-table-column property="date" label="预订机台" />
    <el-table-column property="date" label="预订明细" />
  </el-table>
  <el-pagination
    class="mt-5 flex justify-end"
    v-model:current-page="currentNo"
    :page-size="10"
    :background="true"
    layout="total, prev, pager, next"
    :total="tableData.length"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>
<script setup lang="ts">
import TableForm from '@/components/tableForm/index.vue'
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { tableData } from '@/pages/user/helper/index'

const currentNo = ref(1)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
