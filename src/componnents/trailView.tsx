import { useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import '../styles/trailTable.css'
import { useParams } from 'react-router-dom';

import { getTime, getDate } from '../functions/dateAndTime';

interface Trail {
    trailId: string;
    location: string;
    name: string;
    dateAndTime: string;
}

function TrailView() {

    const token = localStorage.getItem('jwt-token');
    const { id } = useParams<{ id: string }>();
    const [trail, setTrail] = useState<Trail>();
    let isInitial = true;
    

    useEffect(() => {
        const effectFunction = async () => {
          if (isInitial) {
            isInitial = false;
            
            try {
                const response = await fetch('https://localhost:7052/api/Trail/getTrail/' + id, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                  
                const data = (await response.json()) as Trail;

                console.log(data)
                setTrail(data);
    
        
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
                    <h1>{trail?.name}</h1>
                </div>
            </div>
            <div className="contentDiv">

            </div>
        </div>
        
        
    );
  };
  
  export default TrailView;