import React, { useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import useStack from "./utils";
import styles from './stack-page.module.css'

export class Stack<T> {
  private container: T[] = [];

  pop = (): void => { this.container && this.container.pop() };
  push = (item: T): void => { this.container.push(item); };
  peak = (): T | null => {
    return this.container ? this.container[this.container.length-1] : null;
  };
  getSize = () => this.container.length;
  list = (): T[] => this.container.slice();
  reset = () => (this.container = []);
}

export const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [{ array, changing }, { pop, push, reset }] = useStack<string>(stack);
  const [loading, setLoading] = useState({ addButton: false, deleteButton: false });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, addButton: true }));
    push(inputValue).then(() => setLoading((prev) => ({ ...prev, addButton: false })));
  }

  const onClickHandlerPop = () => {
    setLoading((prev) => ({ ...prev, deleteButton: true }));
    pop().then(() => setLoading((prev) => ({ ...prev, deleteButton: false })));
  }

  const setState = (index: number) => {
    return changing === index ? ElementStates.Changing : ElementStates.Default
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.edit}>
          <Input isLimitText maxLength={4} value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />
          <Button type="submit" text="Добавить" disabled={!inputValue} isLoader={loading.addButton} />
          <Button onClick={onClickHandlerPop} text="Удалить" disabled={!array.length} isLoader={loading.deleteButton} />
        </div>
        <Button disabled={!array.length} onClick={reset} text="Очистить" />
      </form>
      <div className={styles.circles}>
        {array.map((item, i) => (
          <Circle letter={item} key={i} index={i} state={setState(i)} head={i === array.length-1 ? 'top' : null}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
