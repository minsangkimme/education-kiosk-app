import React from 'react';
import CustomModal from "./CustomModal";

const ModalContainer = (modalContainerProps) => {
  const  {
    menuTypeChoiceProps,
    sideMenuChoiceProps,
    alreadySelectedTypeAlarmProps,
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
    </>
  );
};

export default ModalContainer;
