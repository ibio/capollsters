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
    this.state = {
       currentAnswer: false,
    };
  };

  handleFocus(e){
    this.props.onSelect();
  }

  handleSelected(event) {
    const eventTarget = event.currentTarget;
    const parent = eventTarget.parentNode;
    _.map(parent.childNodes, (child) => {
      child.classList.remove('active');
    });
    event.target.classList.add('active');
    this.setState({currentAnswer: event.currentTarget.innerHTML});
    this.props.onFinish(event.currentTarget.innerHTML);
  };

  // for parent to call
  getBoundingClientRect(){
    return this.refDiv.getBoundingClientRect();
  }

  render() {
    const { question, answers, deleteCallback } = this.props;
    const { currentAnswer } = this.state;
    return (
      <div className="panel panel-capollsters" ref={ref => {this.refDiv = ref;}} onFocus={e => this.handleFocus()} >
        <div className="panel-heading"><strong><span className="glyphicon glyphicon-arrow-right" aria-hidden="true" /> {question}</strong></div>
        <div className="panel-body">
          <div className="list-group">
            {
              _.map(answers, (answer, index) => {
                return <a key={index} className="list-group-item" href="javascript:void(0);" onClick={(clickEvent) => this.handleSelected(clickEvent)}>{answer.text}</a>;
              })
            }
          </div>
        </div>
        <div className="panel-footer">
          {deleteCallback? (<a className="btn-round btn-pigment btn-sm" role="button" onClick={() => deleteCallback(question)}>Delete</a>):currentAnswer ? `You answered: "${currentAnswer}"`: ''}
        </div>
      </div>
    );
  };
}
