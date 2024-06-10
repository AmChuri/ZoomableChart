import HeaderNotificationNav from '@/components/Layout/Dashboard/Header/HeaderNotificationNav';
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function Header() {
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container
        fluid
        className="header-navbar d-flex align-items-center px-0 px-sm-3"
      >
        <HeaderSidebarToggler />
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title> Logo</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>

        <div className="header-nav ms-auto">
          <HeaderNotificationNav />
        </div>
      </Container>
      <div className="header-divider border-top my-2 mx-sm-n2" />
    </header>
  );
}
