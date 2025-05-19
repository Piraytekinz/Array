import './UploadButton.css'


interface Props {
    onInteract: () => void;
}

const UploadButton = ({onInteract}: Props) => {
  return (
    <div className='upload' onClick={onInteract}><p>+</p></div>
  )
}

export default UploadButton
