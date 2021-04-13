import { BasicState } from "../common";

export interface Friend {
    _id: string,
    name: string,
    displayedName: string,
    avatar?: any
}

export interface SliceState extends BasicState, WTF {
    allFriends: Array<Friend>
    shownFriends: Array<Friend>
}

interface WTF {
    wtf: any
}