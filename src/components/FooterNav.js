import React from 'react';
import AccessibleIcon from "@mui/icons-material/Accessible";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styled from "styled-components";


const Nav = styled.div`
  font-family: sans-serif;
  border-top: 6px solid #000;
  background-color: rgba(220,221,215, 0.5);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-between;
  padding: 20px 5px;
  margin: 0;
  width: 100%;
`;

const ListItem = styled.li`
  width: max-content;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemWrap = styled.div`
  display: flex;
  & li {
    margin: 2px;
  }
`;

const FooterNav = () => {
  return (
    <Nav>
      <ItemWrap>
        <Ul>
          <ListItem>
            <AccessibleIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>장애인</strong>
            </div>
          </ListItem>
          <ListItem>
            <ZoomInIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>돋보기</strong>
            </div>
          </ListItem>
          <ListItem>
            <VolumeUpIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}} />
            <div style={{width: 'max-content'}}>
              <strong>직원호출</strong>
            </div>
          </ListItem>
        </Ul>
      </ItemWrap>
      <ItemWrap>
        <Ul>
          <li>
            <strong>한국어</strong>
          </li>
          <li>
            <strong>English</strong>
          </li>
          <li>
            <strong>日本語</strong>
          </li>
          <li>
            <strong>中國語</strong>
          </li>
        </Ul>
      </ItemWrap>
    </Nav>
  );
};

export default FooterNav;
