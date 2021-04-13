import { BasicState } from "../common";

export interface UserData {
    _id: string,
    email: string,
    name: string,
    displayedName: string,
}

export interface SliceState extends BasicState, UserData {

}

export interface LoginResponse {
    token: string,
    user: UserData,
}

export type LoginCredentials = {
    email: string,
    password: string,
}

export type RegisterCredentials = {
    email: string,
    name: string,
    displayedName: string,
    password: string,
};