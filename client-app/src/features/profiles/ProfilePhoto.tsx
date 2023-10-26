import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {IPhoto, Profile} from "../../app/models/Profile.ts";
import {useStore} from "../../app/stores/store.ts";
import {SyntheticEvent, useState} from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget.tsx";

type Props = {
    profile: Profile;
}

function ProfilePhoto({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: any) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMain(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }
    
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated={'left'} icon={'image'} content={'Photos'}/>
                    {isCurrentUser && (
                        <Button
                            floated={'right'}
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ) : (
                        <>
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url}/>
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    basic
                                                    color='green'
                                                    content='Main'
                                                    name={'main' + photo.id}
                                                    loading={target === 'main' + photo.id && loading}
                                                    disabled={photo.isMain}
                                                    onClick={e => handleSetMain(photo, e)}
                                                />
                                                <Button
                                                    name={photo.id}
                                                    loading={loading && photo.id === target}
                                                    onClick={(e) => handleDeletePhoto(photo, e)}
                                                    basic
                                                    color='red'
                                                    icon='trash'
                                                    disabled={photo.isMain}
                                                />
                                            </Button.Group>
                                        )}
                                    </Card>
                                ))}
                            </Card.Group>
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhoto)