import styled from "styled-components";

import { MdArrowBackIos } from "react-icons/md";
export default function FindHeader({onClick,title}) {
  return (
    <StyleHeader>
      <MdArrowBackIos style={{ position: "fixed", left: "20px" }} size={20} onClick={onClick}/>
      <span>{title}</span>
    </StyleHeader>
  );
}

const StyleHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: white;
  color: black;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
