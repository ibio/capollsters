import React from 'react';
import ReactDOM from 'react-dom';
import {TweenLite, Power2} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import SurveyModel from 'model/survey';
import Config from 'helper/config';
import Header from 'view/component/header';
import MultipleChoice from 'view/component/multiplechoice';
import ProgressBar from 'view/component/progressbar';
import ShortAnswer from 'view/component/shortanswer';
import QuestionCreator from 'view/component/questioncreator';
import Style from 'style/incompletedpage.scss';

const HEADER_H = 80;
const SCROLL_EASE_INTERVAL = .25;

export default class CreatePoll extends React.Component{
  constructor(props){
    super(props);
    this.panelList = [];

    this.state = {
      progressIndex : -1,
      questionsList : []
    };
  }

  componentDidMount(){
    // console.log(this.props.navs[0]);
    window.addEventListener('scroll', e => {this.handleWindowScroll(e);});
  }

  handleWindowScroll(index){
    // const y = window.scrollY;
    // console.log(index);
  }

  handleProgressClickCallback(index){
    const panel = this.panelList[index];
    if(panel){
      const rect = panel.getBoundingClientRect();
      const y = rect.top + window.scrollY - HEADER_H;
      // window.scrollTo(0, y);
      TweenLite.to(window, SCROLL_EASE_INTERVAL, {scrollTo:y, ease: Power2.easeOut, callback:()=>{this.setState({progressIndex:index});}});
    }
  }

  handleCreateQuestion(questionText, questionOptions) {
    const question = {
      "id": "125",
      "text": questionText,
      "options": questionOptions,
      "response": null
    };
    this.setState({ questionsList: [...this.state.questionsList, question]});
  }

  render(){
    console.log(this.state);
    const questionList = this.state.questionsList.map((value, index) => {
      const numberedQuestion = (index + 1) + ' ' + value.text;
      let questionView;
      if(value.options && value.options.length){
        questionView = <MultipleChoice key={index} data-id={value.id} question={numberedQuestion} answers={value.options} ref={ref => {this.panelList.push(ref);}} />;
      }else{
        questionView = <ShortAnswer key={index} question={numberedQuestion} ref={ref => {this.panelList.push(ref);}} />;
      }
      return questionView;
    });
    return(
      <div>
        <Header>
          <ProgressBar questions={[1,2,3,4,5,6]} length={400} currentIndex={this.state.progressIndex} handleCallback={index => {this.handleProgressClickCallback(index)}} />
        </Header>
        <div className="container incompletedpage">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron poll-head">
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <div className="poll-bg" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <QuestionCreator onCreate={(text, options) => {this.handleCreateQuestion(text, options)}} />
              <hr />
              {questionList}
              <hr />
              <p className="text-center"><a className="btn-round btn-pigment btn-lg" href="#/main">Create This Poll</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
