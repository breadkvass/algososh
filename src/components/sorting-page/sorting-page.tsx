import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { getRandomArr } from "./utils";

export const SortingPage: React.FC = () => {
  const [ dataRandomArr, setDataRandomArr ] = useState<{arr: number[]; loading: boolean}>({
    arr: [],
    loading: false
  });

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setDataRandomArr((prev) => ({ ...prev, loading: true }));
    setDataRandomArr((prev) => ({ ...prev, arr: getRandomArr() }));
    dataRandomArr.arr && setDataRandomArr((prev) => ({ ...prev, loading: false }));
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.filtres}>
        <div className={styles.radio}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.sorting}>
          <Button sorting={Direction.Ascending} text='По возрастанию' />
          <Button sorting={Direction.Descending} text='По убыванию' />
        </div>
        <Button text='Новый массив' onClick={handleClick}/>
      </div>
      <div className={styles.columns}>
        {dataRandomArr.arr.map((item, i) => <Column index={item} key={i}/>)}
      </div>
    </SolutionLayout>
  );
};
