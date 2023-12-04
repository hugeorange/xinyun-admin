<template>
  <div class="bg-white">
    <div class="page-title">用户信息</div>
    <div class="p-4">
      <TableForm
        :fields="[
          { name: '用户名称:', propName: 'username', type: 'text', value: '' },
          { name: '建立时间:', propName: 'date', type: 'date', value: [] },
        ]"
        :onReqApi="requestApi"></TableForm>
    </div>
  </div>
  <div class="page-body">
    <div class="flex justify-between mb-4">
      <span class="mr-auto font-bold">用户列表</span>
      <el-button type="primary">导入客户</el-button>
      <user-detail><el-button type="primary">新建</el-button></user-detail>
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
        property="username"
        label="用户名称"
        label-class-name="text-table"
        class-name="text-primary"
        width="120" />
      <el-table-column
        property="is_lock"
        label="状态"
        width="120"
        :formatter="row => (row.is_lock ? '正常' : '锁定')" />
      <el-table-column property="username" label="用户账号" width="120" />
      <el-table-column property="contact_user" label="联系人" width="120" />
      <el-table-column property="contact_type" label="联系电话" width="120" />
      <el-table-column property="create_dt" label="建立时间" width="170" />
      <el-table-column label="操作">
        <template #default="scope">
          <user-detail :row="scope.row" :on-success="() => getUserList({})">
            <el-button type="primary" link @click="handleDetail(scope.$index, scope.row)">
              客户详情
            </el-button>
          </user-detail>
          <el-popconfirm
            width="220"
            title="确定要删除?"
            @confirm="handleDel(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" link>删除 </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            width="220"
            title="确定要重置密码吗?"
            @confirm="handleReset(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" link>重置密码</el-button>
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
      @current-change="handleCurrentChange" />
  </div>
</template>
<script setup lang="ts">
import TableForm from '@/components/tableForm/index.vue'
import UserDetail from './components/detail.vue'
import BatchOpt from '@/components/batchOpt/index.vue'
import { onMounted, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { resetApi, userListApi } from '@/apis/user'

onMounted(() => {
  getUserList({})
})

const currentNo = ref(1)
const tableData = ref([])
const loading = ref(false)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<any>([])

// 批量操作
const handleBatchOpt = () => {
  const ids = multipleSelection.value.map(item => item.id)
  if (ids.length === 0) {
    ElMessage.error('请选择要操作的数据')
    return
  }
  // ElMessage.success('批量删除->', ids)
  console.log(ids)
}

const handleSelectionChange = val => {
  multipleSelection.value = val
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const handleDetail = (index, row) => {
  console.log(index, row)
}

const handleDel = (index, row) => {
  ElMessage.error('删除 api 未实现')
  console.log(index, row)
}

const handleReset = (index, row) => {
  ElMessage.error('update 时去实现')
}

// 请求表格api
const requestApi = (form: any): Promise<boolean> => {
  console.log(form)
  return new Promise((resolve, reject) => {
    getUserList(
      {
        username: form.username,
        star_time: form.date[0],
        end_time: form.date[1],
      },
      resolve,
    )
  })
}

const getUserList = (data, resolve?: (value: boolean | PromiseLike<boolean>) => void) => {
  loading.value = true
  userListApi({
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
