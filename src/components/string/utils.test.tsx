import { getReverse } from "./utils";

it('корректно разворачивает строку с чётным количеством символов', () => {
    const reversed = getReverse('qwerty');
    const final = reversed[reversed.length - 1];
    expect(final.arr.join('')).toBe('ytrewq');
});

it('корректно разворачивает строку с нечетным количеством символов', () => {
    const reversed = getReverse('qwert');
    const final = reversed[reversed.length - 1];
    expect(final.arr.join('')).toBe('trewq');
});

it('корректно разворачивает строку с одним символом', () => {
    const reversed = getReverse('q');
    const final = reversed[reversed.length - 1];
    expect(final.arr.join('')).toBe('q');
});

it('корректно разворачивает пустую строку', () => {
    const reversed = getReverse('');
    const final = reversed[reversed.length - 1];
    expect(final.arr.join('')).toBe('');
});
