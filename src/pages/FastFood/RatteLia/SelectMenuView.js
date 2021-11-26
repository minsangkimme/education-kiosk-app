import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import adSense from "../../../assets/images/adSense.png";
import FooterNav from "../../../components/FooterNav";
import Box from '@mui/material/Box';
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab, {tabClasses} from '@mui/material/Tab';
import SelectMenuList from "./SelectMenuList";
import TotalOrderHistory from "./TotalOrderHistory";
import SingleOrSetMenuModal from "./modal/SingleOrSetMenuModal";
import ChoiceDesertModal from "./modal/ChoiceDesertModal";
import CustomModal from "./modal/CustomModal";
import SingleOrSetMenu from "./modal/SingleOrSetMenu";
import DesertAndDrinkMenu from "./modal/DesertAndDrinkMenu";
import AlreadySelectedTypeAlarm from "./modal/AlreadySelectedTypeAlarm";
import ModalContainer from "./modal/ModalContainer";
import {modalData} from "./modal/CustomModalData";
import SelectSideMenuAlarm from "./modal/SelectSideMenuAlarm";
import {initSideMenuState, sideMenuInformation} from "./MenuInfo";

const Wrap = styled.div`
   height: 100%;   
`;

const ContentLayout = styled.div`
  height: calc(100vh - 95px);
  overflow-y: auto;
`;

const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;

const SelectMenuView = ({onClickNextStep}) => {
  const [value, setValue] = React.useState(0);
  const [selectCategory, setSelectCategory] = React.useState('recommended'); // recommended | hamburger | desert | drink | event
  const [orderList, setOrderList] = useState([]); // 주문 내역
  const [selectedMenu, setSelectedMenu] = useState({}); // 선택한 메뉴
  const [choiceMenuType, setChoiceMenuType] = useState(''); // 버거 단품, 셋트 타입
  const [openMenuType, setOpenMenuType] = useState(false); // 단품,세트 모달
  const [openDesert, setOpenDesert] = useState(false); // 사이드 메뉴 모달
  const [openAlreadyAlarm, setOpenAlreadyAlarm] = useState(false); // 이미 선택된 메뉴타입
  const [sideMenuTab, setSideMenuTab] = useState('desert'); // 사이드 메뉴 선택된 탭
  const [renderSideMenu, setRenderSideMenu] = React.useState([]); // 사이드 메뉴 리스트
  const [openSelectAlarm, setOpenSelectAlarm] = useState(false); // 사이드 메뉴 선택 안하고 추가하기 누른 경우
  const sideMenuCategory = useMemo(() => sideMenuTab === 'desert' ? '디저트' : '드링크', [sideMenuTab]);
  const menuCategory = ["추천메뉴", "햄버거", "디저트/치킨", "음료/커피", "행사메뉴"];
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
    console.log(newValue);
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
  useEffect(() => console.log(sideMenuTab), [sideMenuTab])

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
            v.orderCount += 1;
          }
          if (menu.type === 'set') {
            v.setOrderCount += 1;
          }
        }
        return v;
      });
    } else {
      // 없으면 추가 & 카운트 증가
      if (menu.type === 'single') {
        menu.orderCount += 1;
      }
      if (menu.type === 'set') {
        menu.setOrderCount += 1;
      }
      orders = [...orderList, menu];
    }

    setOrderList(orders);
  }, [orderList]);

  // 카운트 감소
  const onClickDecreaseOrder = useCallback((menu) => {
    const orders = orderList.filter((v) => {
      if (v.id === menu.id && v.type === menu.type && (menu.orderCount > 1 || menu.setOrderCount > 1 )) {
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
    console.log('add', sideMenu)

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
    bodyData: <DesertAndDrinkMenu
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
    bodyData: <SelectSideMenuAlarm setOpenSelectAlarm={setOpenSelectAlarm}/>,
    backDrop: openAlreadyAlarm,
  }

  const modalContainerProps = {
    menuTypeChoiceProps,
    sideMenuChoiceProps,
    alreadySelectedTypeAlarmProps,
    selectSideMenuAlarmProps,
  };

  const initSelectMenu = () => {
    setChoiceMenuType('');
    setSideMenuTab('desert');
    initSideMenuState();
    setSelectedMenu({});
    setOpenDesert(false);
  }

  return (
    <Wrap>
      <ContentLayout>
        <AdWrap>
          <img src={adSense} alt="배너광고"/>
        </AdWrap>
        <Box sx={{flexGrow: 1, background: '#ffecdb'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                display: 'inline-flex',
                '&.Mui-disabled': {opacity: 0.3},
              },
              [`& .${tabsClasses.indicator}`]: {
                background: 'none'
              }
            }}
          >
            {menuCategory.map((v, i) => (
              <Tab
                key={i}
                label={v}
                value={i}
                sx={{
                  [`&.${tabClasses.selected}`]: {
                    background: '#fff',
                    mt: '3px',
                    borderRadius: '5px 5px 0 0',
                    color: '#000',
                  },
                  [`&.${tabClasses.root}`]: {
                    minWidth: 75,
                    padding: '12px 5px'
                  },
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Tabs>
        </Box>
        <SelectMenuList
          selectCategory={selectCategory}
          onClickInspectMenuType={onClickInspectMenuType}
        />
        {/* 총 주문내역 */}
        <TotalOrderHistory
          orderList={orderList}
          onClickAddOrder={onClickAddOrder}
          onClickDecreaseOrder={onClickDecreaseOrder}
          onClickRemoveOrder={onClickRemoveOrder}
        />
      </ContentLayout>
      <FooterNav goBackFunc={() => onClickNextStep(2)}/>
      <ModalContainer {...modalContainerProps} />
    </Wrap>
  );
};

export default SelectMenuView;
