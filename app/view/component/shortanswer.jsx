import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Classnames from 'lib/classnames';
import Style from 'style/component/progressbar.scss';

/**
 * question: text of the question
 * Usage:
 * <ShortAnswer question={'myQuestionText'} />
 */
export default class ShortAnswer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentAnswer: '',
    }
  };

  inputHandler(event) {
    this.setState({ currentAnswer: event.target.value });
  }

  handleFocus(e){
    this.props.onSelect();
  }

  handleBlur(e){
    this.props.onFinish(this.state.currentAnswer);
  }

  getBoundingClientRect(){
    return this.refDiv.getBoundingClientRect();
  }

  render() {
    const { question } = this.props;
    const { currentAnswer } = this.state;
    return (
      <div className="panel panel-capollsters" ref={ref => {this.refDiv = ref;}} onFocus={e => this.handleFocus()} >
        <div className="panel-heading"><strong><span className="glyphicon glyphicon-arrow-right" aria-hidden="true" /> {question}</strong></div>
        <div className="panel-body">
          <input type="text" className="form-control" onChange={(changeEvent) => this.inputHandler(changeEvent)} onBlur={e => this.handleBlur(e)} />
        </div>
        <div className="panel-footer">
          {currentAnswer ? `You answered: "${currentAnswer}"`: ''}
        </div>
      </div>
    );
  };
}
