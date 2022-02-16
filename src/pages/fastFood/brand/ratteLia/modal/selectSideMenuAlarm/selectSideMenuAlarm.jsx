import React from 'react';

const SelectSideMenuAlarm = ({setOpenSelectAlarm}) => {
  return (
    <div>
      <p>
        세트구성품을 선택해주세요.<br/>
      </p>
      <div onClick={() => setOpenSelectAlarm(false)}>
        <button>확인</button>
      </div>
    </div>
  );
};

export default SelectSideMenuAlarm;
