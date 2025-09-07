import React, { useState, useRef, useEffect, useContext  } from "react";
import First from "../components/UploadButton";
import ImageContainer from '../components/ImageContainer'
import Preset from "../components/Preset";
import SliderComponent from "../components/Slider";
import ToggleButton from "../components/ToggleButton"
import Notify from "../components/notify";
import './home.css'
import './videobackground.css'
import { ClipLoader } from "react-spinners";
import PopupMenu from "../components/Popup";
import { Contexti } from "../components/AppContext";
// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {supabase} from '../auth'
import { addUserToDatabase } from "../auth";
import { Helmet } from "react-helmet";




// interface Props {
//   uid: any;
// }




function blobToBase64(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function inputImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}


// Usage



const Home = () => {
  

  const context = useContext(Contexti)
  if (!context) {
      throw new Error('AppContext must be used within AppProvider');
  }
  
  const [isLoading, setIsLoading] = useState(true);

  const { selectedFile, setSelectedFile, previewUrl, setPreviewUrl, uid, setUID, presetvalue, setPresetValue, activeIndex, setActiveIndex,
    matchBrightness, setMatchBrightness} = context;

    // const navigate = useNavigate()
  

  async function initialize() {
    // try {


    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const user = session.user;
      const user_id = session.user.id
      addUserToDatabase(session)
      setUID(user_id)
      
      if (user.app_metadata.provider === 'email' ) {
        if (user.email) {
          setaccountName(user.email.charAt(0).toUpperCase())
        }
      } else {
        setaccountName(user.user_metadata.picture)
      }
      
    }
    setIsLoading(false)
    // } else {
    //   setIsLoading(false)
    //   navigate('/login')
    // }
    // } catch(error) {
    //   console.log(error)
    //   // console.log('AN ERROR OCCURRED!!!!!!!!!!!')
    //   setIsLoading(false)
    //   navigate('/')
    // }
    
  }
  
  useEffect(() => {
    initialize()
  },[])
  
  
  















  
  
  
  const [accountName, setaccountName] = useState("")
  const [processedImageURL, setProcessedImageURL] = useState<string>("");
  const [threshold, setThreshold] = useState(210);
  const [threshold1, setThreshold1] = useState(120);
  const [threshold2, setThreshold2] = useState(255);
  const [openmenu, setOpenmenu] = useState('close')
  const [img, setImgData] = useState<Blob | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedURL, setSavedURL] = useState<string>("")
  const [inputImage, setInputImage] = useState<any | null>(null)
  const [savingText, setSavingText] = useState("Saving to the Arraverse")
  const [textNotify, setNotificationText] = useState<string | null>(null)
  const [notify, setnotify] = useState(false)
  // const [fullScreenImage, setFullscreenImage] = useState(false)


  

  

  //FUNCTION TO UPLOAD USER'S IMAGE FILE FROM LOCAL STORAGE.
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      let blob = URL.createObjectURL(file)
      setPreviewUrl(blob);
      const base64 = await inputImageToBase64(file);
      setInputImage(base64);
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


    try {
      const response = await fetch("/api/huggingface", {
        method: "POST",
        body: formData
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageURL(imageUrl);
      setImgData(blob)
    } catch (err) {
      console.error(err);
      setNotificationText("Upload failed.");
      setnotify(true)
    }
    console.log('Stop loading animation dammit!!!')
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
      "name": "Code Red",
      "img": "/tiger-red.png"
    },
    {
      "name": "Code Blue",
      "img": "/tiger-blue.jpeg"
    },
    {
      "name": "Blend",
      "img": "/tiger-blend.jpeg"
    },
    {
      "name": "Minesweeper",
      "img": "/tiger-minesweeper.jpeg"
    },
    {
      "name": "Glitter",
      "img": "/tiger-dots.jpeg"
    },
    {
      "name": "Cosmic Glitter",
      "img": "/tiger-cosmicglitter.jpeg"
    },
    {
      "name": "Black Dots",
      "img": "/tiger-blackdots.jpeg"
    },
    {
      "name": "Black Cube",
      "img": "/tiger-cube.jpeg"
    },
    {
      "name": "Shandora",
      "img": "/tiger-shandora.jpeg"
    },
    {
      "name": "Red Brick",
      "img": "/tiger-redbrick.jpeg"
    },
    {
      "name": "Pixel Art",
      "img": "/tiger-pixel.jpeg"
    },
    {
      "name": "Sand Man",
      "img": "/tiger-sand.jpeg"
    },
    {
      "name": "White Sand",
      "img": "/tiger-whitesand.jpeg"
    },
    {
      "name": "Sky Entity",
      "img": "/tiger-sky.jpeg"
    },
    {
      "name": "Galaxy Impact",
      "img": "/tiger-cosmic.png"
    },
    {
      "name": "Bar Code",
      "img": "/tiger-barcode.jpeg"
    },
    {
      "name": "Americana",
      "img": "/tiger-americana.jpeg"
    },
    {
      "name": "Indiana",
      "img": "/tiger-indiana.jpeg"
    },
    {
      "name": "Britainnia",
      "img": "/tiger-britainnia.jpeg"
    },
    {
      "name": "Canadino",
      "img": "/tiger-canadino.jpeg"
    }
  ]
  const exceptions = [
    15,
    16
  ]
  const signinrequired = [
    7, 8, 13, 14, 17, 19, 20, 21, 22, 23
  ]





  const cloudinaryUpload = async () => {
    if (!processedImageURL) return;
    if (uid === null) {
      setNotificationText('You have to be signed in to save this image.')
      setnotify(true)
      return
    }
    setIsSaving(true)
    setSavingText('Saving to the Arraverse')
    try{

      const base64DataUri = await blobToBase64(img);

      await fetch("/api/cloudupload", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ image: [base64DataUri, inputImage], uid: uid, url: previewUrl })

      }).then(response => response.json())
      .then(data => {

        setSavedURL(data.url)
        setNotificationText('Saved to the Arraverse')
        setnotify(true)
        setIsSaving(false)
      })
      .catch(error => {
        console.error('Error:', error);
        setSavingText('Failed to save')
        setIsSaving(false)
      });

      

    } catch (err) {
      console.log(err)
      setSavingText('Failed to save')
      setIsSaving(false)
    }
    
    
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
    if (signinrequired.includes(idx)) {
      setPresetValue('Matrix')
      setActiveIndex(0)
      setNotificationText('You need to be signed in to use this style.')
      setnotify(true)
      return
    }
    setPresetValue(val)
    setActiveIndex(idx)
    console.log("Active Index", idx)
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
        if (savingText === 'Saved to the Arraverse') {
          setIsSaving(false);
        }
        if (textNotify !== null) {
          console.log('IT WASNT EMPTY!!!!')
          setNotificationText(null)
        } else {
          console.log(textNotify, 'IT IS EMPTY DAMMIT')
          setnotify(false)
        }

      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {

    return <div className="loading-container">
      <ClipLoader color="green" size={35} />
      <p>Entering the matrix...</p>
    </div>
  }

  return (
    <>
      <Helmet>
        <title>Image Filter AI</title>
        <meta name="description" content="Apply awesome filters to your images." />
        <link rel="canonical" href="https://array-psi.vercel.app/home" />
      </Helmet>
    
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
        
        <Notify open={notify} text={textNotify} />

        <div className="top-bar">
            <button className="styles" onClick={() => setOpenmenu('open')}>Styles</button>
            <div className="profile" onClick={() => setopenpop(true)}>{
            accountName.length === 1 ? accountName : <img src={accountName} alt="" />
            }</div>
            <PopupMenu open={openpop} ref={popupmenuRef} />
        </div>

        {/* {
          fullScreenImage &&
          <div className="image-overlay">
            <button onClick={() => setFullscreenImage(false)}>Close</button>
            <img src={processedImageURL} alt="" />
          </div>
        } */}

        <div className="overlay" onClick={() => setOpenmenu('close')} 
        style={{ display: openmenu === 'close' ? 'none' : 'block' }}></div>
        <Preset open={openmenu}>
          <div className="style-top">
            <button className="close-style-menu" onClick={() => setOpenmenu('close')}>Close</button>
            <h3>Choose Style</h3>
          </div>
          <ul>
              {items.map((item, index) => (<li className="preset-item" key={index} onClick={() => changeVal(item.name, index)}
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
              {
                activeIndex < 17 &&
                <div>
                  <SliderComponent background='rgb(0,100,0)' id={2} increaseThreshold={(e) => changeThreshold(e, '2')} value={threshold1} />
                    {exceptions.includes(activeIndex) == false && <SliderComponent background='rgb(0,50,0)' id={3} increaseThreshold={(e) => changeThreshold(e, '3')} value={threshold2} />}
                </div>
              }
          </div>
          {isSaving && 
            <div className="saving-container">
              <ClipLoader color="green" size={30} />
              <p>{savingText}</p>
            </div>
          
          }
          <button id="digitize" className="digitize" onClick={() => handleUpload()}>Digitize</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;



















