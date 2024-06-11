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
        <div className="titleCard">
          <div className="titleInlineCard">
            <h1>Trails</h1>
          </div>
          
        </div>
        <div className="trailContentDiv">
          <div className="contentDiv">
            {trails.map((trail) => ( 
                <div className="background" onClick={getTrail} key={trail.trailId}>
                    <div className="content">
                    <h2>{trail.name}</h2>
                      <div className="trailsInfoDiv">
                        <div>
                          <p>Location: {trail.location}</p>
                          <p>Duration: {trail.location}</p>
                        </div>
                        <div>

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
                <form>

                </form>
              </div>
              <div>

              </div>
              <div>
             
                <button onClick={createTrail} className="primaryButton">Add Trail</button>
          
              </div>
            </div>
          </div>
        </div>
      </div>
      
        
        
    );
  };
  
  export default TrailTable;