import {Profile} from "../../app/models/Profile.ts";
import {Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import FollowButton from "./FollowButton.tsx";

type Props = {
    profile: Profile
}

function ProfileCard({profile}: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name={'user'}/>
                {profile.followersCount} Followers
            </Card.Content>
            <FollowButton profile={profile}/>
        </Card>
    )
}

export default ProfileCard

