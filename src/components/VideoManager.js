
import React, { useEffect,useRef, useState } from 'react'
import {getSupportedMimeTypes,iniciarConfig} from '../res/VideoFunctions';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import VideocamIcon from '@mui/icons-material/Videocam';
import Timer from './Timer';

const mimeType = getSupportedMimeTypes()[1];
const options = {mimeType};
let mediaRecorder;
let recordedBlobs = [];
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
export default function VideoManager({itemVideo,
    changeVideos,reiniciar,setReinicio}) {
    const video = useRef(null);
    const videoRepro = useRef(null);
    const [isMostrar,setIsMostrar] = useState(false);
    const [enviar,setEnviar] = useState(false);
    const [estado,setEstado] = useState(0);
    const [tiempo,setTiempo] = useState(0);
    useEffect( ()=>{
        startVideo();
        setEstado(itemVideo?.status||0);
        
    },[]);
    useEffect(()=>{
        if(enviar){
            changeVideos({...itemVideo,status:1,data:recordedBlobs});
            setEnviar(false);
        }
    },[enviar]);
    useEffect(()=>{

        if(itemVideo?.status == 1){
            setEstado(1);
            reproduccionDefault(itemVideo.data);
        }
    },[itemVideo]);
    useEffect(()=>{
        if(reiniciar){
            pausarVideo();
            setEstado(0);
        }
            
    },[reiniciar])
    const startVideo = async () =>{
        const curr = video.current;
        await iniciarConfig(curr);
        try{
            mediaRecorder = new MediaRecorder(window.stream, options);
            recordedBlobs = [];
        }catch (e){
            console.log(e);
            return;
        }
        mediaRecorder.onstop = (evt) =>{
            console.log('Recorder stopped: ', evt);
            console.log('Recorded Blobs: ', recordedBlobs);
            reproducirVideo(recordedBlobs);
        }
        mediaRecorder.ondataavailable = (evt) =>{
            console.log('handleDataAvailable', evt);
            if(evt.data && evt.data.size>0){
                recordedBlobs.push(evt.data);
            }
        }
    }
    
    const grabarVideo = () =>{
        recordedBlobs = [];
        mediaRecorder.start();
        videoRepro.current.pause();
        videoRepro.current.style.display = 'none';
        video.current.style.display = 'block';
        
    }
    const stopVideo = () =>{
        mediaRecorder.stop();
        
    }
    const pausarVideo  =() =>{
        videoRepro.current.pause();
        videoRepro.current.style.display = 'none';
        video.current.style.display = 'block';

    }
    const reproduccionDefault = (blobs)=>{
        const superBuffer = new Blob(blobs,{type: mimeType});
        const curr = videoRepro.current;
        curr.srcObject = null;
        curr.src = null;
        curr.src = URL.createObjectURL(superBuffer);
        videoRepro.current.style.display = 'block';
        video.current.style.display = 'none';
    }
    const reproducirVideo = (blobs) =>{
        
        const superBuffer = new Blob(blobs,{type: mimeType});
        const curr = videoRepro.current;
        curr.srcObject = null;
        curr.src = null;
        curr.src = URL.createObjectURL(superBuffer);
        videoRepro.current.style.display = 'block';
        video.current.style.display = 'none';
        setEnviar(true);
    }
    const changeStatus = (evt) =>{
        evt?.preventDefault();
        
        if(estado == 2){
            setReinicio(false);
            stopVideo();
        }
        if(estado === 0){
            grabarVideo();
            setEstado(2);
        }
        if(estado === 1) {
            setEstado(0);
            pausarVideo();
        }
        setTiempo(0);
        
    }
    console.log(itemVideo,estado);
    return (
    <>
    
    <video id="gum" ref={video} 
    playsInline={true} autoPlay={true}  muted
    style={{width:'100%', aspectRatio:'16/9',
    display:(isMostrar?"none":"block")}}
    ></video>
    <video ref={videoRepro} 
    playsInline={true} autoPlay={true} loop
    style={{width:'100%', aspectRatio:'16/9',
    display:(!isMostrar?"none":"block")}}
    ></video>
        <IconButton style={buttonStyle}
        onClick={changeStatus}>
            {estado===0?<PlayArrowIcon style={iconStyle} fontSize='large'/>:null}
            {estado === 1? <ReplayIcon style={iconStyle} fontSize='large' />:null}
            {estado === 2? <StopIcon style={iconStyle} fontSize='large' />:null}
        </IconButton>
        {estado == 2? <div style={temporizadorStyle}>
            <Timer stopVideo={changeStatus}/>
            <VideocamIcon className='parpadeo' sx={{color:'red'}}/>
        </div>:null}
    

    

    </>
  )
}
/**
 <div>
        <button onClick={grabarVideo}>Start camera</button>
        <button onClick={(evt)=>{evt.preventDefault(); stopVideo()}}>Detener</button>
        <button onClick={(evt)=>{evt.preventDefault();reproducirVideo(recordedBlobs)}}>Reproducir</button>
    </div>
 */