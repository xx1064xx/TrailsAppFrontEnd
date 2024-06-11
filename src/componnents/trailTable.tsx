import { useEffect, useState} from "react";

import '../styles/trailTable.css'

interface Trail {
    trailId: string;
    location: string;
    name: string;
    dateAndTime: string;
}

function TrailTable() {

    const token = localStorage.getItem('jwt-token');
    let isInitial = true;
    const [trails, setTrails] = useState<Trail[]>([]);

    const getTrail = () => {
        
        console.log("sum");
    };

    const createTrail = () => {
        
      

    };

    useEffect(() => {
        const effectFunction = async () => {
          if (isInitial) {
            isInitial = false;
    
            try {
                const response = await fetch('https://localhost:7052/api/Trail/getTrail', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                const data = (await response.json()) as Trail[];

                console.log(data)
                setTrails(data);
    
        
                } catch (error) {
                console.error('Error fetching the weather data:', error);
        
                }
          }
        };
    
        effectFunction();
      }, []);

    
    

    return (
      <div>
        <div className="buttonCard">
          <div className="buttonInlineCard">
            <h1>Trails</h1>
          </div>
          <div>
            <button onClick={createTrail} className="primaryButton mr10">Add Trail</button>
          </div>
        </div>
        <div className="contentDiv">
          {trails.map((trail) => ( 
              <div className="background" onClick={getTrail} key={trail.trailId}>
                  <div className="content">
                  <h2>{trail.name}</h2>
                  <p>{trail.location}</p>
                  </div>
              </div>
          ))}
        </div>
      </div>
      
        
        
    );
  };
  
  export default TrailTable;