import { BasicState } from "../common";

export interface Friend {
    _id: string,
    name: string,
    displayedName: string,
    avatar?: any
}

export interface InvitationSent {
    _id: string,
    receiver: Friend,
}

export interface InvitationReceived {
    _id: string,
    sender: Friend,
}

export interface InvitationCollection {
    sent: Array<InvitationSent>
    received: Array<InvitationReceived>
}

export interface SliceState extends BasicState {
    allFriends: Array<Friend>
    invitations: InvitationCollection
    shownFriends: Array<Friend>
}