/**
 * Returns a promise that resolves after the given delay.
 * @param delayMs - The delay in milliseconds.
 * @returns A promise that resolves after the given delay.
 */
export function delay(delayMs: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
}
