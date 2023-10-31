import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {Card, Grid, Header, Tab} from "semantic-ui-react";
import ProfileCard from "./ProfileCard.tsx";

function ProfileFollowings() {
    const {profileStore: {profile, followings, loadingFollowings, activeTab}} = useStore();

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile => (
                            <ProfileCard profile={profile} key={profile.username}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfileFollowings)