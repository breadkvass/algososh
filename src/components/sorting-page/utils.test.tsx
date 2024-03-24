import { selectionSort, bubbleSort } from "./utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { ArrayElement } from "./sorting-page";

describe('Алгоритм сортировки выбором', () => {
    it('Корректно сортирует пустой массив', () => {
        let result: ArrayElement[] = [];
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        selectionSort([], Direction.Ascending, set);
    
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(0);
    })
    
    it('Корректно сортирует массив с одним элементом', () => {
        let result: ArrayElement[] = [];
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        selectionSort([{ value: 1, state: ElementStates.Default }], Direction.Ascending, set);
    
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(1);
        let element: ArrayElement = result[0];
    
        expect(element.value).toBe(1);
        expect(element.state).toBe(ElementStates.Default);
    })
    
    it('Корректно сортирует массив с несколькими элемента', async () => {
        let result: ArrayElement[] = [];
        const arr: ArrayElement[] = [
            {
                value: 4,
                state: ElementStates.Default
            },
            {
                value: 3,
                state: ElementStates.Default
            },
            {
                value: 2,
                state: ElementStates.Default
            },
            {
                value: 1,
                state: ElementStates.Default
            },
        ]
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        await selectionSort(arr, Direction.Ascending, set);
    
        expect(result).toEqual([
            {
                value: 1,
                state: ElementStates.Modified
            },
            {
                value: 2,
                state: ElementStates.Modified
            },
            {
                value: 3,
                state: ElementStates.Modified
            },
            {
                value: 4,
                state: ElementStates.Modified
            },
        ]);
    })
})

describe('Алгоритм сортировки пузырьком', () => {
    it('корректно сортирует пустой массив', () => {
        let result: ArrayElement[] = [];
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        bubbleSort([], Direction.Ascending, set);
    
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(0);
    })
    
    it('Алгоритм сортировки пузырьком корректно сортирует массив с одним элементом', () => {
        let result: ArrayElement[] = [];
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        bubbleSort([{ value: 1, state: ElementStates.Default }], Direction.Ascending, set);
    
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(1);
        let element: ArrayElement = result[0];
    
        expect(element.value).toBe(1);
        expect(element.state).toBe(ElementStates.Default);
    })

    it('Корректно сортирует массив с несколькими элемента', async () => {
        let result: ArrayElement[] = [];
        const arr: ArrayElement[] = [
            {
                value: 4,
                state: ElementStates.Default
            },
            {
                value: 3,
                state: ElementStates.Default
            },
            {
                value: 2,
                state: ElementStates.Default
            },
            {
                value: 1,
                state: ElementStates.Default
            },
        ]
    
        const set = (arr: ArrayElement[]) => {
            result = arr;
        }
    
        await bubbleSort(arr, Direction.Ascending, set);
    
        expect(result).toEqual([
            {
                value: 1,
                state: ElementStates.Modified
            },
            {
                value: 2,
                state: ElementStates.Modified
            },
            {
                value: 3,
                state: ElementStates.Modified
            },
            {
                value: 4,
                state: ElementStates.Modified
            },
        ]);
    })
})
