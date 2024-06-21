export function $<T extends HTMLElement>(selectors: string) {
  return document.querySelector<T>(selectors)!;
}

export function $$<T extends HTMLElement>(selectors: string) {
  return document.querySelectorAll<T>(selectors);
}
