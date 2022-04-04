import React, {useCallback, useMemo, useReducer, useRef, useState} from 'react';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import SelectMenuList from "../selectMenuList/selectMenuList";
import TotalOrderHistory from "../totalOrderHistory/totalOrderHistory";
import SingleOrSetMenu from "../modal/singleOrSetMenu/singleOrSetMenu";
import DesertAndDrinkMenu from "../modal/desertAndDrinkMenu/desertAndDrinkMenu";
import AlreadySelectedTypeAlarm from "../modal/alreadySelectedTypeAlarm/alreadySelectedTypeAlarm";
import {modalData} from "../modal/customModal/modalData";
import SelectSideMenuAlarm from "../modal/selectSideMenuAlarm/selectSideMenuAlarm";
import {initSideMenuState} from "../../../../../service/ratteLia/menuInfo";
import OrderCancel from "../modal/orderCancel/orderCancel";
import * as Styled from './styled';
import MenuCategory from "../ratteLiaContainer/menuCategory";
import CustomModal from "../modal/customModal/customModal";
import {alarmToggleRequest, initialState, reducer} from "../../../../../reducers/alarm";


const SelectMenu = ({onClickNextStep, orderList, setOrderList, menuService}) => {
	const [selectCategory, setSelectCategory] = React.useState(menuService.category); // recommended | hamburger | desert | drink | event
	const [selectedMenu, setSelectedMenu] = useState({}); // 선택한 메뉴
	const [choiceMenuType, setChoiceMenuType] = useState(''); // 버거 단품, 셋트 타입
	const [sideMenuTab, setSideMenuTab] = useState('desert'); // 사이드 메뉴 선택된 탭
	const [renderSideMenu, setRenderSideMenu] = React.useState([]); // 사이드 메뉴 리스트
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
	const handleAlarmToggle = (label, toggle) => dispatch(alarmToggleRequest({data: toggle, label}));

	const sliderRef = useRef(null);

	// 메뉴 선택 리스너
	const onClickSelectMenu = useCallback((menu) => {
		const inspectResult = menuService.inspectMenuType(menu);
		menuService.setSelectedMenu(menu, setSelectedMenu);

		return (
			inspectResult
				? handleAlarmToggle('menuTypeAlarm', true)// 선택한 햄버거류 메뉴가  && 단품이면 팝업 오픈
				: handleAddOrder(menu) // 셋트 || 디저트류는 오더에 바로 추가
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

	// 버거류 단품 셋트 선택
	const onClickMenuType = useCallback((type) => {
		// 단품
		if (type === 'single') {
			setSelectedMenu(prevState => ({...prevState, type: 'single'}));
			handleAlarmToggle('menuTypeAlarm', false);
			handleAddOrder(selectedMenu);
		}

		// 셋트
		if (type === 'set') {
			// 디저트 모달 띄우기
			setSelectedMenu(prevState => ({...prevState, type: 'set'}));
			handleAlarmToggle('menuTypeAlarm', false);
			handleAlarmToggle('sideMenuAlarm', true);
		}

		setChoiceMenuType(type);
	}, [choiceMenuType, selectedMenu, orderList]);

	// 버거셋트 선택시 사이드메뉴 선택 리스너
	const onClickAddSideMenu = useCallback((sideMenu) => {
		// 선택한 메뉴의 sideMenuList에서 들어온 sideMenu의 type이 있는지 검사한다.
		const isAlreadySelectType = selectedMenu.sideMenuList.some((v) => v.type === sideMenu.type);

		// 검사 결과 있다면 같은 타입을 더 추가할 수 없다는 알림을 띄우고 return 한다.
		if (isAlreadySelectType) {
			return handleAlarmToggle('alreadyTypeAlarm', true);
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
			handleAlarmToggle('nonSelectAlarm', true);
			return;
		}
		handleAddOrder(selectedMenu);
		initSelectMenu();
	}, [selectedMenu, orderList]);

	// 사이드 메뉴 취소하기
	const onClickCancleMenu = useCallback(() => initSelectMenu(), []);

	const handleCancel = () => {
		handleAlarmToggle('orderCancelAlarm', false);
		setOrderList([]);
		onClickNextStep(1);
	}

	const menuTypeChoiceProps = {
		...modalData.menuTypeChoiceInfo,
		open: menuTypeAlarm,
		setOpen: () => handleAlarmToggle('menuTypeAlarm', false),
		bodyData: <SingleOrSetMenu menu={selectedMenu} onClickMenuType={onClickMenuType}/>,
		backDrop: menuTypeAlarm,
	};

	const sideMenuChoiceProps = {
		...modalData.sideMenuChoiceInfo,
		title: `세트${sideMenuCategory} 1 개를 선택해 주세요`,
		open: sideMenuAlarm,
		setOpen: () => {
			initSelectMenu();
			handleAlarmToggle('sideMenuAlarm', false);
		},
		bodyData:
			<DesertAndDrinkMenu
				setSideMenuTab={setSideMenuTab}
				sideMenuTab={sideMenuTab}
				menu={selectedMenu}
				sideMenuAlarm={sideMenuAlarm}
				onClickAddSideMenu={onClickAddSideMenu}
				onClickRemoveSideMenu={onClickRemoveSideMenu}
				renderSideMenu={renderSideMenu}
				setRenderSideMenu={setRenderSideMenu}
				onClickSubmitMenu={onClickSubmitMenu}
				onClickCancleMenu={onClickCancleMenu}
			/>,
		backDrop: sideMenuAlarm,
	};

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

	const orderCancelAlarmProps = {
		...modalData.alarmInfo,
		open: orderCancelAlarm,
		setOpen: () => handleAlarmToggle('orderCancelAlarm', false),
		bodyData:
			<OrderCancel
				setOrderCancelAlarm={() => handleAlarmToggle('orderCancelAlarm', false)}
				onClickCancle={handleCancel}
			/>,
		backDrop: orderCancelAlarm,
	}

	const selectMenuAlarmProps = {
		...modalData.alarmInfo,
		open: selectMenuAlarm,
		setOpen: () => handleAlarmToggle('selectMenuAlarm', false),
		bodyData: <h2 style={{padding: 50, fontWeight: 'bold'}}>메뉴를 선택해주세요.</h2>,
		backDrop: selectMenuAlarm,
	}

	const initSelectMenu = () => {
		setChoiceMenuType('');
		setSideMenuTab('desert');
		initSideMenuState();
		setSelectedMenu({});
		handleAlarmToggle('sideMenuAlarm', false);
	}

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
				/>
				{/* 메뉴 리스트 */}
				<SelectMenuList
					ref={sliderRef}
					selectCategory={selectCategory}
					onClickSelectMenu={onClickSelectMenu}
					menuService={menuService}
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
			{/* 메뉴 선택 없이 결제하기 눌렀을 때 */}
			<CustomModal
				title={selectMenuAlarmProps.title}
				tBgColor={selectMenuAlarmProps.tBgColor}
				open={selectMenuAlarmProps.open}
				backDrop={selectMenuAlarmProps.backDrop}
				bodyData={selectMenuAlarmProps.bodyData}
				setOpen={selectMenuAlarmProps.setOpen}
			/>
		</Styled.Wrap>
	);
};

export default SelectMenu;
