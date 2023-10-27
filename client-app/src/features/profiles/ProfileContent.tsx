import {Tab} from "semantic-ui-react";
import ProfilePhoto from "./ProfilePhoto.tsx";
import {Profile} from "../../app/models/Profile.ts";
import ProfileAbout from "./ProfileAbout.tsx";

type Props = {
    profile: Profile;
}

function ProfileContent({profile}: Props) {
    const panes = [
        {menuItem: 'About', render: () => <ProfileAbout />},
        {menuItem: 'Photos', render: () => <ProfilePhoto profile={profile}/>},
        {menuItem: 'Activities', render: () => <Tab.Pane>Events Content</Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane>},
        {menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane>},
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition={'right'}
            panes={panes}
        />

    )
}

export default ProfileContent