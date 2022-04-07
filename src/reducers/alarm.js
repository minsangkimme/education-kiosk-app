export const ALARM_REQUEST = 'ALARM_REQUEST';

export const initialState = {
	type: {
		menuTypeAlarm: false, // 단품,세트 모달
		sideMenuAlarm: false, // 사이드 메뉴 모달
		alreadyTypeAlarm: false, // 이미 선택된 메뉴타입
		nonSelectAlarm: false, // 사이드 메뉴 선택 안하고 추가하기 누른 경우
		orderCancelAlarm: false, // 주문 취소하기
		selectMenuAlarm: false, // 메뉴 선택 알림
		receiptAlarm: false, // 영수증 알림
		recyclePaperAlarm: false // 종이백 알림
	}
}

export const alarmToggleRequest = ({data, label}) => ({
	type: ALARM_REQUEST,
	label,
	data,
})

export function reducer (state, action) {
	switch (action.type) {
		case ALARM_REQUEST:
			return {
				...state,
				type: {
					...state.type,
					[action.label]: action.data
				}
			};
		default:
			return state;
	}
}