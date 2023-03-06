import notFoundStyle from './not-found-404.module.css';
import img404 from '../../images/404.png';
import { Link } from 'react-router-dom';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CenterBox from '../../components/UI/center-box/center-box';

export const NotFound404 = () => {
  return (
    <CenterBox>
      <div className={notFoundStyle.img}>
        <img src={img404} alt="Страница не найдена" />
      </div>
      <div className={notFoundStyle.content}>
        <h1 className="text text_type_main-medium">Где Страница? Нет Страницы! <br /> Зато есть замечательные бургеры!</h1>
        <Link className={notFoundStyle.link} to="/">
          <span className="mr-4 text text_type_main-default">Попробуйте наших бургеров</span>
          <BurgerIcon type="primary" />
        </Link>
      </div>
    </CenterBox>
  );
}
