import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Classnames from 'lib/classnames';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import Style from 'style/component/progressbar.scss';

/**
 * question: text of the question
 * answers: answers to the questions
 * Usage:
 * <ResultItem question={'myQuestionText'} answers=[{text:'this is an option'}] />
 */
export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { question, answers, type } = this.props;
    let resultsView;
    //
    if(type === 'OPEN_RESPONSE'){
      const listView = _.map(answers, (answer, index) => {
        return <a key={index} className="list-group-item" href="javascript:void(0);">{answer.text}</a>;
      });
      resultsView = (<div className="list-group">{listView}</div>);
    }else{
      // http://recharts.org/#/en-US/api/BarChart
      // [{ name: 'a', value: 5 }, { name: 'b', value: 12 }];
      const data = _.map(answers, (answer, key) => ({name:key, students:answer}));
      resultsView = (
        <BarChart width={600} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" fill="#eca148" />
        </BarChart>
      );
    }
    return (
      <div className="panel panel-capollsters" ref={ref => {this.refDiv = ref;}}>
        <div className="panel-heading"><strong><span className="glyphicon glyphicon-arrow-right" aria-hidden="true" /> {question}</strong></div>
        <div className="panel-body">
          {resultsView}
        </div>
      </div>
    );
  };
}
