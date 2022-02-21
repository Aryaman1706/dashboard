import { ChangeEventHandler, useState, useEffect } from "react";

const debouncer = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};

const useSearch = <T extends any[]>(
  initialState: T,
  filterfn: (obj: any, keyword: string) => boolean
) => {
  const [keyword, setKeyword] = useState<string>("");
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    if (keyword) {
      const filteredState = initialState.filter((val) =>
        filterfn(val, keyword)
      );
      setState(filteredState as T);
    } else {
      setState(initialState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const _changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  const changeHandler = debouncer<ChangeEventHandler<HTMLInputElement>>(
    _changeHandler,
    200
  );

  return [changeHandler, state] as const;
};

export default useSearch;
