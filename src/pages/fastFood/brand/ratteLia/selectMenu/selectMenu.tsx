import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import SelectMenuList from "../selectMenuList/selectMenuList";
import TotalOrderHistory from "../totalOrderHistory/totalOrderHistory";
import SingleOrSetMenu from "../modal/singleOrSetMenu/singleOrSetMenu";
import DesertAndDrinkMenu from "../modal/desertAndDrinkMenu/desertAndDrinkMenu";
import AlreadySelectedTypeAlarm from "../modal/alreadySelectedTypeAlarm/alreadySelectedTypeAlarm";
import {modalData} from "../modal/customModal/modalData";
import SelectSideMenuAlarm from "../modal/selectSideMenuAlarm/selectSideMenuAlarm";
import OrderCancel from "../modal/orderCancel/orderCancel";
import * as Styled from './styled';
import MenuCategory from "../ratteLiaContainer/menuCategory";
import CustomModal from "../modal/customModal/customModal";
import {alarmToggleRequest, initialState, reducer} from "../../../../../reducers/alarm";
import { IOrderProps, ISelectMenuProps, ISideMenuProps, SelectedMenu, SetIOrderProps } from 'types/types';


const SelectMenu = ({onClickNextStep, orderList, setOrderList, menuService}: ISelectMenuProps) => {
	const [selectCategory, setSelectCategory] = React.useState(menuService.category); // recommended | hamburger | desert | drink | event
	const [selectedMenu, setSelectedMenu] = useState<IOrderProps | object>({}); // 선택한 메뉴
	const [sideMenuTab, setSideMenuTab] = useState('desert'); // 사이드 메뉴 선택된 탭
	const sideMenuCategory = useMemo(() => sideMenuTab === 'desert' ? '디저트' : '드링크', [sideMenuTab]);
	const [alarm, dispatch] = useReducer(reducer, initialState);
	const {
		menuTypeAlarm,
		sideMenuAlarm,
		alreadyTypeAlarm,
		nonSelectAlarm,
		orderCancelAlarm,
		selectMenuAlarm,
	} = alarm.type;

	// 알람 토글 리스너
	const handleAlarmToggle = (label: string, toggle: boolean) => dispatch(alarmToggleRequest({data: toggle, label}));

	const sliderRef = useRef(null);

	// 메뉴 선택 리스너
	const onClickSelectMenu = useCallback((menu: IOrderProps) => {
		const isHamburgerSingleType: boolean = menuService.inspectMenuType(menu);
		menuService.setSelectedMenu(menu, setSelectedMenu as SetIOrderProps);

		return (
			isHamburgerSingleType
				? handleAlarmToggle('menuTypeAlarm', true)// 선택한 햄버거류 메뉴가  && 단품이면 팝업 오픈
				: handleAddOrder(menu) // 셋트 || 사이드메뉴는 오더에 바로 추가
		);
	}, [menuService, orderList]);

	// 오더 추가
	const handleAddOrder = useCallback((menu) => {
		menuService.addOrder(menu, orderList, setOrderList);
	}, [menuService, orderList]);

	// 오더 감소
	const onClickSubtractOrder = useCallback((menu) => {
		menuService.subtractOrder(menu, orderList, setOrderList);
	}, [menuService, orderList]);

	// 오더 삭제
	const onClickDeleteOrder = useCallback((menu) => {
		menuService.deleteOrder(menu, orderList, setOrderList);
	}, [menuService, orderList]);

	// 햄버거 (단품 || 셋트) 선택 리스너
	const onClickMenuType = useCallback((type) => {
		// 단품
		if (type === 'single') {
			setSelectedMenu((prevState: IOrderProps) => ({...prevState, type: 'single'}));
			handleAlarmToggle('menuTypeAlarm', false);
			handleAddOrder(selectedMenu);
		}

		// 셋트
		if (type === 'set') {
			setSelectedMenu(prevState => ({...prevState, type: 'set'}));
			handleAlarmToggle('menuTypeAlarm', false);
			// 사이드메뉴 오픈
			handleAlarmToggle('sideMenuAlarm', true);
		}
	}, [selectedMenu, orderList]);

	// 사이드메뉴 닫기
	const handleCloseSideMenu = () => {
		setSideMenuTab('desert');
		setSelectedMenu({});
		handleAlarmToggle('sideMenuAlarm', false);
	}

	// 사이드메뉴 추가 리스너
	const handleAddSideMenu = useCallback((sideMenu: ISideMenuProps) => {
		const isAlreadySelectType: boolean = menuService.isInspectAlreadySelectSideMenuType(sideMenu, selectedMenu as IOrderProps);

		// 검사 결과 있다면 같은 타입을 더 추가할 수 없다는 알림을 띄우고 return 한다.
		if (isAlreadySelectType) {
			return handleAlarmToggle('alreadyTypeAlarm', true);
		}

		// 사이드 메뉴 추가
		menuService.addSideMenu(sideMenu, setSelectedMenu);
	}, [menuService, orderList, selectedMenu]);

	// 사이드메뉴 삭제 리스너
	const onClickDeleteSideMenu = useCallback((sideMenu: ISideMenuProps) => {
		menuService.deleteSideMenu(sideMenu, setSelectedMenu);
	}, [menuService, selectedMenu]);

	// 사이드메뉴 선택 완료 리스너
	const onClickSubmitMenu = useCallback(() => {
		const hasNotAllRequiredSideMenu = (selectedMenu as IOrderProps).sideMenuList.length < 2;

		if (hasNotAllRequiredSideMenu) {
			return handleAlarmToggle('nonSelectAlarm', true);
		}

		handleAddOrder(selectedMenu);
		handleCloseSideMenu();
	}, [selectedMenu, orderList]);

	// 주문 취소 리스너
	const handleOrderCancel = () => {
		handleAlarmToggle('orderCancelAlarm', false);
		setOrderList([]);
		onClickNextStep(1);
	}

	// 단품,세트 알림 props
	const menuTypeChoiceProps = {
		...modalData.menuTypeChoiceInfo,
		open: menuTypeAlarm,
		setOpen: () => handleAlarmToggle('menuTypeAlarm', false),
		bodyData: <SingleOrSetMenu menu={selectedMenu} onClickMenuType={onClickMenuType}/>,
		backDrop: menuTypeAlarm,
	};

	// 사이드 메뉴 알림 props
	const sideMenuChoiceProps = {
		...modalData.sideMenuChoiceInfo,
		title: `세트${sideMenuCategory} 1 개를 선택해 주세요`,
		open: sideMenuAlarm,
		setOpen: () => {
			handleCloseSideMenu();
			handleAlarmToggle('sideMenuAlarm', false);
		},
		bodyData:
			<DesertAndDrinkMenu
				setSideMenuTab={setSideMenuTab}
				sideMenuTab={sideMenuTab}
				selectedMenu={selectedMenu}
				sideMenuAlarm={sideMenuAlarm}
				handleAddSideMenu={handleAddSideMenu}
				onClickDeleteSideMenu={onClickDeleteSideMenu}
				onClickSubmitMenu={onClickSubmitMenu}
				handleCloseSideMenu={handleCloseSideMenu}
			/>,
		backDrop: sideMenuAlarm,
	};

	// 이미 선택 된 메뉴 알림 props
	const alreadySelectedTypeAlarmProps = {
		...modalData.alarmInfo,
		open: alreadyTypeAlarm,
		setOpen: () => handleAlarmToggle('alreadyTypeAlarm', false),
		bodyData:
			<AlreadySelectedTypeAlarm
				setAlreadyTypeAlarm={() => handleAlarmToggle('alreadyTypeAlarm', false)}
			/>,
		backDrop: alreadyTypeAlarm,
	};

	// 사이드 메뉴 선택하지 않고 추가하기 누른 경우 알림 props
	const selectSideMenuAlarmProps = {
		...modalData.alarmInfo,
		open: nonSelectAlarm,
		setOpen: () => handleAlarmToggle('nonSelectAlarm', false),
		bodyData:
			<SelectSideMenuAlarm
				setNonSelectAlarm={() => handleAlarmToggle('nonSelectAlarm', false)}
			/>,
		backDrop: nonSelectAlarm,
	}

	// 주문 취소 알림 props
	const orderCancelAlarmProps = {
		...modalData.alarmInfo,
		open: orderCancelAlarm,
		setOpen: () => handleAlarmToggle('orderCancelAlarm', false),
		bodyData:
			<OrderCancel
				setOrderCancelAlarm={() => handleAlarmToggle('orderCancelAlarm', false)}
				onClickCancle={handleOrderCancel}
			/>,
		backDrop: orderCancelAlarm,
	}

	// 메뉴 선택 하라는 알림 props
	const selectMenuAlarmProps = {
		...modalData.alarmInfo,
		open: selectMenuAlarm,
		setOpen: () => handleAlarmToggle('selectMenuAlarm', false),
		bodyData: <h2 style={{padding: 50, fontWeight: 'bold'}}>메뉴를 선택해주세요.</h2>,
		backDrop: selectMenuAlarm,
	}

	// 결제 페이지 이동 리스너
	const onClickPay = () => {
		orderList.length > 0
			? onClickNextStep(4)
			: handleAlarmToggle('selectMenuAlarm', true);
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
					setSelectCategory={setSelectCategory}
					menuService={menuService}
					ref={sliderRef}
				/>
				{/* 메뉴 리스트 */}
				<SelectMenuList
					ref={sliderRef}
					selectCategory={selectCategory}
					onClickSelectMenu={onClickSelectMenu}
				/>
				{/* 총 주문내역 */}
				<TotalOrderHistory
					orderList={orderList}
					handleAddOrder={handleAddOrder}
					onClickSubtractOrder={onClickSubtractOrder}
					onClickDeleteOrder={onClickDeleteOrder}
				/>
			</Styled.ContentLayout>
			<FooterNav
				showInfo="order"
				goBackFunc={() => onClickNextStep(2)}
				onClickCancle={() => handleAlarmToggle('orderCancelAlarm', true)}
				goToNext={onClickPay}
			/>
			{/* 메뉴 타입 모달 */}
			<CustomModal {...menuTypeChoiceProps} />
			{/* 디저트 선택 모달 */}
			<CustomModal {...sideMenuChoiceProps} />
			{/* 이미 선택된 타입의 사이드 메뉴 경우 모달  */}
			<CustomModal {...alreadySelectedTypeAlarmProps} />
			{/* 사이드 메뉴의 잔량이 남아있을 때 추가하기 버튼을 누른 경우 */}
			<CustomModal {...selectSideMenuAlarmProps} />
			{/* 주문 취소 경우 */}
			<CustomModal {...orderCancelAlarmProps} />
			{/* 메뉴 선택 없이 결제하기 눌렀을 때 */}
			<CustomModal {...selectMenuAlarmProps} />
		</Styled.Wrap>
	);
};

export default SelectMenu;
