import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Classnames from 'lib/classnames';
import Style from 'style/component/progressbar.scss';

/**
 * questions: question list
 * length: total length(px) of the bar
 * currentIndex: current index of question
 * Usage:
 * <ProgressBar questions={[1,2,3,4,5,6]} length={400} currentIndex={1} handleCallback={} />
 */
export default function ProgressBar(props) {
  const dotList = props.questions.map((value, index, list) => {
    const percent = index / (list.length - 1) * props.length;
    return (<li
      key={index}
      className={Classnames({'current-dot': index === props.currentIndex})}
      style={{left: `${percent - 13}px`}}>
    </li>);
  });
  return (
    <div className="progressbar" style={{width:`${props.length}px`}}>
      <ul className="progressdots">
        {dotList}
      </ul>
      <div className="progressbackground"></div>
    </div>
  );
}
