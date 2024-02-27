import * as React from "react";
import { useId } from 'react';
import {
    DataGrid,
    GridFilterModel
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import CustomGridFilterPanel from "./CustomGridFilterPanel"
import CustomColumnMenu from "./CustomColumnMenu";
import CustomFilterIcon from "./CustomFilterIcon";
import { Popover } from "@mui/material";

export interface Filter {
    id: string;
    field: string;
    value: string;
    operator: string;
  }

declare module "@mui/x-data-grid" {
    interface ColumnHeaderFilterIconButtonPropsOverrides {
        counter: number;
    }
    interface FilterPanelPropsOverrides {
        filters: Filter[];
        apply: (filter: Filter[]) => void;
    }
}

export default function OverrideColumnMenuGrid() {
    const [filter, setFilter ] = React.useState<Filter[]>([{id: useId(), field: "col2", value: 'tastar filters 1', operator: 'or'}, {id: useId(), field: "col5", value: 'tastar filters 2', operator: 'and'}]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 20,
        maxColumns: 5
    });


    const handleClose = () => {
        setAnchorEl(null);
    };

    const onFilterModelChange = React.useCallback(
        (filterModel: GridFilterModel) => {
            console.log('model changed')
        },
        []
    );
    const open = Boolean(anchorEl);

    const handleFilters = (filters: Filter[]) => {
        setFilter(filters);
    };

    console.log(filter)
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                {...data}
                slots={{
                    filterPanel: CustomGridFilterPanel
                }}
                slotProps={{
                    columnHeaderFilterIconButton: {
                        counter: 5
                    },
                    filterPanel:{
                        filters: filter,
                        apply: handleFilters
                    }
                }}
                filterModel={{
                    items: [
                        { id: 0, field: "commodity", value: "a", operator: "contains" }
                    ]
                }}
                filterMode="server"
                onFilterModelChange={onFilterModelChange}
            />
            <Popover 
            className="MuiDataGrid-panelWrapper"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            > test popper</Popover>
        </div>
    );
}
