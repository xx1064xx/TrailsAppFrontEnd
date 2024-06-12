import { useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import '../styles/trailView.css'
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
    const [trail, setTrail] = useState<Trail>({
        trailId: "",
        location: "",
        name: "",
        dateAndTime: ""
      });
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
                <div className="trailViewBox">
                    <div className="trailSpecs card">
                        <div className="inlineTrailCardDiv">
                            <div className="trailViewTitle">
                                <h3>Info</h3>
                                <img src="/pen.svg"></img>
                            </div>
                            
                            <div className="trailViewListDiv">
                                <div className="trailViewListInfo">
                                    <img src="/pin.svg"></img>
                                    <p className="ml10">{trail.location}</p>
                                </div>
                                <div className="trailViewListInfo">
                                    <img src="/calendar.svg"></img>
                                    <p className="ml10">{getDate(trail.dateAndTime)}</p>
                                </div>
                                <div className="trailViewListInfo">
                                    <img src="/time.svg"></img>
                                    <p className="ml10">{getTime(trail.dateAndTime)}</p>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="trailWeather card">
                        <div className="inlineTrailCardDiv">
                            <h3>Weather</h3>
                        </div>
                    </div>
                    <div className="trailButtons">
                        <button className="deleteButton">Delete Trail</button>
                    </div>
                    <div className="trailMap card">
                        <div className="inlineTrailCardDiv">
                            <h3>Map</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    );
  };
  
  export default TrailView;