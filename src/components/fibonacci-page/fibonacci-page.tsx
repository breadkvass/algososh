import React, { useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";
import { getFib } from "./utils";
import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<{ loading: boolean; fibonacci: string[]; count: number }>({
    loading: false,
    fibonacci: [],
    count: 0
  });  

  const getArr = async (n: number) => {
    setData((prev) => ({ ...prev, fibonacci: getFib(n) }));
    for (let i = 0; i <= n; i++) {
      setData((prev) => ({ ...prev, count: i }))
      await delay(SHORT_DELAY_IN_MS);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, loading: true }));
    inputValue && getArr(parseInt(inputValue)).then(() => setData((prev) => ({ ...prev, loading: false })));
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} value={inputValue} onChange={handleChange} />
        <Button type="submit" text="Развернуть" disabled={!inputValue} isLoader={data.loading} />
      </form>
      <div className={styles.circles}>
        {data.fibonacci.slice(0, data.count).map((item, i) => (
          <Circle letter={item} key={i} index={i}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
