import React, { useEffect, useState, useRef  } from 'react';
import { AiTwotoneSound , AiFillSafetyCertificate } from 'react-icons/ai'
import { SiWorldhealthorganization,  } from 'react-icons/si'
import { MdGppBad, MdDangerous } from 'react-icons/md'
import axios from 'axios'
 
const Home = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        setAudioContext(audioContext);
        setMediaStream(stream);
        setAnalyser(analyser);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    getMicrophoneAccess();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    let animationFrameId;
    let lastUpdateTime = 0;

    const visualize = (timestamp) => {
      if (analyser) {
        if (timestamp - lastUpdateTime >= 140) {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);

          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

          const barWidth = 8;
          const barSpacing = 4;
          const numBars = Math.floor(canvas.width / (barWidth + barSpacing));

          const centerX = canvas.width / 2;
          const startY = canvas.height / 2;

          const maxBarHeight = canvas.height / 2 - 20;

          for (let i = 0; i < numBars; i++) {
            const barHeight = (dataArray[i] / 255) * maxBarHeight;

            const posX = centerX - (numBars / 2 - i) * (barWidth + barSpacing);
            const posY = startY - barHeight;
            const negY = startY + barHeight;

            canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            canvasCtx.fillRect(posX, posY, barWidth, barHeight);
            canvasCtx.fillRect(posX, negY, barWidth, -barHeight);
          }

          lastUpdateTime = timestamp;
        }

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          const value = dataArray[i];
          sum += value * value;
        }

        const rms = Math.sqrt(sum / bufferLength);
        const decibels = parseFloat((20 * Math.log10(rms)).toFixed(0));

        setNoiseLevel(decibels);
      }

      animationFrameId = requestAnimationFrame(visualize);
    };

    animationFrameId = requestAnimationFrame(visualize);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser]);

  useEffect(() => {
    const noiseLevelTimer = setInterval(() => {
      setNoiseLevel(0);
    }, 2000);

    return () => {
      clearInterval(noiseLevelTimer);
    };
  }, []);



  const soundString = () => {
    if(noiseLevel <= 20){
      return "Ticking Clock Noise";
    }
    else if(noiseLevel > 20 && noiseLevel <= 30){
      return "Leaves Crushing Noise";
    }
    else if(noiseLevel > 30 && noiseLevel <= 50){
      return "Average Room Noise";
    }
    else if(noiseLevel > 50 && noiseLevel <= 75){
      return "Average Office Noise";
    }
    else if(noiseLevel > 75 && noiseLevel <= 80){
      alert("noise level above 75 db")
      return "Inside an Airplane";
    }
    else if(noiseLevel > 80 && noiseLevel <= 100){
      alert("noise level above 80 db")
      return "Hairdryer or Rooster";
    }
    else if(noiseLevel > 100 && noiseLevel <= 110){
      alert("noise level above 100 db")
      return "Night Clubs or Dog Barking";
    }
    else if(noiseLevel > 110){
      return "Jack-Hammer or Gunshot";
    }
  }

  const sendNoiseLevelData = () => {
    if (noiseLevel !== 0) {  // Assuming 0 indicates silence
      axios.post('http://localhost:4000/api/one', { value: noiseLevel })
       .then(response => {
          console.log('Noise level data sent successfully' ,response.body);
        })
       .catch(error => {
         console.error('Failed to send noise level data:', error);
       });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendNoiseLevelData();
    }, 2 * 60 * 1000);  // 2 minutes

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='flex flex-col w-full h-full  items-center m-5 mt-10'>
      <canvas ref={canvasRef} width={1000} height={200} style={{ background: 'transparent' }} />
      <div className='text-xl flex flex-col justify-center items-center'>
        <div>Noise Level</div>
        <div className='flex justify-center items-center border border-white px-4 py-4 mt-5 rounded-md hover:border-white hover:text-black hover:bg-white'>{noiseLevel} dB</div>
        <div className='mt-2 flex justify-center items-center px-2 py-4 text-xl gap-3'>
          <AiTwotoneSound></AiTwotoneSound>
          {soundString()}
        </div>
      </div>
      <divc className="flex flex-col justify-center items-center min-w-[30%] min-h-[30%] bg-white rounded-lg ">
        <div className='flex gap-2 justify-center items-center text-lg font-bold text-black mb-5'>
          <div>World Health Organization</div>
          {/* <img src="./whologo.png" alt="WHO Logo" className='w-[40px] h-[40px]' /> */}
          <div className='text-2xl text-blue-600'><SiWorldhealthorganization></SiWorldhealthorganization></div>
        </div>
        <div className='text-gray-700 font-medium flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center gap-5'>
            <div>below 70 decibels</div>
            <div className='text-green-500 text-2xl'><AiFillSafetyCertificate ></AiFillSafetyCertificate></div>
            <div>Safe Levels</div>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <div>between 85 dB and 95 dB</div>
            <div className='text-gray-800 text-2xl'><MdGppBad></MdGppBad></div>
            <div>Moderate Risk Levels</div>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <div>levels above 95 dB</div>
            <div className='text-red-500 text-2xl'><MdDangerous></MdDangerous></div>
            <div>High Risk Levels</div>
          </div>
        </div>
      </divc>
    </div>
  );
}

export default Home
