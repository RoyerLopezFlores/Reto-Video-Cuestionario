
import './App.css';

import { useEffect, useState } from 'react';
import Principal from './components/Principal';
import VideoComponent from './components/VideoComponent';
import { getQuestions } from './res/Recursos';

function App() {
  const [showPrincipal, setShowPrincipal] = useState(false);
  const [videos,setVideos] = useState([]);
  const [indexVideo,setIndexVideo] = useState(0);
  const [completo, setCompleto] = useState(false);
  useEffect(()=>{
    const videos = getQuestions();
    setVideos(videos);
  },[]);
  const changePage = (evt,index = -1) =>{
    evt.preventDefault();
    setShowPrincipal(!showPrincipal);
    if(index==-1) return;
    setIndexVideo(index);
  }
  const nextVideo = (evt) =>{
    evt.preventDefault();
    let i =1
    const lenVideos = videos.length;
    while (i<= lenVideos){
      const actual= (indexVideo+i)%(lenVideos);
      if( videos[actual].status != 1){
        setIndexVideo(actual);
        return;
      }
      i++;
    }
  }
  const previusVideo = (evt) =>{
    evt.preventDefault();
    setIndexVideo((indexVideo-1 + videos.length)%(videos.length));
  }
  const changeVideos = (video) =>{
    const newVideos = videos.map((ev,i)=>{
      if(indexVideo==i) return video;
      return ev;
    });

    const completado = newVideos.reduce((prev,curr)=>{
      return prev & (curr.status == 1)
    },true)
    if(completado) setCompleto(true);
    setVideos(newVideos);

  }
  return (
    <div className='ctn'>
      {showPrincipal?
      <Principal 
        videos={videos}
        changePage = {changePage}
        completo={completo}
      />
      :
      <VideoComponent
        changePage={changePage}
        video = {videos[indexVideo]}
        index = {indexVideo}
        nextVideo={nextVideo}
        previusVideo={previusVideo}
        changeVideos = {changeVideos}
        completo = {completo}

      />}
    </div>
    
  );
}

export default App;
