import { ChangeEventHandler, useState } from "react";

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
