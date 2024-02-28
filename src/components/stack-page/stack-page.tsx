import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StackPage: React.FC = () => {

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.edit}>
          <Input isLimitText maxLength={4} />
          <Button text='Добавить' />
          <Button text='Удалить' />
        </div>
        <Button text='Очистить' />
      </form>
    </SolutionLayout>
  );
};
