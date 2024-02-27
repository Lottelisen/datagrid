
import type {
  GridColDef,
  GridFilterItem
} from '@mui/x-data-grid'
import {
  gridFilterableColumnDefinitionsSelector, gridFilterModelSelector, GridLogicOperator, GridPanelContent, GridPanelFooter, GridPanelWrapper,
  useGridApiContext, useGridRootProps, useGridSelector
} from '@mui/x-data-grid'
import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { Filter } from './DataGrid'
import { GridFilterPanelProps } from './GridFilterInterface'
import FilterListIcon from '@mui/icons-material/FilterList'
import GridFilterForm from './GridFilterForm'



const getGridFilter = (col: GridColDef): GridFilterItem => ({
  field: col.field,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  operator: col.filterOperators![0]!.value,
  id: Math.round(Math.random() * 1e5)
})

const CustomGridFilterPanel = forwardRef<HTMLDivElement, GridFilterPanelProps & { filters: Filter[], apply: (filter: Filter[]) => void }>(
  function CustomGridFilterPanel(props, ref) {
    const apiRef = useGridApiContext()
    const rootProps = useGridRootProps()
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector)
    const placeholderFilter = useRef<GridFilterItem | null>(null)

    const {
      filters,
      apply,
      columnsSort,
      getColumnForNewFilter,
      disableAddFilterButton = false,
      disableRemoveAllButton = false,
      ...other
    } = props
    const logicOperators = useMemo(() => [GridLogicOperator.And], [])

    const [filter, setFilter] = React.useState<Filter[]>(filters);

    

    const applyFilterLogicOperator = useCallback(
      (operator: GridLogicOperator) => {
        apiRef.current.setFilterLogicOperator(operator)
      },
      [apiRef]
    )



    const getDefaultFilter = useCallback((): GridFilterItem | null => {
      let nextColumnWithOperator
      if (getColumnForNewFilter && typeof getColumnForNewFilter === 'function') {
       
        const nextFieldName = getColumnForNewFilter({
          currentFilters: filterModel?.items || [],
          columns: filterableColumns
        })

        if (nextFieldName === null) {
          return null
        }

        nextColumnWithOperator = filterableColumns.find(({ field }) => field === nextFieldName)
      } else {
        nextColumnWithOperator = filterableColumns.find((colDef) => colDef.filterOperators?.length)
      }

      if (!nextColumnWithOperator) {
        return null
      }

      return getGridFilter(nextColumnWithOperator)
    }, [filterModel?.items, filterableColumns, getColumnForNewFilter])

    const getNewFilter = useCallback((): GridFilterItem | null => {
      if (getColumnForNewFilter === undefined || typeof getColumnForNewFilter !== 'function') {
        return getDefaultFilter()
      }

      const currentFilters = filterModel.items.length
        ? filterModel.items
        : [getDefaultFilter()].filter(Boolean)

      const nextColumnFieldName = getColumnForNewFilter({
        currentFilters: currentFilters as GridFilterItem[],
        columns: filterableColumns
      })

      if (nextColumnFieldName === null) {
        return null
      }

      const nextColumnWithOperator = filterableColumns.find(
        ({ field }) => field === nextColumnFieldName
      )

      if (!nextColumnWithOperator) {
        return null
      }

      return getGridFilter(nextColumnWithOperator)
    }, [filterModel.items, filterableColumns, getColumnForNewFilter, getDefaultFilter])

    const items = useMemo<GridFilterItem[]>(() => {
      if (filterModel.items.length) {
        return filterModel.items
      }

      if (!placeholderFilter.current) {
        placeholderFilter.current = getDefaultFilter()
      }

      return placeholderFilter.current ? [placeholderFilter.current] : []
    }, [filterModel.items, getDefaultFilter])

    const hasMultipleFilters = items.length > 1

    const addNewFilter = () => {
      console.log('add filter');
      const newFilter = getNewFilter()
      if (!newFilter) {
        console.log('no add filter');
        return
      }
      apiRef.current.upsertFilterItems([...items, newFilter])
    }

    const deleteFilter = useCallback(
      (item: GridFilterItem) => {
        const shouldCloseFilterPanel = items.length === 1
        apiRef.current.deleteFilterItem(item)
        if (shouldCloseFilterPanel) {
          apiRef.current.hideFilterPanel()
        }
      },
      [apiRef, items.length]
    )

    const handleRemoveAll = () => {
      const item = items[0]
      if (item) {
        apiRef.current.deleteFilterItem(item)
      }
      apiRef.current.setFilterModel({ ...filterModel, items: [] })
      apiRef.current.hideFilterPanel()
    }

    const handleApply = useCallback(
      () => {
        apply(filter);
        apiRef.current.hideFilterPanel()
      },
      [filter]
    )

    useEffect(() => {
      if (
        logicOperators.length > 0 &&
        filterModel.logicOperator &&
        !logicOperators.includes(filterModel.logicOperator)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        applyFilterLogicOperator(logicOperators[0]!)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logicOperators, applyFilterLogicOperator, filterModel.logicOperator])

    

    const handleChange = (f: Filter) => {
      let newFilt = filter.map(filt => {
        if (filt.id === f.id) {
          return f;
        }
      else return filt})
      setFilter(newFilt)
    };

    return (
      <GridPanelWrapper
        ref={ref}
        {...other}
      >
        <GridPanelContent>
          {filter.map((item, index) => (
            <GridFilterForm
              key={index}
              item={item}
              handleChange={handleChange}
            //applyFilterChanges={applyFilter}
            //deleteFilter={deleteFilter}
            />
          ))}
        </GridPanelContent>
        <GridPanelFooter>
          <rootProps.slots.baseButton
            onClick={addNewFilter}
            startIcon={<rootProps.slots.filterPanelAddIcon />}
            {...rootProps.slotProps?.baseButton}
          >
            {apiRef.current.getLocaleText('filterPanelAddFilter')}
          </rootProps.slots.baseButton>
          <div className="flex flex-row gap-4">
            <rootProps.slots.baseButton
              onClick={handleRemoveAll}
              startIcon={<rootProps.slots.filterPanelRemoveAllIcon />}
              {...rootProps.slotProps?.baseButton}
            >
              {apiRef.current.getLocaleText('filterPanelRemoveAll')}
            </rootProps.slots.baseButton>
            <rootProps.slots.baseButton
              onClick={handleApply}
              variant="contained"
              startIcon={<FilterListIcon />}
              {...rootProps.slotProps?.baseButton}
            >
              Apply Filters
            </rootProps.slots.baseButton>
          </div>

        </GridPanelFooter>
      </GridPanelWrapper>
    )
  }
)

export default CustomGridFilterPanel