export function calc(turn: string, step: string, surplus: string) {
  if (!turn && !step && !surplus) {
    return 0;
  }
  if (!step && !surplus) {
    return parseInt(turn);
  }
  if (!turn && !surplus) {
    return 0;
  }
  if (!turn) {
    return parseInt(surplus);
  }
  if (!step) {
    return parseInt(turn) * 1 + parseInt(surplus);
  }
  if (!surplus) {
    return parseInt(turn) * parseInt(step);
  }
  return parseInt(turn) * parseInt(step) + parseInt(surplus);
}
