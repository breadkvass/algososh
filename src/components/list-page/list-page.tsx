import React, { useState, Fragment, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedListNode } from "./utils";
import useLinkedList from "./utils";
import { LinkedList } from "./utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from './list-page.module.css';

type ButtonState = 'active' | 'loading' | 'disabled';

type Buttons = {
  addHeadButton: ButtonState;
  deleteHeadButton: ButtonState;
  addTailButton: ButtonState;
  deleteTailButton: ButtonState;
  addIndexButton: ButtonState;
  deleteIndexButton: ButtonState;
}

const initialState: Buttons = {
  addHeadButton: 'active',
  deleteHeadButton: 'active',
  addTailButton: 'active',
  deleteTailButton: 'active',
  addIndexButton: 'active',
  deleteIndexButton:'active'
};

const linkedList = new LinkedList<String>();

function getHeadOrTail<T>(item?: string | Omit<LinkedListNode<T>, 'head' | 'tail'>) {
  if (typeof item === 'undefined') return undefined;
  return typeof item === 'string' ? item : <Circle {...item} isSmall />;
}

export const ListPage: React.FC = () => {
  const [ numberValue, setNumberValue ] = useState('');
  const [ indexValue, setIndexValue ] = useState<number>();
  const [ buttons, setButtons ] = useState<Buttons>(initialState);
  const [ list, { append, prepend, insertAt, deleteTail, deleteIndex, deleteHead } ] = useLinkedList(linkedList);

  const handleSubmitAddHead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtons({
      addHeadButton: 'loading',
      deleteHeadButton: 'disabled',
      addTailButton: 'disabled',
      deleteTailButton: 'disabled',
      addIndexButton: 'disabled',
      deleteIndexButton:'disabled'
    });
    prepend(numberValue).then(() => setButtons(initialState));
    setNumberValue('');
  };

  const handleAddTail = () => {
    setButtons({
      addHeadButton: 'disabled',
      deleteHeadButton: 'disabled',
      addTailButton: 'loading',
      deleteTailButton: 'disabled',
      addIndexButton: 'disabled',
      deleteIndexButton:'disabled'
    });
    append(numberValue).then(() => setButtons(initialState));
    setNumberValue('');
  };

  const handleDeleteHead = () => {
    setButtons({
      addHeadButton: 'disabled',
      deleteHeadButton: 'loading',
      addTailButton: 'disabled',
      deleteTailButton: 'disabled',
      addIndexButton: 'disabled',
      deleteIndexButton:'disabled'
    });
    deleteHead().then(() => setButtons(initialState));
  };

  const handleDeleteTail = () => {
    setButtons({
      addHeadButton: 'disabled',
      deleteHeadButton: 'disabled',
      addTailButton: 'disabled',
      deleteTailButton: 'loading',
      addIndexButton: 'disabled',
      deleteIndexButton:'disabled'
    });
    deleteTail().then(() => setButtons(initialState));
  };

  const handleSubmitAddIndex = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtons({
      addHeadButton: 'disabled',
      deleteHeadButton: 'disabled',
      addTailButton: 'disabled',
      deleteTailButton: 'disabled',
      addIndexButton: 'loading',
      deleteIndexButton:'disabled'
    });
    insertAt(numberValue, indexValue || 0).then(() => setButtons(initialState));
    setIndexValue(parseInt(''));
    setNumberValue('');
  };

  const handleDeleteIndex = () => {
    setButtons({
      addHeadButton: 'disabled',
      deleteHeadButton: 'disabled',
      addTailButton: 'disabled',
      deleteTailButton: 'disabled',
      addIndexButton: 'disabled',
      deleteIndexButton:'loading'
    });
    deleteIndex(indexValue || 0).then(() => setButtons(initialState));
    setIndexValue(parseInt(''));;
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.column}>
        <form className={styles.row} onSubmit={handleSubmitAddHead}>
          <Input
            name="numberValue"
            isLimitText={true}
            maxLength={4}
            placeholder='Введите значение'
            value={numberValue}
            extraClass={styles.input}
            onChange={(e) => setNumberValue(e.currentTarget.value)}
          />
          <Button
            type="submit"
            text="Добавить в head"
            disabled={!numberValue || buttons.addHeadButton === 'disabled' ? true : false}
            isLoader={buttons.addHeadButton === 'loading' ? true : false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={handleAddTail}
            text="Добавить в tail"
            disabled={!numberValue || buttons.addHeadButton === 'disabled' ? true : false}
            isLoader={buttons.addTailButton === 'loading' ? true : false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={handleDeleteHead}
            text="Удалить из head"
            disabled={!list.length || buttons.deleteHeadButton === 'disabled' ? true : false}
            isLoader={buttons.deleteHeadButton === 'loading' ? true : false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={handleDeleteTail}
            text="Удалить из tail"
            disabled={!list.length || buttons.deleteTailButton === 'disabled' ? true : false}
            isLoader={buttons.deleteTailButton === 'loading' ? true : false}
            extraClass={styles.numberButton}
          />
        </form>
        <form className={styles.row} onSubmit={handleSubmitAddIndex}>
          <Input
            name="indexValue"
            type="number"
            maxLength={4}
            min={0}
            max={list.length - 1}
            placeholder='Введите индекс' 
            value={indexValue ? indexValue : ''}
            extraClass={styles.input}
            onChange={(e) => setIndexValue(parseInt(e.currentTarget.value))}
          />
          <Button
            type="submit"
            text="Добавить по индексу"
            disabled={!numberValue || !indexValue || indexValue > list.length - 1 || buttons.addIndexButton === 'disabled' ? true : false}
            isLoader={buttons.addIndexButton === 'loading' ? true : false}
            extraClass={styles.indexButton}
          />
          <Button
            onClick={handleDeleteIndex}
            text="Удалить по индексу"
            disabled={!list.length || !indexValue || indexValue > list.length - 1 || buttons.deleteIndexButton === 'disabled' ? true : false}
            isLoader={buttons.deleteIndexButton === 'loading' ? true : false}
            extraClass={styles.indexButton}
          />
        </form>
      </div>
      <div className={styles.circles}>
        {list.map((item, i, arr) => (
          <div key={i} className={styles.circle}>
            <Circle {...item} head={getHeadOrTail(item.head)} tail={getHeadOrTail(item.tail)} index={i} />
            {i < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
