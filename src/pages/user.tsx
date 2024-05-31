import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

import Navbar from "../componnents/navbar";
import { getUser } from '../functions/fetch';

interface FetchData {
    firstname: string;
    lastname: string;
}

function UserPage() {

    const token = localStorage.getItem('jwt-token');
    var [userData, setUserData] = useState<FetchData>();
    var [firstname, setFirstName] = useState<string>("test");
    const navigate = useNavigate();
    let isInitial = true;

    useEffect(() => {
        const effectFunction = async () => {
          if (isInitial) {
            isInitial = false;
    
            if (token == null) {
              navigate("/Login");
            } else {
              try {
                const data = await getUser(token) as FetchData;
                console.log(data);
                setFirstName(data.firstname);
                setUserData(data);
              } catch (error) {
                console.error('Failed to fetch user data');
                navigate("/Login");
              }
            }
          }
        };
    
        effectFunction();
      }, [isInitial, token, navigate]);

    

    return (
      <div>
        <Navbar/> {}
        {userData ? (
        <div>{userData.firstname} {userData.lastname}</div>
      ) : (
        <div>Please login</div>
      )}
      
      </div>
    );
  };
  
  export default UserPage;