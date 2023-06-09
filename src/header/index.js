import React, { useEffect, useState } from "react";
import "./header.styled";
import { Backdrop, HeaderContainer, MenuContainer } from "./header.styled";
import { SiteLogo } from "../images/images.styled";
import { SiteLogoDark, SiteLogoLight } from "../images";
import Navigation from "./Navigation";
import { MenuIcon } from "../icons";
import { navLinks } from "../common/common";

function Header({ mobile }) {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleOpen = () => setShowMenu(!showMenu);
  const handleClose = () => setShowMenu(false);

  const checkScrolledDown = () => {
    if (!scrolledDown && window.pageYOffset > 20) {
      setScrolledDown(true);
    } else if (scrolledDown && window.pageYOffset <= 20) {
      setScrolledDown(false);
    }
  };

  const handleLogoClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", checkScrolledDown);
  }, [window.pageYOffset, scrolledDown]);

  useEffect(() => {
    if (showMenu && !mobile) {
      handleClose();
    }
  }, [mobile]);

  return (
    <HeaderContainer mobile={mobile} scrolledDown={scrolledDown && !showMenu}>
      {!showMenu && (
        <SiteLogo
          src={scrolledDown ? SiteLogoDark : SiteLogoLight}
          alt="Wheels Logo"
          onClick={handleLogoClick}
        />
      )}
      {!mobile && (
        <Navigation
          scrolledDown={scrolledDown}
          showMenu={showMenu}
          onClose={handleClose}
        />
      )}
      {showMenu && (
        <Navigation
          showMenu={showMenu}
          scrolledDown={scrolledDown}
          onClose={handleClose}
          onClick={handleClose}
        />
      )}
      {mobile && !showMenu && (
        <MenuContainer onClick={handleOpen}>
          <MenuIcon />
        </MenuContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
