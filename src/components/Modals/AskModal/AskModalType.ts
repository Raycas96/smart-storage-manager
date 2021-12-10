export interface AskModalType {
  text: string;
  setShow: (show: boolean) => void;
  action: (...args: any) => any;
  show: boolean;
}
