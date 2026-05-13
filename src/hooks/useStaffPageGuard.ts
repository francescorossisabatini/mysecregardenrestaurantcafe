import { useEffect } from "react";

/**
 * Locks the <html> element to lang="en" + translate="no" while a staff page is mounted.
 * Prevents Safari/Chrome iOS from auto-translating the staff dashboard, which mutates
 * the DOM and crashes React (observed as a blank white screen on iPad).
 *
 * Restores the previous lang/translate on unmount so the public site keeps using DE.
 */
export const useStaffPageGuard = () => {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevTranslate = html.getAttribute("translate");

    html.lang = "en";
    html.setAttribute("translate", "no");
    html.classList.add("notranslate");

    return () => {
      html.lang = prevLang || "de";
      if (prevTranslate === null) html.removeAttribute("translate");
      else html.setAttribute("translate", prevTranslate);
      html.classList.remove("notranslate");
    };
  }, []);
};
