
import { useContext, useEffect,useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import styled from 'styled-components';
import FindHeader from '../components/FindHeader';
import MapContainer from '../components/MapContainer';
import { UserContext } from '../store/UserContext';


function FindPage(){
    const userCtx = useContext(UserContext);
    const navigation=useNavigate();

    function goBack(){
        navigation(-1); 
    }

    function goHome(){
        navigation("/")
    }
    
    useEffect(() => {        
        if (userCtx.users.length<2){  
            window.kakao.maps.load(() => {
                goHome();
            })          

        }
    })

    return(
        <StyledContainer>
            <FindHeader onClick={goBack} title={'중간장소 찾기'}/>
            <MapContainer />
        </StyledContainer>
    )
}

export default FindPage;

const StyledContainer = styled.div`
    
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
`

