export interface TodoState {
    todos: any[];
    loading: boolean;
    error: null | string;
}

export enum TodoActionTypes {
    ADD_TODO= 'ADD_TODO',
    DELETE_TODO= 'DELETE_TODO',
    CHANGE_TODO= 'CHANGE_TODO'
}


export interface OneToDo {
    id: string ;
    title:string;
    status:boolean;
}
export interface IOneToDo {
    id: string  | undefined;
    title:string;
    status:boolean;
}