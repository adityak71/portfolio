"use client";

import { useState, useEffect } from "react";
import { MEDIA_QUERIES } from "@/config/theme";

const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(MEDIA_QUERIES.mobile);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return { isMobile };
};

export default useBreakpoint;
