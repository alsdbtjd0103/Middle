import { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import InputModal from "../components/InputModal";
import { UserContext } from "../store/UserContext";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function MainPage() {
  const userCtx = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();
  const ModalHandler = () => {
    setOpen((previous) => !previous);
  };

  const submitHandler = (e) => {
    if (userCtx.users.length < 2) {
      alert("두 개 이상 등록해주세요!");
      return;
    }
    var queryString = '/find';
    // userCtx.users.map((user) => queryString+=`id=${user.info.id}&`)
    // queryString = queryString.substring(0,queryString.length-1);
    // console.log(queryString);
    navigation(queryString);
    return;
  };

  const tempHandler = () => {
    navigation("/temp");
    return;
  }

  return (
    <RootContainer>
      <StyledHeader>우리 지금 만나</StyledHeader>

      <BannerText>
        <span>우리</span>
        <span>지금 만나</span>
      </BannerText>

      <InputModal isOpen={open} setOpen={ModalHandler} />
      <hr style={{ width: "100%" }}></hr>
      <ButtonContainer
        style={{ justifyContent: "flex-end", padding: "10px 20px 0px 0px" }}
      >
        <AiFillPlusCircle size={50} onClick={ModalHandler}></AiFillPlusCircle>
      </ButtonContainer>
      <StyledList>
        {userCtx.users.map((user) => {
          const deleteHandler = () => {
            userCtx.deleteUser(user.id);
          };
          return (
            <StyledItem key={user.id}>
              <div
                style={{
                  textAlign: "center",
                  width: "100px",
                  overflow: "hidden",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  backgroundColor: "black",
                }}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "100%",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {user.name}
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "200px",
                  overflow: "hidden",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  backgroundColor: "white",
                  borderStyle: "solid",
                }}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "100%",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  {user.region}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContents: "center",
                  alignItems: "center",
                  width: "20px",
                  cursor: "pointer",
                }}
              >
                <FiX size={20} onClick={deleteHandler}></FiX>
              </div>
            </StyledItem>
          );
        })}
      </StyledList>

      <ButtonContainer>
        <SearchButton onClick={submitHandler}>중간 찾기</SearchButton>
      </ButtonContainer>
    </RootContainer>
  );
}

export default MainPage;

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: white;
`;
const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #030303;
  justify-content: center;
  align-items: center;
  color: white;
`;

const BannerText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  height: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  :hover {
    opacity: 0.75;
  }
`;

const SearchButton = styled.button`
  width: 80%;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  border-width: 0;
`;

const StyledList = styled.ul`
  display: flex;
  width: 100%;
  padding: 0;
  list-style-type: none;
  flex-direction: column;
  margin-top: 10px;
  overflow: scroll;
  height:35%;
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 10px 5px 10px;
  margin: 0;
  justify-content: space-evenly;
`;
