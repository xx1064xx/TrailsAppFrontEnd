import { useEffect, useState} from "react";
import '../styles/trailView.css'
import { useParams, useNavigate } from 'react-router-dom';

import { getTime, getDate } from '../functions/dateAndTime';

interface Trail {
    trailId: string;
    location: string;
    name: string;
    dateAndTime: string;
  }
  
  function TrailView() {
    const token = localStorage.getItem("jwt-token");
    const { id } = useParams<{ id: string }>();
    const [trail, setTrail] = useState<Trail>({
      trailId: "",
      location: "",
      name: "",
      dateAndTime: "",
    });
    let navigate = useNavigate();
    const [content, setContent] = useState(<div />);
  
    let isInitial = true;

    const cancel = () => {
        window.location.reload();
    };

    const deleteTrailFinally = async () => {
        try {
          const response = await fetch(
            "https://localhost:7052/api/Trail/delete/" + id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          if (response.ok) {
            navigate(`/Trails`);
          }
      
          const deletedTrail = await response.json();
          console.log(deletedTrail);
      
        } catch (error) {
          console.error("Error fetching the weather data: ", error);
        }
      };

  
    const deleteTrail = () => {
        setContent(<div className="deleteConfirm">
            <h2>Delete Trail?</h2>
            <div className="cancelDeleteButtonDiv">
                <button className="secondaryButton" onClick={cancel}>Cancel</button>
                <button className="deleteButton" onClick={deleteTrailFinally}>Delete</button>
            </div>
        </div>);
    };
  
    useEffect(() => {
      const effectFunction = async () => {
        if (isInitial) {
          isInitial = false;
  
          try {
            const response = await fetch(
              "https://localhost:7052/api/Trail/getTrail/" + id,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            const data = (await response.json()) as Trail;
  
            console.log(data);
            setTrail(data);
            setContent(getContent(data));

          } catch (error) {
            console.error("Error fetching the weather data: ", error);
          }
        }
      };
  
      effectFunction();
    }, []);
  
    const getContent = (data: Trail) => (
      <div className="trailViewBox">
        <div className="trailSpecs card">
          <div className="inlineTrailCardDiv">
            <div className="trailViewTitle">
              <h3>Info</h3>
              <img src="/pen.svg" />
            </div>
  
            <div className="trailViewListDiv">
              <div className="trailViewListInfo">
                <img src="/pin.svg" />
                <p className="ml10">{data.location}</p>
              </div>
              <div className="trailViewListInfo">
                <img src="/calendar.svg" />
                <p className="ml10">{getDate(data.dateAndTime)}</p>
              </div>
              <div className="trailViewListInfo">
                <img src="/time.svg" />
                <p className="ml10">{getTime(data.dateAndTime)}</p>
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
          <button className="deleteButton" onClick={deleteTrail}>
            Delete Trail
          </button>
        </div>
        <div className="trailMap card">
          <div className="inlineTrailCardDiv">
            <h3>Map</h3>
          </div>
        </div>
      </div>
    );
  
    return (
      <div>
        <div className="titleCard">
          <div className="titleInlineCard">
            <h1>{trail?.name}</h1>
          </div>
        </div>
        <div className="contentDiv" id="mainDiv">
          {content}
        </div>
      </div>
    );
  }
  
  export default TrailView;