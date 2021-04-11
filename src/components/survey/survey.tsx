import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { getAllInfo } from "../../data/info";
import { getAllOutputs } from "../../data/outputs";
import { getAllQuestions } from "../../data/questions";
import { InfoModel } from "../../models/infoModel";
import { OutputModel } from "../../models/outputModel";
import { QuestionModel } from "../../models/questionModel";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { OutPut } from "../output/output";
import { Question } from "../question/question";
import "./survey.css";

interface SurveyState {
    display: string,
    currentQuestion: QuestionModel,
    allQuestions: QuestionModel[],
    allOutputs: OutputModel[],
    allInfos: InfoModel[]
}

export class Survey extends Component<any, SurveyState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            display: store.getState().display,
            currentQuestion: store.getState().currentQuestion,
            allQuestions: [],
            allOutputs: [],
            allInfos: []
        }

        
        this.unsubscribeStore = store.subscribe(() => {
            const display = store.getState().display;
            const currentQuestion = store.getState().currentQuestion;
            this.setState({ currentQuestion });
            this.setState({ display });
        })

    }

    public componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            const display = store.getState().display;
            const currentQuestion = store.getState().currentQuestion;
            this.setState({ currentQuestion });
            this.setState({ display });
        })

        if (!this.state.currentQuestion.id) {
            store.dispatch({ type: ActionType.updateCurrentQuestion, payLoad: 1});
        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    public render() {
        return (
            <div className="survey">
                <h1>Survey</h1>
                {this.state.display === 'question' &&
                    <Question question={this.state.currentQuestion} />}
                {this.state.display === 'output' &&
                    <OutPut/>}
            </div>
        )
    }
}