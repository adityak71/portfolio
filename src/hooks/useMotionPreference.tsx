"use client";

import {
   createContext,
   useCallback,
   useEffect,
   useMemo,
   useState,
   use,
   type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

export type MotionPreference = "full" | "reduced";

export interface MotionPreferenceValue {
   preference: MotionPreference;
   reducedMotion: boolean;
   setPreference: (preference: MotionPreference) => void;
}

const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null);

const STORAGE_KEY = "portfolio-motion-preference";
const PREFERENCES = new Set<MotionPreference>(["full", "reduced"]);

const readPreference = (): MotionPreference => {
   if (typeof window === "undefined") return "full";
   try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return PREFERENCES.has(stored as MotionPreference)
         ? (stored as MotionPreference)
         : "full";
   } catch {
      return "full";
   }
};

export const MotionPreferenceProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const [storedPreference, setStoredPreference] =
      useState<MotionPreference>(readPreference);
   const preference = storedPreference;
   const reducedMotion = preference === "reduced";

   const setPreference = useCallback((next: MotionPreference) => {
      setStoredPreference(next);
      try {
         window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
         // The in-memory preference still works when storage is unavailable.
      }
   }, []);

   const motionMode = reducedMotion ? "reduced" : "full";

   useEffect(() => {
      document.documentElement.dataset.motion = motionMode;
   }, [motionMode]);

   const value = useMemo(
      () => ({ preference, reducedMotion, setPreference }),
      [preference, reducedMotion, setPreference],
   );

   return (
      <MotionPreferenceContext.Provider value={value}>
         <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
            {children}
         </MotionConfig>
      </MotionPreferenceContext.Provider>
   );
};

export default function useMotionPreference() {
   const context = use(MotionPreferenceContext);
   if (!context) {
      throw new Error(
         "useMotionPreference must be used within MotionPreferenceProvider",
      );
   }
   return context;
}
