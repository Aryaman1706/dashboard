export enum Status {
  idle = "idle",
  loading = "loading",
  success = "success",
  failed = "failed",
}

export type TSuccessCb = (data?: any) => void;
export type TFailureCb = (error?: string) => void;

export type TData = any;
