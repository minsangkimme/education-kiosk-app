import React from 'react';

const SelectSideMenuAlarm = ({setNonSelectAlarm}) => {
  return (
    <div>
      <p>
        세트구성품을 선택해주세요.<br/>
      </p>
      <div onClick={setNonSelectAlarm}>
        <button>확인</button>
      </div>
    </div>
  );
};

export default SelectSideMenuAlarm;
