import React from 'react';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab, {tabClasses} from "@mui/material/Tab";
import Box from "@mui/material/Box";

const MenuCategory = ({value, handleChange, menuCategory}) => {
  return (
    <Box sx={{flexGrow: 1, background: '#ffecdb'}}>
      <Tabs
        value={value}
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
        {menuCategory.map((v, i) => (
          <Tab
            key={i}
            label={v}
            value={i}
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
};

export default MenuCategory;
