import React, {forwardRef, useCallback, useEffect} from 'react';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab, {tabClasses} from "@mui/material/Tab";
import Box from "@mui/material/Box";

const tabLabels = [
  {
    value: 'recommended',
    label: '추천메뉴'
  },
  {
    value: 'hamburger',
    label: '햄버거'
  },
  {
    value: 'desert',
    label: '디저트/치킨'
  },
  {
    value: 'drink',
    label: '음료/커피'
  },
  {
    value: 'event',
    label: '행사메뉴'
  },
];

const MenuCategory = forwardRef(({menuService, setSelectCategory}, ref) => {
  useEffect(() => {
  }, [])
  const handleChange = useCallback((event, newValue) => {
    setTimeout(() => ref.current.slickGoTo(0), 100);
    menuService.setCategory(newValue, setSelectCategory);
  }, [setSelectCategory, menuService]);

  return (
    <Box sx={{flexGrow: 1, background: '#ffecdb'}}>
      <Tabs
        value={menuService.category}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            display: 'inline-flex',
            '&.Mui-disabled': {opacity: 0.3},
          },
          [`& .${tabsClasses.indicator}`]: {
            background: 'none'
          }
        }}
      >
        {tabLabels.map((tab, i) => (
          <Tab
            key={i}
            label={tab.label}
            value={tab.value}
            sx={{
              [`&.${tabClasses.selected}`]: {
                background: '#fff',
                mt: '3px',
                borderRadius: '5px 5px 0 0',
                color: '#000',
              },
              [`&.${tabClasses.root}`]: {
                minWidth: 75,
                padding: '12px 5px'
              },
              fontWeight: 'bold',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
});

export default MenuCategory;
