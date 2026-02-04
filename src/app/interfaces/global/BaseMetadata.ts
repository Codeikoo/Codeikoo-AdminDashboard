interface ShortUserInfo {
  id: string;
  name: string;
  image: string;
}

export interface BaseMetaData {
  createdDate: string | Date;
  modifiedDate: string | Date;
  createdBy: ShortUserInfo;
  modifiedBy: ShortUserInfo;
}
