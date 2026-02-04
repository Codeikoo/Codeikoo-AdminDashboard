export interface Filter {
  propertyName: string;
  values: string[];
  type: 'Equals' | 'NotEquals' | 'Contains' | 'StartsWith' | 'EndsWith';
  operator: 'And' | 'Or';
}

export interface Sort {
  propertyName: string;
  direction: 'ASC' | 'DESC';
}

export interface ApiRequestBody {
  pageNumber: number;
  pageSize: number;
  filters: Filter[];
  sorts: Sort[];
  searchTerm: string | null;
  userId: string | null;
  filterOptionIds?: string[];
}
