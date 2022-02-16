import React from 'react';
import hand from '../../../../../assets/images/hand2.png';
import hamburgerSet from '../../../../../assets/images/hamburgerSet.png';
import FooterNav from "../../../../../components/footer/footerNav";
import * as Styled from './styled';


const RatteLiaInit = ({onClickNextStep}) => {
  return (
    <Styled.Wrap>
      <Styled.ScreenWrap onClick={() => onClickNextStep(2)}>
        <Styled.TopView>
          <div style={{fontSize: 28}}>기다리지 않고 간편하게</div>
          <Styled.HereOrderText>
            여기에서 <br/>
            주문하세요!
          </Styled.HereOrderText>
          <Styled.ScreenTouchTextWrap>
            <Styled.ScreenTouchIcon>
              <Styled.ImageWrap>
                <img
                  src={hand}
                  alt="pointer"
                  style={{
                    position: 'relative',
                    top: 7,
                    width: 35,
                  }}
                />
              </Styled.ImageWrap>
            </Styled.ScreenTouchIcon>
            <span>화면을 터치해 주세요</span>
          </Styled.ScreenTouchTextWrap>
        </Styled.TopView>
        <Styled.BottomView>
          <Styled.AdOnText>
            라떼리아 배달 <br/>
            메뉴의 가격은 매장의 가격과 <br/>
            <span style={{fontSize: 40, color: '#c53'}}>동일</span>합니다.
          </Styled.AdOnText>
          <img src={hamburgerSet} alt="햄버거 셋트" style={{width: 150, paddingBottom: 30}}/>
        </Styled.BottomView>
      </Styled.ScreenWrap>
      <FooterNav showInfo="language" />
    </Styled.Wrap>
  );
};

export default RatteLiaInit;
