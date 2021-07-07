/** Combines multiple classnames into one */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
