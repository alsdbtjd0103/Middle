import { FaMapMarker } from "react-icons/fa";
import styled from "styled-components";

export default function Marker({ index, size }) {
  const colors = {
    0: "green",
    1: "blue",
    2: "purple",
    3: "pink",
    4: "aqua",
    5: "skyblue",
    6: "red",
  };

  return (
    <StyledContainer style={{width:`${size}px`,position:'relative',padding:0,margin:0}}>
      <FaMapMarker size={size} color={colors[index]}></FaMapMarker>
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        fontSize:`${parseInt(size/2)}px`,
        position:'absolute',
        width:'100%',
        height:'100%',
        padding:0,
        margin:0,
        left:'-0.3px',
        fontWeight:300,
      }}>1</div>
    </StyledContainer>
  );
}

const StyledContainer=styled.div`
    display: flex;
    border-style: solid;
`
