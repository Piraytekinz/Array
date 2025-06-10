import { supabase } from "../auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Contexti } from "../components/AppContext";
import { ClipLoader } from "react-spinners";
import './loading.css'


const Loading = () => {
    const context = useContext(Contexti)
    if (!context) {
        throw new Error('AppContext must be used within AppProvider');
    }
    

    const { setisLoading, setisSession } = context;



    const navigate = useNavigate()
    async function handleNavigate() {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            console.log("SESSSSIONNN", session)
            setisLoading(false)
            setisSession(true)
            navigate('/home')
        } else { 
            setisLoading(false)
            setisSession(false)
            navigate('/login')
        }
        setisLoading(true)

    }
        

    handleNavigate()
  return (
    <div className="loading-container">
      <ClipLoader color="green" size={35} />
      <p>Entering the matrix...</p>
    </div>
  )
}

export default Loading
