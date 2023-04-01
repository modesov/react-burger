import { FC, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import itemBurgerInsideStyle from './item-burger-inside.module.css';
import { SelectedIngredientType } from '../../utils/types';
import { FindIndexCallback, MoveBurgerIngredientsCallback } from '../burger-insides/burger-insides';

interface ItemBurgerInsideProps {
  element: SelectedIngredientType;
  handleDelete: (uuid: string) => void;
  findIndex: FindIndexCallback;
  moveBurgerIngredients: MoveBurgerIngredientsCallback;
}

const ItemBurgerInside: FC<ItemBurgerInsideProps> = ({ element, handleDelete, findIndex, moveBurgerIngredients }) => {
  const originalIndex = findIndex(element.uuid);
  const [{ isDrag }, dragRef] = useDrag(
    () => ({
      type: 'constructor',
      item: { element, originalIndex },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        const { element: droppedElement, originalIndex } = item
        if (!didDrop && originalIndex) {
          moveBurgerIngredients(droppedElement, originalIndex);
        }
      }
    }),
    [element, originalIndex, moveBurgerIngredients]
  );

  const [, dropRef] = useDrop<{ element: SelectedIngredientType, originalIndex: number | undefined}, void> (
    () => ({
      accept: 'constructor',
      hover({ element: draggedElement }) {
        if (draggedElement.uuid !== element.uuid) {
          const overIndex: number | undefined = findIndex(element.uuid);
          if (overIndex) {
            moveBurgerIngredients(draggedElement, overIndex);
          }
        }
      },
      collect: monitor => ({
        isHover: monitor.isOver(),
      })
    }),
    [findIndex, moveBurgerIngredients]
  );

return (
  <li ref={(node) => dragRef(dropRef(node))} className={`${itemBurgerInsideStyle.item} ${isDrag ? itemBurgerInsideStyle.isDrag : ''}`}>
    <div className={itemBurgerInsideStyle.iconDrag}><DragIcon type="primary" /></div>
    <div className={itemBurgerInsideStyle.element}>
      <ConstructorElement
        isLocked={false}
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={() => handleDelete(element.uuid)}
      />
    </div>
  </li>
);
}

export default memo(ItemBurgerInside);
