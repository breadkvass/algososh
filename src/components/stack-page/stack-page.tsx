import React, { useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import useStack from "./utils";
import { Stack } from "./utils";
import styles from './stack-page.module.css'

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

export const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [{ array, changing }, { pop, push, reset }] = useStack<string>(stack);
  const [buttons, setButtons] = useState<Buttons>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtons({
      add: 'loading',
      delete: 'disabled',
      reset: 'disabled',
   });
    push(inputValue).then(() => setButtons(initialState));
  }

  const onClickHandlerPop = () => {
    setButtons({
      add: 'disabled',
      delete: 'loading',
      reset: 'disabled',
   });
    pop().then(() => setButtons(initialState));
  }

  const setState = (index: number) => {
    return changing === index ? ElementStates.Changing : ElementStates.Default
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.edit}>
          <Input isLimitText maxLength={4} value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />
          <Button
            type="submit"
            text="Добавить"
            disabled={buttons.add === 'disabled' ? true : false}
            isLoader={buttons.add === 'loading' ? true : false}
          />
          <Button
            onClick={onClickHandlerPop}
            text="Удалить"
            disabled={stack.getSize() === 0 || buttons.delete === 'disabled' ? true : false}
            isLoader={buttons.delete === 'loading' ? true : false}
          />
        </div>
        <Button disabled={stack.getSize() === 0 || buttons.reset === 'disabled' ? true : false} onClick={reset} text="Очистить" />
      </form>
      <div className={styles.circles}>
        {array.map((item, i) => (
          <Circle letter={item} key={i} index={i} state={setState(i)} head={i === array.length-1 ? 'top' : null}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
