import { FormEvent, useState } from "react"
import axios from "../axios"
import config from "../config";
import { PersonDetailsForm } from "./person_details_form";
import { useDispatch } from "react-redux";
import { addPersonAPI } from "../api/person.api";
import { AnyAction } from "@reduxjs/toolkit";


export const AddPerson = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const dispatch = useDispatch();
 const addPersonOnClick=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const newPerson:Person= { person_name: name, person_date_of_birth: new Date(date) } 
    dispatch(addPersonAPI(newPerson) as unknown as AnyAction);
 }
    return <div>
        <h3>add person</h3>
        <form onSubmit={(e) =>addPersonOnClick(e) }>
            <PersonDetailsForm ShowDate={true} name={name} setName={setName} date={date} setDate={setDate} />
        </form>
    </div>
}