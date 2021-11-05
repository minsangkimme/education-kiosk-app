import React, {useEffect, useState} from 'react';
import RatteLiaInitView from "./RatteLiaInitView";
import SelectPayWay from "./SelectPayWay";

const RatteLiadContainer = () => {
  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    setIsInit(true);
  }, []);

  return (
    <div>
      {isInit && <RatteLiaInitView setIsInit={setIsInit} />}
      {/* init true 시 step2 화면 */}
      {/* 원하시는 결제 방법 */}
      {/*<SelectPayWay />*/}
      {/* step3 메뉴 화면 */}

    </div>
  );
};

export default RatteLiadContainer;
