
import { useContext, useEffect,useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import styled from 'styled-components';
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
        <StyledContainer>
            <StyleHeader>중간장소 찾기</StyleHeader>
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

const StyleHeader = styled.div`
    width:100%;
    height:30px;
    background-color: white;
    color: black;
    text-align: center;
`