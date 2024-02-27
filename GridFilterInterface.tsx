
import type { SxProps, Theme } from '@mui/material'
import type {
  GetColumnForNewFilterArgs,
  GridColDef,
  GridFilterFormProps,
} from '@mui/x-data-grid'
import React from 'react'

export interface GridFilterPanelProps
  extends Pick<GridFilterFormProps, 'logicOperators' | 'columnsSort'> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Function that returns the next filter item to be picked as default filter.
   * @param {GetColumnForNewFilterArgs} args Currently configured filters and columns.
   * @returns {GridColDef['field']} The field to be used for the next filter or `null` to prevent adding a filter.
   */
  getColumnForNewFilter?: (args: GetColumnForNewFilterArgs) => GridColDef['field'] | null;
  /**
   * Props passed to each filter form.
   */
  filterFormProps?: Pick<
    GridFilterFormProps,
    | 'columnsSort'
    | 'deleteIconProps'
    | 'logicOperatorInputProps'
    | 'operatorInputProps'
    | 'columnInputProps'
    | 'valueInputProps'
    | 'filterColumns'
  >;

  /**
   * If `true`, the `Add filter` button will not be displayed.
   * @default false
   */
  disableAddFilterButton?: boolean;
  /**
   * If `true`, the `Remove all` button will be disabled
   * @default false
   */
  disableRemoveAllButton?: boolean;

  /**
   * @ignore - do not document.
   */
  children?: React.ReactNode;
}