import { useEffect, useState } from "react";
import { Prefix } from "../../constants/prefix";

const useBlockUser = (time: number) => {
  const [timeouts, setTimeouts] = useState<{
    [k: number]: NodeJS.Timeout | undefined;
  }>({});

  const cleanUp = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    Object.keys(timeouts).forEach((id) => {
      window.localStorage.removeItem(`${Prefix.BLOCKED_USER}_${id}`);
      const timeout = timeouts[Number(id)];
      timeout && clearTimeout(timeout);
    });

    setTimeouts({});

    e.returnValue = "Are you sure?";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", cleanUp);

    return () => {
      window.removeEventListener("beforeunload", cleanUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unblock = (id: number, forced: boolean = false, cb?: () => void) => {
    window.localStorage.removeItem(`${Prefix.BLOCKED_USER}_${id}`);
    if (forced) {
      const timeout = timeouts[id];
      timeout && clearTimeout(timeout);
    }
    setTimeouts((prev) => ({ ...prev, [id]: undefined }));
    cb && cb();
  };

  const block = (
    id: number,
    blockedCb?: () => void,
    unblockedCb?: () => void
  ) => {
    window.localStorage.setItem(`${Prefix.BLOCKED_USER}_${id}`, "true");
    const newTimeout = setTimeout(() => {
      console.log("Unblock", id);
      unblock(id, false, unblockedCb);
    }, time);

    setTimeouts((prev) => ({ ...prev, [id]: newTimeout }));
    blockedCb && blockedCb();
  };

  return [block, unblock] as const;
};

export default useBlockUser;
