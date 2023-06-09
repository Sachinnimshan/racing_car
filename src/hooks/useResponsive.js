import { useEffect, useState } from "react";

const useResponsive = () => {
  const [state, setState] = useState({
    width: undefined,
    mobile: false,
  });

  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth <= 1200) {
      setState({ ...state, mobile: true });
    }
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const isMobile = currentWidth <= 1200;
      setState({
        width: window.innerWidth,
        mobile: isMobile,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state.mobile;
};

export default useResponsive;
