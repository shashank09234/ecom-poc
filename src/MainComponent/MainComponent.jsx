import { Outlet } from "react-router-dom";

const MainComponent = ({ topBarWidth }) => {
  return (
    <main
      style={{
        marginLeft: topBarWidth, // Sidebar width offset
        marginTop: "64px", // Height of fixed TopBar
        padding: "24px", // Optional padding
        width: `calc(100% - ${topBarWidth}px)`, // Remaining width after sidebar
        height: `calc(100vh - 64px)`, // Viewport height minus TopBar height
        boxSizing: "border-box",
        backgroundColor: "#f9fafb", // Optional background color
        overflowY: "auto", // Scroll vertically if content overflows
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none",
      }}
    >
      <Outlet />
    </main>
  );
};

export default MainComponent;
