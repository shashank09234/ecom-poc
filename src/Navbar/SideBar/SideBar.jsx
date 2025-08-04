import { useState, useRef, useMemo, useLayoutEffect } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";

import { styled } from "@mui/material/styles";
// import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";

export const drawerWidthClosed = 60; // Fixed width when closed

export default function Sidebar({ setValue }) {
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const drawerWidthOpen = useRef(240); // default fallback
  // const isLoggedIn = useAuth();
  const itemTextRefs = useRef([]);

  const allMenuItems = [
    {
      id:1,
      text: "Category",
      icon: <CategoryIcon sx={{ color: "white" }} />,
      route: "/categories",
    },
    {
      id:2,
      text: "Products",
      icon: <InventoryIcon sx={{ color: "white" }} />,
      route: "/products",
    },
    {
      id:3,
      text: "Orders",
      icon: <SettingsIcon sx={{ color: "white" }} />,
      route: "/orders",
    },
  ];
  console.log(localStorage.getItem("user"), "login");
  const menuItems = useMemo(() => {
    console.log(localStorage.getItem("user"), "menuItems");
    return localStorage.getItem("user")
      ? allMenuItems
      : allMenuItems.filter(
          (item) => !(item.text === "Category" || item.text === "Add Product")
        );
  }, [localStorage.getItem("user")]);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  useLayoutEffect(() => {
    if (itemTextRefs.current.length === 0) return;

    let maxWidth = 0;
    itemTextRefs.current.forEach((ref) => {
      if (ref && ref.offsetWidth) {
        maxWidth = Math.max(maxWidth, ref.offsetWidth);
      }
    });
    const iconWidth = 40;
    const padding = open ? 30 : 10; // you can adjust accordingly
    const calculatedWidth = iconWidth + maxWidth + padding;
    drawerWidthOpen.current = calculatedWidth; // e.g., minimum 200px
    setValue(calculatedWidth);
  }, [open]);

  const handleListItemClick = (index) => {
    console.log(index, "index");
    setSelectedIndex(index);
  };

  const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerwidth",
  })(({ theme, open, drawerwidth }) => ({
    width: open ? drawerwidth : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
      width: open ? drawerwidth : drawerWidthClosed,
      overflowX: "hidden",
      overflowY: "auto",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: "#1e293b",
      color: "#fff",
    },
  }));

  return (
    <StyledDrawer variant="permanent" open={open} drawerwidth={drawerWidthOpen}>
      <List>
        <ListItemButton
          sx={{
            justifyContent: open ? "flex-end" : "center",
            padding: open ? "8px 16px" : "8px 12px",
            color: "white",
          }}
          onClick={toggleDrawer}
        >
          <IconButton sx={{ color: "white" }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </ListItemButton>
      </List>

      <Divider sx={{ borderColor: "#334155" }} />

      {/* Scrollable container */}
      <div
        style={{
          overflowY: "auto",
          flexGrow: 1,
          height: "calc(100vh - 112px)",
          msOverflowStyle: "none", // IE and Edge
          scrollbarWidth: "none",
        }}
      >
        {/* Adjust height based on height of toggle button + divider */}
        <List>
          {menuItems.map(({ id,text, icon, route }, index) => (
            <Tooltip
              key={text}
              title={!open ? text : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                selected={selectedIndex === id}
                onClick={() => handleListItemClick(id)}
                component={Link}
                to={route}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  color: "white",
                  "&.Mui-selected": {
                    backgroundColor: "#22c55e",
                    color: "#fff",
                    "& svg": { color: "#fff" },
                  },
                  "&:hover.Mui-selected": {
                    backgroundColor: "#16a34a",
                  },
                  "&:hover": {
                    backgroundColor: "#e95038ff",
                    color: "#fff",
                    "& svg": { color: "#fff" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={text}
                    ref={(el) => (itemTextRefs.current[index] = el)}
                    sx={{ whiteSpace: "nowrap" }}
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
