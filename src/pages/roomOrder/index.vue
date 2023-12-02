<template>
  <div class="bg-white">
    <div class="page-title">机台工单</div>
    <div class="p-4">
      <TableForm
        :fields="[
          { name: '工单编号:', propName: 'name', type: 'text', value: '' },
          { name: '预订编号:', propName: 'no', type: 'text', value: '' },
          { name: '预订说明:', propName: 'desc', type: 'text', value: '' },
          { name: '预订时间:', propName: 'date', type: 'date', value: '' },
        ]"
        :onReqApi="requestApi"></TableForm>
    </div>
  </div>
  <div class="page-body">
    <div class="flex justify-between mb-4">
      <span class="mr-auto font-bold">工单列表</span>
    </div>
    <el-table
      ref="multipleTableRef"
      :stripe="true"
      :border="true"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        property="name"
        label="工单编号"
        label-class-name="text-table"
        class-name="text-primary"
        width="120" />
      <el-table-column property="name" label="预订编号" width="120" />
      <el-table-column property="name" label="预订说明" width="120" />
      <el-table-column property="name" label="工单状态" width="120" />
      <el-table-column property="date" label="建立时间" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <user-detail :row="scope.row">
            <el-button
              type="primary"
              link
              @click="handleDetail(scope.$index, scope.row)">
              工单详情
            </el-button>
          </user-detail>
          <el-button type="primary" link>开始工作</el-button>
          <el-button type="primary" link>暂离</el-button>
          <el-button type="primary" link>重启</el-button>
          <el-popconfirm
            width="220"
            title="确定要结束工作吗?"
            @confirm="handleCancel(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" link>结束工作</el-button>
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
import UserDetail from './components/detail.vue'
import BatchOpt from '@/components/batchOpt/index.vue'
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { tableData } from './helper/index'

const currentNo = ref(1)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref([])

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
