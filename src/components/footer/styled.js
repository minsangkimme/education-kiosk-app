import styled from "styled-components";

export const Nav = styled.div`
  font-family: sans-serif;
  border-top: 6px solid #000;
  background-color: rgba(220,221,215, 0.5);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;

export const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-between;
  padding: 20px 5px;
  margin: 0;
  width: 100%;
`;

export const ListItem = styled.li`
  width: max-content;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemWrap = styled.div`
  display: flex;
  & li {
    margin: 2px;
  }
`;

export const OrderButton = styled.button`
  margin: 5px;
  padding: 7px;
  background: ${(props) => props.color};
  border: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px #c2c2c2;
`;
