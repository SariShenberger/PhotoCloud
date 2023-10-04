import { PersonDetails } from "./person_details";
import { useSelector } from "react-redux";
export const ShowPersons: React.FC = () => {

    const persons: Person[]=useSelector((state: any)=>{
        return state.personSlice.persons;
    })

    return <div>
        <h3>People</h3>
        {persons?.map((p: Person) => <div className="mt-2">
        <PersonDetails key={p.idperson} person={p}  />
        </div>
        )}
    </div>
}