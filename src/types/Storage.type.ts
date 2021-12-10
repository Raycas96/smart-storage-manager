export interface StorageType {
  key: string;
  value: string;
  tabId: string;
  storage: 'Local Storage' | 'Session Storage' | 'Cookies';
}

export type StorageValueType = Omit<StorageType, 'key'> & {
  storeKey: string;
};

export interface StorageLengthType {
  [key: string]: any;
  session: number;
  local: number;
}
