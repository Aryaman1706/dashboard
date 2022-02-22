import { useState } from "react";
import { Status, TData, TSuccessCb, TFailureCb } from "./useFetch.types";

const useFetch = (successCb?: TSuccessCb, failureCb?: TFailureCb) => {
  const [data, setData] = useState<TData>(null);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.idle);

  const get = async (url: string) => {
    try {
      setStatus(Status.loading);
      const response = await fetch(url);
      const responseData = await response.json();

      successCb && successCb(responseData);
      setStatus(Status.success);
      setData(responseData);
    } catch (err) {
      failureCb && failureCb((err as Error)?.message);
      setStatus(Status.failed);
      setError(
        (err as Error)?.message || "Error occured while fetching details"
      );
    }
  };

  const reset = () => {
    setData(null);
    setError("");
    setStatus(Status.idle);
  };

  return [get, reset, data, error, status] as const;
};

export default useFetch;
