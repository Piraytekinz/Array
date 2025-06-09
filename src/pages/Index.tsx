import React from 'react';
import './Index.css'
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {

  const images = [
    {
      'first': '/index/ship.jpeg',
      'digitized': '/index/digitized-ship.png'
    },
    {
      'first': '/index/gun.jpg',
      'digitized': '/index/digitized-gun.png'
    },
    {
      'first': '/index/blackhole.jpg',
      'digitized': '/index/digitized-blackhole.png'
    },
    {
      'first': '/index/minecraft.jpg',
      'digitized': '/index/digitized-minecraft.png'
    },
    {
      'first': '/index/morgan.jpg',
      'digitized': '/index/digitized-morgan.png'
    },
    {
      'first': '/index/explosion.jpg',
      'digitized': '/index/processed_image (74).png'
    },
    {
      'first': '/index/Monalisa.jpg',
      'digitized': '/index/digitized-monalisa.png'
    },
    {
      'first': '/index/dunk.jpg',
      'digitized': '/index/digitized-dunk.png'
    }
  ]

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/hello')
  //     .then(res => res.json())
  //     .then(data => console.log(data.message));
  // }, []);
  


  const navigate = useNavigate()

  function handleNavigate() {
    navigate('/home')
  }

  return <div className='main-container'>
    <div className="back">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        >
        <source src="/matrix-background.mp4" type="video/mp4" />
      </video>
    </div>
    <div className='content'>
      <h1>ARRAY</h1>
      <p>Adjust Threshold to add more or less digits.</p>
      <button onClick={handleNavigate}>Enter the Matrix</button>
    </div>
    <section>
      <p>Somewhere in Hilbert's space, there's a universe made up of only digits. Just like how atoms make up our universe.</p>
      <div className='rest'>
        {
          images.map((name, index) => <div className="image" key={index}>
            <img src={name['first']} alt="" />
            <img src={name['digitized']} alt="" />
          </div>)
        }
      </div>
    </section>
    <footer>
      <p>By using Array you agree to the</p>
      <button onClick={() => navigate('/privacy')}>Privacy Policy</button>
      <button onClick={() => navigate('/terms')}>Terms and conditions</button>
    </footer>
    
  </div>
};

export default Index;
