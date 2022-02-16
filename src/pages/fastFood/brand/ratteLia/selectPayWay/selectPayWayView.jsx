import React from 'react';
import adSense from '../../../../../assets/images/adSense.png';
import card from '../../../../../assets/images/card.png';
import cash from '../../../../../assets/images/cash.png';
import coupon from '../../../../../assets/images/coupon.png';
import FooterNav from "../../../../../components/footer/footerNav";
import * as Styled from './styled';

const SelectPayWayView = ({onClickNextStep}) => {
  return (
    <Styled.Wrap>
      <Styled.ContentLayout onClick={() => onClickNextStep(3)}>
        <Styled.AdWrap>
          <img src={adSense} alt="배너광고" />
        </Styled.AdWrap>
        <Styled.NotiText>원하시는 결제방법을 선택해주세요</Styled.NotiText>
        <Styled.CardWrap>
          <Styled.ImgWrap>
            <img src={card} alt="카드" />
          </Styled.ImgWrap>
          <div>
            <Styled.CardTitle>카드</Styled.CardTitle>
            <Styled.ItemList>
              <li>신용/체크카드</li>
              <li>모바일금액권</li>
              <li>간편결제</li>
              <li>(L.pay, 삼성페이, LG페이, 알리페이, 카카오페이, PAYCO)</li>
            </Styled.ItemList>
          </div>
        </Styled.CardWrap>
        <Styled.CouponCashWrap>
          <Styled.BottomView>
            <Styled.ImgWrap>
              <img src={coupon} alt="쿠폰" />
            </Styled.ImgWrap>
            <Styled.CouponTitle>디지털쿠폰/교환권</Styled.CouponTitle>
            <div style={{fontWeight: 'bold'}}>
              라떼리아제품교환권(지류)<br/>
              모바일제품교환권<br/>
              (스마트폰쿠폰)
            </div>
          </Styled.BottomView>
          <Styled.BottomView>
            <Styled.ImgWrap>
              <img src={cash} alt="현금" />
            </Styled.ImgWrap>
            <div style={{position: 'relative',bottom: 8}}>
              <Styled.CashTitle>현금</Styled.CashTitle>
              <div style={{fontWeight: 'bold'}}>카운터에서 주문해 주세요</div>
            </div>
          </Styled.BottomView>
        </Styled.CouponCashWrap>
      </Styled.ContentLayout>
      <FooterNav goBackFunc={() => onClickNextStep(1)} />
    </Styled.Wrap>
  );
};

export default SelectPayWayView;
