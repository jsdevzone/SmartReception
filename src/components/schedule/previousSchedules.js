'use strict';
import React, { View, Text, StyleSheet, ListView, } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';


const data = [1,2,3,4,5,6,7,2,4,5,6,6,];

class PreviousSchedules extends React.Component {
	constructor(args) {
		super(args);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
    	dataSource: dataSource.cloneWithRows(data)
    }
	}
	renderRow(rowData) {
        var date = moment.utc(new Date());
        return(
          <View style={[styles.timeline]}>
          	<View style={styles.line}>
          		<View style={styles.lineTop} />
							<View style={styles.lineSeparator} />
							<View style={styles.lineBottom} />
            </View>
            <View style={styles.content}>
            	<Text style={styles.period}>{date.format('MMMM, Do, YYYY')}</Text>
            	<Text style={styles.scheduleTitle}>Jessi assign you a task #Mockup Design.</Text>
            </View>
          </View>
        );
    }
  render() {
  	return (
  		<View style={styles.container}>
  			<View style={styles.title}>
  				<Text style={styles.titleText}>Previous Schedules</Text>
  			</View>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{ flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	timeline: {
		flexDirection: 'row',
		paddingLeft: 10,
		alignItems: 'stretch',
		height: 70
	},
	line: {
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	lineTop: {
		width: 2,
		backgroundColor: '#F4F4F4',
		height: 10
	},
	lineBottom: {
		width: 2,
		backgroundColor: '#F4F4F4',
		flex: 1,
	},
	lineSeparator: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: '#CCC',
		borderRadius: 10
	},
	content: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10
	},
	period: {
		color: '#C9C9C9',
		paddingTop: 4
	},
	scheduleTitle: {
		paddingTop: 4
	},
	title: {
		paddingBottom: 20
	},
	titleText: {
		fontSize: 20
	}
});

module.exports = PreviousSchedules;