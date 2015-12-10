'use strict';
import React, { Text, View, StyleSheet, Image, } from 'react-native';

export default class LoadMask extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			message: 'Loading...'
		};
	}
	render() {
		let url ="http://i1.pepperfry.com/img/grey.gif";
		return (
			<View style={styles.container}>
				<Image source={{uri: url}} style={styles.loadingImage} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingImage: {
		width: 200,
		height: 200,
		marginTop: 2,
		marginBottom: 2,
	},
	loadingMessage: {
		fontSize: 17
	}
});