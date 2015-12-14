'use strict';

import React, { View, Text, StyleSheet, TouchableWithoutFeedback, Image, } from 'react-native';
import Sidebar from '../app/sidebar';
import AppStore from '../../stores/appStore';

export default class Feedback extends React.Component {
	constructor(args) {
		super(args);
		this.state = {text:''};
	}
	onUserFeedback(feedback) {
		if(AppStore.hasActualMeeting()) {
			AppStore.postUserFeedback(AppStore.currentMeeting, feedback).then(json => {
				this.props.navigator.pop();
				this.setState({ text: 'sdfsdfhkjshd'})
			});
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Sidebar />
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
