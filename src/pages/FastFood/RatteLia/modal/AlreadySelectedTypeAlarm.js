import React from 'react';

const AlreadySelectedTypeAlarm = ({setOpenAlreadyAlarm}) => {
  return (
    <div>
      <p>
        세트구성품을 모두 선택하였습니다.<br/>
        선택한 구성품을 삭제후 다시 선택해주세요.
      </p>
      <div onClick={() => setOpenAlreadyAlarm(false)}>
        <button>확인</button>
      </div>
    </div>
  );
};

export default AlreadySelectedTypeAlarm;
