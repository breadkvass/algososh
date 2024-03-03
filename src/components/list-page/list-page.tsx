import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from './list-page.module.css';

export const ListPage: React.FC = () => {

  const [ numberValue, setNumberValue ] = useState('');
  const [ indexValue, setIndexValue ] = useState<number>();

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.column}>
        <div className={styles.row}>
          <Input
            isLimitText={true}
            maxLength={4}
            placeholder='Введите значение'
            value={numberValue}
            extraClass={styles.input}
            onChange={(e) => setNumberValue(e.currentTarget.value)}
          />
          <Button
            onClick={() => {}}
            text="Добавить в head"
            disabled={false}
            isLoader={false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={() => {}}
            text="Добавить в tail"
            disabled={false}
            isLoader={false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={() => {}}
            text="Удалить из head"
            disabled={false}
            isLoader={false}
            extraClass={styles.numberButton}
          />
          <Button 
            onClick={() => {}}
            text="Удалить из tail"
            disabled={false}
            isLoader={false}
            extraClass={styles.numberButton}
          />
        </div>
        <div className={styles.row}>
          <Input
            isLimitText={true}
            maxLength={4}
            placeholder='Введите индекс' 
            value={indexValue}
            extraClass={styles.input}
            onChange={(e) => setIndexValue(parseInt(e.currentTarget.value))}
          />
          <Button 
            onClick={() => {}}
            text="Добавить по индексу"
            disabled={false}
            isLoader={false}
            extraClass={styles.indexButton}
          />
          <Button
            onClick={() => {}}
            text="Удалить по индексу"
            disabled={false}
            isLoader={false}
            extraClass={styles.indexButton}
          />
        </div>
      </div>
      
    </SolutionLayout>
  );
};
