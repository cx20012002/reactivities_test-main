import {observer} from 'mobx-react-lite'
import {Segment, Header, Comment, Form} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import {FieldValues, useForm} from "react-hook-form";
import AppTextArea from "../../../app/components/AppTextArea.tsx";
import { formatDistanceToNow } from 'date-fns';
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';

type Props = {
    activityId: string;
}

function ActivityDetailedChat({activityId}: Props) {
    const {commentStore} = useStore();
    const {handleSubmit, formState: {isValid}, control, reset} = useForm<FieldValues>({
        mode: 'onSubmit',
        resolver: yupResolver(Yup.object({
            body: Yup.string().required()
        } as FieldValues)),
    })

    useEffect(() => {
        if (activityId) commentStore.createHubConnection(activityId);
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId])

    async function onSubmit(data: FieldValues) {
        await commentStore.addComment(data as any);
        reset();
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
           
            <Segment attached clearing>
                <Form reply onSubmit={handleSubmit(onSubmit)}>
                    <AppTextArea 
                        name={'body'} 
                        placeholder={'Enter your comment (Enter to submit, SHIFT + Enter for new line)'} 
                        rows={2}
                        control={control}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey) {
                                return;
                            }
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                isValid && handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    
                </Form>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
                
            </Segment>
        </>
    )
}

export default observer(ActivityDetailedChat);