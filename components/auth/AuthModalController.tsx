import { lazy } from "react";
import { useMediaQuery } from "react-responsive";

const DesktopAuthModal = lazy(() => import("./desktop/DesktopAuthModal"));
const TabletAuthModal = lazy(() => import("./tablet/TabletAuthModal"));
const MobileAuthModal = lazy(() => import("./mobile/MobileAuthModal"));

const AuthModalController = ({}) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 });

  const isMobile = useMediaQuery({ maxWidth: 599 });
  return (
    <>
      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && <DesktopAuthModal />}

      {/*Tablet Auth Modal*/}

      {isTablet && <TabletAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <MobileAuthModal />}
    </>
  );
};

export default AuthModalController;
