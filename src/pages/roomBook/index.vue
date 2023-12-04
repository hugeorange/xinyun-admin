<template>
  <div class="bg-white">
    <div class="page-title">机台预订</div>
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
  <div class="page-body">
    <div class="flex justify-between mb-4">
      <span class="mr-auto font-bold">预订列表</span>
      <create-book><el-button type="primary">新建</el-button></create-book>
      <el-button @click="handleBatchOpt">批量操作</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      v-loading="loading"
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
            <el-button type="primary" link @click="handleDetail(scope.$index, scope.row)">
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
import { onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import { getBookListApi } from '@/apis/book'

const loading = ref(false)
const currentNo = ref(1)
const total = ref(0)
const tableData = ref([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref([])

onMounted(() => {
  getBookList({})
})

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
  console.log(form)
  return new Promise((resolve, reject) => {
    getBookList(
      {
        star_time: form.date[0],
        end_time: form.date[1],
      },
      resolve,
    )
  })
}

const getBookList = (data, resolve?: (value: boolean | PromiseLike<boolean>) => void) => {
  loading.value = true
  getBookListApi({
    page_index: 1,
    page_size: 10,
    ...data,
  })
    .then(res => {
      console.log(res)
      tableData.value = res.data
      resolve && resolve(true)
    })
    .catch(err => {
      console.log(err.msg)
      resolve && resolve(false)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
