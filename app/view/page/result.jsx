import React from 'react';
import {TweenLite, Power2} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import SurveyModel from 'model/survey';
import Config from 'helper/config';
import Header from 'view/component/header';
import ResultItem from 'view/component/resultitem';
import Style from 'style/resultpage.scss';

const HEADER_H = 80;
const SCROLL_EASE_INTERVAL = .25;

export default class Result extends React.Component{
	constructor(props){
    super(props);
		this.panelList = [];
    this._model = new SurveyModel();
    this._model.subscribe(() => {
				this.setState({
					questionsList: this._model.resultQuestionList
				});
		});

		this.state = {
			progressIndex : -1,
			questionsList : []
		};
	}

	componentDidMount(){
		// console.log(this.props.navs[0]);
		// console.log(this.props.nid);
		this._model.fetchResult(this.props.nid);
	}

	render(){
		const questionList = this.state.questionsList.map((value, index) => {
			const numberedQuestion = (index + 1) + ' ' + value.text;
			return <ResultItem key={index} question={numberedQuestion} answers={value.options} />
		});
		return(
			<div>
				<Header></Header>
		    <div className="container resultpage">
					<div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h1>Survey Result</h1>
              </div>
            </div>
          </div>
		      <div className="row">
						<div className="col-md-12">
							{questionList}
						</div>
		      </div>
		    </div>
		  </div>
		);
	}
}
