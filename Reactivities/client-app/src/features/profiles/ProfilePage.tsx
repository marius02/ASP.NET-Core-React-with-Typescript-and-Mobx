import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadProfile, loadingProfile, profile } = profileStore;

  useEffect(() => {
    loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent message="Loading profile..." />;
  return (
    <Grid>
      <Grid.Column>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
