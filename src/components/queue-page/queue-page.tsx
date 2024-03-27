import React, { useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useQueue from "./utils";
import { ElementStates } from "../../types/element-states";
import { HEAD, TAIL } from "../../constants/element-captions";
import styles from './queue-page.module.css';
import { Queue } from "./utils";

type ButtonState = 'active' | 'loading' | 'disabled';

type Buttons = {
  add: ButtonState;
  delete: ButtonState;
  reset: ButtonState;
}

const initialState: Buttons = {
  add: 'active',
  delete: 'active',
  reset: 'active',
};

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [{ array, changing, head, tail }, { enqueue, dequeue, reset }] = useQueue<string>(queue);
  const [buttons, setButtons] = useState<Buttons>(initialState);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtons({
      add: 'loading',
      delete: 'disabled',
      reset: 'disabled',
   });
    enqueue(inputValue).then(() => setButtons(initialState));
    setInputValue('');
  }

  const onClickHandlerDequeue = () => {
    setButtons({
      add: 'disabled',
      delete: 'loading',
      reset: 'disabled',
   });
    dequeue().then(() => setButtons(initialState));
  }

  const setState = (i: number) => {
    return changing === i ? ElementStates.Changing : ElementStates.Default
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handlerSubmit}>
        <div className={styles.edit}>
          <Input isLimitText={true} maxLength={4} value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />
          <Button
            type="submit"
            text="Добавить"
            disabled={queue.isFull() || buttons.add === 'disabled' ? true : false}
            isLoader={buttons.add === 'loading' ? true : false}
          />
          <Button
            onClick={onClickHandlerDequeue}
            text="Удалить"
            disabled={queue.isEmpty() || buttons.delete === 'disabled' ? true : false}
            isLoader={buttons.delete === 'loading' ? true : false}
          />
        </div>
        <Button disabled={queue.isEmpty() || buttons.reset === 'disabled' ? true : false} onClick={reset} text="Очистить" />
      </form>
      <div className={styles.circles}>
        {array.map((item, i, arr) => (
          <Circle letter={item || ''}
            key={i}
            index={i}
            head={i === head ? HEAD : ''}
            tail={i + 1 === tail || (item && i === arr.length - 1 && tail === 0) ? TAIL : ''}
            state={setState(i)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
