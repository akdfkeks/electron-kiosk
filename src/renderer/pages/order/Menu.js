import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_DATA } from "./MainData";

const Menu = () => {
  const [content, setContent] = useState();

  const menuClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
  };

  const selectComponent = {
    setMenu: <Menutab1 />,
    sandwich: <Menutab2 />,
    snacks: <Menutab3 />,
    drinks: <Menutab4 />,
  };

  console.log(content);

  return (
    <div>
      <Container>
        {MAIN_DATA.map((data) => {
          return (
            <Button onClick={menuClickButton} name={data.name} key={data.id}>
              {data.text}
            </Button>
          );
        })}
      </Container>
      {content && <Content>{selectComponent[content]}</Content>}
    </div>
  );
};

export default Menu;

const Container = styled.div`
  ${(props) => props.theme.flex("center", "center")}
  height: 20vh;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin-right: 1rem;
  color: #111111;
  background-color: #eeeeee;
  border-radius: 2rem;
`;

const Content = styled.div`
  ${(props) => props.theme.flex("center", "center")}
  width: 100%;
  height: 100%;
`;
