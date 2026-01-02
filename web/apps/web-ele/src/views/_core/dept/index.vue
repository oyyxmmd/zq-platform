<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Edit, Plus, Trash2 } from '@vben/icons';
import { $t } from '@vben/locales';

import { ElButton, ElMessage, ElMessageBox, ElTag } from 'element-plus';

import {
  deleteDeptApi,
  getDeptListApi,
  getDeptTreeApi,
} from '#/api/core/dept';
import { useZqTable } from '#/components/zq-table';

import { useDeptColumns, useSearchFormSchema } from './data';
import DeptFormModal from './modules/dept-form-modal.vue';

defineOptions({ name: 'SystemDept' });

const formRef = ref<InstanceType<typeof DeptFormModal>>();

import { getStatusOptions } from '../user/data';

const statusOptions = getStatusOptions();

function getTagType(value: any, options: any[]): 'danger' | 'info' | 'primary' | 'success' | 'warning' {
  const normalizedValue = typeof value === 'boolean' ? (value ? 1 : 0) : value;
  const option = options.find((o) => o.value === normalizedValue);
  return (option?.type as any) || 'info';
}

function getTagLabel(value: any, options: any[]): string {
  const normalizedValue = typeof value === 'boolean' ? (value ? 1 : 0) : value;
  const option = options.find((o) => o.value === normalizedValue);
  return option?.label || String(value);
}

// 使用 ZqTable
const [Grid, gridApi] = useZqTable({
  gridOptions: {
    columns: useDeptColumns(),
    border: true,
    stripe: true,
    rowKey: 'id', // ElTable 树形结构必须
    defaultExpandAll: true, // ElTable 默认展开所有
    proxyConfig: {
      autoLoad: true,
      ajax: {
        query: async () => {
          return await getDeptTreeApi();
        },
      },
    },
    pagerConfig: {
      enabled: false,
    },
    toolbarConfig: {
      search: true,
      refresh: true,
      zoom: true,
      custom: true,
    },
  },
  formOptions: {
    schema: useSearchFormSchema(),
    showCollapseButton: false,
    submitOnChange: false,
  },
});

/**
 * 创建根部门
 */
function onCreate() {
  formRef.value?.open();
}

/**
 * 添加子部门
 */
function onAddSub(row: any) {
  formRef.value?.open(undefined, row.id);
}

/**
 * 编辑部门
 */
function onEdit(row: any) {
  formRef.value?.open(row);
}

/**
 * 删除部门
 */
function onDelete(row: any) {
  ElMessageBox.confirm(
    $t('ui.actionMessage.deleteConfirm', [row.name]),
    $t('common.delete'),
    {
      confirmButtonText: $t('common.confirm'),
      cancelButtonText: $t('common.cancel'),
      type: 'warning',
    },
  )
    .then(async () => {
      try {
        await deleteDeptApi(row.id);
        ElMessage.success($t('ui.actionMessage.deleteSuccess', [row.name]));
        refreshGrid();
      } catch {
        // 错误已由请求拦截器处理
      }
    })
    .catch(() => {
      // 用户取消
    });
}

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full w-full flex-col p-4">
      <DeptFormModal ref="formRef" @success="refreshGrid" />

      <Grid class="flex-1">
        <!-- 工具栏操作 -->
        <template #toolbar-actions>
          <ElButton type="primary" :icon="Plus" @click="onCreate">
            {{ $t('ui.actionTitle.create', [$t('dept.deptName') || '部门']) }}
          </ElButton>
        </template>

        <!-- 状态列 -->
        <template #cell-status="{ row }">
          <ElTag :type="getTagType(row.status, statusOptions)" size="small">
            {{ getTagLabel(row.status, statusOptions) }}
          </ElTag>
        </template>

        <!-- 操作列 -->
        <template #cell-actions="{ row }">
          <ElButton link type="primary" size="small" :icon="Edit" @click="onEdit(row)">
            {{ $t('common.edit') || '编辑' }}
          </ElButton>
          <ElButton link type="primary" size="small" :icon="Plus" @click="onAddSub(row)">
            {{ $t('dept.addChildDept') || '添加子部门' }}
          </ElButton>
          <ElButton link type="danger" size="small" :icon="Trash2" @click="onDelete(row)">
            {{ $t('common.delete') || '删除' }}
          </ElButton>
        </template>
      </Grid>
    </div>
  </Page>
</template>
