import React, { useEffect } from "react";
import "../layout/styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../../app/common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "../layout/PrivateRoute";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent message="Loading app..." />;
  return (
    <React.Fragment>
      <ToastContainer position="bottom-right"></ToastContainer>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={ActivitiesDashboard}
                />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  path="/profiles/:username"
                  component={ProfilePage}
                />
                <Route path="/errors" component={TestErrors} />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/server-error" component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
}

export default observer(App);
