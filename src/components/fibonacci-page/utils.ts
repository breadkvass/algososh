export const getFib = (n: number) => {
    let arr: number[] = [0, 1];
    let fibonacci: string[] = [];
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i-2] + arr[i-1];
    }
    fibonacci = arr.map(item => item.toString());
    return fibonacci;
} 