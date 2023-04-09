import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Loading from "../common/loading";
import PageTitle from "../common/pageTitle";
import TaskDetails from "./taskDetails";
import Selector from "../workflow/selector";

export default function DagRunDetails({
  selectedDagRun,
  workflowService,
  workflowName,
  onError = () => {},
}) {
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const DagRunDetailsView = ({ dagRun, children }) => {
    const executionDate = dagRun.executionDate;
    const state = dagRun.state;
    const taskInstances = dagRun.taskInstances;

    return (
      <>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography>
                <b>Run date:</b> {executionDate}
              </Typography>
              <Typography>
                <b>Run state:</b> {state}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-end">
            <Selector
              id="dag-task-instance"
              label="Task"
              collection={taskInstances}
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              isFirst={true}
            />
          </Grid>
        </Grid>
        {children}
      </>
    );
  };

  return selectedDagRun ? (
    <>
      <PageTitle variant="h5" sx={{ mt: 2, mb: 2 }}>
        Run details: {selectedDagRun}
      </PageTitle>
      {workflowService.getWorkflowRun(
        workflowName,
        selectedDagRun,
        onError,
        (dagRun) => {
          return (
            <DagRunDetailsView dagRun={dagRun}>
              <TaskDetails
                workflowService={workflowService}
                workflowName={workflowName}
                selectedDagRun={selectedDagRun}
                selectedTaskId={selectedTaskId}
                onError={onError}
              />
            </DagRunDetailsView>
          );
        },
        <Loading />
      )}
    </>
  ) : (
    <></>
  );
}
