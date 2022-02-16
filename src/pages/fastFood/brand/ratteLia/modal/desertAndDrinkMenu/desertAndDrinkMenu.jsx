import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab, {tabClasses} from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {sideMenuInformation} from "../../menuInfo";
import {convertCommaNumber} from "../../../../../../utils/comma";
import * as Styled from './styled';


const DesertAndDrinkMenu = ({menu, setSideMenuTab, sideMenuTab, onClickAddSideMenu, onClickRemoveSideMenu,
                              renderSideMenu, setRenderSideMenu, onClickSubmitMenu, onClickCancleMenu,
                            openDesert}) => {
  const [value, setValue] = React.useState(0);
  const sliderRef = useRef(null);
  const wrapRef = useRef(null);
  const handleChange = useCallback((event, newValue) => {
    sliderRef.current.slickGoTo(0);

    setValue(newValue);

    switch (newValue) {
      case 0:
        return setSideMenuTab('desert');
      case 1:
        return setSideMenuTab('drink');
    }
  }, [value, sideMenuTab]);
  const sideMenuCategory = ['세트_디저트', '세트_드링크'];
  const pageSize = 16;
  const selectedCategory = renderSideMenu.flat();
  const remainingQuantity = useMemo(() => menu.sideMenuList?.length || 0, [menu]);
  const totalCount = selectedCategory.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumberList = '*'.repeat(totalPage).split("");
  const getSideMenuIdx = useCallback((type) => (menu.sideMenuList?.findIndex((v) => v.type === type)), [menu]);

  useEffect(() => {
    if (!openDesert) {
      setValue(0);
    }
  }, [openDesert]);
  useEffect(() => {
    if (sideMenuTab === 'desert') {
      setRenderSideMenu(sideMenuInformation.desert);
    } else {
      setRenderSideMenu(sideMenuInformation.drink);
    }
  }, [sideMenuTab]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, background: '#f6f6f6' }}>
        <Tabs
          value={value}
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
              label={v}
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
      {/* 슬라이더 */}
      <Styled.Slider ref={sliderRef} {...Styled.settings} style={{overflow: 'hidden'}}>
        {pageNumberList.map((_, i) => (
          <Styled.Wrap key={i} ref={wrapRef}>
            {renderSideMenu[i].map((sideMenu) => {
              return (
                <Styled.MenuWrap key={sideMenu.id}>
                  {/* 사이드 메뉴 추가 시 번호 및 삭제 버튼 추가 */}
                  <div style={{position: 'relative'}}>
                    {sideMenu.isSelected &&
                      <>
                        <Styled.RemoveButton onClick={() => onClickRemoveSideMenu(sideMenu)} />
                        <Styled.OrderNumber>{getSideMenuIdx(sideMenu.type) + 1}</Styled.OrderNumber>
                      </>
                    }
                    <img src={sideMenu.src} alt={sideMenu.name} onClick={() => onClickAddSideMenu(sideMenu)} />
                  </div>
                  <strong onClick={() => onClickAddSideMenu(sideMenu)}>{sideMenu.name}</strong>
                  <strong style={{color: '#e22137'}}>
                    {convertCommaNumber(sideMenu.price)}
                  </strong>
                </Styled.MenuWrap>
              )
            })}
          </Styled.Wrap>
        ))}
      </Styled.Slider>
      <Styled.BottomWrap>
        <ul>
          <li>선택수량 : 2</li>
          <li>잔여수량 : {remainingQuantity}</li>
        </ul>
        <Styled.CancleButton onClick={onClickCancleMenu}>취소하기</Styled.CancleButton>
        <Styled.CompleteButton onClick={onClickSubmitMenu}>선택완료</Styled.CompleteButton>
      </Styled.BottomWrap>
    </div>
  );
};

export default DesertAndDrinkMenu;
