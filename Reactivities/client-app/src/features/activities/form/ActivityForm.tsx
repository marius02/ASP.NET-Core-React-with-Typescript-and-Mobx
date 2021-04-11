import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loading,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent message="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title"></MyTextInput>
            <MyTextArea
              rows={3}
              name="description"
              placeholder="Description"
            ></MyTextArea>
            <MySelectInput
              options={categoryOptions}
              name="category"
              placeholder="Category"
            ></MySelectInput>
            <MyDateInput
              showTimeSelect
              timeCaption="time"
              dateFormat="MMM d, yyyy h:mm aa"
              name="date"
              placeholderText="Date"
            ></MyDateInput>
            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="city" placeholder="City"></MyTextInput>
            <MyTextInput name="venue" placeholder="Venue"></MyTextInput>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              as={Link}
              to={"/activities"}
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
