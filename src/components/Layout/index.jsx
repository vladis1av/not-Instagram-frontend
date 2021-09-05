import { MobileNav, Header } from '..';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <MobileNav />
    </>
  );
};

export default Layout;
