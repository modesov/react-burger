import { memo } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import itemBurgerInsideStyle from './item-burger-inside.module.css';
import { itemBurgerInsidePropTypes } from '../../utils/propTypeConst';

function ItemBurgerInside({ element, handleDelete, findIndex, moveBurgerIngredients }) {
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
        if (!didDrop) {
          moveBurgerIngredients(droppedElement, originalIndex);
        }
      }
    }),
    [element, originalIndex, moveBurgerIngredients]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'constructor',
      hover({ element: draggedElement }) {
        if (draggedElement.uuid !== element.uuid) {
          const overIndex = findIndex(element.uuid);
          moveBurgerIngredients(draggedElement, overIndex);
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

ItemBurgerInside.propTypes = {
  element: itemBurgerInsidePropTypes.isRequired,
  handleDelete: PropTypes.func.isRequired,
  findIndex: PropTypes.func.isRequired,
  moveBurgerIngredients: PropTypes.func.isRequired
}

export default memo(ItemBurgerInside);
