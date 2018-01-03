import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Classnames from 'lib/classnames';
import Style from 'style/component/progressbar.scss';

/**
 * question: text of the question
 * answers: answers to the questions
 * Usage:
 * <MultipleChoice question={'myQuestionText'} answers=['array', 'of', 'answers'] />
 */
export default function MultipleChoice(props) {
  const { question, answers } = props;

  const handleSelected = (event) => {
    const eventTarget = event.currentTarget;
    const parent = eventTarget.parentNode;
    _.map(parent.childNodes, (child) => {
      child.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">{question}</div>
      <div className="panel-body">
        <ul className="list-group">
          {
            _.map(answers, (answer) => {
              return <li key={answer} className="list-group-item" onClick={handleSelected}>{answer}</li>;
            })
          }
        </ul>
      </div>
      <div className="panel-footer">Panel footer</div>
    </div>
  );
}
