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
import React, { View, StyleSheet, Text, TouchableWithoutFeedback,
	Image, NativeModules, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Sidebar from '../app/sidebar';
import AppStore from '../../stores/appStore';
/**
 * Custom Class Header
 *
 * @class Feedback
 * @extends React.Component
 */
export default class Feedback extends React.Component {
	/**
     * @constructor
     */
    constructor(args) {
    	super(args);

    	/**
         * @state
         */
        this.state = {
			mode: 0, // 0 is normal and 1 is for say thank you
		};
    }

	/**
	 * Handler for on press feedback
	 *
	 * @eventhandler
	 * @param {Number} feedback
	 * @return {Void} undefined
	 */
	onUserFeedback(feedback) {
		/**
		 * Play the native tap sound, as it's not supported in default view component by react native
		 */
		NativeModules.MediaHelper.playClickSound();
		/**
		 * If the actual meeting is there , then record the feedback
		 **/
		if(AppStore.hasActualMeeting()) {
			AppStore.postUserFeedback(AppStore.currentMeeting, feedback).then(json => {
				this.setState({ mode: 1 });
				setTimeout(()=>{
					this.props.navigator.pop();
				}, 3000);
			});
		}
		else
		{
			ToastAndroid.show("No actual meeting found. Start meeting and try again.", ToastAndroid.LONG);
		}
	}

	/**
	 * Render the feedback componnet based on the component state mode
	 *
	 * @return {Component} View
	 */
	renderComponent() {
		let component = (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Please give us your feedback {this.state.text}</Text>
				</View>
				<View style={styles.contentArea}>
					<TouchableWithoutFeedback onPress={() => { this.onUserFeedback(1) }}>
						<View style={styles.emojiContainer}>
							<Image source={{uri: 'http://survey.egovservice.com/feedbackservices/resources/melia/excellent.png'}} style={{width:225, height: 225}} />
							<Text style={styles.title}>Exceeded</Text>
							<Text style={styles.subTitle}>Expectations</Text>

						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => { this.onUserFeedback(2) }}>
						<View style={styles.emojiContainer}>
							<Image source={{uri: 'http://survey.egovservice.com/feedbackservices/resources/melia/good.png'}} style={{width:225, height: 225}} />
							<Text style={styles.title}>Met</Text>
							<Text style={styles.subTitle}>Expectations</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => { this.onUserFeedback(3) }}>
						<View style={styles.emojiContainer}>
							<Image source={{uri: 'http://survey.egovservice.com/feedbackservices/resources/melia/bad.png'}} style={{width:225, height: 225}} />
							<Text style={styles.title}>Below</Text>
							<Text style={styles.subTitle}>Expectations</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}> </Text>
				</View>
			</View>
		);

		if(this.state.mode == 1) {
			component = (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
					<Text style={{ fontSize: 40, color: '#D4D4D4' }}>Thank you for your valuable feedback</Text>
				</View>
			);
		}
		return component;
	}

    /**
     * @render
     * @return {View} view
     */
    render() {
    	return (
			<View style={styles.container}>
				<Sidebar />
				{ this.renderComponent() }
			</View>
        );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	 	alignItems: 'stretch',
	 	backgroundColor: '#E4E4E4',
 	},
 	logo: {
	 	flexDirection: 'column',
	 	alignItems: 'center',
	 	justifyContent: 'center',
	 	marginBottom: 10
 	},
 	contentArea: {
	 	flex: 1,
	 	flexDirection: 'row',
	 	alignItems: 'center',
	 	justifyContent: 'center'
 	},
 	footer: {
	 	height: 45,
	 	paddingLeft: 15,
	 	flexDirection: 'row',
	 	justifyContent: 'center'
 	},
 	emojiContainer: {
	 	flexDirection: 'column',
	 	alignItems: 'center',
	 	margin: 25,
		borderWidth: 1,
		borderColor: '#E5E5E5'
 	},
 	title: {
	 	color: '#82630A',
	 	fontSize: 25,
	 	marginTop: 10
 	},
 	subTitle: {
	 	color: '#82630A',
	 	fontSize: 25,
	 	marginTop: 3
 	},
 	questionContainer: {
	 	flex: 1,
	 	flexDirection: 'row',
	 	alignItems: 'stretch'
 	},
 	footerText: {
	 	color: '#01244e',
	 	fontSize: 25
 	},
	header: {
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#e5e5e5',
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontSize: 25,
		color: '#82630A',
		textAlign: 'center'
	},
	label: {
		fontSize: 18
	}
});
