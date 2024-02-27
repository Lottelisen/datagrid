
import * as React from "react";
import {
  unstable_composeClasses as composeClasses,
  unstable_useId as useId
} from "@mui/utils";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconFilter from "@mui/icons-material/AcUnit";
import { styled } from "@mui/system";
import {

  GridColumnMenu,
  GridColumnMenuProps,
} from "@mui/x-data-grid";
import CustomFilterItem from "./CustomFilterItem"


export default function CustomColumnMenu(
    props: GridColumnMenuProps & { showFilterPanel: () => void }
  ) {
    const { showFilterPanel, ...other } = props;
  
    return (
      <GridColumnMenu
        {...other}
        slots={{
          // Override slot for `columnMenuFilterItem`
          columnMenuFilterItem: CustomFilterItem
        }}
        slotProps={{
          columnMenuFilterItem: {
          onClick: props.showFilterPanel
          }
        }}
      />
    );
  }