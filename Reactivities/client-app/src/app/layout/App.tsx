import React, { useState, useEffect } from "react";
import "../layout/styles.css";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

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
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.title}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}

export default App;
