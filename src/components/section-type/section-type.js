import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useInView } from 'react-intersection-observer';
import { setCurrentTab } from '../../services/actions';

function SectionType({ value, text, children, root}) {
  // Очень похоже на костыль но пока не придумал как иначе сделать)
  const marginRootBottom = root?.clientHeight ? root.clientHeight - 94 : 500;
  const {ref, inView} = useInView({
    threshold: 0,
    root: root,
    rootMargin: `0px 0px -${marginRootBottom}px 0px`
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(setCurrentTab(value));
    }
  }, [dispatch, inView, value]);

  return (
    <section id={value} className='pt-10'>
      <h2 ref={ref} className="text text_type_main-medium">{text}</h2>
      {children}
    </section>
  );
}

SectionType.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  root: PropTypes.object
}

export default SectionType;
