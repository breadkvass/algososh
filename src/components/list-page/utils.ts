import { useState } from "react";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}
  
export class LinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
      this.head = null;
      this.size = 0;
  }

  insertAt = (element: T, index: number) => {
      if (index < 0 || index > this.size) {
      throw new Error('Введите корректный индекс');
      } else {
      const node = new Node<T>(element);
      if (index === 0) {
          node.next = this.head;
          this.head = node;
      } else {
          let curr = this.head;
          let currIndex = 1;

          while (currIndex < index) {
              curr && (curr = curr.next);
              currIndex++;
          }

          curr && (node.next = curr.next);
          curr && (curr.next = node);
      }

      this.size++;
      }
  }

  append = (element: T) => {
      const node = new Node<T>(element);
      let current;

      if (this.head === null) {
          this.head = node;
      } else {
          current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = node;
      }
      this.size++;
  }

  prepend = (value: T) => {
      const node = new Node(value, this.head);
      this.head = node;
      this.size++;
  }

  getSize = () => this.size;

  deleteHead = () => {
      if (!this.head) throw new Error('Пустой список!');
      this.head = this.head.next;
      this.size--;
  }

  deleteTail = () => {
      if (!this.head?.next) {
          this.head = null;
      } else {
          let curr = this.head;
          while (curr.next?.next) {
              curr = curr.next;
          }
          curr.next = null;
      }
      this.size--;
  }

  deleteByIndex = (index: number) => {
      if (index < 0 || index > this.size) throw new Error(`Неверный индекс. [0, ${this.size}]`);
      if (!this.head || index === 0) return this.deleteHead();
      let previous = this.head;
      for (let i = 0; i < index - 1 && previous.next && previous.next.next; i++) {
      previous = previous.next;
      }
      previous.next = previous.next!.next;
      this.size--;
  }

  list = () => {
      const arr: T[] = [];
      let curr = this.head;
      curr && arr.push(curr.value);
      while (curr?.next) {
          curr = curr.next;
          arr.push(curr.value);
      }
      return arr;
  };

  reset = () => {
      this.head = null;
      this.size = 0;
  };
}
type HeadTail = 'head' | 'tail';

export type LinkedListNode<T> = {
    letter: string;
    state: ElementStates;
    head?: string | Omit<LinkedListNode<T>, HeadTail>;
    tail?: string | Omit<LinkedListNode<T>, HeadTail>;
  };
  
const changedLinkedList = <T>(item: T, index: number, array: T[]): LinkedListNode<T> => ({
  letter: String(item),
  state: ElementStates.Default,
  head: index === 0 ? 'Head' : undefined,
  tail: index === array.length - 1 ? 'Tail' : undefined,
});

export default function useLinkedList<T>(list: LinkedList<T>) {
  const [container, setContainer] = useState<LinkedListNode<T>[]>(list.list().map(changedLinkedList));
  
  const setHeadTail = <T>(item: T, index: number, array: T[]) => ({
    ...item,
    head: index === 0 ? 'Head' : undefined,
    tail: index === array.length - 1 ? 'Tail' : undefined,
  });
  
  const setDeleting = <T>(item: LinkedListNode<T>): LinkedListNode<T> => ({
    ...item,
    letter: '',
    tail: { letter: item.letter, state: ElementStates.Changing },
    state: ElementStates.Changing,
  });

  const defaultArray = (array: LinkedListNode<T>[], ...index: number[]) => {
    return array.map((item, i) => (index.includes(i) ? { ...item, state: ElementStates.Default } : item))
  }

  const changeArray = (array: LinkedListNode<T>[], ...index: number[]) => {
    return array.map((item, i) => (index.includes(i) ? { ...item, state: ElementStates.Changing } : item));
  }

  const modifyArray = (array: LinkedListNode<T>[], ...index: number[]) => {
    return array.map((item, i) => (index.includes(i) ? { ...item, state: ElementStates.Modified } : item));
  }

  const append = async (item: T) => {
    setContainer((prev) => [...prev.slice(0, -1),
      {
        ...prev[prev.length - 1],
        head: {
          letter: String(item),
          state: ElementStates.Changing
        }
      },
    ]);
    list.append(item);
    await delay(SHORT_DELAY_IN_MS);
    const array = list.list().map(changedLinkedList);
    setContainer(modifyArray(array, array.length - 1));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(array);
  };

  const prepend = async (item: T) => {
    setContainer(([first, ...prev]) => [{
      ...first,
      head: {
        letter: String(item),
        state: ElementStates.Changing
      }
    },
    ...prev,
    ]);
    list.prepend(item);
    await delay(SHORT_DELAY_IN_MS);
    const array = list.list().map(changedLinkedList);
    setContainer(modifyArray(array, 0));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(array);
  };

  const insertAt = async (item: T, index: number) => {
    for (let i = 0; i < index; i++) {
      setContainer((prev) =>
        changeArray(prev, i).map(setHeadTail).map((value, index) =>
          index === i ? { ...value, head: { letter: String(item), state: ElementStates.Changing } } : value
        )
      );
      await delay(SHORT_DELAY_IN_MS);
    }
    setContainer((prev) =>
      prev.map(setHeadTail).map((value, i) =>
          i === index ? { ...value, head: { letter: String(item), state: ElementStates.Changing } } : value
      )
    );

    list.insertAt(item, index);
    setContainer(modifyArray(list.list().map(changedLinkedList), index));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(defaultArray(list.list().map(changedLinkedList), index));
  };

  const deleteHead = async () => {
    setContainer(([first, ...prev]) => [ setDeleting(first), ...prev ]);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setContainer(list.list().map(changedLinkedList));
  };

  const deleteTail = async () => {
    setContainer((prev) => [ ...prev.slice(0, -1), setDeleting(prev[prev.length - 1]) ]);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setContainer(list.list().map(changedLinkedList));
  };

  const deleteIndex = async (index: number) => {
    for (let i = 0; i < index; i++) {
      setContainer((prev) => changeArray(prev, i));
      await delay(SHORT_DELAY_IN_MS);
    }
    setContainer((prev) => prev.map((value, i) => (i === index ? setDeleting(value) : value)));
    await delay(SHORT_DELAY_IN_MS);
    list.deleteByIndex(index);
    setContainer(list.list().map(changedLinkedList));
  };

  const reset = () => {
    list.reset();
    setContainer(list.list().map(changedLinkedList));
  };

  return [container, { append, prepend, insertAt, deleteIndex, deleteHead, deleteTail, reset }] as const;
}