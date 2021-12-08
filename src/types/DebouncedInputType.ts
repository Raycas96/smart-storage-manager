export interface DebouncedInputType {
  initialValue?: '';
  action: (...args: any) => any;
  delay?: number;
}
