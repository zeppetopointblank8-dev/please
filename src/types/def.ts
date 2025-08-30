/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */

//#region Auth
export interface Credentials {
    email: string;
    password: string;
}

export interface Login {
    items: {
        token: string;
        user: User;
    }
}

export interface DecodedType {
    id?: string;
    name?: string;
    username?:string;
    roleName?: string;
    roleId?: string;
}

//#region API Response
export interface PaginatedAPIData<T = unknown> {
    items: T[];
    pagination: Partial<{
      page: number;
      page_size: number;
      total_data: number;
      total_page: number;
      current_page: number;
      current_data: number;
    }>;
}

export interface APIData<T = unknown> {
    items: T;
    pagination: Partial<{
      page: number;
      page_size: number;
      total_data: number;
      total_page: number;
      current_page: number;
      current_data: number;
    }>;
}
  
export interface APIResponse<T = unknown> {
    status: boolean;
    message: string;
    code: string;
    data: T | null;
}

export type ServerActionResult<T> = {
    success: boolean;
    data: T | null;
    message?: string; // ✅ Tambahkan ini
};
    
export interface PaginatedAPIResponse<T = unknown>
    extends APIResponse<PaginatedAPIData<T>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
    map(arg0: (r: any) => { label: any; value: any }): any;
}

export interface PaginatedAPIResponseBackend<T = unknown>
    extends APIResponse<PaginatedAPIData<T>> {}

export interface DataAPIResponse<T = unknown> extends APIResponse<APIData<T>> {}

export type PaginationParams = Partial<{
    page?: number;
    page_size?: number;
  }>;

  
//#endregion


//#region Collections


export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    status: string;
}



