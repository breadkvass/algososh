export const getRandomArr = (): number[] => {
    let arr: number[] = [];
    const length: number = Math.floor(Math.random() * 17) + 3;
    for (let i=0; i <= length; i++) {
        arr[i] = Math.floor(Math.random() * 100);
    }
    return arr;
}