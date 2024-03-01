import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  let array: string[] = ['', '', '', '', '', '', ''];
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={() => {}}>
        <div className={styles.edit}>
          <Input isLimitText maxLength={4} value={''} onChange={(e) => setInputValue(e.currentTarget.value)} />
          <Button type="submit" text="Добавить" disabled={!inputValue} isLoader={false} />
          <Button onClick={() => {}} text="Удалить" disabled={false} isLoader={false} />
        </div>
        <Button disabled={false} onClick={() => {}} text="Очистить" />
      </form>
      <div className={styles.circles}>
        {array.map((item, i) => (
          <Circle letter={item} key={i} index={i} />
        ))}
      </div>
    </SolutionLayout>
  );
};
