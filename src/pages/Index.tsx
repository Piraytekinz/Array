import React from 'react';
import './Index.css'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Index: React.FC = () => {

  const images = [
    {
      'first': '/index/ship.jpeg',
      'digitized': '/index/digitized-ship.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749787897/gun_bgxeys.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749786824/digitized-gun_fcmtfz.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749785812/blackhole_gaarfb.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749785887/digitized-blackhole_lo6upk.png'
    },
    {
      'first': '/index/michael.jpg',
      'digitized': '/index/glitter-michael.jpeg'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749787891/morgan_zvn5ky.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749786786/digitized-morgan_nbmuqo.png'
    },
    {
      'first': '/index/Superman.jpg',
      'digitized': '/index/supermerica.jpeg'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749787919/Monalisa_qx0rpq.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749786891/digitized-monalisa_uezgzq.png'
    },
    {
      'first': '/index/afghan.jpg',
      'digitized': '/index/cosmic-afghan.jpeg'
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

  return (
    <>
      <Helmet>
        <title>Array</title>
        <link rel="canonical" href="https://array-psi.vercel.app/" />
        <meta name="description" content="Turn your images into awesome particle effects." />
      </Helmet>
    
    <div className='main-container'>
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
      <p>Turn your images into awesome effects.</p>
      <button onClick={handleNavigate}>Enter the Matrix</button>
    </div>
    <section>
      <p>Somewhere in Hilbert's space, there are universes made up of different particles. Just like how atoms make up our universe.</p>
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
      <button onClick={() => navigate('/privacypolicy')}>Privacy Policy</button>
      <button onClick={() => navigate('/termsandconditions')}>Terms and conditions</button>
    </footer>
    
  </div>
  </>
  )
};

export default Index;
