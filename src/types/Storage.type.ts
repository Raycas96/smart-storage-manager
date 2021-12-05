export interface StorageType {
  key: string;
  value: string;
  tabId: number;
}

export interface StoreStorageType {
  local: StorageType[];
  session: StorageType[];
}
