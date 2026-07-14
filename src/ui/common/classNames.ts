/**
 * Safely joins CSS class names together.
 *
 * Example:
 *
 * classNames(
 *   "btn",
 *   "btn-primary",
 *   isDisabled && "btn-disabled",
 *   className
 * )
 *
 * Result:
 *
 * "btn btn-primary btn-disabled"
 */
export function classNames(
  ...classes: Array<string |false |null |undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
