import React, { useState, useRef  } from "react";
import First from "../components/UploadButton";
import ImageContainer from '../components/ImageContainer'
import Preset from "../components/Preset";
import SliderComponent from "../components/Slider";
import './home.css'
import './videobackground.css'




const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [presetvalue, setPresetValue] = useState("Matrix");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string>("");
  const [threshold, setThreshold] = useState(210);
  const [threshold1, setThreshold1] = useState(120);
  const [threshold2, setThreshold2] = useState(255);
  const [openmenu, setOpenmenu] = useState('close')



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };


    const handleUpload = async () => {
    if (!selectedFile) return;
    setShowVideo(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("preset", presetvalue);
    formData.append("threshold", threshold.toString())
    formData.append("threshold1", threshold1.toString())
    formData.append("threshold2", threshold2.toString())

    startLoadingAnimation()

    try {
      const response = await fetch("https://arrayverse-arrayverse.hf.space/upload", {
        headers: {
            "Authorization": "Bearer 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"
        },
        method: "POST",
        body: formData
      });
      console.log(response)
      // alert("Uploaded: " + response.data.filename + " " + response.data.preset);

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageURL(imageUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
    stopLoadingAnimation()
    setShowVideo(false);
  };

  const items = [
    {
      "name": "Matrix",
      "img": "/tiger-matrix.png"
    },
    {
      "name": "White",
      "img": "/tiger-white.png"
    },
    {
      "name": "White-inverse",
      "img": "/tiger-white-inv.png"
    },
    {
      "name": "Danger",
      "img": "/tiger-red.png"
    }
  ]




  // FUNCTION TO CHANGE PRESET OR TYPE OF MATRIX EDIT
  // WHILE ACTIVATING THEIR BOX TURNING THE BACKGROUND
  // GREEN
  function changeVal(val: string, idx: number) {
    console.log(idx)
    setPresetValue(val)
    setActiveIndex(idx)
  }


  const changeThreshold = (e: React.ChangeEvent<HTMLInputElement>, val: String) => {
    if (val === '1') {
        setThreshold(Number(e.target.value))
    } else if (val === '2') {
        setThreshold1(Number(e.target.value))
    } else {
        setThreshold2(Number(e.target.value))
    }
    
  };


  function downloadImg(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "processed_image.png"); // 💾 File name
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Optionally revoke the object URL to release memory
    window.URL.revokeObjectURL(url);
  }
  


  // CHANGING THE LOADING TEXT UP ABOVE THE IMAGE CONTAINER.
  const intervalRef = useRef<number  | null>(null);
  const [loadingText, setLoadingText] = useState("Upload image");

  const loadingMessages = [
  "Processing",
  "Process%n9",
  "Pr0c3551n9",
  "PЯØCΞSSIΠG",
  ];

  const startLoadingAnimation = () => {
  let i = 0;
  setLoadingText(loadingMessages[0]);

  intervalRef.current = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[i]);
  }, 800); // Change every 800ms
  };

  const stopLoadingAnimation = () => {
  if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
  }
  setLoadingText("Upload image");
  };

  

  const [showVideo, setShowVideo] = useState(false);
  const videoRef =  useRef<HTMLVideoElement | null>(null);

  if (videoRef.current) {
    videoRef.current.play();
  }

//   const toggleVideo = () => {
//     // if (showVideo) {
//     //   videoRef.current.pause();
//     // } else {
//     //   videoRef.current.play();
//     // }
    
//   };

  return (
    <div className='behind'>
      
      {
        showVideo &&
        <video
            ref={videoRef}
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
        >
          <source src="/matrix-background.mp4" type="video/mp4" />
        </video>
      }
      




      <div className="app">
        

        <button className="menu" onClick={() => setOpenmenu('open')}>Presets</button>
        <div className="overlay" onClick={() => setOpenmenu('close')} 
        style={{ display: openmenu === 'close' ? 'none' : 'block' }}></div>
        <Preset open={openmenu}>
          <h3>Choose Preset</h3>
          <ul>
              {items.map((item, index) => (<li key={index} onClick={() => changeVal(item.name, index)}
                  style={{backgroundColor : activeIndex === index ? "rgb(57, 255, 31)" : "#000000",
                  }}>
                  <img src={item.img} alt="" />
                  <p
                    style={{color: activeIndex === index ? "black" : "white"}}
                  >{item.name}</p>
              </li>))}
          </ul>
        </Preset>
        <div className="main">
          <h2>{loadingText}</h2>
          <input type="file" accept="image/*,video/*" onChange={handleFileChange} id="file" style={{"display": "none"}}/>

          <ImageContainer>
              {/* {previewUrl && (
                  selectedFile?.type.startsWith("image") ? (
                      <img src={previewUrl} alt="Preview" width={300} />
                      ) : (
                      <video src={previewUrl} width={300} controls />
                  )
              )} */}
              {processedImageURL && (<img src={processedImageURL} alt="Preview" width={300} />)}
          </ImageContainer>
              
          
          <div className="button-container">
            <First onInteract={() => document.getElementById('file')?.click()} />
            <div className="input-image">
              {previewUrl && (<img src={previewUrl} alt="." />)}
            </div>
            <div className="download-btn" onClick={() => downloadImg(processedImageURL)}>
              <img src="/direct-download.png" alt="" />
            </div>
          </div>
          <div className="slider-container">
            <SliderComponent id={1} increaseThreshold={(e) => changeThreshold(e, '1')} value={threshold} />
            <SliderComponent id={2} increaseThreshold={(e) => changeThreshold(e, '2')} value={threshold1} />
            <SliderComponent id={3} increaseThreshold={(e) => changeThreshold(e, '3')} value={threshold2} />
          </div>
          <button id="digitize" className="digitize" onClick={handleUpload}>Digitize</button>
        </div>
      </div>
    </div>
  );
}

export default Home;



















