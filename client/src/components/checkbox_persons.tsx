import { useState } from "react";
import { PersonDetails } from "./person_details";
import { useSelector } from "react-redux";
import { CheckboxClassKey } from "@mui/material";
import { AddPersonDialog } from "./add_person_dialog";

export const CheckboxPersons = (props: any) => {
    const persons: Person[] = useSelector((state: any) => {
        return state.personSlice.persons;
    })
    const [personsControlMap] = useState(new Map<number, Person>());
    const personsImage = props.people || [];

    setTimeout(()=>{personsImage.forEach((p: Person) => {
        console.log("p: ", p);
        personsControlMap.set(p.idperson || 0, p);
        const cb=document.getElementById(`${p.idperson}`) as HTMLElement;
        (cb as any).checked = true;
    },0);})
    



    const onChangePersonCheckbox = (e: React.ChangeEvent<HTMLInputElement>, person: Person) => {
        if (e.target.checked){
            person.person_date_of_birth=new Date(person.person_date_of_birth as Date) 
            personsControlMap.set(person.idperson || 0, person);
        }
            
        else
            personsControlMap.delete(person.idperson || 0);

         props.setPeople(Array.from(personsControlMap.values()));
        
    }


    return <div className="w-100">
        <label className="float-start fs-5 mb-1" >select people:</label><br />
        <p className="float-start clear-left fs-small  mb-1" >The photos that will be uploaded now will be saved for each person you choose.</p>
        <div className="btn-group flex-wrap w-100 mw-50" role="group" aria-label="Basic checkbox toggle button group">
            <div className="w-100">
                {persons?.map((p: Person) =>
                    <div className="w-40vw" key={p.idperson}>
                        <input type="checkbox" className="btn-check" id={(p.idperson || 0).toString()} autoComplete="off" onChange={e => onChangePersonCheckbox(e, p)} />
                        <label className="btn btn-outline-primary w-100" htmlFor={(p.idperson || 0).toString()}>
                            <PersonDetails setPeople={props.setPeople}   personsControlMap={ personsControlMap}  person={p} ></PersonDetails>
                        </label>
                    </div>)}
                    <div className="btn btn-outline-primary w-100">
                        <AddPersonDialog/>
                    </div>
            </div>
        </div></div>
}