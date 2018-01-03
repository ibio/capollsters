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
export default class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
  };

  handleSelected(event) {
    const eventTarget = event.currentTarget;
    const parent = eventTarget.parentNode;
    _.map(parent.childNodes, (child) => {
      child.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  // for parent to call
  getBoundingClientRect(){
    return this.refDiv.getBoundingClientRect();
  }

  render() {
    const { question, answers } = this.props;
    return (
      <div className="panel panel-primary" ref={ref => {this.refDiv = ref;}}>
        <div className="panel-heading">{question}</div>
        <div className="panel-body">
          <ul className="list-group">
            {
              _.map(answers, (answer, index) => {
                return <li key={index} className="list-group-item" onClick={this.handleSelected}>{answer.text}</li>;
              })
            }
          </ul>
        </div>
        <div className="panel-footer"></div>
      </div>
    );
  };
}
