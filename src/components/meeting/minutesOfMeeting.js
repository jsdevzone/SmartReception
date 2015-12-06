'use strict';
import React, { View, Text, StyleSheet } from 'react-native';
import Button from './button';
import AppStore from '../../stores/appStore';

const modes = {
	READ: 0,
	EDIT: 1
};

export default class MinutesOfMeeting extends React.Component {
	constructor(args) {
		super(args);
		this.state= {
			minutes: null,
			mode: modes.READ
		};
	}
	copyFromNotes() {
		if(AppStore.currentMeeting && AppStore.currentMeeting.ActualMeetings[0].Notes) {
			let _minutes = this.state.minutes;
			this.setState({ minutes: _minutes + " " + AppStore.currentMeeting.ActualMeetings[0].Notes});
		}
	}
	copyFromSummary() {
		if(AppStore.currentMeeting && AppStore.currentMeeting.ActualMeetings[0].Summary) {
			let _minutes = this.state.minutes;
			this.setState({ minutes: _minutes + " " + AppStore.currentMeeting.ActualMeetings[0].Summary});
		}
	}
	startEdit() {
		this.setState({ mode: modes.EDIT });
	}
	saveMinutes() {
		AppStore.updateMeeting(); 
	}
	cancelChanges() {
		
	}
	render() {
		let minutesContainer = this.state.mode == modes.READ ? (
			<View style={styles.minutesContainer}>
				<Text style={styles.minutes}></Text>
			</View>
		) : (
			<View style={styles.minutesContainer}>
				<TextInput multiline={true} 
						style={{flex:1}} 
						value={this.state.minutes} 
						onTextChange={text => this.setState(text)} />
			</View>
		);
		return (
			<View style={styles.container}>
				{minutesContainer}
				<View style={styles.buttonContainer}>
					<Button icon="comments-o" borderPosition="bottom" text="Copy From Notes" onPress={this.copyFromNotes.bind(this)} />
					<Button icon="comments-o" borderPosition="bottom" text="Copy From Summary" onPress={this.copyFromSummary.bind(this)} />
					<Button icon="comments-o" borderPosition="bottom" text="Edit" onPress={this.startEdit.bind(this)} />
          <Button icon="list-alt"  borderPosition="bottom"  text="Save Minutes Of Meeting" onPress={this.saveMinutes.bind(this)} />
          <Button icon="check-square-o"  borderPosition="bottom"  text="Cancel Changes" onPress={this.cancelChanges.bind(this)} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	buttonContainer: {
		flexDirection: 'column',
		borderLeftColor: '#D8E0F1',
		borderLeftWidth: 1,
		alignItems: 'stretch'
	},
	minutesContainer: {
		flex: 1,
		padding: 10	
	}
});