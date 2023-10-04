import { useState } from "react"

export const PersonDetailsForm = (props:any) => {

    return <div>
        <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control" id="personName" placeholder="person name" name="person_name" required
                value={props.name} onChange={e => props.setName(e.target.value)} />
            <label htmlFor="person_name">person name</label>
        </div> 
         {props.ShowDate &&
        <div className="form-floating mb-3 mt-3">
            <input type="date" className="form-control" id="personBirth" placeholder="person date of birth" name="person_date_of_birth" required
                onChange={e =>{props.setDate(new Date(e.target.value)); console.log("date",new Date(e.target.value))} } />
            <label htmlFor="person_date_of_birth">person date of birth</label>
        </div>}
        <button type="submit" className="btn btn-light" onClick={()=>{
            if( props.setIsShowUpdate)
                props.setIsShowUpdate(false)}
            }>OK</button>
    </div>
}