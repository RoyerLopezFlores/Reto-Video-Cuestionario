import React, { useEffect, useState } from 'react'
import ButtonPrincipal from './ButtonPrincipal'
import { Card, CardContent, CardMedia, IconButton } from '@mui/material'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideoManager from './VideoManager';
const buttonStyle = {
    position: 'absolute',
    bottom: '4%',
    left: '2%',
    height:'45px',
    width:'45px',
    borderRadius: '50%',
    padding:'0',
    backgroundColor: '#8c8c8c',
    
};
const iconStyle = {
    color:'white',
}
const temporizadorStyle = {
    position:'absolute',
    top:'2%',
    right:'20px',
    color:'white',
    display:'flex',
    height:'40px',
    alignItems:'center',
    justifyContent:'space-between',
    fontSize:'0.9em'
}



export default function VideoComponent({video,
    changePage,index,nextVideo,previusVideo,changeVideos,completo}) {
    
    const [estado,setEstado] = useState(0);
    const [tiempo,setTiempo] = useState(0);

    useEffect(()=>{
        setEstado(video?.status||0);
    },[video])
    useEffect(()=>{
        let interval;
        if(estado === 2){
            interval = setInterval(()=>{
                setTiempo( prev => prev+1);
            },1000);
        }
        if(estado!==2){
            clearInterval(interval);
        }
        return ()=>{clearInterval(interval)};
    },[estado]);
    const changeStatus = (evt) =>{
        evt.preventDefault();
        
        if(estado == 2){
            const newVideo = {
                pregunta:video.pregunta,
                status:1
            }
            changeVideos(newVideo);
        }
        if(estado === 0)setEstado(2);
        if(estado === 1) setEstado(0);
        setTiempo(0);

    }
    return (
    <>
        <div 
            style={{width:'65%',margin:'0 auto 10px auto',textAlign:'left'}}
            onClick={changePage} >
            Volver
        </div>
        <Card sx={{width:'65%',margin:'0 auto'}}>
            <div style={{position:'relative'}}>
                <div style={{
                width:'100%',
                aspectRatio:'16/9',margin:'0 auto',
                }}>
                 <VideoManager/>   
                </div>
                
                <IconButton 
                    style={buttonStyle}
                    onClick={changeStatus}
                    >
                    {estado === 0? <PlayArrowIcon style={iconStyle} fontSize='large' 
                       />:null}
                    {estado === 1? <ReplayIcon style={iconStyle} fontSize='large' 
                        />:null}
                    {estado === 2? <StopIcon style={iconStyle} fontSize='large' 
                        />:null}

                </IconButton>
                
                {estado == 2? <div style={temporizadorStyle}>
                    {tiempo}
                    <VideocamIcon className='parpadeo' sx={{color:'red'}}/>
                </div>:null}
            </div>
            <CardContent sx={{background:'#c4c4c4'}}>
             {video?.pregunta || "No hay pregunta disponible"}
            </CardContent>
        </Card>
        <div style={{width:'60%',
                display:'flex',
                margin:'10px auto 0 auto',
                justifyContent:'space-between'}}>
            <div onClick={previusVideo}>Atras</div>
            {completo?<ButtonPrincipal text="Terminar" onClick={changePage}/>:
                <ButtonPrincipal text="Siguiente" onClick={nextVideo}/>
            }
        </div>
    </>
        
        
  )
}