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
        <li><a href="/">Home</a></li>
        <li><a href="/Trails">Trails</a></li>
      </ul>
      <div className="navLoginButton">
      {userData ? (
          <a href="/User">{userData.firstname} {userData.lastname} →</a>
        ) : (
          <a href="/Login">Login</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;