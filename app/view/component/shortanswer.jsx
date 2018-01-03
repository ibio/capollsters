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
  };

  render() {
    const { question } = this.props;

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">{question}</div>
        <div className="panel-body">
          <input type="text" className="form-control" />
        </div>
        <div className="panel-footer">Panel footer</div>
      </div>
    );
  };
}
