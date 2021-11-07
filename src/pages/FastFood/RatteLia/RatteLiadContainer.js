import React, {useCallback, useEffect, useState} from 'react';
import RatteLiaInitView from "./RatteLiaInitView";
import SelectPayWay from "./SelectPayWay";
import {playAudio} from "../../../utils/playAudio";
import {useHistory} from "react-router";

const RatteLiadContainer = () => {
  const history = useHistory();
  const {pathname} = history.location;
  const [step, setStep] = useState(1);
  const onClickNextStep = useCallback((step) => {
    history.push(`${pathname}?step=${step}`);
    playAudio().then(() => setStep(step))
  }, [step]);

  switch (step) {
    case 1:
      return <RatteLiaInitView onClickNextStep={onClickNextStep} />

    case 2:
      return <SelectPayWay onClickNextStep={onClickNextStep} />

    default:
      break;

  }

      {/* init true 시 step2 화면 */}
      {/* 원하시는 결제 방법 */}
      {/*<SelectPayWay />*/}
      {/* step3 메뉴 화면 */}

};

export default RatteLiadContainer;
