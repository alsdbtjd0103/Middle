
import { useContext, useEffect,useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import MapContainer from '../components/MapContainer';
import { UserContext } from '../store/UserContext';


function FindPage(){
    const userCtx = useContext(UserContext);
    const navigation=useNavigate();
    
    useEffect(() => {        
        if (userCtx.users.length<2){            
            navigation("/");
            return
        }
    },[])

    return(
        <div>
            <MapContainer />
        </div>
    )
}

export default FindPage;