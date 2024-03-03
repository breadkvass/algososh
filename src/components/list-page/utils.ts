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
        if (!this.head) throw new Error('Список пуст!');
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