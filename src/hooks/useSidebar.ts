import { useState, useEffect } from 'react';

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      }
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
    // Prevent scrolling on mobile when sidebar is open
    if (isMobile) {
      document.body.classList.toggle('sidebar-open');
    }
  };

  return {
    isOpen,
    isMobile,
    toggleSidebar,
  };
}