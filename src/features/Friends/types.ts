import { BasicState } from "../common";

export interface Friend {
    _id: string,
    name: string,
    displayedName: string,
    avatar?: any
}

export interface SliceState extends BasicState {
    allFriends: Array<Friend>
    shownFriends: Array<Friend>
}