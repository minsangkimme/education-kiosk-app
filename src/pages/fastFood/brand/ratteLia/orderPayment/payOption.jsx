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
import check from '../../../../../assets/images/check.png';

const PayOption = ({ onClickCheckOption, currPayStep, payOption }) => {
  const {step1, step2, step3} = payOption;

  return (
    <Styled.PaymentOption>
      <Styled.OptionWrap>
        <Styled.StepWrap>
          <Styled.StepTitle className={`${currPayStep === 'step1' ? 'active' : ''}`}>
            Step 1 포장을 선택하세요.
          </Styled.StepTitle>
          <Styled.Ul className={`${currPayStep === 'step1' ? 'active' : ''}`}>
            <Styled.ListItem onClick={() => onClickCheckOption('step1', 'one')}>
              <Styled.ImageWrap>
                <img src={box} alt="포장"/>
                {step1.one && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>포장</div>
                <div>(1회용기 제공)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem onClick={() => onClickCheckOption('step1', 'two')}>
              <Styled.ImageWrap>
                <img src={store} alt="매장"/>
                {step1.two && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>매장</div>
                <div>(다회용기 제공)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
          </Styled.Ul>
        </Styled.StepWrap>
        <Styled.StepWrap>
          <Styled.StepTitle className={`${currPayStep === 'step2' ? 'active' : ''}`}>
            Step 2 할인/적립을 선택하세요.
          </Styled.StepTitle>
          <Styled.Ul className={`${currPayStep === 'step2' ? 'active' : ''}`}>
            <Styled.ListItem onClick={() => onClickCheckOption('step2', 'one')}>
              <Styled.ImageWrap>
                <img src={discount} alt="제휴사 할인"/>
                {step2.one && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>제휴사 할인</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem onClick={() => onClickCheckOption('step2', 'two')}>
              <Styled.ImageWrap>
                <img src={point} alt="Point 적립/사용"/>
                {step2.two && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>Point 적립/사용</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem onClick={() => onClickCheckOption('step2', 'three')}>
              <Styled.ImageWrap>
                <img src={close} alt="선택없음"/>
                {step2.three && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>선택없음</div>
              </Styled.WordWrap>
            </Styled.ListItem>
          </Styled.Ul>
        </Styled.StepWrap>
        <Styled.StepWrap>
          <Styled.StepTitle className={`${currPayStep === 'step3' ? 'active' : ''}`}>
            Step 3 결제를 선택하세요.
          </Styled.StepTitle>
          <Styled.Ul className={`${currPayStep === 'step3' ? 'active' : ''}`}>
            <Styled.ListItem onClick={() => onClickCheckOption('step3', 'one')}>
              <Styled.ImageWrap>
                <img src={card} alt="신용/체크카드"/>
                {step3.one && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>신용/체크카드</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem onClick={() => onClickCheckOption('step3', 'two')}>
              <Styled.ImageWrap>
                <img src={coupon} alt="모바일/바코드/페이류(PAY)"/>
                {step3.two && <img src={check} alt="선택" className="checked" />}
              </Styled.ImageWrap>
              <Styled.WordWrap>
                <div>모바일/바코드/페이류(PAY)</div>
              </Styled.WordWrap>
            </Styled.ListItem>
            <Styled.ListItem onClick={() => onClickCheckOption('step3', 'three')}>
              <Styled.ImageWrap>
                <img src={pay} alt="페이"/>
                {step3.three && <img src={check} alt="선택" className="checked" />}
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
