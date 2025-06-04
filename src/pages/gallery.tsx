import {useEffect} from 'react'
import './gallery.css'
import InfiniteScroll from "react-infinite-scroll-component";
import { supabase } from '../auth';
import { Contexti } from '../components/AppContext'
import { useContext } from 'react';

const PAGE_SIZE = 3; // how many to load at once


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



    // Initial load
    useEffect(() => {
        console.log('using effect like a pro')
        fetchUrls(from);
        // eslint-disable-next-line
    }, []);

    const fetchUrls = async (start: any) => {
        const { data, error } = await supabase
        .from("images")
        .select("id, url, created_at")
        .order("created_at", { ascending: false })
        .range(start, start + PAGE_SIZE - 1);

        if (error) {
        console.error(error);
        return;
        }

        console.log("data:", data)

        if (data.length < PAGE_SIZE) {
            setHasMore(false);
        }

        setUrls((prev) => [...prev, ...data]);
        setFrom(start + PAGE_SIZE);
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

        console.log(blobUrl)

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
        <h2>Welcome to the Arraverse</h2>
        {
            urls &&
            urls.map((item, index) => <div className="arraverse-image-container" key={index}
            >
            <img src={item.url} alt="" />
            <img src={item.url} alt="" />
            <div className="download-img" onClick={() => downloadImg(item.url)}>
                <img src="/download.png" alt="" />
            </div>
            </div>)
        }
    </InfiniteScroll>
  )
}

export default Gallery

// onClick={
//     () => {openImage(name['first'], name['digitized'])}}
