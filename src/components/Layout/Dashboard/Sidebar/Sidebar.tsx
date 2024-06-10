'use client';

import { useSidebar } from '@/components/Layout/Dashboard/SidebarProvider';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNarrow, setIsNarrow] = useState(false);

  const {
    showSidebarState: [isShowSidebar],
    showSidebarMdState: [isShowSidebarMd, setIsShowSidebarMd],
  } = useSidebar();

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem('isNarrow', newValue ? 'true' : 'false');
    setIsNarrow(newValue);
  };

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isNarrow')) {
      setIsNarrow(localStorage.getItem('isNarrow') === 'true');
    }
  }, [setIsNarrow]);

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isShowSidebarMd')) {
      setIsShowSidebarMd(
        localStorage.getItem('isShowSidebarMd') === 'true'
      );
    }
  }, [setIsShowSidebarMd]);

  return (
    <div
      className={classNames(
        'sidebar d-flex flex-column position-fixed h-100 border-end',
        {
          'sidebar-narrow': isNarrow,
          show: isShowSidebar,
          'md-hide': !isShowSidebarMd,
        }
      )}
      id="sidebar"
    >
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <h1>Logo </h1>
      </div>

      <div className="sidebar-nav flex-fill border-top">
        {children}
      </div>
    </div>
  );
}
