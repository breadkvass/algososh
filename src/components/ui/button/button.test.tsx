import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

it('Кнопка c текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text='Нажать на кнопку' />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка рендерится без ошибок', () => {
    const tree = renderer
    .create(<Button disabled={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = renderer
    .create(<Button isLoader={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('При клике на кнопку колбек вызывается корректно', () => {
    const onClickMock = jest.fn();
    render(<Button text='Нажать на кнопку' onClick={onClickMock} />);
    fireEvent.click(screen.getByText('Нажать на кнопку'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
}); 