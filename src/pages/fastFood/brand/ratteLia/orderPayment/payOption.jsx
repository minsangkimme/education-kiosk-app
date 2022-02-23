import React from 'react';
import * as Styled from "./styled";
import box from '../../../../../assets/images/box.png';
import store from '../../../../../assets/images/store.png';
import discount from '../../../../../assets/images/discount.png';
import point from '../../../../../assets/images/point.png';
import close from '../../../../../assets/images/close.png';
import card from '../../../../../assets/images/card.png';
import coupon from '../../../../../assets/images/coupon.png';
import pay from '../../../../../assets/images/mobile-payment.png';

const PayOption = () => {
  return (
    <Styled.PaymentOption>
      <Styled.OptionWrap>
        <Styled.StepWrap>
          <Styled.StepTitle className="active">Step 1 포장을 선택하세요.</Styled.StepTitle>
          <Styled.Ul className="active">
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={box} alt="포장"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>포장</div>
                <div>(1회용기 제공)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={store} alt="매장"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>매장</div>
                <div>(다회용기 제공)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
          </Styled.Ul>
        </Styled.StepWrap>
        <Styled.StepWrap>
          <Styled.StepTitle>Step 2 할인/적립을 선택하세요.</Styled.StepTitle>
          <Styled.Ul>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={discount} alt="제휴사 할인"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>제휴사 할인</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={point} alt="Point 적립/사용"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>Point 적립/사용</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={close} alt="선택없음"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>선택없음</div>
              </Styled.WordWrap>
            </Styled.ListItem>
          </Styled.Ul>
        </Styled.StepWrap>
        <Styled.StepWrap>
          <Styled.StepTitle>Step 3 결제를 선택하세요.</Styled.StepTitle>
          <Styled.Ul>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={card} alt="신용/체크카드"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>신용/체크카드</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={coupon} alt="모바일/바코드/페이류(PAY)"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>모바일/바코드/페이류(PAY)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.ImageWrap>
                <img src={pay} alt="페이"/>
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>R.PAY</div>
              </Styled.WordWrap>
            </Styled.ListItem>
          </Styled.Ul>
        </Styled.StepWrap>
      </Styled.OptionWrap>
    </Styled.PaymentOption>
  );
};

export default PayOption;
