import {categoryInformation} from "./menuInfo";

class MenuService {
	constructor() {
		this.category = 'recommended'; // 선택한 메뉴 카테고리
		this.selectedMenu = null;
		this.burgerTypeCategory = ['recommended', 'hamburger', 'event'];
	}

	// 탭 설정
	setCategory(value, update) {
		this.category = value;
		update(value);
	}

	// 메뉴 선택
	setSelectedMenu(menu, update) {
		this.selectedMenu = menu;
		update(menu);
	}

	// 메뉴 타입 검사
	inspectMenuType(menu) {
		return this.burgerTypeCategory.includes(this.category) && menu.type === 'single';
	}

	// 오더 추가
	addOrder(menu, orderList, setOrderList) {
		// orderList에 order 메뉴가 있는지 확인
		const isOrderInclude = orderList.findIndex((v) => (v.id === menu.id && v.type === menu.type)) > -1;
		let orders;

		if (isOrderInclude) {
			// 주문 이력 있으면 추가x & 카운트만 증가
			orders = orderList.map((item) => {
				if (item.id === menu.id && item.type === menu.type) {
					if (menu.type === 'single') {
						return {...item, orderCount: item.orderCount + 1};
					}
					if (menu.type === 'set') {
						return {...item, setOrderCount: item.setOrderCount + 1};
					}
				}
				return item;
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
	}

	// 오더 감소
	subtractOrder(menu, orderList, setOrderList) {
		const orders = orderList.filter((item) => {
			if (item.id === menu.id && item.type === menu.type) {
				// 타입이 single 경우
				if (item.type === 'single' && item.orderCount > 1) {
					const orderCount = item.orderCount - 1;
					return {...item, orderCount};
				}
				// 타입이 set 경우
				if (item.type === 'set' && item.setOrderCount > 1) {
					const setOrderCount = item.setOrderCount - 1;
					return {...item, setOrderCount};
				}
			}

			return item;
		});

		setOrderList(orders);
	}

	// 오더 삭제
	deleteOrder(menu, orderList, setOrderList) {
		const changeOrderList = orderList.filter((item) => !(item.id === menu.id && item.type === menu.type));
		setOrderList(changeOrderList);
	}
}

export default MenuService;