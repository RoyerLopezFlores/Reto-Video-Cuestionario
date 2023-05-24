import React, {  useState } from 'react'
import ButtonPrincipal from './ButtonPrincipal'
import { Card, CardContent } from '@mui/material'


import VideoManager from './VideoManager';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const divStyle={
    display:'flex',
    cursor:'pointer',
    fontWeight: 'bold',
    fontSize:'1.2em',
    alignItems:'center'
}
export default function VideoComponent({video,
    changePage,nextVideo,previusVideo,changeVideos,completo}) {
    const [reinicio,setReinicio] = useState(false);
    
    const handleSiguiente = (evt) =>{
        
        nextVideo(evt);
        if(video.status===1){
            setReinicio(true);
        }
    }
    return (
    <>
        <div
            style={{width:'65%',margin:'0 auto 10px auto',
            textAlign:'left',
            ...divStyle
            }}
            onClick={changePage} >
            <HomeIcon/> Volver
        </div>
        <Card sx={{width:'65%',margin:'0 auto'}}>
            
            <div style={{
            position:'relative',
            width:'100%',
            aspectRatio:'16/9',margin:'0 auto',
            }}>
                <VideoManager itemVideo={video} 
                changeVideos={changeVideos}
                reiniciar={reinicio}
                setReinicio={setReinicio}
                />   
            </div>
            
            <CardContent sx={{background:'#c4c4c4'}}>
             {video?.pregunta || "No hay pregunta disponible"}
            </CardContent>
        </Card>
        <div style={{width:'60%',
                display:'flex',
                margin:'10px auto 0 auto',
                justifyContent:'space-between'}}>
            <div style={divStyle} onClick={previusVideo}>
                <ArrowBackIcon/>
                 Atras</div>
            {completo?
                <ButtonPrincipal text="Terminar" onClick={changePage}/>:
                <ButtonPrincipal text="Siguiente" onClick={handleSiguiente}/>
            }
        </div>
    </>
        
        
  )
}
