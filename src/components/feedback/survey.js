'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import React, { View, StyleSheet, Text, NativeModules,
    TouchableWithoutFeedback, ToastAndroid, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import AppStore from '../../stores/appStore';
import RadioButton from '../ux/radioButton';
/**
 * @class Survey
 * @extends React.Component
 */
export default class Survey extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
         this.state = {
             survey: [],
             userOpenions: {}
         };
    }

    /**
     * @Lifecycle
     * @componentDidMount
     * @return {Void} undefined
     */
    componentDidMount() {
        AppStore.getActiveSurvey().then(data => { this.setState({ survey: data }) });
    }

    /**
     * User select a radio button
     * @param {Question} question
     * @return {Void} undefined
     */
    onRadioPress(question) {
        let userOpenions = this.state.userOpenions;
        userOpenions[question.QuestionId] = question.AnswerId;
        this.setState({ userOpenions: userOpenions });
    }

    /**
     * Renders each question in the survey
     * @param {String} question
     * @param {Array<String>} answers
     * @return {Component} View
     */
    renderQuestions(question) {
        return (
            <View style={styles.questionWrapper}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 18}}>{question.Name}</Text>
                </View>
                { this.renderAnswers(question.AnswersInQuestions) }
            </View>
        );
    }

    /**
     * Post user survey to the server
     * @return {Void} undefined
     */
    postUserFeedback() {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * If ongoing meeting then start posting
         */
        if(AppStore.hasActualMeeting()) {
            let data = [];
            Object.keys(this.state.userOpenions).map(key => {
                data.push({ClientSurveyId: 0, SurveyId: this.state.survey.SurveyId, ActualMeetingId: AppStore.getActualMeetingId(),
                    ClientId: AppStore.currentMeeting.ClientId, QuestionId: key, AnswerId: this.state.userOpenions[key] });
            });
            AppStore.postUserSurvey(data).then(()=> {
                ToastAndroid.show("Thank you for submitting your feedback", ToastAndroid.LONG);
            });
        }
        else{
            ToastAndroid.show("No Ongoing Meeting Found", ToastAndroid.LONG);
        }
    }

    /**
     * Renders each answers for a question
     * @param {Array<String>} answer
     * @return {Component} View
     */
    renderAnswers(answers) {
        let answersCmp = new Array();
        if(answers && answers.length > 0) {
            answers.map((item, index) => {
                let selected = (this.state.userOpenions[item.QuestionId] == item.AnswerId);
                answersCmp.push(<RadioButton onPress={()=>{this.onRadioPress(item)}} selected={selected} label={item.Answers.Name} />);
            });
        }
        return (<View>{answersCmp}</View>);
    }

    /**
     * @render
     * @return {View} view
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.surveyWrapper}>
                    <View style={{flex: 1}}>
                    {(()=>{
                        if(this.state.survey.Questions && this.state.survey.Questions.length > 0) {
                            return this.state.survey.Questions.map((item, index) => {
                                return this.renderQuestions(item);
                            });
                        }
                    })()}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableWithoutFeedback onPress={this.postUserFeedback.bind(this)}>
                            <View style={styles.button}>
                                <Text style={{color: '#FFF'}}>Submit</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            </View>
        );
    }
}
/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F4F4F4'
    },
    surveyWrapper: {
        padding: 20,
        backgroundColor:'#FFF',
        width: 500,
        alignItems: 'stretch',
        flex: 1
    },
    questionWrapper: {
        padding: 10,
        borderBottomColor:'#E9E9E9',
        borderBottomWidth: 1
    },
    buttonWrapper: {
        padding: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#EA4335',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
});
