'use strict';
import React,{ View, Text, StyleSheet, } from 'react-native';
import Button from './button';
import AppStore from '../../stores/appStore';

export default class Summary extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			summary: null
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.summaryContainer}>
					<Text>{this.state.summary}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<Button icon="comments-o" borderPosition="bottom" text="Copy From Notes" onPress={()=>{
							this.setState({ summary: AppStore.currentMeeting.ActualMeetings[0].Notes })
					}}/>
          <Button icon="list-alt"  borderPosition="bottom"  text="Save Summary" />
          <Button icon="check-square-o"  borderPosition="bottom"  text="Cancel Changes" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#FFF',
		flexDirection: 'row'
	},
	buttonContainer: {
		flexDirection: 'column',
		borderLeftColor: '#D8E0F1',
		borderLeftWidth: 1,
		alignItems: 'stretch'
	},
	summaryContainer: {
		flex: 1,
		padding: 10
	}
});

module.exports = Summary;