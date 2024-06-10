import HeaderLocale from '@/components/Layout/Dashboard/Header/HeaderLocale';
import HeaderTheme from '@/components/Layout/Dashboard/Header/HeaderTheme';
import { getDictionary, getLocale } from '@/locales/dictionary';
import { getPreferredTheme } from '@/themes/theme';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

export default async function HeaderNotificationNav() {
  const dict = await getDictionary();
  return (
    <Nav>
      <NavItem>
        <HeaderLocale currentLocale={getLocale()} />
      </NavItem>
      <NavItem>
        <HeaderTheme currentPreferredTheme={getPreferredTheme()} />
      </NavItem>
    </Nav>
  );
}
