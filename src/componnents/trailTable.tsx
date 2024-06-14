import { useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import '../styles/trailTable.css'

import { getTime, getDate } from '../functions/dateAndTime';

interface Trail {
    trailId: string;
    location: string;
    name: string;
    dateAndTime: string;
}

interface CreateTrail {
  location: string;
  name: string;
  date: string;
  time: string;
}

function TrailTable() {

    const token = localStorage.getItem('jwt-token');
    let isInitial = true;
    const [trails, setTrails] = useState<Trail[]>([]);
    let navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    const [credentials, setCredentials] = useState<CreateTrail>({
        location: '',
        name: '',
        date: '',
        time: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({
        ...credentials,
        [event.target.name]: event.target.value,
      });
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {

        const dateAndTime = `${credentials.date}T${credentials.time}`;

        const response = await fetch('https://localhost:7052/api/Trail/createTrail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            Location: credentials.location,
            Name: credentials.name,
            DateAndTime: dateAndTime,
        }),
        });

        if (response.ok) {
          window.location.reload();
        }

        
  
      } catch (error: any) {
        console.log("du mongo")
      }
    };

    const handleTrailClick = (trailId: string) => {
      navigate(`/TrailView/${trailId}`);
    };

    function getBackgroundClass(dateAndTime: string) {

      const existingDateTime: Date = new Date(dateAndTime);

      if(existingDateTime > currentDateTime){
        return 'background now';
      }
      else{
        return 'background past';
      }



    }

    useEffect(() => {
        const effectFunction = async () => {
          if (isInitial) {
            isInitial = false;
            
            const now = new Date();
            setCurrentDateTime(now);
            console.log(currentDateTime);
    
            try {
                const response = await fetch('https://localhost:7052/api/Trail/getTrails', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                

                if (response.ok) {
                  const data = (await response.json()) as Trail[];

                  console.log(data)
                  setTrails(data);
                } else {
                  localStorage.removeItem('jwt-token');
                }
    
        
                } catch (error) {
                
                  localStorage.removeItem('jwt-token');
        
                }
          }
        };
    
        effectFunction();
      }, []);

      

    return (
      <div>
        <div className="titleCard">
          <div className="titleInlineCard">
            <h1>Trails</h1>
          </div>
          
        </div>
        <div className="trailContentDiv">
          <div className="contentDiv">
            {trails.map((trail) => ( 
                <div className={getBackgroundClass(trail.dateAndTime)} onClick={() => handleTrailClick(trail.trailId)} key={trail.trailId}>
                    <div className="content">
                      <div className="trailListDiv">
                        <h3>{trail.name}</h3>
                      </div>
                      <div className="trailListDiv">
                        <div className="trailListInfo">
                          <img src="/pin.svg"></img>
                          <p className="ml10">{trail.location}</p>
                        </div>
                        <div className="trailListInfo">
                          <img src="/cloud.svg"></img>
                        </div>
                      </div>
                      <div className="trailListDiv">
                        <div className="trailListInfo">
                          <img src="/calendar.svg"></img>
                          <p className="ml10">{getDate(trail.dateAndTime)}</p>
                        </div>
                        <div className="trailListInfo">
                          <img src="/time.svg"></img>
                          <p className="ml10">{getTime(trail.dateAndTime)}</p>
                        </div>
                      </div>
                      


                    </div>
                </div>
            ))}
          </div>
          <div className="createDiv">
            <div className="createTrailInline">
              <h2>Create Trail</h2>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb10">
                    <input
                      type="text"
                      name="name"
                      placeholder='Name'
                      value={credentials.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb10">
                    <input
                      type="text"
                      name="location"
                      placeholder='Location'
                      value={credentials.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb10">
                    <input
                      type="date"
                      name="date"
                      placeholder='Date'
                      value={credentials.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb10">
                    <input
                      type="time"
                      name="time"
                      placeholder='Time'
                      value={credentials.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
             
                    <button className="primaryButton" type="submit">Add Trail</button>
          
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        
        
    );
  };
  
  export default TrailTable;