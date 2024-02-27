import * as React from "react";
import {
  unstable_useId as useId
} from "@mui/utils";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/system";
import {
  useGridApiContext,
  ColumnHeaderFilterIconButtonProps,
  useGridRootProps,
} from "@mui/x-data-grid";



const GridIconButtonContainerRoot = styled("div", {
    name: "MuiDataGrid",
    slot: "IconButtonContainer"
  })(() => ({
    display: "flex",
    visibility: "hidden",
    width: 0
  }));

export default function CustomFilterIcon(
    props: ColumnHeaderFilterIconButtonProps & { counter: number } 
  ) {
    const { counter, field, onClick} = props;
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const labelId = useId();
    const panelId = useId();
  
    
  
    const toggleFilter = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
  
        // const { open, openedPanelValue } = gridPreferencePanelStateSelector(
        //   apiRef.current.state
        // );
  
        // if (open && openedPanelValue === GridPreferencePanelsValue.filters) {
        //   apiRef.current.hideFilterPanel();
        // } else {
        //   apiRef.current.showFilterPanel(undefined, panelId, labelId);
        // }
  
        if (onClick) {
          onClick(apiRef.current.getColumnHeaderParams(field), event);
        }
      },
      [apiRef, field, onClick, panelId, labelId]
    );

    if (!counter) {
      return null;
    }
    
    console.log(onClick)
    const iconButton = (
      <rootProps.slots.baseIconButton
        id={labelId}
        onClick={toggleFilter}
        color="default"
        aria-label={apiRef.current.getLocaleText("columnHeaderFiltersLabel")}
        size="small"
        tabIndex={-1}
        aria-haspopup="menu"
        {...rootProps.slotProps?.baseIconButton}
      >
        <rootProps.slots.columnFilteredIcon fontSize="small" />
      </rootProps.slots.baseIconButton>
    );
  
    return (
      <rootProps.slots.baseTooltip
        title={
          apiRef.current.getLocaleText("columnHeaderFiltersTooltipActive")(
            counter
          ) as React.ReactElement
        }
        enterDelay={1000}
        {...rootProps.slotProps?.baseTooltip}
      >
        <GridIconButtonContainerRoot className="MuiDataGrid-iconButtonContainer">
          {counter > 1 && (
            <Badge badgeContent={counter} color="default">
              {iconButton}
            </Badge>
          )}
  
          {counter === 1 && iconButton}
        </GridIconButtonContainerRoot>
      </rootProps.slots.baseTooltip>
    );
  }
  
  