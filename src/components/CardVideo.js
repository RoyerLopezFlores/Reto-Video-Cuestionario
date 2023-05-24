
import React, { useEffect, useReducer, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import {getSupportedMimeTypes} from '../res/VideoFunctions';
const buttonStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '15px',
    height:'35px',
    width:'35px',
    borderRadius: '50%',
    padding:'0',
    backgroundColor: '#8c8c8c',
    
};
const iconStyle = {
    color:'white'
}
const defaultStyle = {
  width:'100%',
  background:'black',
  aspectRatio:'10/12',
  color:'white',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}
const defaultVideoStyle = {
  width:'100%',
  background:'black',
  aspectRatio:'10/12',
  margin:'0',
  padding:'0'
}
const mimeType = getSupportedMimeTypes()[1];
const CardComponent = ({changePage,index,pregunta,estado,video}) => {
  const videoActual = useRef(null);  
  useEffect(()=>{
      if(estado===1){
        reproducir(video.data);
      }
    },[estado]);
    const reproducir = (blobs)=>{
      const superBuffer = new Blob(blobs,{type: mimeType});
      const curr = videoActual.current;
      curr.src = null;
      curr.srcObject = null;
      curr.src = URL.createObjectURL(superBuffer);
      
    }
    return (
      <Card sx={{ width: '21%',marginTop:'20px',backgroundColor:'black' }}>
        <div style={{position:'relative',margin:'0'}}>
        {video?.status == 1?
        <video ref={videoActual} style={defaultVideoStyle} autoPlay={true}
        muted loop playsInline={true}></video>
        :<div style={defaultStyle}>Graba tu video</div>}  
        <IconButton 
            style={buttonStyle}
            onClick={(evt)=>{changePage(evt,index)}}
            >
            {estado === 1?
              <ReplayIcon style={iconStyle}/>:
              <PlayArrowIcon style={iconStyle}/>
            }
            
        </IconButton>
        </div>
        
        <CardContent sx={{background:'#c4c4c4',height:'100%'}}>
            {pregunta || 'No hay preguntas disponibles'}
        </CardContent>
      </Card>
    );
  }

export default CardComponent;
/*<Button style={buttonStyle} variant="contained">
            <PlayArrowIcon sx={{fontSize: '20px',padding:'0',margin:'0'}}/>
          </Button>
<CardMedia
            component="img"
            width={"100%"}
            background='black'
            sx={{aspectRatio:'10/12'}}
            image="ruta_de_la_imagen.jpg"
            alt="Imagen"
            
          />          


          */