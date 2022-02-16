import React, {useCallback, useState} from 'react';
import RatteLiaInit from "../ratteLiaInit/ratteLiaInit";
import SelectPayWayView from "../selectPayWay/selectPayWayView";
import {playAudio} from "../../../../../utils/playAudio";
import {useHistory} from "react-router";
import SelectMenu from "../selectMenu/selectMenu";
import OrderPayment from "../orderPayment/orderPayment";

const RatteLiaContainer = () => {
  const history = useHistory();
  const {pathname} = history.location;
  const [step, setStep] = useState(1);
  const onClickNextStep = useCallback((step) => {
    history.push(`${pathname}?step=${step}`);
    playAudio().then(() => setStep(step))
  }, [step]);

  switch (step) {
    case 1:
      return <RatteLiaInit onClickNextStep={onClickNextStep} />

    case 2:
      return <SelectPayWayView onClickNextStep={onClickNextStep} />

    case 3:
      return <SelectMenu onClickNextStep={onClickNextStep} />

    case 4:
      return <OrderPayment onClickNextStep={onClickNextStep} />

    default:
      break;

  }
};

export default RatteLiaContainer;
