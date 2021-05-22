/** Combines multiple classnames into one */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
