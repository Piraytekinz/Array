// src/context/AppContext.jsx
import React, { createContext, ReactNode, useState } from 'react';

interface Props {
    children: ReactNode
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
}

export const Contexti = createContext<AppContextType | undefined>(undefined);


export function AppProvider({ children }: Props) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [urls, setUrls] = useState([{id: 'none', url: undefined}]);
  const [from, setFrom] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);


  return (
    <Contexti.Provider value={{ uploadedImage, setUploadedImage, urls, setUrls, 
    from, setFrom, selectedFile, setSelectedFile, previewUrl, setPreviewUrl, hasMore, setHasMore }}>
      {children}
    </Contexti.Provider>
  );
}
