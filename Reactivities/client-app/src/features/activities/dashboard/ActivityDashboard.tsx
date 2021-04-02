import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "../dashboard/ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";

export default observer(function ActivitiDashboard() {
  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode && (
          <ActivityDetails />
        )}
        {activityStore.editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});
