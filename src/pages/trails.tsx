import { ReactDOM, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Navbar from "../componnents/navbar";
import SpaceField from "../componnents/space";
import TrailTable from "../componnents/trailTable";

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
        <SpaceField/> {}
        <TrailTable/> {}
      </div>
    );
  };
  
  export default TrailsPage;