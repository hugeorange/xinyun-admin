<template>
  <el-button text @click="dialogFormVisible = true">
    <slot></slot>
  </el-button>

  <el-dialog
    v-model="dialogFormVisible"
    :append-to-body="true"
    :destroy-on-close="true"
    title="预订详情"
  >
    <el-descriptions title="" :column="2">
      <el-descriptions-item label="预订编号">test123</el-descriptions-item>
      <el-descriptions-item label="建立时间">2023-12-25</el-descriptions-item>
      <el-descriptions-item label="预订说明">哈哈哈</el-descriptions-item>
      <el-descriptions-item label="预订状态">
        <el-tag size="small">审批中</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="工单编号">10086</el-descriptions-item>
      <el-descriptions-item label="预约客户">哈哈哈</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const props = defineProps<{ row: any }>();
console.log("props-->", props);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
</script>
<style scoped></style>
