import { BaseEntity } from "../BaseEntity";


export interface Logging extends BaseEntity {
  tableName: string;
  action: string;
  column_id: string;
  user_id: number;
  user_Name: string;
  ipAddress: string;
  oldStatus: string;
  newStatus: string;
  log_kind: string;
  log_Description: string;
}