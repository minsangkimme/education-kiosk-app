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