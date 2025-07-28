import {useState,useRef,useEffect} from 'react';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';

import { styled, useTheme } from '@mui/material/styles';

export const drawerWidthClosed = 60; // Fixed width when closed

export default function Sidebar( {setValue, selectedMenu}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const drawerWidthOpen = useRef(240); // default fallback

  // Create refs for each menu item text to measure widths
  const itemTextRefs = useRef([]);

  const menuItems = [
    { text: 'Category', icon: <CategoryIcon sx={{ color: 'white' }} /> },
    { text: 'Add Product', icon: <StorefrontIcon sx={{ color: 'white' }} /> },
    { text: 'Products', icon: <InventoryIcon sx={{ color: 'white' }} /> },
    { text: 'Orders', icon: <SettingsIcon sx={{ color: 'white' }} /> },
    // Add more items if needed
  ];

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  // Measure max width of menu item texts on mount/update
  useEffect(() => {
    if (itemTextRefs.current.length === 0) return;

    let maxWidth = 0;
    // console.log(itemTextRefs, "ItemTextRefs")
    itemTextRefs.current.forEach((ref) => {
      if (ref && ref.offsetWidth) {
        // console.log(ref.offsetWidth,"Offset Width")
        maxWidth = Math.max(maxWidth, ref.offsetWidth);
        // console.log(maxWidth,"Max Width")
      }
    });

    // Include padding (e.g. icon + text + extra padding)
    // Example: icon width (approx 40px) + max text width + some padding
    const iconWidth = 40;
    const padding = open?30:10; // you can adjust accordingly
    const calculatedWidth = iconWidth + maxWidth + padding;
// console.log(maxWidth)
    // Set drawer width but clamp minimum and maximum if you want
    drawerWidthOpen.current = calculatedWidth; // e.g., minimum 200px
    setValue(calculatedWidth);
  }, [menuItems, open]);

  
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    selectedMenu(menuItems[index].text)
  };

  const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerwidth',
  })(({ theme, open, drawerwidth }) => ({
    width: open ? drawerwidth : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      width: open ? drawerwidth : drawerWidthClosed,
      overflowX: 'hidden',
      overflowY: 'auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: '#1e293b',
      color: '#fff',
    },
  }));

 return (
  <StyledDrawer variant="permanent" open={open} drawerwidth={drawerWidthOpen}>
    <List>
      <ListItemButton
        sx={{
          justifyContent: open ? 'flex-end' : 'center',
          padding: open ? '8px 16px' : '8px 12px',
          color: 'white',
        }}
        onClick={toggleDrawer}
      >
        <IconButton sx={{ color: 'white' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </ListItemButton>
    </List>

    <Divider sx={{ borderColor: '#334155' }} />

    {/* Scrollable container */}
    <div style={{ overflowY: 'auto', 
        flexGrow: 1, 
        height: 'calc(100vh - 112px)',
         msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'none',   }}>
      {/* Adjust height based on height of toggle button + divider */}
      <List>
        {menuItems.map(({ text, icon }, index) => (
          <Tooltip key={text} title={!open ? text : ''} placement="right" arrow>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2,
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#22c55e',
                  color: '#fff',
                  '& svg': { color: '#fff' },
                },
                '&:hover.Mui-selected': {
                  backgroundColor: '#16a34a',
                },
                '&:hover': {
                  backgroundColor: '#e95038ff',
                  color: '#fff',
                  '& svg': { color: '#fff' },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={text}
                  ref={(el) => (itemTextRefs.current[index] = el)}
                  sx={{ whiteSpace: 'nowrap' }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </div>
  </StyledDrawer>
);

}
