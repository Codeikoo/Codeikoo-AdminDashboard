// models/logging.model.ts
export interface EntityLog {
    id: number;
    tableName: string;
    userId: number;
    columnId: number;
    action: string;
    logkind: string;
    userName: string;
    ipAddress: string;
    pcName: string;
    logDescription: string;
    createdOn: Date;
    oldStatus: Record<string, any>;
    newStatus: Record<string, any>;
    changes: FieldChange[];
}

export interface FieldChange {
    fieldName: string;
    oldValue: string;
    newValue: string;
}
export interface LogsRequest {
    pageNumber?: number;
    pageSize?: number;
    fromDate?: Date;
    toDate?: Date;
}
