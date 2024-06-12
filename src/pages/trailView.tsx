import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../componnents/navbar";
import SpaceField from "../componnents/space";
import Footer from "../componnents/footer";

import '../styles/footer.css'
import TrailView from "../componnents/trailView";

function TrailViewPage() {

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
        <TrailView/> {}
        <Footer/> {}
        
      </div>
    );
  };
  
  export default TrailViewPage;