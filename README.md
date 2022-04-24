
# 학습용 키오스크 웹앱
 **학습용 키오스크를 통해** 브랜드 제품 주문을 미리 체험할 수 있다.

### 개발 목적
  - 키오스크 사용을 힘들어하는 이용자가 기존(google playStore)에 제공되고 있는 앱을 통해 학습을 하여도 실제 브랜드 키오스크 UI와 달라 어려워 하는 문제점이 있어 **실제와 동일한 UI로 학습을 제공**하는것이 목적
 
### 개발 동기
  - 부모님이 식사를 하고자 매장에 방문하였지만 키오스크 이용이 어려워 그냥 돌아오게 된 사연을 듣게되었습니다. 이것은 나에게 많은 공감이 되었고 이런 불편함을 조금이라도 해결하고자 개발하게 되었습니다.

# 바로가기
- 웹 페이지 https://minsangkimme.github.io/education-kiosk-app/

# 기술 스택
- **JavaScript(ES6)**
- **React**
- **Styled-Components**
- **jest**
- **typescript**
- **IDE : VS Code**
  
# 앱 화면
<img src="/public/images/t1.png" width="250" height="500"/>
<img src="/public/images/t2.png" width="250" height="500"/>
<img src="/public/images/t6.png" width="250" height="500"/>
<img src="/public/images/t3.png" width="250" height="500"/>
<img src="/public/images/t4.png" width="250" height="500"/>
<img src="/public/images/t5.png" width="250" height="500"/>
  

# 주요 코드

### 메뉴 선택 화면
```jsx
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
```
---

### 서비스 로직 분리
```jsx
import React from "react";
import { ICategory, IOrderProps, ISideMenuProps, SelectedMenu, SetIOrderProps } from "types/types";

class MenuService {
	category: string;
	selectedMenu: IOrderProps | null;
	orderList: IOrderProps[];
	burgerTypeCategory: string[];

	constructor() {
		this.category = 'recommended'; // 선택한 메뉴 카테고리
		this.selectedMenu = null;
		this.orderList = [];
		this.burgerTypeCategory = ['recommended', 'hamburger', 'event'];
	}

	// 탭 설정
	setCategory( category: string, update: React.Dispatch<React.SetStateAction<string>>) {
		this.category = category;
		update(this.category);
	}

	// 메뉴 선택
	setSelectedMenu(selectedMenu: IOrderProps, update: SetIOrderProps) {
		this.selectedMenu = selectedMenu;
		update(this.selectedMenu);
	}

	// 메뉴 타입 검사
	inspectMenuType(menu: IOrderProps): boolean {
		return this.burgerTypeCategory.includes(this.category) && menu.type === 'single';
	}

	// 오더 추가
	addOrder(
		menu: IOrderProps,
		orderList: IOrderProps[],
		setOrderList: React.Dispatch<React.SetStateAction<IOrderProps[]>>
	) {
		// orderList에 order 메뉴가 있는지 확인
		const isOrderInclude: boolean = orderList.findIndex((v) => (v.id === menu.id && v.type === menu.type)) > -1;
		let orders: IOrderProps[];

		if (isOrderInclude) {
			// 주문 이력 있으면 추가x & 카운트만 증가
			orders = orderList.map((item) => {
				if (item.id === menu.id && item.type === menu.type) {
					if (menu.type === 'single') {
						return { ...item, orderCount: item.orderCount + 1 };
					}
					if (menu.type === 'set') {
						return { ...item, setOrderCount: item.setOrderCount + 1 };
					}
				}
				return item;
			});
		} else {
			const selectedItem: IOrderProps = { ...menu };
			// 없으면 추가 & 카운트 증가
			if (selectedItem.type === 'single') {
				selectedItem.orderCount += 1;
			}
			if (selectedItem.type === 'set') {
				selectedItem.setOrderCount += 1;
			}
			orders = [...orderList, selectedItem];
		}

		this.orderList = orders;
		setOrderList(this.orderList);
	}

	// 오더 감소
	subtractOrder(
		menu: IOrderProps,
		orderList: IOrderProps[],
		setOrderList: React.Dispatch<React.SetStateAction<IOrderProps[]>>
	) {
		const orders: IOrderProps[] = orderList.map((item) => {
			if (item.id === menu.id && item.type === menu.type) {
				// 타입이 single 경우
				if (item.type === 'single' && item.orderCount > 1) {
					const orderCount = item.orderCount - 1;
					return { ...item, orderCount };
				}
				// 타입이 set 경우
				if (item.type === 'set' && item.setOrderCount > 1) {
					const setOrderCount = item.setOrderCount - 1;
					return { ...item, setOrderCount };
				}
			}

			return item;
		});

		this.orderList = orders;
		setOrderList(this.orderList);
	}

	// 오더 삭제
	deleteOrder(
		menu: IOrderProps,
		orderList: IOrderProps[],
		setOrderList: React.Dispatch<React.SetStateAction<IOrderProps[]>>
	) {
		const changeOrderList: IOrderProps[] = orderList.filter((item) => !(item.id === menu.id && item.type === menu.type));
		this.orderList = changeOrderList;
		setOrderList(this.orderList);
	}

	// 이미 선택한 사이드 메뉴 타입인지 검사
	isInspectAlreadySelectSideMenuType(sideMenu: ISideMenuProps, selectedMenu: IOrderProps): boolean{
		// 선택한 메뉴의 sideMenuList에서 들어온 sideMenu의 type이 있는지 검사한다.
		return selectedMenu.sideMenuList.some((v) => v.type === sideMenu.type);
	}

	// 사이드메뉴 추가
	addSideMenu(sideMenu: ISideMenuProps, setSelectedMenu: React.Dispatch<React.SetStateAction<IOrderProps>>) {
		const selectedSideMenu: ISideMenuProps = {
			...sideMenu,
			isSelected: true
		};

		this.selectedMenu = {
			...this.selectedMenu!,
			sideMenuList: [...this.selectedMenu!.sideMenuList, selectedSideMenu]
		};

		// 선택한 메뉴의 사이드메뉴 리스트 업데이트
		setSelectedMenu(prevState => ({
			...prevState,
			sideMenuList: [...prevState.sideMenuList, selectedSideMenu]
		}));
	}

	// 사이드메뉴 삭제
	deleteSideMenu(sideMenu: ISideMenuProps, setSelectedMenu: React.Dispatch<React.SetStateAction<IOrderProps>>) {
		if (!sideMenu) return null;
		setSelectedMenu(selectedMenu => {
			const deletedSideMenuList = selectedMenu.sideMenuList.filter(item => item.id !== sideMenu.id);
			return ({
				...selectedMenu,
				sideMenuList: deletedSideMenuList
			});
		});
	}
}

export default MenuService;
```
---
### 단위 테스트
```javascript
import MenuService from "../menuService";

describe("MenuService 기능 테스트", () => {
	let menuService;
	let update;
	let menu;
	let sideMenu;
	let setSelectedMenu;

	beforeEach(() => {
		menuService = new MenuService();
		update = jest.fn();
		setSelectedMenu = jest.fn();
		menu = {
			id: 3,
			name: '더블새우',
			price: 4500,
			setPrice: 6500,
			type: 'single',
			orderCount: 0,
			setOrderCount: 0,
			sideMenuList: [],
			sideMenuPrice: 0,
		}

		sideMenu = {
			id: 40,
			name: '콜라',
			price: 1200,
			setPrice: 0,
			type: 'single',
			orderCount: 0,
		};
	});

	it("초기 카테고리는 추천메뉴(recommended) 이길 기대한다.", () => {
		expect(menuService.category).toBe('recommended');
	});

	it("다른 카테고리 탭으로 설정할 수 있다.", () => {
		menuService.setCategory('hamburger', update);
		expect(menuService.category).toBe('hamburger');
		menuService.setCategory('event', update);
		expect(menuService.category).toBe('event');
		menuService.setCategory('desert', update);
		expect(menuService.category).toBe('desert');
	});

	it("메뉴를 선택한다.", () => {
		menuService.setSelectedMenu(menu, update);
		expect(menuService.selectedMenu).toEqual(menu);
	});

	it("선택한 카테고리가 햄버거류 포함된 카테고리 이면서 메뉴 타입이 'single' 이길 기대한다.", () => {
		menuService.setCategory('hamburger', update);
		expect(menuService.inspectMenuType(menu)).toBeTruthy();
	});

	describe("오더 기능 테스트", () => {
		let setOrderList;

		beforeEach(() => {
			menuService.orderList = [];
			setOrderList = jest.fn();
		});

		it("orderList에 order를 추가한다.", () => {
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			expect(menuService.orderList.length).toBe(1);
			expect(menuService.orderList[0].name).toBe('더블새우');
		});

		it("같은 order는 새로 추가되지않고 해당 오더의 갯수가 늘어난다.", () => {
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			expect(menuService.orderList.length).toBe(1);
			expect(menuService.orderList[0].orderCount).toBe(3);
		});

		it("orderList에서 해당 order를 감소시킨다.", () => {
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.subtractOrder(menu, menuService.orderList, setOrderList);
			expect(menuService.orderList[0].orderCount).toBe(2);
		});

		it("orderList에서 해당 order를 삭제한다.", () => {
			menuService.addOrder(menu, menuService.orderList, setOrderList);
			menuService.deleteOrder(menu, menuService.orderList, setOrderList);

			expect(menuService.orderList.length).toBe(0);
			expect(setOrderList).toHaveBeenCalledTimes(2);
		});

		it("사이드메뉴를 추가한다.", () => {
			menuService.setSelectedMenu(menu, update);
			menuService.addSideMenu(sideMenu, setSelectedMenu);
			expect(menuService.selectedMenu.sideMenuList.length).toBe(1);
			expect(setSelectedMenu).toHaveBeenCalledTimes(1);
		});

		it("이미 선택한 사이드 메뉴 타입인지 검사한다.", () => {
			menuService.setSelectedMenu(menu, update);
			expect(menuService.isInspectAlreadySelectSideMenuType(sideMenu, menuService.selectedMenu)).toBeFalsy();
		});

	});
});
```

### 기타 오류 발생시 아래 메일을 클릭하여
### 문의 남겨주세요
[![Gmail Badge](https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:minsang.tech@gmail.com)](mailto:minsang.tech@gmail.com)