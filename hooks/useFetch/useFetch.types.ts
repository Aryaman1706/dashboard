export enum Status {
  idle = "idle",
  loading = "loading",
  success = "success",
  failed = "failed",
}

export type TProps = {
  url: string;
  successCb?: (data?: any) => void;
  failureCb?: (error?: string) => void;
};

export type TData = any;
