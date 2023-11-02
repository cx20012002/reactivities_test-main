import {Tab} from "semantic-ui-react";
import ProfilePhoto from "./ProfilePhoto.tsx";
import {Profile} from "../../app/models/Profile.ts";
import ProfileAbout from "./ProfileAbout.tsx";
import ProfileFollowings from "./ProfileFollowings.tsx";
import {useStore} from "../../app/stores/store.ts";
import ProfileActivities from "./ProfileActivities.tsx";

type Props = {
    profile: Profile;
}

function ProfileContent({profile}: Props) {
    const {profileStore: {setActiveTab}} = useStore();

    const panes = [
        {menuItem: 'About', render: () => <ProfileAbout/>},
        {menuItem: 'Photos', render: () => <ProfilePhoto profile={profile}/>},
        {menuItem: 'Events', render: () => <Tab.Pane><ProfileActivities/></Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane><ProfileFollowings/></Tab.Pane>},
        {menuItem: 'Following', render: () => <Tab.Pane><ProfileFollowings/></Tab.Pane>},
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition={'right'}
            panes={panes}
            onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
        />

    )
}

export default ProfileContent