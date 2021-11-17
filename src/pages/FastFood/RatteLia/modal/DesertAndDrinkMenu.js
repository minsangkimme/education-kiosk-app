import React, {useCallback, useRef} from 'react';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab, {tabClasses} from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {CustomSlider, settings} from "../SelectMenuList";
import {CategoryInformation, sideMenuInformation} from "../MenuInfo";
import styled from 'styled-components';
import {convertCommaNumber} from "../../../../utils/comma";


const BottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  & ul {
    margin: 0;
    padding: 2px 25px;
    background: #ffecdb;
    list-style: none;
  }
  & ul li::before {
    content: "\\2022";
    color: red;
    font-weight: bold;
    display: inline-block; 
    width: 1em;
    margin-left: -1em;
  }
`;

const CancleButton = styled.button`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const CompleteButton = styled.button`
  background: #ddfbd9;
  border: 1px solid #ddfbd9;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const Wrap = styled.div`
  padding: 0 10px;  
  min-height: 300px;
  max-height: 350px;
  display: flex !important;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const MenuWrap = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  word-break: break-all;
  text-align: center;
  margin: 10px;
  
  & img {
    width: 65px;
  }
`;

const Slider = styled(CustomSlider)`
  .slick-dots {
    bottom: 0;
  }
  .slick-prev, .slick-next  {
    top: 50%;
  }
`;

const DesertAndDrinkMenu = ({menu, setSideMenuTab, sideMenuTab}) => {
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
  const renderSideMenu = sideMenuTab === 'desert' ? sideMenuInformation.desert : sideMenuInformation.drink;
  const pageSize = 16;
  const selectedCategory = renderSideMenu.flat();
  const totalCount = selectedCategory.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumberList = '*'.repeat(totalPage).split("");

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
      <Slider ref={sliderRef} {...settings} style={{overflow: 'hidden'}}>
        {pageNumberList.map((_, i) => (
          <Wrap key={i} ref={wrapRef}>
            {renderSideMenu[i].map((menu) => {
              return (
                <MenuWrap key={menu.id}>
                  <img src={menu.src} alt={menu.name} />
                  <strong>{menu.name}</strong>
                  <strong style={{color: '#e22137'}}>
                    {convertCommaNumber(menu.price)}
                  </strong>
                </MenuWrap>
              )
            })}
          </Wrap>
        ))}
      </Slider>
      <BottomWrap>
        <ul>
          <li>선택수량 : 2</li>
          <li>잔여수량 : 0</li>
        </ul>
        <CancleButton>취소하기</CancleButton>
        <CompleteButton>선택완료</CompleteButton>
      </BottomWrap>
    </div>
  );
};

export default DesertAndDrinkMenu;
