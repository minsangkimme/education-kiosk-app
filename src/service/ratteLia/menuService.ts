import React from "react";
import { ICategory, IOrderProps, ISideMenuProps, SelectedMenu } from "types/types";

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
	setCategory({ category, update }: ICategory) {
		this.category = category;
		update(this.category);
	}

	// 메뉴 선택
	setSelectedMenu(selectedMenu: IOrderProps, update: React.Dispatch<React.SetStateAction<IOrderProps | object>>) {
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
	isInspectAlreadySelectSideMenuType(sideMenu: ISideMenuProps, selectedMenu: IOrderProps | object){
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