import {ChatComment} from "../models/comment.ts";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {makeAutoObservable} from "mobx";
import {store} from "./store.ts";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token as string
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing connection: ', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                comments.forEach(comment => {
                    comment.createdAt = new Date(comment.createdAt + 'Z');
                })
                this.comments = comments;
            })

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                comment.createdAt = new Date(comment.createdAt);
                this.comments.unshift(comment);
            })

            this.hubConnection.on('Send', (message: string) => {
                console.log(message);
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }
}