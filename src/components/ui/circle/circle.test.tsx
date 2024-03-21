import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

it('Элемент без буквы рендерится корректно', () => {
    const tree = renderer
    .create(<Circle />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с буквой рендерится корректно', () => {
    const tree = renderer
    .create(<Circle letter='i'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с head рендерится корректно', () => {
    const tree = renderer
    .create(<Circle head='i'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с react-элементом в head рендерится корректно', () => {
    const tree = renderer
    .create(<Circle head={<></>} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с tail рендерится корректно', () => {
    const tree = renderer
    .create(<Circle tail='i' />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с react-элементом в tail рендерится корректно', () => {
    const tree = renderer
    .create(<Circle tail={<></>} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с index рендерится корректно', () => {
    const tree = renderer
    .create(<Circle index={1}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент с пропом isSmall ===  true рендерится корректно', () => {
    const tree = renderer
    .create(<Circle isSmall={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Элемент в состоянии default рендерится корректно', () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Элемент в состоянии changing рендерится корректно', () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Элемент в состоянии modified рендерится корректно', () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 