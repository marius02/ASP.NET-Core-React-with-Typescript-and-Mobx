import React, { useState, useEffect } from "react";
import "../layout/styles.css";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard activities={activities} />
      </Container>
    </React.Fragment>
  );
}

export default App;
