import { useState, useEffect } from "react";

// Change .env variable for each project or use blank prefix
const PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? "";

// For NextJS, check that the window exists (is in Browser and not server) to get storage
const defaultStorage = typeof window !== "undefined" ? localStorage : null;

function usePersistedStorage(key, initialValue, storage = defaultStorage) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = storage?.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") return initialValue();

    return initialValue;
  });

  useEffect(() => {
    storage?.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export { usePersistedStorage };
