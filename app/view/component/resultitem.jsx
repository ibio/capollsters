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
 * <ResultItem question={'myQuestionText'} answers=['array', 'of', 'answers'] />
 */
export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { question, answers } = this.props;
    return (
      <div className="panel panel-capollsters" ref={ref => {this.refDiv = ref;}}>
        <div className="panel-heading"><strong><span className="glyphicon glyphicon-arrow-right" aria-hidden="true" /> {question}</strong></div>
        <div className="panel-body">
          <div className="list-group">
            {
              _.map(answers, (answer, index) => {
                const text = _.isArray(answers) ? answer : (`${index}  (${answer})`);
                return <a key={index} className="list-group-item" href="javascript:void(0);">{text}</a>;
              })
            }
          </div>
        </div>
      </div>
    );
  };
}
