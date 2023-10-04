import { DeletePerson } from "./delete_person";
import { UpdatePerson } from "./update_person";
import { useState } from "react";

export const PersonDetails = (props: any) => {
    const person = props.person;
    const dateOfBirth = new Date(person.person_date_of_birth);
    const [isShowUpdate, setIsShowUpdate] = useState(person.isShowUpdate);



    return <div className="card" >
        <div className="card-body row">
            <h5 className="card-title col  ">{person.person_name}</h5>
            {/* <h6 className="card-subtitle mb-2 text-body-secondary">Date of birht: {dateOfBirth.getDate()}/{dateOfBirth.getMonth()}/{dateOfBirth.getFullYear()}</h6> */}
            {/* <div className="row g-3 col"> */}
                <div className="col-md-auto"><button title="edit" type="button" className="btn btn-light" onClick={() =>  setIsShowUpdate(!isShowUpdate)}><i className="bi bi-pencil-square"></i></button></div>
                <div className="col col-lg-2"><DeletePerson setPeople={props.setPeople}  personsControlMap={props. personsControlMap}  id={person.idperson}  /></div>
            {/* </div> */}
        </div>
        {isShowUpdate && <UpdatePerson setIsShowUpdate={setIsShowUpdate} setPeople={props.setPeople}  personsControlMap={props. personsControlMap} person={person} />}

    </div>

}