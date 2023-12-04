<template>
  <div class="bg-white">
    <div class="page-title">机台信息</div>
    <div class="p-4">
      <TableForm
        :fields="[
          { name: '机台编号:', propName: 'id', type: 'text', value: '' },
          { name: '机台名称:', propName: 'date', type: 'date', value: [] },
        ]"
        :onReqApi="requestApi"></TableForm>
    </div>
  </div>
  <div class="page-body">
    <div class="flex justify-between mb-4">
      <span class="mr-auto font-bold">机台列表</span>
      <el-button type="primary">导入机台</el-button>
      <user-detail :on-success="() => getRoomList({})">
        <el-button type="primary">新建</el-button>
      </user-detail>
      <BatchOpt :list="[{ name: '删除', onClick: handleBatchOpt }]" />
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
        property="id"
        label="机台编号"
        label-class-name="text-table"
        class-name="text-primary"
        width="120" />
      <el-table-column property="name" label="机台名称" width="120" />
      <el-table-column property="status" label="机台状态" width="120" />
      <el-table-column property="create_dt" label="建立时间" width="170" />
      <el-table-column label="操作">
        <template #default="scope">
          <user-detail :row="scope.row" :on-success="() => getRoomList({})">
            <el-button type="primary" link> 机台详情 </el-button>
          </user-detail>
          <el-popconfirm
            width="220"
            title="确定要删除?"
            @confirm="handleDel(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" link>删除 </el-button>
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
      :total="total"
      @current-change="handleCurrentChange" />
  </div>
</template>
<script setup lang="ts">
import TableForm from '@/components/tableForm/index.vue'
import UserDetail from './components/detail.vue'
import BatchOpt from '@/components/batchOpt/index.vue'
import { onMounted, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { deleteMachineApi, getMachineListApi } from '@/apis/machine'

const loading = ref(false)
const currentNo = ref(1)
const total = ref(0)
const tableData = ref([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<any>([])

onMounted(() => {
  getRoomList({})
})

// 批量操作
const handleBatchOpt = () => {
  console.log(multipleSelection.value)
  const ids = multipleSelection.value.map(item => item.id)
  if (ids.length === 0) {
    ElMessage.error('请选择要操作的数据')
    return
  }
}

const handleSelectionChange = val => {
  multipleSelection.value = val
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  getRoomList({ page_index: val })
}

const handleDel = (index, row) => {
  loading.value = false
  deleteMachineApi({ machine_id: row.id })
    .then(() => {
      ElMessage.success('删除成功')
      getRoomList({})
    })
    .catch(err => ElMessage.error(err.msg))
}

// 请求表格api
const requestApi = (form: any): Promise<boolean> => {
  console.log(form)
  return new Promise((resolve, reject) => {
    getRoomList(
      {
        id: form.id,
        star_time: form.date[0],
        end_time: form.date[1],
      },
      resolve,
    )
  })
}

const getRoomList = (data, resolve?: (value: boolean | PromiseLike<boolean>) => void) => {
  loading.value = true
  getMachineListApi({
    page_index: 1,
    page_size: 10,
    ...data,
  })
    .then(res => {
      tableData.value = res.data.data ?? []
      total.value = res.data.total_pages ?? 0
      resolve && resolve(true)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      resolve && resolve(false)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
