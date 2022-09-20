import React, {useState} from 'react';
import {OneToDo} from "../types/todo";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { todoSlice } from '../store/reducers/todoReducer';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";


const Title = styled.h2`
display: flex;
flex-direction: row;
justify-content: center;
`
const Form = styled.form`
display: flex;
flex-direction: row;
justify-content: center;
`

const AddInput = styled.input`
    margin: 5px;
    border: 2px solid #008CBA;
`
const AddButton = styled.input`
margin: 5px;
padding: 3px 9px;
border-radius:10%;
cursor:pointer;
background-color: white;
color: black;
border: 2px solid #008CBA;
&:hover{
    background-color: #008CBA;
    color: white;
}
` 
const List = styled.ul`
margin-left: 0;
padding-left: 0;
`

const ListItem = styled.li`
list-style-type: none;
cursor: pointer;
display: flex;
flex-direction: row;
align-items: center;
`

const EditButton = styled.span`
margin-left: 5px;
`
const ChangeButton = styled.button`
margin: 5px;
padding: 3px 9px;
border-radius:10%;
cursor:pointer;
background-color: white;
color: black;
border: 2px solid #008CBA;
&:hover{
    background-color: #008CBA;
    color: white;
}
`

const TodoList: React.FC = () => {
    const {todos} = useAppSelector(state => state.todoReducer)
    const {addTodo, deleteTodo, changeTodo } = todoSlice.actions
    const dispatch = useAppDispatch() 


    const [newTodo, setnewTodo]= useState<string>('')
    const [editTodo, seteditTodo] = useState<OneToDo | null >(null)

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(!newTodo === false){
            dispatch(addTodo( {id:String(Date.now()), title:newTodo, status: false}));
            setnewTodo('');
        }
    }

    const changeItem = () => {
        let newItem =  { id: editTodo?.id ,  title:newTodo,  status:  false }
        dispatch(changeTodo(newItem))
        seteditTodo(null)
        setnewTodo('');
    }

    const deleteItem = (id: string) => {
        dispatch(deleteTodo(id))
        seteditTodo(null)
    }

    return (
        <>
            <Title> Add To do</Title>
            <Form onSubmit = {handleSubmit}>
                <label htmlFor="todoText">
                    <AddInput type="text" name="todoText" value={newTodo} onChange={(e) => {setnewTodo(e.target.value)}}/>
                </label>
                {  !editTodo &&  <AddButton type="submit" value="Submit"/> }
                {   editTodo &&   <ChangeButton onClick={changeItem}>Edit</ChangeButton> }
                
            </Form>
            <List>
                {
                   todos.map( (item:OneToDo) => {
                   return  (
                   <ListItem  key = {item?.id} >
                    <p>{item?.title}</p> 
                    <EditButton onClick={() => seteditTodo(item)} > 
                        <FiEdit />
                    </EditButton>
                        <RiDeleteBin2Fill  onClick={() => deleteItem(item?.id)}/>
                   </ListItem>)
                   }) 
                }
            </List>
        </>
    )};

    export default TodoList;