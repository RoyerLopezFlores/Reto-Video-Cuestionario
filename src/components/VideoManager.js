
import React, { useEffect,useRef, useState } from 'react'
import {getSupportedMimeTypes,iniciarConfig} from '../res/VideoFunctions';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import VideocamIcon from '@mui/icons-material/Videocam';

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
export default function VideoManager({itemVideo,changeVideos}) {
    const video = useRef(null);
    const videoRepro = useRef(null);
    const [isMostrar,setIsMostrar] = useState(false);
    const [iniciar,setIniciado] = useState(false);
    const [estado,setEstado] = useState(0);
    const [tiempo,setTiempo] = useState(0);
    useEffect( ()=>{
        console.log(video,videoRepro);
        console.log(mimeType);
    },[]);
    useEffect(()=>{
        setEstado(itemVideo?.status||0);
    },[itemVideo])
    const startVideo = async () =>{
        
        const curr = video.current;
        
        if(!iniciar){
            const correct = await iniciarConfig(curr);
            setIniciado(correct);
            
        }
        
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
        }
        mediaRecorder.ondataavailable = (evt) =>{
            console.log('handleDataAvailable', evt);
            if(evt.data && evt.data.size>0){
                recordedBlobs.push(evt.data);
            }
        }
        mediaRecorder.start();
        curr.play();
        videoRepro.current.pause();

        setIsMostrar(false);
        console.log('MediaRecorder started', mediaRecorder);
        
    }
    const stopVideo = () =>{
        mediaRecorder.stop();
        console.log("QUeee");
    }
    const reproducirVideo = () =>{
        setIsMostrar(true);
        const superBuffer = new Blob(recordedBlobs,{type: mimeType});
        const curr = videoRepro.current;
        curr.srcObject = null;
        curr.src = null;
        curr.src = URL.createObjectURL(superBuffer);
        video.current.pause();
        //curr.src = window.URL.createObjectURL(superBuffer);
        //curr.play();
    }
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
            {tiempo}
            <VideocamIcon className='parpadeo' sx={{color:'red'}}/>
        </div>:null}
    

    <div>
        <button id="start" onClick={startVideo}>Start camera</button>
        <button onClick={stopVideo}>Detener</button>
        <button onClick={reproducirVideo}>Reproducir</button>
        <button id="record" disabled>Start Recording</button>
        <button id="play" disabled>Play</button>
        <button id="download" disabled>Download</button>
    </div>

    </>
  )
}
