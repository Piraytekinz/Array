import { ReactNode } from 'react';
import './ImageContainer.css'


interface Props {
    children: ReactNode;
}

const ImageContainer = ({children}: Props) => {
  return (
    <div className="image-container">{children}</div>
  )
}

export default ImageContainer
