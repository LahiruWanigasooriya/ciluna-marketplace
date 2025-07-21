import { useState, useCallback } from "react";

interface UseGlobalMenuReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useGlobalMenu = (): UseGlobalMenuReturn => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return { isMenuOpen, toggleMenu };
};
