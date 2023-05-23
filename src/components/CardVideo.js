
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
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
const CardComponent = ({changePage,index,pregunta,estado}) => {
   
    return (
      <Card sx={{ width: '21%',marginTop:'20px' }}>
        <div style={{position:'relative'}}>
          <CardMedia
            component="img"
            width={"100%"}
            background='black'
            sx={{aspectRatio:'10/12'}}
            image="ruta_de_la_imagen.jpg"
            alt="Imagen"
            
          />
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
          </Button>*/