<template>
  <el-button text @click="dialogFormVisible = true">
    <slot></slot>
  </el-button>

  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    v-model="dialogFormVisible"
    title="选择预约机台"
  >
    <el-form :model="form">
      <el-form-item label="选择机台" label-width="140px">
        <el-select v-model="form.room" placeholder="请选择一个机台">
          <el-option label="Test1 (机台1)" value="shanghai" />
          <el-option label="Test2 (机台2)" value="beijing" />
          <el-option label="Test3 (机台3)" value="深圳" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期" label-width="140px">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item v-if="!!form.date" label="可选时间" label-width="140px">
        <el-radio-group v-model="form.time">
          <el-row :gutter="20" class="w-96">
            <el-col :span="12" v-for="item in timeArrs">
              <el-radio
                :label="item.value"
                :disabled="item.disabled"
                :border="true"
              >
                {{ item.text }}
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const dialogFormVisible = ref(false);
const timeArrs = ref([
  { text: "0:00-0:30", value: 1, disabled: true },
  { text: "0:30-1:00", value: 2, disabled: true },
  { text: "1:00-1:30", value: 3, disabled: true },
  { text: "1:30-2:00", value: 4, disabled: true },
  { text: "2:00-2:30", value: 5, disabled: true },
  { text: "2:30-3:00", value: 6, disabled: true },
  { text: "0:00-0:30", value: 7, disabled: true },
  { text: "0:00-0:30", value: 8, disabled: true },
  { text: "0:00-0:30", value: 9, disabled: true },
  { text: "0:00-0:30", value: 10, disabled: true },
  { text: "5:00-5:30 可用", value: 11, disabled: false },
  { text: "5:30-6:00 可用", value: 12, disabled: false },
]);
const form = reactive({
  room: "",
  date: "",
  time: "",
});
</script>
<style scoped></style>
