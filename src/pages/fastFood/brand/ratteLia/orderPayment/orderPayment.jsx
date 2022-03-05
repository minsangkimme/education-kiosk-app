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
import RecyclePaperModal from "../modal/recyclePaperModal/recyclePaperModal";
import {playAudio} from "../../../../../utils/playAudio";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {
  const [currPayStep, setCurrPayStep] = useState("step1");
  const [orderCancelAlarm, setOrderCancelAlarm] = useState(false); // 주문 취소하기
  const [receiptAlarm, setReceiptAlarm] = useState(false); // 영수증 알람
  const [recyclePaperAlarm, setRecyclePaperAlarm] = useState(false); // 종이백 알람
  const [payOption, setPayOption] = useState({
    step1: {
      1: false,
      2: false,
    },
    step2: {
      3: false,
      4: false,
      5: false,
    },
    step3: {
      6: false,
      7: false,
      8: false,
    },
  });

  const onClickCheckOption = useCallback(async (step, option) => {
    await playAudio();

    if (step === 'step1' && option === 1) {
      setRecyclePaperAlarm(() => true);
    }

    // remove check
    setPayOption(payOption => ({
      ...payOption,
      [step]: {
        ...initOptionStatus(step)
      }
    }));

    // check
    setPayOption(payOption => ({
      ...payOption,
      [step]: {
        ...payOption[step],
        [option]: !payOption[step][option]
      }
    }));

    setCurrPayStep(prevStep => {
      switch (step) {
        case 'step1':
          return 'step2';
        case 'step2':
          return 'step3';
        case 'step3':
          return setReceiptAlarm(true);
        default :
          return new Error(`not supported step ${step}`);
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
    bodyData: <ReceiptModal/>,
    backDrop: receiptAlarm,
  }

  const recyclePaperAlarmProps = {
    ...modalData.recyclePaperInfo,
    open: recyclePaperAlarm,
    setOpen: setRecyclePaperAlarm,
    bodyData: <RecyclePaperModal
      onClickButton={() => setRecyclePaperAlarm(false)}
    />,
    backDrop: recyclePaperAlarm,
  }

  return (
    <Styled.Wrap>
      <Styled.AdWrap>
        <img src={adSense} alt="배너광고"/>
      </Styled.AdWrap>
      <Styled.ContentWrap>
        {/* 주문 내역 */}
        <OrderList orderList={orderList}/>

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
      {/* 취소 모달 */}
      <CustomModal
        title={orderCancelAlarmProps.title}
        tBgColor={orderCancelAlarmProps.tBgColor}
        open={orderCancelAlarmProps.open}
        backDrop={orderCancelAlarmProps.backDrop}
        bodyData={orderCancelAlarmProps.bodyData}
        setOpen={orderCancelAlarmProps.setOpen}
      />
      {/* 영수증 모달 */}
      <CustomModal
        title={receiptAlarmProps.title}
        tBgColor={receiptAlarmProps.tBgColor}
        open={receiptAlarmProps.open}
        backDrop={receiptAlarmProps.backDrop}
        bodyData={receiptAlarmProps.bodyData}
        setOpen={receiptAlarmProps.setOpen}
      />
      {/* 종이백 모달 */}
      <CustomModal
        title={recyclePaperAlarmProps.title}
        tBgColor={recyclePaperAlarmProps.tBgColor}
        open={recyclePaperAlarmProps.open}
        backDrop={recyclePaperAlarmProps.backDrop}
        bodyData={recyclePaperAlarmProps.bodyData}
        setOpen={recyclePaperAlarmProps.setOpen}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
