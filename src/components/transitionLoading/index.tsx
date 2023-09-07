import React, { FC } from 'react';
import Loading from 'components/loading';
import './transitionLoading.scss';
interface Props {
  loading: boolean;
  className?: string;
}

const TransitionLoading: FC<Props> = ({ children, loading, className }) => {
  const StyledChildren = () =>
    React.Children.map(
      children,
      (child: any) =>
        child &&
        React.cloneElement(child, {
          className: `${child.props.className} ${loading ? 'loading-enter' : 'loading-enter-done'}`,
        }),
    );
  return (
    <>
      <div className={`${className || ''} ${loading ? 'loading-exit' : 'loading-exit-active'}`}>
        <Loading />
      </div>
      {StyledChildren()}
    </>
  );
};

export default TransitionLoading;
