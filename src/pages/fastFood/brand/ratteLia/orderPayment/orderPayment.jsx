import React, {useCallback, useEffect, useState} from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import OrderList from "./orderList";
import PayOption from "./payOption";
import ModalContainer from "../modal/modalContainer";
import {modalData} from "../modal/customModal/modalData";
import OrderCancel from "../modal/orderCancel/orderCancel";
import CustomModal from "../modal/customModal/customModal";
import ReceiptModal from "../modal/receiptModal/receiptModal";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {
  const [currPayStep, setCurrPayStep] = useState("step1");
  const [orderCancelAlarm, setOrderCancelAlarm] = useState(false); // 주문 취소하기
  const [receiptAlarm, setReceiptAlarm] = useState(true); // 영수증 알람
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

  const onClickCheckOption = useCallback((step, option) => {
    // 현재 스텝이 맞지 않을 때는 리턴.
    if (currPayStep !== step) {
      return null;
    }

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

  const handleCancel = () => {
    setOrderCancelAlarm(false);
    setOrderList([]);
    onClickNextStep(1);
  }

  const orderCancelAlarmProps = {
    ...modalData.alarmInfo,
    open: orderCancelAlarm,
    setOpen: setOrderCancelAlarm,
    bodyData:
      <OrderCancel
        setOrderCancelAlarm={setOrderCancelAlarm}
        onClickCancle={handleCancel}
      />,
    backDrop: orderCancelAlarm,
  }

  const receiptAlarmProps = {
    ...modalData.receiptInfo,
    open: receiptAlarm,
    setOpen: setReceiptAlarm,
    bodyData: <ReceiptModal />,
    backDrop: receiptAlarm,
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
        onClickCancle={() => setOrderCancelAlarm(true)}
        goToNext={() => onClickNextStep(3)}
      />
      <CustomModal
        title={orderCancelAlarmProps.title}
        tBgColor={orderCancelAlarmProps.tBgColor}
        open={orderCancelAlarmProps.open}
        backDrop={orderCancelAlarmProps.backDrop}
        bodyData={orderCancelAlarmProps.bodyData}
        setOpen={orderCancelAlarmProps.setOpen}
      />
      <CustomModal
        title={receiptAlarmProps.title}
        tBgColor={receiptAlarmProps.tBgColor}
        open={receiptAlarmProps.open}
        backDrop={receiptAlarmProps.backDrop}
        bodyData={receiptAlarmProps.bodyData}
        setOpen={receiptAlarmProps.setOpen}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
