﻿import {Grid} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader.tsx";
import ActivityDetailedInfo from "./ActivityDetailedInfo.tsx";
import ActivityDetailedChat from "./ActivityDetailedChat.tsx";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar.tsx";

function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);

        return () => clearSelectedActivity();
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat activityId={activity.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity}/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);