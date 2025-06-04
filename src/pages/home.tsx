import React, { useState, useRef, useEffect, useContext  } from "react";
import First from "../components/UploadButton";
import ImageContainer from '../components/ImageContainer'
import Preset from "../components/Preset";
import SliderComponent from "../components/Slider";
import ToggleButton from "../components/ToggleButton"
import './home.css'
import './videobackground.css'
import { ClipLoader } from "react-spinners";
import PopupMenu from "../components/Popup";
import { Contexti } from "../components/AppContext";
// import { useNavigate } from "react-router-dom";
// import {supabase} from '../auth'



interface Props {
  uid: any;
}




function blobToBase64(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Usage



const Home = ({uid}: Props) => {

  // const [session, setSession] = useState(null)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   // Check current session on mount
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (!session) {
  //       navigate('/login') // redirect to login if no session
  //     } else {
  //       setSession(session)
  //     }
  //   })

  //   // Listen for auth state changes (login/logout)
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  //     if (!session) {
  //       navigate('/login')
  //     } else {
  //       setSession(session)
  //     }
  //   })

  //   // Cleanup subscription on unmount
  //   return () => subscription.unsubscribe()
  // }, [navigate])

  // if (!session) {
  //   return <div>Loading...</div>
  // }
















  const context = useContext(Contexti)
  if (!context) {
      throw new Error('AppContext must be used within AppProvider');
  }
  const { selectedFile, setSelectedFile, previewUrl, setPreviewUrl } = context;


  
  
  const [presetvalue, setPresetValue] = useState("Matrix");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string>("");
  const [threshold, setThreshold] = useState(210);
  const [threshold1, setThreshold1] = useState(120);
  const [threshold2, setThreshold2] = useState(255);
  const [openmenu, setOpenmenu] = useState('close')
  const [matchBrightness, setMatchBrightness] = useState(false)
  const [img, setImgData] = useState<Blob | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedURL, setSavedURL] = useState<string>("")




  

  //FUNCTION TO UPLOAD USER'S IMAGE FILE FROM LOCAL STORAGE.
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
    formData.append("match_brightness", matchBrightness.toString());
    formData.append("threshold", threshold.toString())
    formData.append("threshold1", threshold1.toString())
    formData.append("threshold2", threshold2.toString())

    startLoadingAnimation()

    console.log(formData)

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageURL(imageUrl);
      setImgData(blob)
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
    },
    {
      "name": "Blend",
      "img": "/tiger-red.png"
    }
  ]





  const cloudinaryUpload = async () => {
    if (!processedImageURL) return;
    setIsSaving(true)
    try{

      const base64DataUri = await blobToBase64(img);


      await fetch("http://localhost:3000/cloudupload", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ image: base64DataUri, uid: uid, url: previewUrl })

      }).then(response => response.json())
      .then(data => {
        console.log(data.url);

        setSavedURL(data.url)
      })
      .catch(error => {
        console.error('Error:', error);
      });

      

    } catch (err) {
      console.log(err)
      alert('Failed to save')
    }
    setIsSaving(false)
    
  }


  const share = async () => {
    if (!img) return;

    const file = new File([img!], 'image.jpeg', { type: img!.type });
    const shareData = {
      title: 'Created with Array.',
      text: 'Check this out!',
      files: [file],
    }

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      cloudinaryUpload()
      navigator.share({
        title: 'Created with Array.',
        text: 'Check this out!',
        url: savedURL
      })
    }

  }



  // FUNCTION TO CHANGE PRESET OR TYPE OF MATRIX EDIT
  // WHILE ACTIVATING THEIR BOX TURNING THE BACKGROUND
  // GREEN
  function changeVal(val: string, idx: number) {
    setPresetValue(val)
    setActiveIndex(idx)
  }





  //FUNCTION TO CHANGE THRESHOLD VALUES
  const changeThreshold = (e: React.ChangeEvent<HTMLInputElement>, val: String) => {
    if (val === '1') {
        setThreshold(Number(e.target.value))
    } else if (val === '2') {
        setThreshold1(Number(e.target.value))
    } else {
        setThreshold2(Number(e.target.value))
    }
    
  };






  //FUNCTION TO DOWNLOAD THE PROCESSED IMAGE.
  function downloadImg(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "processed_image.jpeg");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
  






  // CHANGING THE LOADING TEXT UP ABOVE THE IMAGE CONTAINER.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);;
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
  }, 800);
  };

  const stopLoadingAnimation = () => {
  if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
  }
  setLoadingText("Upload image");
  };

  const setBrightness = (value: boolean) => {
    setMatchBrightness(!value)
  }
  







  //FUNCTION TO SHOW VIDEO BACKGROUND DURING INTERRUPTION
  const [showVideo, setShowVideo] = useState(false);
  const videoRef =  useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.log('Video play was interrupted or failed:', e);
      });
    }
  }, [showVideo]);








  //FUNCTINO TO CLOSE POPUP MENU
  const [openpop, setopenpop] = useState(false);
  const popupmenuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupmenuRef.current && !popupmenuRef.current.contains(e.target as Node)) {
        setopenpop(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        
        

      <div className="top-bar">
          <button className="styles" onClick={() => setOpenmenu('open')}>Styles</button>
          <button className="profile" onClick={() => setopenpop(true)}>A</button>
          <PopupMenu open={openpop} ref={popupmenuRef} />
      </div>

        <div className="overlay" onClick={() => setOpenmenu('close')} 
        style={{ display: openmenu === 'close' ? 'none' : 'block' }}></div>
        <Preset open={openmenu}>
          <h3>Choose Style</h3>
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
          <ToggleButton handleToggler={() => setBrightness(matchBrightness)} state={matchBrightness} />
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
            <div className="save-btn" onClick={() => cloudinaryUpload()}>
              <img src="/save.png" alt="" />
            </div>
            <div className="share-btn" onClick={() => share()}>
              <img src="/share.png" alt="" />
            </div>
            
          </div>
          
          <div className="slider-container">
            <SliderComponent background='rgb(57, 255, 31)' id={1} increaseThreshold={(value) => changeThreshold(value, '1')} value={threshold} />
            <SliderComponent background='rgb(0,100,0)' id={2} increaseThreshold={(e) => changeThreshold(e, '2')} value={threshold1} />
            <SliderComponent background='rgb(0,50,0)' id={3} increaseThreshold={(e) => changeThreshold(e, '3')} value={threshold2} />
          </div>
          {isSaving && 
            <div className="saving-container">
              <ClipLoader color="green" size={30} />
              <p>SAVING</p>
            </div>
          
          }
          <button id="digitize" className="digitize" onClick={handleUpload}>Digitize</button>
        </div>
      </div>
    </div>
  );
}

export default Home;



















