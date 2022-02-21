import { useState, useEffect } from "react";
import { Status, TData, TSuccessCb, TFailureCb } from "./useFetch.types";

const useFetch = (successCb?: TSuccessCb, failureCb?: TFailureCb) => {
  const [data, setData] = useState<TData>(null);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.idle);

  useEffect(() => {
    if (status === Status.success) {
      successCb && successCb(data);
    } else if (status === Status.failed) {
      failureCb && failureCb(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const get = async (url: string) => {
    try {
      setStatus(Status.loading);
      const response = await fetch(url);
      const responseData = await response.json();

      setData(responseData);
      setStatus(Status.success);
    } catch (err) {
      setError(
        (err as Error)?.message || "Error occured while fetching details"
      );
      setStatus(Status.failed);
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
