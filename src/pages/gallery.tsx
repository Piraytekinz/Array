import {useEffect, useState} from 'react'
import './gallery.css'
import InfiniteScroll from "react-infinite-scroll-component";
import { supabase } from '../auth';
import { Contexti } from '../components/AppContext'
import { useContext } from 'react';
import { ClipLoader } from "react-spinners";


const PAGE_SIZE = 15; // how many to load at once


const Gallery = () => {

    // const [imageDetails, openImageDetails] = useState<string | undefined>(undefined)
    // const [imageDetails1, open] = useState<string | undefined>(undefined)

    // const openImage = (url1: string, url2: string) => {
    //     openImageDetails(url1)
    //     open(url2)
    // }

    const context = useContext(Contexti);
    if (!context) {
        throw new Error('AppContext must be used within AppProvider');
    }
    const { urls, setUrls, from, setFrom, hasMore, setHasMore } = context;
    const [loading, setLoading] = useState(false)


    // Initial load
    useEffect(() => {
        fetchUrls(from);
        // eslint-disable-next-line
    }, []);

    const fetchUrls = async (start: any) => {
        setLoading(true)
        // console.log(urls)
        let order = false

        if (urls.length > 1) {
            order = true
        } else {
            order = false
        }
        console.log("order", order)
        const { data, error } = await supabase
        .from("images")
        .select("id, url, url1, created_at")
        .order("created_at", { ascending: order })
        .range(start, start + PAGE_SIZE - 1);

        if (error) {
        console.error(error);
        return;
        }
        let newData = data
        for (let i in newData) {
            let idx = newData[i].url.lastIndexOf("upload/")
            let idx1 = newData[i].url1.lastIndexOf("upload/")
            newData[i].url = newData[i].url.slice(0, idx+"upload/".length) + "f_auto,q_auto,fl_progressive/" + newData[i].url.slice(43+"upload/".length)
            newData[i].url1 = newData[i].url1.slice(0, idx1+"upload/".length) + "f_auto,q_auto,fl_progressive/" + newData[i].url1.slice(43+"upload/".length)
        }



        if (newData.length < PAGE_SIZE) {
            setHasMore(false);
        }
        
        setUrls((prev) => [...prev, ...newData]);
        setFrom(start + newData.length);
        setLoading(false)

        console.log(urls)
    };


    // const images = [
    //     {
    //       'first': '/index/ship.jpeg',
    //       'digitized': '/index/digitized-ship.png'
    //     },
    //     {
    //       'first': '/index/gun.jpg',
    //       'digitized': '/index/digitized-gun.png'
    //     },
    //     {
    //       'first': '/index/blackhole.jpg',
    //       'digitized': '/index/digitized-blackhole.png'
    //     },
    //     {
    //       'first': '/index/minecraft.jpg',
    //       'digitized': '/index/digitized-minecraft.png'
    //     },
    //   ]

    async function downloadImg(url: any) {
        const response = await fetch(url, { mode: 'cors' });
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);


        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "processed_image.jpeg");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
      
    

  return (
    <InfiniteScroll
      dataLength={urls.length}
      next={() => fetchUrls(from)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: "center" }}>No more Images.</p>}
      className='neo'
    >
        {/* { imageDetails && <div className="full-image">
            <img src={imageDetails} alt="" />
            <img src={imageDetails1} alt="" />
        </div> } */}
        <h2>Welcome to the <b>Arraverse</b></h2>
        
        {
            urls.length > 0 &&
            urls.map((item, index) => <div className="arraverse-image-container" key={index}
            >
            <img src={item.url1} alt="Progressive" loading='lazy' />
            <img src={item.url} alt="Progressive" loading='lazy' />
            <div className="download-img" onClick={() => downloadImg(item.url)}>
                <img src="/download.png" alt="" />
            </div>
            </div>)
        }
        {loading && 
            <div className="saving-container">
                <ClipLoader color="green" size={30} />
                <p>Loading the Arraverse</p>
            </div>
        }
    </InfiniteScroll>
  )
}

export default Gallery

// onClick={
//     () => {openImage(name['first'], name['digitized'])}}
