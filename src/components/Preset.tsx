import './Preset.css'
import { ReactNode } from 'react'


interface Props {
    children: ReactNode;
    open: string;
}

const Preset = ({children, open}: Props) => {



  return (
    <div className='preset-container' style={{ left: open === 'open' ? '0%' : '-100%'}}>
        
      {children}
    </div>
  )
}

export default Preset
