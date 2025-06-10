// src/context/AppContext.jsx
import React, { createContext, ReactNode, useState } from 'react';

interface Props {
    children: ReactNode,
}
type AppContextType = {
    uploadedImage: string | null;
    setUploadedImage: React.Dispatch<React.SetStateAction<null | string>>;
    urls: any[];
    setUrls: React.Dispatch<React.SetStateAction<any[]>>;
    from: number;
    setFrom: React.Dispatch<React.SetStateAction<0 | number>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<true | boolean>>;
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<null | File>>;
    previewUrl: string | ""
    setPreviewUrl: React.Dispatch<React.SetStateAction<"" | string>>;
    uid: any;
    setUID: React.Dispatch<React.SetStateAction<null | any>>;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<0 | number>>;
    matchBrightness: boolean;
    setMatchBrightness: React.Dispatch<React.SetStateAction<false | boolean>>;
    isLoading: boolean | true;
    setisLoading: React.Dispatch<React.SetStateAction<true | boolean>>;
    isSession: boolean | false;
    setisSession: React.Dispatch<React.SetStateAction<false | boolean>>;

}

export const Contexti = createContext<AppContextType | undefined>(undefined);


export function AppProvider({ children }: Props) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [urls, setUrls] = useState([{id: 'none', url: undefined}]);
  const [from, setFrom] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [uid, setUID] = useState<any | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | 0>(0);
  const [matchBrightness, setMatchBrightness] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const [isSession, setisSession] = useState(false)
  
  


  return (
    <Contexti.Provider value={{ uploadedImage, setUploadedImage, urls, setUrls, 
    from, setFrom, selectedFile, setSelectedFile, previewUrl, setPreviewUrl, hasMore, setHasMore, 
    uid, setUID, activeIndex, setActiveIndex, matchBrightness, setMatchBrightness, isLoading, setisLoading,
    isSession, setisSession }}>
      {children}
    </Contexti.Provider>
  );
}
