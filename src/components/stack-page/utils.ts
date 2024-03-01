import { useState } from "react";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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

export default function useStack<T>(stack: Stack<T>) {
    const [container, setContainer] = useState({ array: stack.list(), changing: -1 });
    const setChanging = (index: number) => setContainer((prev) => ({ ...prev, changing: index }));

    const push = async (item: T) => {
      stack.push(item);
      setContainer({ changing: container.array.length, array: stack.list() });
      await delay(SHORT_DELAY_IN_MS);
      setChanging(-1);
    };

    const pop = async () => {
      stack.pop();
      setChanging(container.array.length - 1);
      await delay(SHORT_DELAY_IN_MS);
      setContainer({ changing: -1, array: stack.list() });
    };

    const reset = () => {
      stack.reset();
      setContainer({ changing: -1, array: stack.list() });
    };
  
    return [container, { push, pop, reset }] as const;
  }