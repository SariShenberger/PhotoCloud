
import { useRef } from "react";

import ReactToPrint from "react-to-print";


export const Print = (props: any) => {
  let componentRef = useRef(null);


  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <button title="print" type="button" className="btn "><i className="bi bi-printer"></i></button>}
          content={() => componentRef.current}
        />

        <div className="d-none">
          <div ref={(el: any) => (componentRef.current = el)} >
            <img className="w-100 m-0" src={props.url}></img>
          </div>
        </div>
      </div>
    </>
  );
}