type Reverse = { arr: string[]; swapping: number[]; done: number[] };

const swap = (arr: string[], index1: number, index2: number) => {
    let temp: string = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
  
export const getReverse = (str: string): Reverse[] => {
    const arr: string[] = str.split('');
    const reversed: Reverse[] = [{ arr: arr.slice(), swapping: [], done: [] }];

    for (let i = 0; i < arr.length / 2; i++) {
        const index2: number = str.length - i - 1;
        const length: number = reversed.length;

        reversed.push({ ...reversed[length - 1], swapping: [i, index2] });
        swap(arr, i, index2);
        reversed.push({
            ...reversed[length - 1],
            arr: arr.slice(),
            done: reversed[length - 1].done.concat([i, index2]),
        });
    }
    return reversed;
};