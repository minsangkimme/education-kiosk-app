import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab, {tabClasses} from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {sideMenuInformation} from "../../../../../../service/ratteLia/menuInfo";
import {convertCommaNumber} from "../../../../../../utils/comma";
import * as Styled from './styled';
import { IDesertAndDrinkMenuProps, IOrderProps, ISideMenuInfoProps, ISideMenuProps } from 'types/types';


const sideMenuCategory = [
  {
    value: 'desert',
    label: '세트_디저트'
  },
  {
    value: 'drink',
    label: '세트_디저트'
  },
];

const DesertAndDrinkMenu = memo(({selectedMenu, setSideMenuTab, sideMenuTab, handleAddSideMenu, onClickDeleteSideMenu,
                              onClickSubmitMenu, handleCloseSideMenu, sideMenuAlarm}: IDesertAndDrinkMenuProps) => {
  const [renderSideMenu, setRenderSideMenu] = React.useState<ISideMenuProps[][]>([]); // 사이드 메뉴 리스트
  const wrapRef = useRef(null);
  const handleChange = useCallback((event, newValue) => {
    switch (newValue) {
      case 'desert':
        return setSideMenuTab('desert');

      case 'drink':
        return setSideMenuTab('drink');
    }
  }, [sideMenuTab]);
  const pageSize = 16;
  const selectedCategory = renderSideMenu!.flat();
  const remainingQuantity = useMemo(() => (selectedMenu as IOrderProps).sideMenuList?.length || 0, [selectedMenu]);
  const totalCount = selectedCategory.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumberList = '*'.repeat(totalPage).split("");
  const getSideMenuIdx = useCallback((type: string) => ((selectedMenu as IOrderProps).sideMenuList?.findIndex((v) => v.type === type)), [selectedMenu]);

  useEffect(() => {
    if (!sideMenuAlarm) {
      setSideMenuTab('desert');
    }
  }, [sideMenuAlarm]);
  useEffect(() => {
    if (sideMenuTab === 'desert') {
      setRenderSideMenu([...sideMenuInformation.desert]);
    } else {
      setRenderSideMenu([...sideMenuInformation.drink]);
    }
  }, [sideMenuTab]);

  // 사이드 메뉴 팝업이 열린게 아니거나 선택한 메뉴가 없다면 리턴
  if (!sideMenuAlarm || !(selectedMenu as IOrderProps)?.id) {
    return null;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, background: '#f6f6f6' }}>
        <Tabs
          value={sideMenuTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              display: 'inline-flex',
              '&.Mui-disabled': { opacity: 0.3 },
            },
            [`& .${tabsClasses.indicator}`]: {
              background: 'none'
            }
          }}
        >
          {sideMenuCategory.map((v, i) =>  (
            <Tab
              key={i}
              value={v.value}
              label={v.label}
              sx={{
                [`&.${tabClasses.selected}`]: {
                  background: '#fff',
                  mt: '3px',
                  borderRadius: '5px 5px 0 0',
                  color: '#000',
                  boxShadow: '1px 0 3px 0 darkgrey',
                },
                [`&.${tabClasses.root}`]: {
                  minWidth: 75,
                  padding: '12px 5px',
                },
                fontWeight: 'bold',
              }}
            />
          ))}
        </Tabs>
      </Box>
      {pageNumberList.map((_, i) => (
        <Styled.Wrap key={i} ref={wrapRef}>
          {renderSideMenu[i].map((sideMenu) => {
            const selectedSideMenu = (selectedMenu as IOrderProps).sideMenuList.some(item => item.id === sideMenu.id);
            return (
              <Styled.MenuWrap key={sideMenu.id}>
                <div style={{position: 'relative'}}>
                  {selectedSideMenu &&
                    <>
                      <Styled.RemoveButton onClick={() => onClickDeleteSideMenu(sideMenu)} />
                      <Styled.OrderNumber>{getSideMenuIdx(sideMenu.type) + 1}</Styled.OrderNumber>
                    </>
                  }
                  <img src={sideMenu.src} alt={sideMenu.name} onClick={() => handleAddSideMenu(sideMenu)} />
                </div>
                <strong onClick={() => handleAddSideMenu(sideMenu)}>{sideMenu.name}</strong>
                <strong style={{color: '#e22137'}}>
                  {convertCommaNumber(sideMenu.price)}
                </strong>
              </Styled.MenuWrap>
            )
          })}
        </Styled.Wrap>
      ))}
      <Styled.BottomWrap>
        <ul>
          <li>선택수량 : 2</li>
          <li>잔여수량 : {remainingQuantity}</li>
        </ul>
        <Styled.CancleButton onClick={handleCloseSideMenu}>취소하기</Styled.CancleButton>
        <Styled.CompleteButton onClick={onClickSubmitMenu}>선택완료</Styled.CompleteButton>
      </Styled.BottomWrap>
    </div>
  );
});

export default DesertAndDrinkMenu;
