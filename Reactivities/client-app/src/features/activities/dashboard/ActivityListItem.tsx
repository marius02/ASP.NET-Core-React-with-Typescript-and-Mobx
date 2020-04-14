import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Item,
  Button,
  Label,
  SegmentGroup,
  Segment,
  Icon,
  ItemGroup,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item key={activity.id}>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </SegmentGroup>
  );
};

export default ActivityListItem;
