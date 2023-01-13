import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";

export default function InformationBox({ place, distance }) {

    const userCtx = useContext(UserContext);
    const users = userCtx.users;
    
    const distanceCalc = (distance) => {
        if (distance>=1000){
            return distance/1000+'km'
        }
        else{
            return distance+'m'
        }
    }
    
  return (
    <BoxContainer number={users.length}>
      <div style={{ fontSize: "18px", fontStyle: "bold" }}>{place.place_name}</div>

      <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{place.address_name}</span>
      
      <UserContainer>
      {users.map((user,index) => {
        return(
        <StyledUser key={index}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <img width={25} height={25} src={`image/marker_${markerColor[index]}.png`} alt={`${user.name}'s image`}></img>
            <span style={{fontSize:'13px',opacity:0.8}}>{user.name}</span>
            </div>
            <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{distance.length>0 ? distanceCalc(parseInt(distance[index].getLength())) : null}</span>
        </StyledUser>
        )
      })}
      </UserContainer>

    </BoxContainer>
  );
}

const markerColor = {
    0: "F56BFF",
    1: "FF6E6E",
    2: "6B6BFF",
    3: "6BFF77",
    4: "6BC4FF",
    5: "FFF56B",
    6: "FFAE6B",
    7: "6BFFCB",
    8: "EB1E55",
  };

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const BoxContainer = styled.div`
    justify-content: flex-start;
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  border-radius: 20px;
  padding: 15px 15px 20px 15px;
  flex-direction: column;
  overflow: scroll;
  cursor: pointer;
  opacity: 1;
  @media (min-width:800px){
    &:hover{
    opacity: 0.9;
  }
  }

  overflow: ${props => props.number>4 ? 'scroll' : 'hidden'};


`;

const StyledUser=styled.span`
    display: flex;
    width:50%;
    justify-content: space-between;
    align-items: center;
    margin:0;
    padding-top:14px;
    padding-left: 5px;
    

`
