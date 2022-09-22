import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * @param {String} key the key to store in the url params
 * @param {any} defaultTo the value to default to in case there's no value
 * @param {String} type the type of the value stored
 * @param {boolean} includePrevQuery overrite prev query
 *
 * @return {[String|number, function(number|string):void]}
 */
export function useQueryState(key, defaultTo, type, includePrevQuery = true, shallow = true) {
  const { query, pathname, push } = useRouter();
  const [state, rawSetState] = useState(() => query[key] || defaultTo);

  useEffect(() => {
    if (!!query[key] && query[key] !== state) {
      rawSetState(query[key]);
    }
  }, [query]);

  function setState(value) {
    push(
      {
        pathname,
        query: { ...(includePrevQuery ? query : {}), [key]: value },
      },
      undefined,
      { shallow }
    );
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
