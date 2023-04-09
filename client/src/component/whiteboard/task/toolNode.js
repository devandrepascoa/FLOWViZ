import * as React from "react";
import { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Typography, TextField, Card, Stack } from "@mui/material";
import "./toolNode.css";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolSetupDialog from "./setup/toolSetupDialog";

function ToolNode({ id, data }) {
  const tool = data.tool;

  const inputColor = "#ff0000";
  const outputColor = "#00ff22";

  const [nodeColor, setNodeColor] = useState("#000");

  const onChangeNodeColor = (event) => {
    const color = event.target.value;
    setNodeColor(color);
  };

  // Tool setup dialog state hooks
  const [openToolSetup, setOpenToolSetup] = useState(false);
  const [toolSetupScroll, setToolSetupScroll] = useState("paper");

  // Opening the setup dialog
  const onSetupDialogOpen = (scrollType) => () => {
    setOpenToolSetup(true);
    setToolSetupScroll(scrollType);
  };

  // Closing the setup dialog
  const onSetupDialogClose = () => {
    setOpenToolSetup(false);
  };

  const onSetupDialogApply = (config) => {
    const d = { ...data };
    d.config = config;
    data.onNodeUpdate(id, d);
  };

  const onTaskNameUpdate = (event) => {
    const value = event.target.value;
    const d = { ...data };
    d.name = value;
    data.onNodeUpdate(id, d);
  };

  return (
    <div className="tool-node" style={{ "border-color": nodeColor }}>
      <ToolSetupDialog
        nodeId={id}
        open={openToolSetup}
        data={data}
        tool={tool}
        relayedOuts={data.config.inputs}
        scroll={toolSetupScroll}
        onSetupDialogApply={onSetupDialogApply}
        onSetupDialogClose={onSetupDialogClose}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: inputColor, width: 15, height: 15 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: outputColor, width: 15, height: 15 }}
      />
      <div>
        {id}: {tool.general.name}
      </div>
      <div>
        <input placeholder="Task name" onChange={onTaskNameUpdate} />
        <IconButton onClick={onSetupDialogOpen("paper")}>
          <SettingsIcon />
        </IconButton>
        <input
          className="nodrag"
          type="color"
          onChange={onChangeNodeColor}
          defaultValue={nodeColor}
          style={{ width: 30 }}
        />
      </div>
    </div>
  );
}

export default React.memo(ToolNode);
