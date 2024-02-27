import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  let arr: number[] = [25, 70, 10, 45, 80];
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
        <Button text='Новый массив' />
      </div>
      <div className={styles.columns}>
        {arr.map((item, i) => <Column index={item}/>)}
      </div>
    </SolutionLayout>
  );
};
