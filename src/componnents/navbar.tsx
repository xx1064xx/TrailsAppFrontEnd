import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import '../styles/navbar.css';
import '../styles/hamburgerMenu.css';
import { getUser } from '../functions/fetch';

interface FetchData {
  firstname: string;
  lastname: string;
}

function Navbar() {

  const token = localStorage.getItem('jwt-token');
  var [userData, setUserData] = useState<FetchData | null>(null);
  const navigate = useNavigate();
  const hamburgerMenu = document.querySelector('.hamburgerMenu');
  const nav = document.querySelector('.navUl');
  const logo = document.querySelector('.logoDiv');
  const body = document.querySelector('.body');
  const rest = document.querySelector('.rest');
  const framDiv = document.querySelector('.frameDiv');
  let isInitial = true;

  function changeHamburgerMenu() {
    hamburgerMenu?.classList.toggle('active');
    nav?.classList.toggle('active');
    logo?.classList.toggle('active');
    body?.classList.toggle('active');
    rest?.classList.toggle('active');
    framDiv?.classList.toggle('active');
  }

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
      <div>
      <div className="hamburgerMenu" onClick={changeHamburgerMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
      <ul className="navUl">
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