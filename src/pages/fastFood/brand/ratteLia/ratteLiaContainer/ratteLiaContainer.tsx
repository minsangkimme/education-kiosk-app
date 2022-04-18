import { useCallback, useEffect, useState } from 'react';
import RatteLiaInit from "../ratteLiaInit/ratteLiaInit";
import SelectPayWayView from "../selectPayWay/selectPayWayView";
import { playAudio } from "../../../../../utils/playAudio";
import { useHistory } from "react-router";
import SelectMenu from "../selectMenu/selectMenu";
import OrderPayment from "../orderPayment/orderPayment";
import PaymentSuccess from "../paymentSuccess/paymentSuccess";
import MenuService from "../../../../../service/ratteLia/menuService";
import { IOrderProps } from 'types/types';

const menuService = new MenuService();

const RatteLiaContainer = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const [step, setStep] = useState(1);
  const [orderList, setOrderList] = useState<IOrderProps[]>([]); // 주문 내역
  const onClickNextStep = useCallback((step: number): void => {
    setStep(step);
    history.push(`${pathname}?step=${step}`);
  }, [step]);

  useEffect(() => {
    (async () => {
      await playAudio();
    })();
  });

  switch (step) {
    case 1:
      return <RatteLiaInit onClickNextStep={onClickNextStep} />

    case 2:
      return <SelectPayWayView onClickNextStep={onClickNextStep} />

    case 3:
      return (
        <SelectMenu
          onClickNextStep={onClickNextStep}
          orderList={orderList}
          setOrderList={setOrderList}
          menuService={menuService}
        />
      )

    case 4:
      return (
        <OrderPayment
          onClickNextStep={onClickNextStep}
          orderList={orderList}
          setOrderList={setOrderList}
        />
      )

    case 5:
      return <PaymentSuccess setOrderList={setOrderList} />

    default:
      return <RatteLiaInit onClickNextStep={onClickNextStep} />
  }
};

export default RatteLiaContainer;
