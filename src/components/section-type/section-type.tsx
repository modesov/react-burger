import { FC, ReactNode, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { setCurrentTab } from '../../services/actions/tabs';
import { useDispatch } from '../../services/hooks';

interface SectionTypeProps {
  value: string;
  text: string;
  children: ReactNode;
  root: Element | null
}

const SectionType: FC<SectionTypeProps> = ({ value, text, children, root}) => {
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

export default SectionType;
