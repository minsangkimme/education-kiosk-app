import React from 'react';
import styled from 'styled-components';
import hand from '../../../assets/images/hand2.png';
import hamburgerSet from '../../../assets/images/hamburgerSet.png';
import FooterNav from "../../../components/FooterNav";

const Wrap = styled.div`
   height: 100%;
   overflow-y: auto;
   font-family: blackHanSans, serif;
   background: #ededed;
`;

const ScreenWrap = styled.div`
  display: flex;
  flex-direction: column;    
  overflow-y: auto;
`;

const TopView = styled.div`
  background-color: #fff;
  padding: 30px 0 0;
  min-height: 421px;
  border-bottom: 3px solid #000;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

const BottomView = styled.div`
  border-top: 3px solid #000;  
  text-align: center;  
  background-color: #fff;
  cursor: pointer;
  min-height: 421px;
`;

const HereOrderText = styled.p`
  font-size: 64px;
  letter-spacing: -4px;
  line-height: 1;
  color: #a33;
  margin: 15px;
`;

const ScreenTouchTextWrap = styled.div`
  color: #000;
  background: #ffde55;
  position: relative;
  font-size: 25px;
  width: 240px;
  margin: 0 auto 30px;
  left: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;

const ScreenTouchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #ffde55;
  width: 50px;
  height: 50px;
  border: 4px solid #c53;
  position: absolute;
  left: -34px;
  top: -6px;  
`;

const ImageWrap = styled.span`
  border-radius: 25px;
  background: #ffde55;
  width: 30px;
  height: 30px;
  border: 4px solid #c53;
`;

const AdOnText = styled.p`
  color: #a33;
  font-size: 30px;
  margin: 15px 0 0;
  letter-spacing: -1px;
`;

const RatteLiaInitView = ({onClickNextStep}) => {
  return (
    <Wrap>
      <ScreenWrap onClick={() => onClickNextStep(2)}>
        <TopView>
          <div style={{fontSize: 28}}>기다리지 않고 간편하게</div>
          <HereOrderText>
            여기에서 <br/>
            주문하세요!
          </HereOrderText>
          <ScreenTouchTextWrap>
            <ScreenTouchIcon>
              <ImageWrap>
                <img
                  src={hand}
                  alt="pointer"
                  style={{
                    position: 'relative',
                    top: 7,
                    width: 35,
                  }}
                />
              </ImageWrap>
            </ScreenTouchIcon>
            <span>화면을 터치해 주세요</span>
          </ScreenTouchTextWrap>
        </TopView>
        <BottomView>
          <AdOnText>
            라떼리아 배달 <br/>
            메뉴의 가격은 매장의 가격과 <br/>
            <span style={{fontSize: 40, color: '#c53'}}>동일</span>합니다.
          </AdOnText>
          <img src={hamburgerSet} alt="햄버거 셋트" style={{width: 150, paddingBottom: 30}}/>
        </BottomView>
      </ScreenWrap>
      <FooterNav showInfo="language" />
    </Wrap>
  );
};

export default RatteLiaInitView;
