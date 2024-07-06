/**
 * Builds a query.
 * @param query - Query object.
 * @returns The query string with question mark.
 */
export function buildQuery(query: Query): string {
  const queryObject = Object.fromEntries(
    (function* yieldEntries(): Generator<readonly [string, string]> {
      for (const [key, value] of Object.entries(query))
        switch (typeof value) {
          case "number": {
            yield [key, value.toString()];

            break;
          }

          case "string": {
            yield [key, value];

            break;
          }

          case "undefined":
          // Do nothing
        }
    })()
  );

  const queryParams = new URLSearchParams(queryObject);

  const queryStr = queryParams.toString();

  return queryStr.length > 0 ? `?${queryStr}` : "";
}

export interface Query {
  readonly [key: string]: number | string | undefined;
}
