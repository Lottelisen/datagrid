import * as React from "react";

import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconFilter from "@mui/icons-material/AcUnit";
import {
  GridColumnMenuItemProps,
  useGridApiContext,
} from "@mui/x-data-grid";

export default function CustomFilterItem(props: GridColumnMenuItemProps & { showFilterPanel: () => void }) {
    const { showFilterPanel, colDef, ...other } = props;
    const apiRef = useGridApiContext();
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        console.log(apiRef.current)
        // const el = apiRef.current.getColumnHeaderElement(colDef.field). as HTMLButtonElement;
        showFilterPanel();
        apiRef.current.toggleColumnMenu(colDef.field);
      },
      [apiRef, colDef.field, showFilterPanel]
    );
  
    return (
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <IconFilter fontSize="small" />
        </ListItemIcon>
        <ListItemText>Show Filters</ListItemText>
      </MenuItem>
    );
  }