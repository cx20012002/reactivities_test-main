﻿import {Profile} from "./Profile.ts";

export type Activity = {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: boolean;
    host?: Profile;
    attendees?: Profile[];
}
