import {Profile} from "../../app/models/Profile.ts";
import {Button, Reveal} from "semantic-ui-react";
import {useStore} from "../../app/stores/store.ts";
import {SyntheticEvent} from "react";
import {observer} from "mobx-react-lite";

type Props = {
    profile: Profile;
}

function FollowButton({profile}: Props) {
    const {profileStore: {updateFollowing, loading}, userStore} = useStore();

    if (userStore.user?.username === profile.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return (
        <Reveal animated={'move'}>
            <Reveal.Content visible style={{width: '100%'}}>
                <Button
                    fluid
                    color={'teal'}
                    content={profile.following ? 'Following' : 'Not following'}
                />
            </Reveal.Content>
            <Reveal.Content hidden style={{width: '100%'}}>
                <Button
                    fluid
                    basic
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading}
                    onClick={(e) => handleFollow(e, profile.username)}></Button>
            </Reveal.Content>
        </Reveal>
    )
}

export default observer(FollowButton)