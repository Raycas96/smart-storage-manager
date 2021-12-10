export interface StorageType {
  key: string;
  value: string;
  tabId: number;
}

export interface StoreStorageType {
  local: StorageType[];
  session: StorageType[];
}

export type StorageValueType = Omit<StorageType, 'key'> & {
  storeKey: string;
};

export interface StorageLengthType {
  [key: string]: any;
  session: number;
  local: number;
}
