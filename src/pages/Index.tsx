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
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749787918/minecraft_aywqrv.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749787125/f_auto,q_auto,fl_progressive/digitized-minecraft_xmihoi.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749787891/morgan_zvn5ky.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749786786/digitized-morgan_nbmuqo.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749787898/explosion_xmzrcj.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749786876/digitized-explosion_2_dtznub.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749787919/Monalisa_qx0rpq.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749786891/digitized-monalisa_uezgzq.png'
    },
    {
      'first': 'https://res.cloudinary.com/ddoc87vbi/image/upload/f_auto,q_auto,fl_progressive/v1749787916/dunk_ja3iue.jpg',
      'digitized': 'https://res.cloudinary.com/ddoc87vbi/image/upload/v1749786948/f_auto,q_auto,fl_progressive/digitized-dunk_htnw9m.png'
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
        <link rel="canonical" href="https://array-psi.vercel.app/" />
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
      <p>Adjust Threshold to add more or less digits.</p>
      <button onClick={handleNavigate}>Enter the Matrix</button>
      <a href="https://www.producthunt.com/products/array-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-array&#0045;3" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=977097&theme=dark&t=1749810912290" alt="Array - AI&#0032;which&#0032;digitizes&#0032;images&#0032;creating&#0032;a&#0032;matrix&#0032;effect&#0046; | Product Hunt" style={{width: '250px', height: '54px;'}} width="250" height="54" /></a>
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
      <button onClick={() => navigate('/privacypolicy')}>Privacy Policy</button>
      <button onClick={() => navigate('/termsandconditions')}>Terms and conditions</button>
    </footer>
    
  </div>
  </>
  )
};

export default Index;
