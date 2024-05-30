/**
 * Builds a query.
 * @param query - Query object.
 * @returns The query string with question mark.
 */
export function buildQuery(query: Query): string {
  const queryObject = Object.fromEntries(
    (function* yieldEntries(): Generator<[string, string]> {
      // eslint-disable-next-line no-warning-comments -- Postponed
      // TODO: ESLint should check for exhaustive switch cases
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
