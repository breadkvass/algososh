import React, { useCallback, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getRandomArr } from "./utils";
import { selectionSort, bubbleSort  } from "./utils";
import styles from "./sorting-page.module.css";

type ButtonState = 'active' | 'loading' | 'disabled';

type Buttons = {
  ascending: ButtonState;
  descending: ButtonState;
  resetArray: ButtonState;
}

export type ArrayElement = {
  value: number;
  state: ElementStates;
}

type Sorting = 'select' | 'bubble';

const initialState: Buttons = {
  ascending: 'active',
  descending: 'active',
  resetArray: 'active',
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>(getRandomArr());
  const [sortingType, setSortingType] = useState<Sorting>('select');
  const [buttons, setButtons] = useState<Buttons>(initialState);


  const set = useCallback((arr: ArrayElement[]) => {
    setArray(arr);
  }, [array, setArray]);

  const runSort = useCallback((sorting: Sorting, direction: Direction) => {
    return sorting === 'bubble' ?  bubbleSort(array, direction, set) : selectionSort(array, direction, set)
  }, [array, setArray]);

  const onAscendingButton = useCallback(() => {
    setButtons({
       ascending: 'loading',
       descending: 'disabled',
       resetArray: 'disabled',
    });
    runSort(sortingType, Direction.Ascending).finally(() => setButtons(initialState))
  }, [runSort, sortingType]);

  const onDescendingButton = useCallback(() => {
    setButtons({
       ascending: 'disabled',
       descending: 'loading',
       resetArray: 'disabled',
    });
    runSort(sortingType, Direction.Descending).finally(() => setButtons(initialState))
  }, [runSort, sortingType]);

  const onResetArrayButton = useCallback(() => {
    setArray(getRandomArr());
  }, [runSort]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.filtres}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            onChange={() => setSortingType('select')}
            checked={sortingType === 'select'}
          />
          <RadioInput
            label="Пузырек"
            onChange={() => setSortingType('bubble')}
            checked={sortingType === 'bubble'}
          />
        </div>
        <div className={styles.sorting}>
          <Button
            text='По возрастанию'
            isLoader={buttons.ascending === 'loading' ? true : false}
            onClick={onAscendingButton}
            sorting={Direction.Ascending}
            disabled={buttons.ascending === 'disabled' ? true : false}
          />
          <Button
            text='По убыванию'
            isLoader={buttons.descending === 'loading' ? true : false}
            onClick={onDescendingButton}
            sorting={Direction.Descending}
            disabled={buttons.descending === 'disabled' ? true : false}
          />
        </div>
        <Button
          text='Новый массив'
          onClick={onResetArrayButton}
          disabled={buttons.resetArray === 'disabled' ? true : false}
        />
      </div>
      <div className={styles.columns}>
        {array && array.map((item, i: number) => (
          <Column index={item.value} key={i} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
