import React, {useCallback, useEffect, useReducer, useState} from 'react';
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
import {alarmToggleRequest, initialState, reducer} from "../../../../../reducers/alarm";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {
  const [currPayStep, setCurrPayStep] = useState("step1");
  const [alarm, dispatch] = useReducer(reducer, initialState);
  const {
    orderCancelAlarm,
    receiptAlarm,
    recyclePaperAlarm
  } = alarm.type;
  // 알람 토글 리스너
  const handleAlarmToggle = (label, toggle) => dispatch(alarmToggleRequest({data: toggle, label}));
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
      handleAlarmToggle('recyclePaperAlarm', true);
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
          return handleAlarmToggle('receiptAlarm', true);
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
    handleAlarmToggle('orderCancelAlarm', false);
    setOrderList([]);
    onClickNextStep(1);
  }

  // 주문 취소 알림 props
  const orderCancelAlarmProps = {
    ...modalData.alarmInfo,
    open: orderCancelAlarm,
    setOpen: () => handleAlarmToggle('orderCancelAlarm', false),
    bodyData:
      <OrderCancel
        setOrderCancelAlarm={() => handleAlarmToggle('orderCancelAlarm', false)}
        onClickCancle={handleCancel}
      />,
    backDrop: orderCancelAlarm,
  }

  // 영수증 알림 props
  const receiptAlarmProps = {
    ...modalData.receiptInfo,
    open: receiptAlarm,
    setOpen: () => handleAlarmToggle('receiptAlarm', false),
    bodyData: <ReceiptModal onClickNextStep={() => onClickNextStep(5)} />,
    backDrop: receiptAlarm,
  }

  // 종이백 알림 props
  const recyclePaperAlarmProps = {
    ...modalData.recyclePaperInfo,
    open: recyclePaperAlarm,
    setOpen: () => handleAlarmToggle('recyclePaperAlarm', false),
    bodyData: <RecyclePaperModal
      onClickButton={() => handleAlarmToggle('recyclePaperAlarm', false)}
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
        onClickCancle={() => handleAlarmToggle('orderCancelAlarm',true)}
        goToNext={() => onClickNextStep(3)}
      />
      {/* 취소 모달 */}
      <CustomModal {...orderCancelAlarmProps} />
      {/* 영수증 모달 */}
      <CustomModal {...receiptAlarmProps} />
      {/* 종이백 모달 */}
      <CustomModal {...recyclePaperAlarmProps} />
    </Styled.Wrap>
  );
};

export default OrderPayment;
