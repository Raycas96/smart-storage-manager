export interface StorageType {
  key: string;
  value: string;
  tabId: string;
  storage: storage;
}

export type StorageValueType = Omit<StorageType, 'key'> & {
  storeKey: string;
  setStorageValue: (storage: StorageType[]) => void;
};

export interface StorageLengthType {
  [key: string]: any;
  session: number;
  local: number;
}

export type storage = 'local' | 'session' | 'cookies';
