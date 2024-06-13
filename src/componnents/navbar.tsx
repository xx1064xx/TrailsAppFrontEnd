import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import '../styles/navbar.css';
import { getUser } from '../functions/fetch';

interface FetchData {
  firstname: string;
  lastname: string;
}

function Navbar() {

  const token = localStorage.getItem('jwt-token');
  var [userData, setUserData] = useState<FetchData | null>(null);
  const navigate = useNavigate();
  let isInitial = true;

  useEffect(() => {
    const effectFunction = async () => {
      if (isInitial) {
        isInitial = false;

        if (token == null) {
          
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
    <nav>
      <div className="logoDiv">
        <a href="/">
          <img src="/TrailTales.svg" alt="TrailTales Logo"/>
        </a>
        <h1>Trail Tales</h1>
      </div>
      
      <ul>
        <li><a className="white" href="/">Home</a></li>
        <li><a className="white" href="/Trails">Trails</a></li>
        <li>
        {userData ? (
            <a className="white" href="/User">{userData.firstname} {userData.lastname}</a>
          ) : (
            <a className="white" href="/Login">Login</a>
          )}
        </li>
      </ul>

      
      
    </nav>
  );
}

export default Navbar;