import { TemplateRef } from "@angular/core";

export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'custom' | 'button' | 'boolean-icon';

// export interface TableColumn {
//   title: string;
//   key: string;
//   type: ColumnType;
//   sortable?: boolean;
//   width?: string;
//   sticky?: boolean;
//   format?: (value: any) => string;
//   cellTemplate?: (row: any) => string;
//   //handeling action button in table column
//   actionButton?: {
//     label: string | ((row: any) => string);   
//     icon?: string;                            
//     color?: 'primary' | 'accent' | 'warn';    
//     callback: (row: any) => void; 
//     class?: string;           
//   };
// }

// shared/models/table-column.interface.ts

export interface ActionButtonConfig {
    label: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    tooltip?: string;
    callback: (row: any) => void;
    class?: string;
}

export interface TableColumn {
    maxLength?: number;
    noTruncate?: boolean;
    title: string;
    key: string;
    type: ColumnType;
    sortable?: boolean;
    width?: string;
    sticky?: boolean;
    format?: (value: any) => string;

    statusMap?: {
        [key: string | number]: {
            label: string;      // translate key
            class: string;      // css class
        };
    };
    actionButton?: ActionButtonConfig | ((row: any) => ActionButtonConfig);
    boldHeader?: boolean;
    valueGetter?: (row: any) => any;

    toggle?: {
        confirmMessage?: (nextValue: boolean, row: any) => string; // رسالة التأكيد
        itemName?: (row: any) => string; // الاسم الظاهر في الرسالة
        disabled?: (row: any) => boolean; // لتحديد  التوجل مفعل أم لا
    };

    routeButton?: {
        label?: string | ((row: any) => string);
        icon?: string;
        route: string | ((row: any) => string);
        queryParams?: (row: any) => any;
    };
    select?: {
        options: Array<{ value: any; label: string }>; // label = translation key
        disabled?: (row: any) => boolean;
    };
}

export interface TableAction {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: CustomAction[];
    label?: string;
    detail?: boolean;
    paymentDetail?: boolean;
}

export interface CustomAction {
    icon: string;
    tooltip: string;
    callback: (row: any) => void;
    color?: 'primary' | 'accent' | 'warn';
    condition?: (row: any) => boolean; // Optional condition to show/hide the action
    disabled?: boolean | ((row: any) => boolean);
}

export interface TableConfig {
    columns: TableColumn[];
    data: any[];
    actions?: TableAction;
    pageSize?: number;
    pageSizeOptions?: number[];
    showSearch?: boolean;
    searchPlaceholder?: string;
}
