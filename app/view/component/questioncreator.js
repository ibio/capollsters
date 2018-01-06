import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Util from 'helper/util';
import Classnames from 'lib/classnames';

/**
 * onCreate: callback that will add the question to the poll
 * Usage:
 * <QuestionCreator onCreate={createCallback} />
 */
export default class QuestionCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mcOptions: [],
      questionText: '',
      multipleChoice: false,
      optionRefs: [],
    };
  };

  // for parent to call
  getBoundingClientRect(){
    return this.refDiv.getBoundingClientRect();
  }

  getOptionValues() {
    const values = _.map(this.state.optionRefs, (optionRef) => {
      if(optionRef) {
        return {
          id: null,
          text: optionRef.value,
          isSelected: false,
        };
      }
    });
    return values;
  }

  createQuestionHandler() {
    const { onCreate } = this.props;
    const optionValues = this.getOptionValues();
    onCreate(this.state.questionText, optionValues);
    this.setState({
      mcOptions: [],
      questionText: '',
      optionRefs: [],
    });
  }

  createMCOption() {
    const { mcOptions } = this.state;
    const option = (
      <div key={Util.uuid()}>
        Option Text: <input style={{color: 'black'}} id={this.state.optionRefs.length} ref={ref => {ref? this.setState({optionRefs: [...this.state.optionRefs, ref]}): ''}} autoFocus />
      </div>
    );
    this.setState({mcOptions: [...mcOptions, option]});
  }

  render() {
    return (
      <div className="panel panel-capollsters" ref={ref => {this.refDiv = ref;}}>
        <div className="row">
          <div className="text-center">
              <div className="radio-inline">
                <label><input type="radio" name="optradio" value="Short Answer" onClick={() => {this.setState({multipleChoice: false, mcOptions: [], optionRefs: []})}} defaultChecked />Short Answer</label>
              </div>
              <div className="radio-inline">
                <label><input type="radio" name="optradio" value="Multiple Choice" onClick={() => {this.setState({multipleChoice: true})}} />Multiple Choice</label>
              </div>
          </div>
        </div>
        <div className="panel-heading">
          Question Text: <input style={{color: 'black', width: '50%'}} value={this.state.questionText} onChange={(evt) => {this.setState({questionText: evt.target.value})}} autoFocus />
        </div>
        <div className="panel-body">
          <div className="list-group">
            {this.state.multipleChoice ? <a className="btn-round btn-pigment btn-sm" role="button" onClick={() => this.createMCOption()}>Add New Option</a> : ''}
            <hr />
            {this.state.mcOptions}
          </div>
        </div>
        <div className="panel-footer">
          <p className="text-center"><a className="btn-round btn-pigment btn-lg" role="button" onClick={() => this.createQuestionHandler()}>Create Question</a></p>
        </div>
      </div>
    );
  };
}
