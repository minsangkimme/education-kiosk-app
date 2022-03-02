import React, {useCallback, useEffect, useState} from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import OrderList from "./orderList";
import PayOption from "./payOption";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {
  const [currPayStep, setCurrPayStep] = useState("step1");
  const [payOption, setPayOption] = useState({
    step1: {
      one: false,
      two: false,
    },
    step2: {
      one: false,
      two: false,
      three: false,
    },
    step3: {
      one: false,
      two: false,
      three: false,
    },
  });

  const onClickCheckOption = useCallback((option) => {
    // check remove option
    setPayOption(payOption => ({
      ...payOption,
      [currPayStep]: {
        ...initOptionStatus(currPayStep)
      }
    }));

    // check option
    setPayOption(payOption => ({
      ...payOption,
      [currPayStep]: {
        ...payOption[currPayStep],
        [option]: !payOption[currPayStep][option]
      }
    }));

    setCurrPayStep(prevStep => {
      switch (prevStep) {
        case 'step1':
          return 'step2';
        case 'step2':
          return 'step3';
        case 'step3':
          return;
        default :
          return new Error(`not supported step ${prevStep}`);
      }
    });
  }, [currPayStep]);

  const initOptionStatus = (option) => {
    switch (option) {
      case 'step1':
        return {
          one: false,
          two: false,
        }
      case 'step2':
        return {
          one: false,
          two: false,
          three: false,
        }
      case 'step3':
        return {
          one: false,
          two: false,
          three: false,
        }

      default:
        return new Error(`not supported option ${option}`);
    }
  }


  return (
    <Styled.Wrap>
      <Styled.AdWrap>
        <img src={adSense} alt="배너광고"/>
      </Styled.AdWrap>
      <Styled.ContentWrap>
        {/* 주문 내역 */}
        <OrderList orderList={orderList} />

        {/* 결제 옵션 */}
        <PayOption
          onClickCheckOption={onClickCheckOption}
          currPayStep={currPayStep}
          payOption={payOption}
        />
      </Styled.ContentWrap>
      <FooterNav
        showInfo="payment"
        goBackFunc={() => onClickNextStep(3)}
        onClickCancle={() => {
        }}
        goToNext={() => onClickNextStep(4)}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
