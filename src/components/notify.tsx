import './notify.css'

interface Props {
    text: String | null,
    open: boolean
}

const Notify = ({text, open}: Props) => {
  return (
    (open &&
    <div className='notify'>
        <p>{text}</p>
    </div>
    )
  )
}

export default Notify
