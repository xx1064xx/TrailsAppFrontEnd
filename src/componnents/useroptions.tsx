import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

import { getUser } from '../functions/fetch';

interface FetchData {
    firstname: string;
    lastname: string;
}

function UserOptions() {

    const token = localStorage.getItem('jwt-token');
    var [userData, setUserData] = useState<FetchData>();
    const navigate = useNavigate();
    let isInitial = true;

    const logOut = () => {
        
        localStorage.removeItem('jwt-token');

        navigate('/');

      };

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
        {userData ? (
        <div>{userData.firstname} {userData.lastname}</div>
      ) : (
        <div>Please login</div>
      )}
    
    <button onClick={logOut}>Ausloggen</button>
      
      </div>
    );
  };
  
  export default UserOptions;