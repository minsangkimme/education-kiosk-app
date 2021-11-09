import React, {useCallback, useEffect, useState} from 'react';
import RatteLiaInitView from "./RatteLiaInitView";
import SelectPayWay from "./SelectPayWay";
import {playAudio} from "../../../utils/playAudio";
import {useHistory} from "react-router";
import SelectMenuView from "./SelectMenuView";

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
      return <RatteLiaInitView onClickNextStep={onClickNextStep} />

    case 2:
      return <SelectPayWay onClickNextStep={onClickNextStep} />

    case 3:
      return <SelectMenuView onClickNextStep={onClickNextStep}/>
    default:
      break;

  }
};

export default RatteLiaContainer;
