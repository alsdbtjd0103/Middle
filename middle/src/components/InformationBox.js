import styled from "styled-components"

export default function InformationBox({place,time}){
    return(
        <BoxContainer>
            <div style={{fontSize:'18px'}}>
                {place}
            </div>
            <TimeContainer>
                <span style={{fontSize:"18px",marginRight:'10px',fontStyle:'bold'}}>
                    {time}
                </span>
                <span style={{fontSize:"13px",color:'#9a9a9a'}}>
                이동 시간
                </span>
            </TimeContainer>

        </BoxContainer>
    )
}

const BoxContainer = styled.div`
    display: flex;
    width:100%;
    height:150px;
    background-color: #ffffff;
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    border-radius: 20px;
    padding:20px 10px 20px 10px;
    flex-direction: column;
`

const TimeContainer = styled.div`
    display: flex;
    align-items:flex-end;
    padding-left: 5px;
    
`