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

import React, { View, Text, StyleSheet, TextInput, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserList} from '../users/userList';
import UserCard from '../users/userCard';
import Sidebar from '../app/sidebar';
import ClientStore from '../../stores/clientStore';

var interval = null;

export default class ClientSearch extends React.Component {
	constructor(args) {
		super(args);
		this.state = {
			filterText: '',
			filter: '',
			user: {}
		}
	}
	onFilterChange(text) {
		this.setState({ filterText: text });
		if(interval != null) clearInterval(interval);
		interval = setTimeout(() => { ClientStore.getClients(this.state.filterText); }, 1000);
	}
	componentDidMount() {

	}
	onUserSelected(user) {
		this.setState({ user: user });
	}
	renderDetailForm() {
		return (
			<View style={styles.content}>
				<View style={styles.userProfileWrapper}>
				<View style={styles.profile}>
					<Image
						source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}}
						style={styles.profileImage} />
					<Text style={styles.profileName}>{ this.state.user.FirstName + " " + this.state.user.LastName }</Text>
					<Text style={styles.profileProfession}>{this.state.user.Position}</Text>
				</View>
				<View style={styles.profileLinks}>
					<View style={[styles.link, styles.linkActive]}>
						<Icon name="user" size={14} style={styles.linkIcon} />
						<Text>Profile</Text>
					</View>
					<View style={[styles.link, { borderBottomWidth:0 }]}>
						<Icon name="calendar" size={14} style={styles.linkIcon} />
						<Text>Meetings</Text>
					</View>
				</View>
			</View>
				<View style={styles.profileDetailWrapper}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Personal Information</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Full Name</Text>
					<Text style={styles.infoValue}>{ this.state.user.FirstName + " " + this.state.user.LastName }</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Birth Date</Text>
					<Text style={styles.infoValue}>05/03/2015</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Gender</Text>
					<Text style={styles.infoValue}>Male</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Nationality</Text>
					<Text style={styles.infoValue}>Indian</Text>
				</View>
				<View style={[styles.header, { marginTop: 20 }]}>
					<Text style={styles.headerText}>Address Information</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Street</Text>
					<Text style={styles.infoValue}>Muteena, Deira, Dubai</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>City</Text>
					<Text style={styles.infoValue}>Dubai</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Po Box</Text>
					<Text style={styles.infoValue}>2255</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Area</Text>
					<Text style={styles.infoValue}>Deia, Duabai</Text>
				</View>
				<View style={[styles.header, { marginTop: 20 }]}>
					<Text style={styles.headerText}>Contact Information</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Email</Text>
					<Text style={styles.infoValue}>itse4@ontime.ae</Text>
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.infoKey}>Phone</Text>
					<Text style={styles.infoValue}>+971 52 867 0788</Text>
				</View>
			</View>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<Sidebar />
				<View style={styles.userListWrapper}>
					<View style={styles.searchboxWrapper}>
						<Icon name="search" size={18} style={{ marginBottom: 8 }} />
						<TextInput style={styles.input}
							placeholder="Search for clients"
							value={this.state.filterText}
							onChangeText={this.onFilterChange.bind(this)}
							underlineColorAndroid="#FFF" />
					</View>
					<UserList filter={this.state.filter} onPress={this.onUserSelected.bind(this)} />
				</View>
				{(() => {
					if(this.state.user.FirstName) {
						return this.renderDetailForm();
					}
					else {
						return (
							<View style={[styles.content, { alignItems: 'center', justifyContent: 'center'}]}>
								<View style={styles.notification}>
									<Text style={styles.notificationText}>Please select a client </Text>
								</View>
							</View>
						);
					}
				})()}
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fafafa'
	},
	userListWrapper: {
		width: 300,
		padding: 10,
		paddingLeft: 5,
		backgroundColor: '#FFF'
	},
	searchboxWrapper: {
		padding: 5,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#CCC',
		marginBottom: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		flex: 1
	},
	content: {
		flex: 1,
		padding: 10,
		flexDirection: 'row'
	},
	userProfileWrapper: {
		padding: 10,
		width: 200
	},
	profile: {
		borderColor: '#eeeeee',
		backgroundColor: '#FFF',
		borderWidth: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	profileName: {
		fontSize: 18,
		color: '#000',
		margin: 10,
		marginBottom: 2
	},
	profileProfession: {

	},
	profileLinks: {
		borderColor: '#eeeeee',
		borderWidth: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
		marginTop: 20
	},
	link: {
		padding: 10,
		flexDirection: 'row',
		backgroundColor: '#FFF',
		borderBottomColor:'#EEEEEE',
		borderBottomWidth: 1
	},
	linkIcon: {
		marginTop: 2
	},
	linkActive: {
		backgroundColor: '#fafafa',
	},
	profileDetailWrapper: {
		flex: 1,
		padding: 10,
		backgroundColor: '#FFF',
		borderColor:'#EEEEEE',
		borderWidth: 1,
		margin: 10
	},
	header: {
		padding: 10
	},
	headerText: {
		color: '#9e9e9e',
		fontSize: 18,
		fontFamily: 'Cochin',
	},
	profileInfo: {
		padding: 10,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1,
		flexDirection: 'row'
	},
	infoKey: {
		fontWeight: 'bold',
		flex: 1
	},
	infoValue: {
		flex: 1
	},
	notification: {
		padding: 20,
		backgroundColor: '#83e3aa',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	notificationText: {
		color: '#13532e'
	}
})
