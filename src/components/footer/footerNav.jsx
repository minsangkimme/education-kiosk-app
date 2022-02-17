import React from 'react';
import AccessibleIcon from "@mui/icons-material/Accessible";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Styled from './styled';

const language = ['한국어', 'English', '日本語', '中國語'];

const FooterNav = ({goBackFunc, showInfo, onClickCancle, goToNext}) => {
  const getShowButton = (showInfo) => {
    switch (showInfo) {
      case 'language' :
        return (
          <Styled.Ul>
            {language.map((lang, i) => (
              <li key={i}>
                <strong>{lang}</strong>
              </li>
            ))}
          </Styled.Ul>
        );
      case 'order' :
        return (
          <div>
            <Styled.OrderButton color={'#f4f4f4'} onClick={onClickCancle}>취소하기</Styled.OrderButton>
            <Styled.OrderButton color={'#ffe7e7'} onClick={goToNext}>결제하기</Styled.OrderButton>
          </div>
        )
      case 'payment' :
        return (
          <div>
            <Styled.OrderButton color={'#f4f4f4'} onClick={onClickCancle}>결제취소</Styled.OrderButton>
            <Styled.OrderButton color={'#ffe7e7'} onClick={goToNext}>추가주문</Styled.OrderButton>
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <Styled.Nav>
      <Styled.ItemWrap>
        <Styled.Ul>
          <Styled.ListItem>
            <AccessibleIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>장애인</strong>
            </div>
          </Styled.ListItem>
          <Styled.ListItem>
            <ZoomInIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>돋보기</strong>
            </div>
          </Styled.ListItem>
          <Styled.ListItem>
            <VolumeUpIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>직원호출</strong>
            </div>
          </Styled.ListItem>
          {goBackFunc &&
          <Styled.ListItem onClick={goBackFunc}>
            <ArrowBackIcon style={{border: '1px solid', borderRadius: '50%', marginBottom: 3}}/>
            <div style={{width: 'max-content'}}>
              <strong>이전</strong>
            </div>
          </Styled.ListItem>
          }
        </Styled.Ul>
      </Styled.ItemWrap>
      <Styled.ItemWrap>
        {getShowButton(showInfo)}
      </Styled.ItemWrap>
    </Styled.Nav>
  );
};

export default FooterNav;
