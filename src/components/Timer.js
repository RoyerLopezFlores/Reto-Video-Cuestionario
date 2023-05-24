import React,{useState, useEffect} from "react";

let timer = null;
function Timer({stopVideo}) {
    const [seconds, setSeconds] = useState(120);
    useEffect(() => {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []); 
    useEffect(()=>{
        if(seconds<0){
            clearInterval(timer);
            stopVideo();
        }
    },[seconds])
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return (
      <>
        <h2>{`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}</h2>
      </>
    );
  }
  
  export default Timer;