import React from 'react';
import styled from 'styled-components';
import adSense from '../../../assets/images/adSense.png';
import card from '../../../assets/images/card.png';
import cash from '../../../assets/images/cash.png';
import coupon from '../../../assets/images/coupon.png';
import FooterNav from "../../../components/FooterNav";

const Wrap = styled.div`
   height: 100%;
   overflow-y: auto;
`;

const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;

const NotiText = styled.div`
  background-color: #ffdfd0;
  text-align: center;
  padding: 6px;
  font-size: 19px;
  font-weight: bold;
`

const CardWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  padding: 15px;
  cursor: pointer;
  height: 421px;
  &:hover {
    background-color: #ff937f5c;
    color: #fff;
  }
`;

const ImgWrap = styled.div`
  margin-top: 12px;
  & img {
    width: 100%;
  }
`;
const CardTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-left: 40px;
  color: #ff937f;
`;

const ItemList = styled.ul`
  list-style: none;
  font-weight: bold;
`;

const CouponCashWrap = styled.div`
  display: flex;
  cursor: pointer;
`;
const BottomView = styled.div`
  width: 50%;
  min-height: 257px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 6px 10px;
  border-right: 1px solid;
  &:last-child {
    border-right: 0;
  }
  &:first-child:hover {
    background-color: #66aa8873;
    color: #fff;
  }
  &:last-child:hover {
    background-color: #4477aa69;
    color: #fff;
  }
`;

const CouponTitle = styled.div`
  font-size: 17px;
  //margin: 25px 0 0;
  font-weight: bold;
  color: #6a8;
`;

const CashTitle = styled.div`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  color: #47a;  
`;

const ContentLayout = styled.div`
  min-height: 842px;
  overflow-y: auto;
`;

const SelectPayWay = ({onClickNextStep}) => {
  return (
    <Wrap>
      <ContentLayout>
        <AdWrap>
          <img src={adSense} alt="배너광고" />
        </AdWrap>
        <NotiText>원하시는 결제방법을 선택해주세요</NotiText>
        <CardWrap>
          <ImgWrap>
            <img src={card} alt="카드" />
          </ImgWrap>
          <div>
            <CardTitle>카드</CardTitle>
            <ItemList>
              <li>신용/체크카드</li>
              <li>모바일금액권</li>
              <li>간편결제</li>
              <li>(L.pay, 삼성페이, LG페이, 알리페이, 카카오페이, PAYCO)</li>
            </ItemList>
          </div>
        </CardWrap>
        <CouponCashWrap>
          <BottomView>
            <ImgWrap>
              <img src={coupon} alt="쿠폰" />
            </ImgWrap>
            <CouponTitle>디지털쿠폰/교환권</CouponTitle>
            <div style={{fontWeight: 'bold'}}>
              라떼리아제품교환권(지류)<br/>
              모바일제품교환권<br/>
              (스마트폰쿠폰)
            </div>
          </BottomView>
          <BottomView>
            <ImgWrap>
              <img src={cash} alt="현금" />
            </ImgWrap>
            <div style={{position: 'relative',bottom: 8}}>
              <CashTitle>현금</CashTitle>
              <div style={{fontWeight: 'bold'}}>카운터에서 주문해 주세요</div>
            </div>
          </BottomView>
        </CouponCashWrap>
      </ContentLayout>
      <FooterNav goBackFunc={() => onClickNextStep(1)} />
    </Wrap>
  );
};

export default SelectPayWay;
