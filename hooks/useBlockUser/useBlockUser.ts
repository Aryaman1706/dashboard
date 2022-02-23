import { ChangeEventHandler, useState, useEffect } from "react";
import { Prefix } from "../../constants/prefix";

const useBlockUser = (
  initialState: boolean,
  id: number,
  block: (
    id: number,
    blockedCb?: (() => void) | undefined,
    unblockedCb?: (() => void) | undefined
  ) => void,
  unblock: (id: number, forced?: boolean, cb?: () => void) => void
) => {
  const [blocked, setBlocked] = useState<boolean>(initialState);

  useEffect(() => {
    const isBlocked = !!window.localStorage.getItem(
      `${Prefix.BLOCKED_USER}_${id}`
    );

    if (isBlocked) {
      unblockUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blockedCb = () => {
    setBlocked(true);
  };

  const unblockedCb = () => {
    setBlocked(false);
  };

  const blockUser = () => {
    block(id, blockedCb, unblockedCb);
  };

  const unblockUser = () => {
    unblock(id, true, unblockedCb);
  };

  const checkHandler: ChangeEventHandler<HTMLInputElement> = () => {
    if (blocked) unblockUser();
    else blockUser();
  };

  return [blocked, checkHandler] as const;
};

export default useBlockUser;
