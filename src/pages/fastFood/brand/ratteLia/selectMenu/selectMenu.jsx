import React, {useCallback, useMemo, useRef, useState} from 'react';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import SelectMenuList from "../selectMenuList/selectMenuList";
import TotalOrderHistory from "../totalOrderHistory/totalOrderHistory";
import SingleOrSetMenu from "../modal/singleOrSetMenu/singleOrSetMenu";
import DesertAndDrinkMenu from "../modal/desertAndDrinkMenu/desertAndDrinkMenu";
import AlreadySelectedTypeAlarm from "../modal/alreadySelectedTypeAlarm/alreadySelectedTypeAlarm";
import ModalContainer from "../modal/modalContainer";
import {modalData} from "../modal/customModal/modalData";
import SelectSideMenuAlarm from "../modal/selectSideMenuAlarm/selectSideMenuAlarm";
import {initSideMenuState} from "../menuInfo";
import OrderCancel from "../modal/orderCancel/orderCancel";
import * as Styled from './styled';
import MenuCategory from "../ratteLiaContainer/menuCategory";


const SelectMenu = ({onClickNextStep, orderList, setOrderList}) => {
  const [value, setValue] = React.useState(0);
  const [selectCategory, setSelectCategory] = React.useState('recommended'); // recommended | hamburger | desert | drink | event
  const [selectedMenu, setSelectedMenu] = useState({}); // 선택한 메뉴
  const [choiceMenuType, setChoiceMenuType] = useState(''); // 버거 단품, 셋트 타입
  const [openMenuType, setOpenMenuType] = useState(false); // 단품,세트 모달
  const [openDesert, setOpenDesert] = useState(false); // 사이드 메뉴 모달
  const [openAlreadyAlarm, setOpenAlreadyAlarm] = useState(false); // 이미 선택된 메뉴타입
  const [sideMenuTab, setSideMenuTab] = useState('desert'); // 사이드 메뉴 선택된 탭
  const [renderSideMenu, setRenderSideMenu] = React.useState([]); // 사이드 메뉴 리스트
  const [openSelectAlarm, setOpenSelectAlarm] = useState(false); // 사이드 메뉴 선택 안하고 추가하기 누른 경우
  const [orderCancelAlarm, setOrderCancelAlarm] = useState(false); // 주문 취소하기
  const sideMenuCategory = useMemo(() => sideMenuTab === 'desert' ? '디저트' : '드링크', [sideMenuTab]);
  const menuCategory = ["추천메뉴", "햄버거", "디저트/치킨", "음료/커피", "행사메뉴"];
  const sliderRef = useRef(null);
  const handleChange = useCallback((event, newValue) => {
    sliderRef.current.slickGoTo(0);
    setValue(newValue);
    console.log(sliderRef);

    switch (newValue) {
      case 0:
        return setSelectCategory('recommended');
      case 1:
        return setSelectCategory('hamburger');
      case 2:
        return setSelectCategory('desert');
      case 3:
        return setSelectCategory('drink');
      case 4:
        return setSelectCategory('event');
      default:
        return setSelectCategory('recommended');
    }
  }, [value, selectCategory]);

  // 제품 타입 검사
  const onClickInspectMenuType = useCallback((menu) => {
    const burgerCategory = ['recommended', 'hamburger', 'event'];
    setSelectedMenu(menu);
    // 선택한 메뉴가 햄버거류 && 단품이면 팝업 오픈
    if (menu.type === 'single' && burgerCategory.includes(selectCategory)) {
      setOpenMenuType(true);
    } else {
      // 셋트 || 디저트류는 오더에 바로 추가
      onClickAddOrder(menu);
    }
  }, [selectCategory, orderList]);

  // 오더 추가
  const onClickAddOrder = useCallback((menu) => {
    // orderList에 order 메뉴가 있는지 확인
    const isOrderInclude = orderList.findIndex((v) => (v.id === menu.id && v.type === menu.type)) > -1;
    let orders;

    if (isOrderInclude) {
      // 있으면 추가 x & 카운트 증가
      orders = orderList.map((v) => {
        if (v.id === menu.id && v.type === menu.type) {
          if (menu.type === 'single') {
            return {...v, orderCount: v.orderCount + 1};
          }
          if (menu.type === 'set') {
            return {...v, setOrderCount: v.setOrderCount + 1};
          }
        }
        return v;
      });
    } else {
      const selectedItem = {...menu};
      // 없으면 추가 & 카운트 증가
      if (selectedItem.type === 'single') {
        selectedItem.orderCount += 1;
      }
      if (selectedItem.type === 'set') {
        selectedItem.setOrderCount += 1;
      }
      orders = [...orderList, selectedItem];
    }

    setOrderList(orders);
  }, [orderList]);

  // 카운트 감소
  const onClickDecreaseOrder = useCallback((menu) => {
    const orders = orderList.filter((v) => {
      if (v.id === menu.id && v.type === menu.type && (menu.orderCount > 1 || menu.setOrderCount > 1)) {
        if (menu.type === 'single') {
          v.orderCount -= 1;
        }

        if (menu.type === 'set') {
          v.setOrderCount -= 1;
        }
      }

      return v;
    });

    setOrderList(orders);
  }, [orderList]);

  // 오더 삭제
  const onClickRemoveOrder = useCallback((menu) => {
    const removeIdx = orderList.findIndex((v) => v.id === menu.id && v.type === menu.type);
    const copiedOrderList = orderList.slice();
    copiedOrderList.splice(removeIdx, 1);
    setOrderList(copiedOrderList);
    menu.orderCount = 0;
    menu.setOrderCount = 0;
  }, [orderList]);

  // 버거류 단품 셋트 선택
  const onClickMenuType = useCallback((type) => {
    // 단품
    if (type === 'single') {
      setSelectedMenu(prevState => ({...prevState, type: 'single'}));
      setOpenMenuType(false);
      onClickAddOrder(selectedMenu);
    }

    // 셋트
    if (type === 'set') {
      // 디저트 모달 띄우기
      setSelectedMenu(prevState => ({...prevState, type: 'set'}));
      setOpenMenuType(false);
      setOpenDesert(true);
      // 선택 다 하고 내역에 추가하기
    }

    setChoiceMenuType(type);
  }, [choiceMenuType, selectedMenu, orderList]);

  // 버거셋트 선택시 사이드메뉴 선택 리스너
  const onClickAddSideMenu = useCallback((sideMenu) => {
    // 선택한 메뉴의 sideMenuList에서 들어온 sideMenu의 type이 있는지 검사한다.
    const isAlreadySelectType = selectedMenu.sideMenuList.some((v) => v.type === sideMenu.type);

    // 검사 결과 있다면 같은 타입을 더 추가할 수 없다는 알림을 띄우고 return 한다.
    if (isAlreadySelectType) {
      return setOpenAlreadyAlarm(true);
    }

    sideMenu.isSelected = true;
    // 검사 결과 같은 타입이 없다면 sideMenuList에 추가 시킨다.
    setSelectedMenu(prevState => ({
      ...prevState,
      sideMenuList: [...prevState.sideMenuList, sideMenu]
    }));
  }, [orderList, selectedMenu, renderSideMenu]);

  // 버거셋트 선택시 사이드메뉴 삭제 리스너
  const onClickRemoveSideMenu = useCallback((sideMenu) => {
    if (!sideMenu) return null;
    sideMenu.isSelected = false;
    // 선택한 메뉴의 sideMenuList에서 들어온 sideMenu를 찾아 삭제한다.
    const copiedSideMenuList = selectedMenu.sideMenuList.slice();
    const removeItemIdx = copiedSideMenuList.findIndex((v) => v.id === sideMenu.id);
    copiedSideMenuList.splice(removeItemIdx, 1);

    setSelectedMenu(prevState => ({
      ...prevState,
      sideMenuList: [...copiedSideMenuList]
    }));
  }, [selectedMenu]);

  // 사이드 메뉴 선택 완료하기 리스너
  const onClickSubmitMenu = useCallback(() => {
    if (selectedMenu.sideMenuList.length < 2) {
      setOpenSelectAlarm(true);
      return;
    }
    onClickAddOrder(selectedMenu);
    initSelectMenu();
  }, [selectedMenu, orderList]);

  // 사이드 메뉴 취소하기
  const onClickCancleMenu = useCallback(() => initSelectMenu(), []);

  const handleCancel = () => {
    setOrderCancelAlarm(false);
    setOrderList([]);
    onClickNextStep(1);
  }

  const menuTypeChoiceProps = {
    ...modalData.menuTypeChoiceInfo,
    open: openMenuType,
    setOpen: setOpenMenuType,
    bodyData: <SingleOrSetMenu menu={selectedMenu} onClickMenuType={onClickMenuType}/>,
    backDrop: openMenuType,
  };

  const sideMenuChoiceProps = {
    ...modalData.sideMenuChoiceInfo,
    title: `세트${sideMenuCategory} 1 개를 선택해 주세요`,
    open: openDesert,
    setOpen: (close) => {
      initSelectMenu();
      setOpenDesert(close);
    },
    bodyData:
      <DesertAndDrinkMenu
        setSideMenuTab={setSideMenuTab}
        sideMenuTab={sideMenuTab}
        menu={selectedMenu}
        openDesert={openDesert}
        onClickAddSideMenu={onClickAddSideMenu}
        onClickRemoveSideMenu={onClickRemoveSideMenu}
        renderSideMenu={renderSideMenu}
        setRenderSideMenu={setRenderSideMenu}
        onClickSubmitMenu={onClickSubmitMenu}
        onClickCancleMenu={onClickCancleMenu}
      />,
    backDrop: openDesert,
  };

  const alreadySelectedTypeAlarmProps = {
    ...modalData.alarmInfo,
    open: openAlreadyAlarm,
    setOpen: setOpenAlreadyAlarm,
    bodyData: <AlreadySelectedTypeAlarm setOpenAlreadyAlarm={setOpenAlreadyAlarm}/>,
    backDrop: openAlreadyAlarm,
  };

  const selectSideMenuAlarmProps = {
    ...modalData.alarmInfo,
    open: openSelectAlarm,
    setOpen: setOpenSelectAlarm,
    bodyData: <SelectSideMenuAlarm setOpenSelectAlarm={setOpenSelectAlarm} />,
    backDrop: openSelectAlarm,
  }

  const orderCancelAlarmProps = {
    ...modalData.alarmInfo,
    open: orderCancelAlarm,
    setOpen: setOrderCancelAlarm,
    bodyData:
      <OrderCancel
        setOrderCancelAlarm={setOrderCancelAlarm}
        onClickCancle={handleCancel}
      />,
    backDrop: orderCancelAlarm,
  }

  const modalContainerProps = {
    menuTypeChoiceProps,
    sideMenuChoiceProps,
    alreadySelectedTypeAlarmProps,
    selectSideMenuAlarmProps,
    orderCancelAlarmProps,
  };

  const initSelectMenu = () => {
    setChoiceMenuType('');
    setSideMenuTab('desert');
    initSideMenuState();
    setSelectedMenu({});
    setOpenDesert(false);
  }

  return (
    <Styled.Wrap>
      <Styled.ContentLayout>
        <Styled.AdWrap>
          <img src={adSense} alt="배너광고"/>
          {/*<BannerAdSense />*/}
        </Styled.AdWrap>
        {/* 메뉴 카테고리 */}
        <MenuCategory
          value={value}
          handleChange={handleChange}
          menuCategory={menuCategory}
        />
        {/* 메뉴 리스트 */}
        <SelectMenuList
          selectCategory={selectCategory}
          onClickInspectMenuType={onClickInspectMenuType}
          ref={sliderRef}
        />
        {/* 총 주문내역 */}
        <TotalOrderHistory
          orderList={orderList}
          onClickAddOrder={onClickAddOrder}
          onClickDecreaseOrder={onClickDecreaseOrder}
          onClickRemoveOrder={onClickRemoveOrder}
        />
      </Styled.ContentLayout>
      <FooterNav
        showInfo="order"
        goBackFunc={() => onClickNextStep(2)}
        onClickCancle={() => setOrderCancelAlarm(true)}
        goToNext={() => onClickNextStep(4)}
      />
      <ModalContainer {...modalContainerProps} />
    </Styled.Wrap>
  );
};

export default SelectMenu;
