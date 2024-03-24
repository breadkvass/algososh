import { Dispatch } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { ArrayElement } from "./sorting-page";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const getRandomArr = () => {
    let arr: ArrayElement[] = [];
    const length: number = Math.floor(Math.random() * 17) + 3;
    for (let i=0; i <= length; i++) {
        arr[i] ={ value:Math.floor(Math.random() * 100), state: ElementStates.Default } ;
    }
    return arr;
}

const swap = (arr: ArrayElement[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const selectionSort = async (arr: ArrayElement[], direction: Direction, set: Function) => {
    if (arr.length < 3) {
        set([...arr]);
        console.log('Алгоритм должен принимать на вход массив от 3 элементов');
    } else {
        for (let i = 0; i < arr.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                arr[i].state = arr[j].state = ElementStates.Changing;
                set([...arr]);
                await delay(SHORT_DELAY_IN_MS);
                if (direction === Direction.Ascending && arr[j].value < arr[min].value) {
                    min = j;
                } else if (direction === Direction.Descending && arr[j].value > arr[min].value) {
                    min = j;
                }
                arr[j].state = ElementStates.Default;
                set([...arr]);
            }
            swap(arr, i, min);
            arr[i].state = ElementStates.Modified;
            set([...arr]);
        }
        arr[arr.length - 1].state = ElementStates.Modified;
        set([...arr]);
    }
};

export const bubbleSort = async (arr: ArrayElement[], direction: Direction, set: Function) => {
    if (arr.length < 3) {
        set([...arr]);
        console.log('Алгоритм должен принимать на вход массив от 3 элементов');
    } else {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                arr[j].state = arr[j + 1].state = ElementStates.Changing;
                set([...arr]);
                await delay(SHORT_DELAY_IN_MS);
                if (direction === Direction.Ascending && arr[j].value > arr[j + 1].value) {
                swap(arr, j, j + 1);
                } else if (direction === Direction.Descending && arr[j].value < arr[j + 1].value) {
                swap(arr, j, j + 1);
                }
                arr[j].state = arr[j + 1].state = ElementStates.Default;
                set([...arr]);
            }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        set([...arr]);
        }
    }
};