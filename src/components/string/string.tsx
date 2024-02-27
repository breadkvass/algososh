import React, { FormEvent } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { getReverse } from "./utils";
import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<{ loading: boolean; arr: string[]; swapping: number[]; done: number[] }>({
    loading: false,
    arr: [],
    swapping: [],
    done: [],
  });

  const reverse = async (str: string) => {
    const arr = getReverse(str);

    setData({
      loading: false,
      arr: [],
      swapping: [],
      done: [],
    });

    for (let i = 0; i < arr.length; i++) {
      setData((prev) => ({ ...prev, ...arr[i] }));
      await delay(DELAY_IN_MS);
    }
  };

  const setState = (index: number) => {
    if (data.done.includes(index)) return ElementStates.Modified;
    if (data.swapping.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, loading: true }));
    inputValue && reverse(inputValue).then(() => setData((prev) => ({ ...prev, loading: false })));
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} value={inputValue} onChange={handleChange} />
        <Button type="submit" text="Развернуть" disabled={!inputValue} isLoader={data.loading} />
      </form>
      <div className={styles.circles}>
        {data.arr.map((item, i) => (
          <Circle letter={item} key={i} state={setState(i)} />
        ))}
      </div>
    </SolutionLayout>
  );
};