import { useEffect } from "react";

export default function useKeyboardShortcuts(
  mapper: Record<string, () => void>
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (mapper[key]) {
        e.preventDefault();
        mapper[key]();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mapper]);
}
