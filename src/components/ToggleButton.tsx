import './ToggleButton.css'

interface Props {
    state: boolean;
    handleToggler: () => void;
}


function ToggleSwitch({state, handleToggler}: Props) {


  return (
    <div className='switch-container'>
        <label className="switch">
            <input type="checkbox" checked={state} onChange={handleToggler} />
            <span className="slider" />
        
        </label>
        <p>Match Brightness. Get similar effect to Gun/Mona Lisa on homepage.</p>
    </div>
    
  );
}

export default ToggleSwitch;
