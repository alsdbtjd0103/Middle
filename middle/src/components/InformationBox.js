import styled from "styled-components";

export default function InformationBox({ place, address,distance }) {
  return (
    <BoxContainer>
      <div style={{ fontSize: "18px", fontStyle: "bold" }}>{place}</div>

      <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{address}</span>
      <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{distance}</span>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  border-radius: 20px;
  padding: 20px 10px 20px 10px;
  flex-direction: column;
`;
