import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';
import type { DeptUser } from '#/api/core/dept';

import { $t } from '@vben/locales';

/**
 * 获取搜索表单的字段配置
 */
export function useSearchFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.user.userName'),
    },
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('system.user.account'),
    },
  ];
}

/**
 * 获取部门表格列配置
 */
/**
 * 获取部门表格列配置
 */
export function useDeptColumns(): any[] {
  return [
    {
      key: 'name',
      dataKey: 'name',
      title: $t('dept.deptName') || '部门名称',
      minWidth: 200,
      align: 'left',
    },
    {
      key: 'code',
      dataKey: 'code',
      title: $t('dept.deptCode') || '部门编码',
      width: 120,
      align: 'center',
    },
    {
      key: 'dept_type_display',
      dataKey: 'dept_type_display',
      title: $t('dept.deptType') || '部门类型',
      width: 100,
      align: 'center',
    },
    {
      key: 'lead_name',
      dataKey: 'lead_name',
      title: $t('dept.lead') || '负责人',
      width: 100,
      align: 'center',
    },
    {
      key: 'phone',
      dataKey: 'phone',
      title: $t('dept.phone') || '电话',
      width: 120,
      align: 'center',
    },
    {
      key: 'email',
      dataKey: 'email',
      title: $t('dept.email') || '邮箱',
      width: 180,
      align: 'center',
    },
    {
      key: 'description',
      dataKey: 'description',
      title: $t('dept.description') || '描述',
      minWidth: 150,
      align: 'left',
      showOverflowTooltip: true,
    },
    {
      key: 'sort',
      dataKey: 'sort',
      title: $t('dept.sort') || '排序',
      width: 100,
      align: 'center',
    },
    {
      key: 'status',
      title: $t('dept.status') || '状态',
      width: 100,
      align: 'center',
      slots: { default: 'cell-status' },
    },
    {
      key: 'sys_create_datetime',
      dataKey: 'sys_create_datetime',
      title: $t('common.createTime') || '创建时间',
      width: 180,
      align: 'center',
    },
    {
      key: 'actions',
      title: $t('common.operation') || '操作',
      width: 280,
      fixed: 'right',
      align: 'center',
      slots: { default: 'cell-actions' },
    },
  ];
}
