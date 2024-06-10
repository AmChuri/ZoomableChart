import HeaderNotificationNav from '@/components/Layout/Dashboard/Header/HeaderNotificationNav';
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler';
import { Container } from 'react-bootstrap';

export default function Header() {
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container
        fluid
        className="header-navbar d-flex align-items-center px-0 px-sm-3"
      >
        <HeaderSidebarToggler />

        <div className="header-nav ms-auto">
          <HeaderNotificationNav />
        </div>
      </Container>
      <div className="header-divider border-top my-2 mx-sm-n2" />
    </header>
  );
}
