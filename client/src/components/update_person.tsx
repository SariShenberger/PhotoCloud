import { FormEvent, useState } from "react";
import { PersonDetailsForm } from "./person_details_form";
import { useDispatch } from "react-redux";
import { updatePersonAPI } from "../api/person.api";
import { AnyAction } from "@reduxjs/toolkit";
import { getImagesAPI } from "../api/image.api";

export const UpdatePerson = (props: any) => {
    const person: Person = props.person;
    const [name, setName] = useState(person.person_name);
    const [date, setDate] = useState(person.person_date_of_birth);
    console.log(person);
    const dispatch = useDispatch();

    const updatePersonOnClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPerson: Person = { person_name: name };
        const obj = { idperson: person.idperson || 0, newPerson }
     
        await dispatch(updatePersonAPI(obj) as unknown as AnyAction);
        dispatch(getImagesAPI() as unknown as AnyAction);

        if (props.personsControlMap) {
            newPerson.idperson=person.idperson;
            props.personsControlMap.set(person.idperson, newPerson);
            props.setPeople(Array.from(props.personsControlMap.values()));
        }
    }

    return <div>
        <form onSubmit={(e) => updatePersonOnClick(e)}>
            <PersonDetailsForm ShowDate={false} setIsShowUpdate={props.setIsShowUpdate} name={name} setName={setName} date={date} setDate={setDate} />
        </form>
    </div>
}