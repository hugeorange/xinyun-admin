<template>
  <div class="bg-white">
    <div class="page-title p-4">机台预订</div>
    <div class="p-4">
      <TableForm
        :fields="[
          { name: '预订编号:', propName: 'name', type: 'text', value: '' },
          { name: '预订说明:', propName: 'name2', type: 'text', value: '' },
          { name: '预订时间:', propName: 'date', type: 'date', value: [] },
        ]"
        :onReqApi="requestApi"></TableForm>
    </div>
  </div>
  <div class="mt-4 p-4 bg-white">
    <div class="flex justify-between mb-4">
      <span class="mr-auto font-bold">预订列表</span>
      <create-book><el-button type="primary">新建</el-button></create-book>
      <el-button @click="handleBatchOpt">批量操作</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :stripe="true"
      :border="true"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column
        property="name"
        label="预订编号"
        label-class-name="text-table"
        class-name="text-primary"
        width="120" />
      <el-table-column property="name" label="预订说明" width="120" />
      <el-table-column
        property="name"
        label="预订状态"
        label-class-name="text-table"
        class-name="text-primary"
        width="120" />
      <el-table-column property="date" label="建立时间" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <book-detail :row="scope.row">
            <el-button
              type="primary"
              link
              @click="handleDetail(scope.$index, scope.row)">
              预订详情
            </el-button>
          </book-detail>
          <el-popconfirm
            width="220"
            title="确定要取消预订?"
            @confirm="handleCancel(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" link>取消预订 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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
  </div>
</template>
<script setup lang="ts">
import TableForm from '@/components/tableForm/index.vue'
import BookDetail from './components/detail.vue'
import CreateBook from './components/createBook.vue'
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { tableData } from './helper/index'

const currentNo = ref(1)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref([])

// 批量操作
const handleBatchOpt = () => {
  console.log(multipleSelection.value)
}

const handleSelectionChange = val => {
  multipleSelection.value = val
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const handleDetail = (index, row) => {
  console.log(index, row)
}

const handleCancel = (index, row) => {
  console.log(index, row)
}

// 请求表格api
const requestApi = (form: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 3000)
  })
}
</script>
