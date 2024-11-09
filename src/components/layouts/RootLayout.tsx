import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, Drawer, Menu } from "antd";
import { SunOutlined, MoonOutlined, MenuOutlined } from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "src/contexts/ThemeContext";
import { MenuNavs } from "src/configs/menus";
import { HeaderMenu } from "./HeaderMenu";

const { Header, Content, Footer } = Layout;

export const RootLayout: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleDrawer = (visible: boolean) => {
    setDrawerVisible(visible);
  };

  const handleThemeToggle = (event: React.MouseEvent) => {
    if (animating) return;

    setAnimating(true);
    const circle = document.createElement("div");
    circle.style.position = "fixed";
    circle.style.borderRadius = "50%";
    circle.style.pointerEvents = "none";
    circle.style.transition = "all 0.4s ease";
    circle.style.zIndex = "9999";

    const button = themeButtonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const size = Math.max(window.innerWidth, window.innerHeight) * 2.5;

      circle.style.width = "0px";
      circle.style.height = "0px";
      circle.style.left = `${rect.left + rect.width / 2}px`;
      circle.style.top = `${rect.top + rect.height / 2}px`;
      circle.style.backgroundColor = isDarkMode ? "white" : "black";

      document.body.appendChild(circle);

      // Trigger reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      circle.offsetWidth;

      // Expand the circle
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${rect.left + rect.width / 2 - size / 2}px`;
      circle.style.top = `${rect.top + rect.height / 2 - size / 2}px`;

      setTimeout(() => {
        toggleTheme();
      }, 400);

      setTimeout(() => {
        // Reverse the animation
        circle.style.width = "0px";
        circle.style.height = "0px";
        circle.style.left = `${rect.left + rect.width / 2}px`;
        circle.style.top = `${rect.top + rect.height / 2}px`;
        circle.style.backgroundColor = isDarkMode ? "black" : "white";

        // Remove the circle after the reverse animation
        setTimeout(() => {
          document.body.removeChild(circle);
          setAnimating(false);
        }, 800);
      }, 800);
    }
  };

  return (
    <Layout className="root-layout">
      <Header className={`site-header ${visible ? "" : "header-hidden"}`}>
        <HeaderMenu />
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => toggleDrawer(true)}
          style={{ marginRight: "16px" }}
        />
      </Header>

      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Điều hướng</span>
            <Button
              ref={themeButtonRef}
              type="text"
              onClick={handleThemeToggle}
              icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
              style={{ marginLeft: "16px" }}
            />
          </div>
        }
        placement="right"
        onClose={() => toggleDrawer(false)}
        open={drawerVisible}
      >
        <Menu>
          {MenuNavs.map((menu) => (
            <Menu.Item key={menu.path} onClick={() => toggleDrawer(!drawerVisible)}>
              <Link to={menu.path}>{menu.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
      <Content className={`site-content`}>
        <Outlet />
      </Content>

      <Footer className="site-footer">
        Callet ©{new Date().getFullYear()} Created by Cafrotos
      </Footer>
    </Layout>
  );
};
