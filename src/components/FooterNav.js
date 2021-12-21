import React from 'react';
import AccessibleIcon from "@mui/icons-material/Accessible";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "styled-components";
import {useHistory} from "react-router";


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
  cursor: pointer;
`;

const ItemWrap = styled.div`
  display: flex;
  & li {
    margin: 2px;
  }
`;
const OrderButton = styled.button`
  margin: 5px;
  padding: 7px;
  background: ${(props) => props.color};
  border: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px #c2c2c2;
`
const language = ['한국어', 'English', '日本語', '中國語'];

const FooterNav = ({goBackFunc, showInfo, onClickCancle}) => {
  const getShowButton = (showInfo) => {
    switch (showInfo) {
      case 'language' :
        return (
          <Ul>
            {language.map((lang, i) => (
              <li key={i}>
                <strong>{lang}</strong>
              </li>
            ))}
          </Ul>
        );
      case 'order' :
        return (
          <div>
            <OrderButton color={'#f4f4f4'} onClick={onClickCancle}>취소하기</OrderButton>
            <OrderButton color={'#ffe7e7'}>결제하기</OrderButton>
          </div>
        )
      default:
        return null;
    }
  }

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
            <VolumeUpIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>직원호출</strong>
            </div>
          </ListItem>
          {goBackFunc &&
          <ListItem onClick={goBackFunc}>
            <ArrowBackIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>이전</strong>
            </div>
          </ListItem>
          }
        </Ul>
      </ItemWrap>
      <ItemWrap>
        {getShowButton(showInfo)}
      </ItemWrap>
    </Nav>
  );
};

export default FooterNav;
