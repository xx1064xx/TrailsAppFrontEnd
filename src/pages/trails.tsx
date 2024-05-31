import { ReactDOM, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Navbar from "../componnents/navbar";

function TrailsPage() {

    const token = localStorage.getItem('jwt-token');

    let isInitial = true;
    let navigate = useNavigate();

    useEffect(() => {
    if (isInitial) {
        isInitial = false;

        if (token == null){
            return navigate("/Login");
        }
    }    
    
    },[]);
    

    return (
      <div>
        <Navbar/> {}
        
      </div>
    );
  };
  
  export default TrailsPage;