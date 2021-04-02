import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autocomplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.TextArea
          value={activity.description}
          name="description"
          onChange={handleInputChange}
          placeholder="Description"
        ></Form.TextArea>
        <Form.Input
          value={activity.category}
          name="category"
          onChange={handleInputChange}
          placeholder="Category"
        ></Form.Input>
        <Form.Input
          value={activity.date}
          type="date"
          name="date"
          onChange={handleInputChange}
          placeholder="Date"
        ></Form.Input>
        <Form.Input
          value={activity.city}
          name="city"
          onChange={handleInputChange}
          placeholder="City"
        ></Form.Input>
        <Form.Input
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
          placeholder="Venue"
        ></Form.Input>
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
});
