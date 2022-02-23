import { useState } from "react";
import { Prefix } from "../../constants/prefix";

const useBlockUser = (time: number) => {
  const [timeouts, setTimeouts] = useState<{
    [k: number]: NodeJS.Timeout | undefined;
  }>({});

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
