import {observer} from 'mobx-react-lite'
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import {FieldValues, useForm} from "react-hook-form";
import AppTextArea from "../../../app/components/AppTextArea.tsx";

type Props = {
    activityId: string;
}

function ActivityDetailedChat({activityId}: Props) {
    const {commentStore} = useStore();
    const {handleSubmit, formState:{isSubmitting, isValid}, control} = useForm<FieldValues>({
        mode: 'all'
    })

    useEffect(() => {
        if (activityId) commentStore.createHubConnection(activityId);
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId])

    function onSubmit(data:FieldValues){
        //TODO
        commentStore.addComment(data)
    }
    
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createdAt}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Form reply onSubmit={handleSubmit(onSubmit)}>
                        <AppTextArea name={'body'} placeholder={'Add Comment'} rows={2} control={control}/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                            type={'submit'}
                            floated={'right'}
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>
    )
}

export default observer(ActivityDetailedChat);