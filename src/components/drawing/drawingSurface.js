'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */


import React, { StyleSheet, Text, View, Image, TouchableHighlight, TextInput, NativeModules, ListView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PenSurface from '../ux/penSurface';
import ScheduleStore from '../../stores/scheduleStore';


var data = []
var id  = 1;

/**
 * @class DrawingSurface
 * @extends React.Component 
 * 
 * Drawing Surface
 *
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
export default class DrawingSurface extends React.Component {
		
	/**
	 * @constructor
	 */
	constructor(args) {
		super(args);

		 this.listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		 this.data = [];

		/**
 		 * @state
 		 */
 		this.state = {
 			text: null,
 			dataSource: this.listDataSource.cloneWithRows(this.data)
 		};
	}

	/**
	 * @lifecycle
	 */
	componentDidMount() {
		this.getAttachmentList();
	}

	getAttachmentList() {
		ScheduleStore.getAttachments(129).then(json => {
			this.data = json;
			this.setState({dataSource: this.listDataSource.cloneWithRows(json)})
		})
	}

	/**
 	  * Adds new page to the canvas
 	  * @return {Void} undefined
 	  */
 	 addPage() {
 	 	this.data.forEach(item => item.selected = false);
 	  	this.data.push({ id: ++id, selected: true });
 	  	this.setState({dataSource: this.listDataSource.cloneWithRows(this.data)})
 	 }


	/**
 	  * Adds new page to the canvas
 	  * @return {Void} undefined
 	  */
 	 onPageSelect(page) {
 	 	this.data.forEach(item => item.selected = false);
 	  	page.selected = true
 	  	this.setState({dataSource: this.listDataSource.cloneWithRows(this.data)});
 	  	NativeModules.PenSurface.loadImage(129, 263);
 	 }

	/**
     * Renders the scene. [See Rect Js Render Method for more details]
     * 
     * @render
     * @return {View} component
     */
	render() {
		return (
			<View style={styles.container}>
				<PageExplorer dataSource={this.state.dataSource} onPageSelect={this.onPageSelect.bind(this)}/>
				<View style={{ flexDirection: 'column', alignItems: 'stretch', flex: 1 }}>
					<Text>{this.state.text}</Text>
					<DrawingToolbar onPageAdd={this.addPage.bind(this)} />
					<PenSurface style={{flex:1}}/>
				</View>
			</View>
		);
	}
}


class PageExplorer extends React.Component {

	constructor(args) {
		super(args);
		/**
 		 * @state
 		 */
 		this.state = {
 		};
	}

	/**
     * Transforms each row of list view. [See ListView for more details]
     *
     * @param {Object} rowData
     * @param {Number} sectionID
     * @param {Number} rowID
     */
    renderRow(rowData, sectionID: number, rowID: number) {
    	let filename = "";
    	if(rowData.Path)
    		 filename = rowData.Path.substr(rowData.Path.lastIndexOf("\\") + 1);
    	let path = "http://192.168.4.77/SmartReception.Service/Attachments/" + filename;
        return (
        	<TouchableHighlight underlayColor="#F4F4F4" onPress={() => this.props.onPageSelect(rowData) }>
            	<View style={[p_styles.page, rowData.selected ? p_styles.selected : null]}>
            		<Image style={p_styles.image} source={{uri: path}} />
				</View>
			</TouchableHighlight>
       ); 
    }

	/**
     * Renders the scene. [See Rect Js Render Method for more details]
     * 
     * @render
     * @return {View} component
     */
	render() {
		return (
			<View style={p_styles.container}>
				<ListView dataSource={this.props.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />
			</View>
		);
	}
}

/**
 * @class DrawingToolbar
 * @extends React.Component 
 * 
 * Drawing Surface
 *
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
 class DrawingToolbar extends React.Component {

 	/**
 	 * @constructor
 	 */
 	constructor(args) {
 		super(args);
 	}

 	/**
 	 * Changes the mode to pen
 	 * @return {Void} undefined
 	 */
 	switchToPenMode() {
 		NativeModules.PenSurface.switchToPenMode();
 	}

 	/**
 	 * Changes the mode to eraser
 	 * @return {Void} undefined
 	 */
 	switchToEraserMode() {
 		NativeModules.PenSurface.switchToEraserMode();
 	}


 	/**
 	 * Save Drawing to local storage
 	 * @return {Void} undefined
 	 */

 	exportDrawings() {
		NativeModules.PenSurface.saveDrawings(129, 264);
 	}

 	/**
 	  * Adds new page to the canvas
 	  * @return {Void} undefined
 	  */
 	 addPage() {
 	  	NativeModules.PenSurface.addNewPage();	
 	  	if(this.props.onPageAdd) {
 	  		this.props.onPageAdd();
 	  	}
 	 }

 	/**
 	  * Load image to canvas
 	  * @return {Void} undefined
 	  */
 	 loadImage() {
		NativeModules.PenSurface.loadImage(129, 263);	
		//NativeModules.PenSurface.downloadSketches();	
 	 }

 	/**
     * Renders the scene. [See Rect Js Render Method for more details]
     * 
     * @render
     * @return {View} component
     */
	render() {
		return (
			<View style={t_styles.container}>
				<TouchableHighlight onPress={this.addPage.bind(this)}>
					<View style={t_styles.toolbarButton}>
						<Icon name="newspaper-o" size={15} style={{marginRight: 3, marginTop: 2}} />
						<Text>Add New Page</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.switchToPenMode.bind(this)}>
					<View style={t_styles.toolbarButton}>
						<Icon name="pencil" size={15} style={{marginRight: 3, marginTop: 2}} />
						<Text>Pen</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.switchToEraserMode.bind(this)}>
					<View style={t_styles.toolbarButton}>
						<Icon name="eraser" size={15} style={{marginRight: 3, marginTop: 2}} />
						<Text>Eraser</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.exportDrawings.bind(this)}>
					<View style={t_styles.toolbarButton}>
						<Icon name="save" size={15} style={{marginRight: 3, marginTop: 2}} />
						<Text>Save</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.loadImage.bind(this)}>
					<View style={t_styles.toolbarButton}>
						<Icon name="file-text" size={15} />
						<Text>Delete Page</Text>
					</View>
				</TouchableHighlight>
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
		flexDirection: 'row',
		alignItems: 'stretch'
	}
});

/**
 * @style - toolbar
 */
const t_styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'stretch',
		borderBottomColor: '#F4F4F4',
		borderBottomWidth: 1
	},
	toolbarButton: {
		padding: 5,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10
	}
});


/**
 * @style - page-explorer
 */
const p_styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flexDirection: 'row',
		backgroundColor: '#F4F4F4',
		borderRightColor: '#E9E9E9',
		borderRightWidth: 1
	},
	page: {
		backgroundColor: "#FFF",
		borderColor: '#E9E9E9',
		borderWidth: 1,
		width: 150,
		height: 200,
		marginLeft: 20,
		marginRight: 20,
		marginBottom : 5
	},
	selected: {
		borderWidth: 3,
		borderColor: '#85C3F7'
	},
	image: {
		width: 150,
		height: 200,
	},
});