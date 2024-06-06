import { useEffect} from "react";


function SkillIssueFlyer() {

  //stellt sicher, dass die styles nur geladen werden, wenn page offen

  useEffect(() => {
    import("../styles/skillIssue.css")
  }, []);
   
    return (
      <div className="skillIssueBackground">
        <h1 className="white">Skill Issue.</h1>
      </div>
    );
  };
  
  export default SkillIssueFlyer;