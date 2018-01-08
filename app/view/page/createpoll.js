import React from 'react';
import ReactDOM from 'react-dom';
import {TweenLite, Power2} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import SurveyModel from 'model/survey';
import Config from 'helper/config';
import Header from 'view/component/header';
import MultipleChoice from 'view/component/multiplechoice';
import ShortAnswer from 'view/component/shortanswer';
import QuestionCreator from 'view/component/questioncreator';
import Style from 'style/incompletedpage.scss';

export default class CreatePoll extends React.Component{
  constructor(props){
    super(props);
    this.panelList = [];
    this._model = new SurveyModel();
    this.state = {
      questionsList : []
    };
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

  handleCreatePoll(){
    this._model.createPoll(this.titleRef.value, this.state.questionsList, () => {
        console.log('done!');
    });
  }

  deleteCallback(index) {
    console.log(index);
    const { questionsList } = this.state;
    console.log(questionsList);
    this.setState({ questionsList: [...questionsList.slice(0,index), ...questionsList.slice(index + 1)]});
    console.log(this.state.questionsList);
  }

  render(){
    const questionList = this.state.questionsList.map((value, index) => {
      const numberedQuestion = (index + 1) + ' ' + value.text;
      let questionView;
      if(value.options && value.options.length){
        questionView = <MultipleChoice deleteCallback={() => this.deleteCallback(index)} key={index} data-id={value.id} question={numberedQuestion} answers={value.options} ref={ref => {this.panelList.push(ref);}} />;
      }else{
        questionView = <ShortAnswer deleteCallback={() => this.deleteCallback(index)} key={index} question={numberedQuestion} ref={ref => {this.panelList.push(ref);}} />;
      }
      return questionView;
    });
    return(
      <div>
        <Header />
        <div className="container incompletedpage">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron poll-head">
                <h1>Create a New Survey</h1>
                <div className="poll-bg" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputTitle" style={{color:'white'}}>Survey Title</label>
                  <input type="email" className="form-control" id="exampleInputTitle" placeholder="Example Survey" ref={inputRef => {this.titleRef = inputRef;}} />
                </div>
              </form>

              <QuestionCreator onCreate={(text, options) => {this.handleCreateQuestion(text, options)}} />
              <hr />
              {questionList}
              <hr />
              <p className="text-center"><a onClick={e => {this.handleCreatePoll(e)}} className="btn-round btn-pigment btn-lg" href="javascript:void(0);">Create This Survey</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
