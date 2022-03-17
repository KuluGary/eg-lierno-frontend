import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useQueryState(key, defaultTo, type, includePrevQuery = true) {
  const { query, pathname, push } = useRouter();
  const [state, rawSetState] = useState(() => {
    return query[key] || defaultTo;
  });

  useEffect(() => {
    if (!!query[key] && query[key] !== state) {
      rawSetState(query[key]);
    }
  }, [query]);

  function setState(value) {
    push({
      pathname,
      query: { ...(includePrevQuery ? query : {}), [key]: value },
    });
  }

  function parseQueryValue(value) {
    switch (type) {
      case "number":
        return parseInt(value);
      case "object":
        return JSON.parse(value);
      default:
        return value;
    }
  }

  return [parseQueryValue(state), setState];
}
