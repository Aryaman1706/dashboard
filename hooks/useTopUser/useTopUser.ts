import type { TUser } from "../../components/Users/types";
import { useState, ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Prefix } from "../../constants/prefix";

const useTopUser = (
  initialState: boolean,
  id: number,
  removeUser?: boolean,
  setUsers?: Dispatch<SetStateAction<TUser[]>>
) => {
  const [top, setTop] = useState<boolean>(initialState);

  const checkedHandler: ChangeEventHandler<HTMLInputElement> = (_) => {
    if (top) {
      window.localStorage.removeItem(`${Prefix.TOP_USER}_${id}`);

      removeUser &&
        setUsers &&
        setUsers((prev) => {
          const newUsers = prev.filter((user) => user.id !== id);
          console.log("SetUsers", newUsers);
          return newUsers;
        });
    } else {
      window.localStorage.setItem(`${Prefix.TOP_USER}_${id}`, "true");
    }

    setTop((prev) => !prev);
  };

  return [top, checkedHandler, setTop] as const;
};

export default useTopUser;
