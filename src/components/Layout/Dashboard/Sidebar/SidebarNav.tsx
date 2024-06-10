import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem';
import { getDictionary } from '@/locales/dictionary';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { PropsWithChildren } from 'react';

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

export default async function SidebarNav() {
  const dict = await getDictionary();
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
      </SidebarNavItem>
    </ul>
  );
}
