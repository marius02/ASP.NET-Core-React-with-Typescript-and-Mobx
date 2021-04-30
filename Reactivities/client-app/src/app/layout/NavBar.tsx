import React from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../../app/stores/store";

export default observer(function NavBar() {
  const { userStore } = useStore();
  const { user, logout } = userStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          ></Image>
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user?.userName}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
