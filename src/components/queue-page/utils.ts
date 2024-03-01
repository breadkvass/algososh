import { useState } from "react";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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
        throw new Error('Достигнута максимальная длина');
      }
      this.container[this.tail % this.size] = item;
      this.length++;
      this.tail + 1 < this.size ? this.tail++ : this.tail = 0;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error('Нет элементов в очереди');
      }
      this.container[this.head] = null;
      this.length--;
      this.head + 1 < this.size ? this.head++ : this.head = 0;
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error('Нет элементов в очереди');
      }
      return this.container[this.head] ? this.container[this.head] : null;
    };
  
    isEmpty = () => this.length === 0;
  
    isFull = () => this.length >= this.size;
  
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

export default function useQueue<T>(queue: Queue<T>) {
    const [container, setContainer] = useState({
      array: queue.list(),
      head: queue.getHead(),
      tail: queue.getTail(),
      changing: -1,
    });
  
    const setChanging = (index: number) => setContainer((prev) => ({ ...prev, changing: index }));
  
    const enqueue = async (item: T) => {
      setChanging(container.tail);
      await delay(SHORT_DELAY_IN_MS);
      queue.enqueue(item);
      setContainer((prev) => ({ ...prev, array: queue.list(), changing: -1, tail: queue.getTail() }));
    };
  
    const dequeue = async () => {
      setChanging(container.head);
      await delay(SHORT_DELAY_IN_MS);
      queue.dequeue();
      setContainer((prev) => ({ ...prev, array: queue.list(), changing: -1, head: queue.getHead() }));
    };
  
    const reset = () => {
      queue.reset();
      setContainer({
        array: queue.list(),
        head: queue.getHead(),
        tail: queue.getTail(),
        changing: -1,
      });
    };
    return [container, { enqueue, dequeue, reset }] as const;
  }