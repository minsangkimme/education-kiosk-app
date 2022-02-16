import React from 'react';
import CustomModal from "./customModal/customModal";

const ModalContainer = (modalContainerProps) => {
  const  {
    menuTypeChoiceProps,
    sideMenuChoiceProps,
    alreadySelectedTypeAlarmProps,
    selectSideMenuAlarmProps,
    orderCancelAlarmProps,
  } = modalContainerProps;

  return (
    <>
      {/* 메뉴 타입 모달 */}
      <CustomModal
        title={menuTypeChoiceProps.title}
        tBgColor={menuTypeChoiceProps.tBgColor}
        open={menuTypeChoiceProps.open}
        backDrop={menuTypeChoiceProps.backDrop}
        bodyData={menuTypeChoiceProps.bodyData}
        setOpen={menuTypeChoiceProps.setOpen}
      />
      {/* 디저트 선택 모달 */}
      <CustomModal
        title={sideMenuChoiceProps.title}
        tBgColor={sideMenuChoiceProps.tBgColor}
        open={sideMenuChoiceProps.open}
        backDrop={sideMenuChoiceProps.backDrop}
        bodyData={sideMenuChoiceProps.bodyData}
        setOpen={sideMenuChoiceProps.setOpen}
      />
      {/* 이미 선택된 타입의 사이드 메뉴 경우 모달  */}
      <CustomModal
        title={alreadySelectedTypeAlarmProps.title}
        tBgColor={alreadySelectedTypeAlarmProps.tBgColor}
        open={alreadySelectedTypeAlarmProps.open}
        backDrop={alreadySelectedTypeAlarmProps.backDrop}
        bodyData={alreadySelectedTypeAlarmProps.bodyData}
        setOpen={alreadySelectedTypeAlarmProps.setOpen}
      />
      {/* 사이드 메뉴의 잔량이 남아있을 때 추가하기 버튼을 누른 경우 */}
      <CustomModal
        title={selectSideMenuAlarmProps.title}
        tBgColor={selectSideMenuAlarmProps.tBgColor}
        open={selectSideMenuAlarmProps.open}
        backDrop={selectSideMenuAlarmProps.backDrop}
        bodyData={selectSideMenuAlarmProps.bodyData}
        setOpen={selectSideMenuAlarmProps.setOpen}
      />
      {/* 주문 취소 경우 */}
      <CustomModal
        title={orderCancelAlarmProps.title}
        tBgColor={orderCancelAlarmProps.tBgColor}
        open={orderCancelAlarmProps.open}
        backDrop={orderCancelAlarmProps.backDrop}
        bodyData={orderCancelAlarmProps.bodyData}
        setOpen={orderCancelAlarmProps.setOpen}
      />
    </>
  );
};

export default ModalContainer;
