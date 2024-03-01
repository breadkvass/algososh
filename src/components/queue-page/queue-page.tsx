import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './queue-page.module.css';

export class Queue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      delete this.container[this.head % this.size];
      this.head++;
      this.length--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.container[this.head]) {
      return this.container[this.head];
    } else
    return null;
  };

  isEmpty = () => this.length === 0;

  list = (): (T | null)[] => this.container.slice();

  getHead = () => this.head;
  getTail = () => this.tail;

  reset = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size).fill(null);
  };
}

export const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  let array: string[] = ['', '', '', '', '', '', ''];
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={() => {}}>
        <div className={styles.edit}>
          <Input isLimitText maxLength={4} value={''} onChange={(e) => setInputValue(e.currentTarget.value)} />
          <Button type="submit" text="Добавить" disabled={!inputValue} isLoader={false} />
          <Button onClick={() => {}} text="Удалить" disabled={false} isLoader={false} />
        </div>
        <Button disabled={false} onClick={() => {}} text="Очистить" />
      </form>
      <div className={styles.circles}>
        {array.map((item, i) => (
          <Circle letter={item} key={i} index={i} />
        ))}
      </div>
    </SolutionLayout>
  );
};
