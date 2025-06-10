import './Popup.css'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../auth';
import { useContext } from 'react';
import { Contexti } from './AppContext';

interface Props {
    open: boolean;
    ref: any;
}


export default function PopupMenu({open, ref}: Props) {

  const context = useContext(Contexti)
    if (!context) {
        throw new Error('AppContext must be used within AppProvider');
    }
    
  
    const { setisSession } = context;

    const navigator = useNavigate()

    const logout = async () => {
        console.log('LOGGING OUTTA HERE!')
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) {
            alert ("Failed to logout.")
            return
        }
        navigator('/login')
        setisSession(false)
    }

  return (
    <div className="popup-share-container" ref={ref}>
      {/* <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Menu
      </button> */}

      {open && (
        <div className="popup-share">
          <ul className="p-2">
            <li className="p-2" onClick={() => navigator("/login")}>Switch account</li>
            <li className="p-2" onClick={() => logout()}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}
