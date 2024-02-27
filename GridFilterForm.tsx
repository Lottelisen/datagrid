import * as React from "react";
import {
    DataGrid,
} from "@mui/x-data-grid";
import CustomGridFilterPanel from "./CustomGridFilterPanel"
import { Box, FormControl, IconButton, InputLabel, MenuItem, Popover, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { Filter } from './DataGrid'
import CloseIcon from '@mui/icons-material/Close';

export interface GridFilterPanelProps {
    item: Filter;
    handleChange: (filter: Filter)=>void;
}

export default function GridFilterForm(props: GridFilterPanelProps) {
    const { item, handleChange} = props;

    const col = ['col1', 'col2', 'col3', 'col4', 'col5'];
    const op = ['is', 'or', 'and', 'not'];

    const onChange = (event: SelectChangeEvent) => {
        handleChange({...item, [event.target.name]: event.target.value});
      };

    return (
        <Stack direction='row' alignItems="baseline" sx={{ p: 1 }}>
            <FormControl sx={{ justifyContent: 'flex-end', mr: 0.5 }}>
                <IconButton size="small"> <CloseIcon fontSize="inherit" /></IconButton>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '150px' }}>
                <InputLabel id="filter-select-column-label">Kolumn</InputLabel>
                <Select
                    value={item.field ?? ""} 
                    labelId="filter-select-column-label"
                    name="field"
                    id="filter-select-column"
                    onChange={onChange}
                    label="Kolumner"
                >
                    {col.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>
                    )}

                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '120px', minWidth: 50 }}>
                <InputLabel id="filter-select-operator-label">Operator</InputLabel>
                <Select
                    labelId="filter-select-operator-label"
                    id="filter-select-operator"
                    name="operator"
                    value={item.operator ?? ""}
                    onChange={onChange}
                    label="operator"
                >
                    {op.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>
                    )}

                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="värde" variant="standard" size="small" sx={{ flex: 1 }} />
        </Stack>
    );
}
