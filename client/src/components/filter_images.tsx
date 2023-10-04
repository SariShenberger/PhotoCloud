import { useDispatch } from "react-redux"
import { filter } from "../app/features/imageSlice";
import { useNavigate } from "react-router-dom";

export const FilterImages=()=> {

    const navigate=useNavigate();
    const dispatch=useDispatch();

  return  <div className="d-flex w-300px" role="search">  
  <input className="form-control fs-small" type="search" placeholder="Start typing to show images by..." aria-label="Search" onChange={(e)=>{dispatch(filter({filterImgBy:e.target.value }));navigate("show-images");}} />
</div>
    
  
}
