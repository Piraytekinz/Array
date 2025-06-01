import React from 'react'
import './gallery.css'

const Gallery: React.FC = () => {

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
      ]

  return (
    <div className='arraverse'>
        <h2>Welcome to the Arraverse</h2>
        {
            images.map((name, index) => <div className="image" key={index}>
            <img src={name['first']} alt="" />
            <img src={name['digitized']} alt="" />
            </div>)
        }
    </div>
  )
}

export default Gallery
