/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
import Button from '../meeting/button';
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  ListView,
  NativeModules,
  DeviceEventEmitter,
  TextInput,
Animated,
  Easing,
} = React;
import Progressbar from '../ux/progressBar';

var data = [
    { id:1, name: 'Profile Image', type: 'image', },
    { id:2, name: 'License Agreement', type: 'folder', },
    { id:3, name: 'Profile Image', type: 'folder', },
    { id:4, name: 'Profile Image', type: 'pdf', },
    { id:5, name: 'Profile Image', type: 'doc', },
    { id:7, name: 'Profile Image', type: 'image', },
    { id:8, name: 'Profile Image', type: 'image', },
];
function splitData() {
    var newData =[];

var i = 0, last=0; while(i<=data.length){
    if(i%5==0){
     if(last != i) {
        var a = new Array();
        console.log(i)
        for(var j=last;j<i;j++){
            a.push(data[j]);
        }
        newData.push(a)
     }
     last = i; 
    }
    i++;
}
if(last<data.length-1){
 var a = new Array();
        for(var j=last;j<data.length;j++){
            a.push(data[j]);
        }
        newData.push(a)
}
return newData;
}
var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


var modes = {
    READ: 1,
    EDIT: 2
};

class Attachments extends React.Component{
    constructor(args) {
        super(args);
        this.state = {
            dataSource: dataSource.cloneWithRows(splitData()),
            selected: {},
            mode: modes.READ
        }
        DeviceEventEmitter.addListener('camerapicturereceived', this.onCameraImage.bind(this));
        DeviceEventEmitter.addListener('imagereceivedfromgallery', this.onGalleryImageReceived.bind(this))
    }
    onCameraImage() {
        this.setState({ mode: modes.EDIT });
    }
    onGalleryImageReceived() {
        this.setState({ mode: modes.EDIT });   
    }
    onUpload(name, desc) {
        data.push({ id:data.length + 1, name: name, des: desc, type:'image' });
        this.setState({ dataSource: dataSource.cloneWithRows(splitData()), mode: modes.READ });
    }
    onCamera() {
        NativeModules.MediaHelper.showCamera();
    }
    onGallery() {
        NativeModules.MediaHelper.showGallery();   
    }
    onIconPress(item) {
        item.selected = true;
        this.setState({ dataSource: dataSource.cloneWithRows(splitData()), selected: item });
    }
    render() {
        let component = (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}  />);
        if(this.state.mode == modes.EDIT) {
            component = (<AttachmentEditor onSave={this.onUpload.bind(this)} />)
        }
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1, padding: 10}}>
                    {component}
                </ScrollView>
                <View style={styles.buttonBar}>
                    <Button icon="camera" onPress={this.onCamera.bind(this)} text="Take Picture" borderPosition="bottom" />
                    <Button icon="picture-o" text="Take From Gallery" borderPosition="bottom" onPress={this.onGallery.bind(this)} />
                    <Button icon="trash" text="Delete Selected" borderPosition="bottom" />
                    <Button icon="upload" text="Upload All" borderPosition="bottom" />
                    <Button icon="download" text="Download Selected" borderPosition="none" />
                </View>
            </View>
        );
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        return (
            <View style={styles.row}>
                {rowData.map((item,index)=>{
                    return(<FileIcon name={item.name} isSelected={this.state.selected.id == item.id ? true: false} onIconPress={()=>this.onIconPress(item)} icon={item.type} />);
                })}
            </View>
       );
    }
}

class FileIcon extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
        };
    }
    render() {
        var type = require('../../../resources/images/pdf.png');
        switch(this.props.icon) {
            case 'image':
                type = require('../../../resources/images/image.png');
                break;
            case 'doc':
            case 'docx':
                type = require('../../../resources/images/doc.png');
                break;
            case 'folder':
                type = require('../../../resources/images/folder.png');
                break;
        }
    
        return (
            <TouchableWithoutFeedback onPress={this.props.onIconPress}>
                <View style={[iconStyles.container, this.props.isSelected ? iconStyles.selected : {}]}>
                    <Image source={type} style={iconStyles.icon} />
                    <Text style={{textAlign:'center'}}>{this.props.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class AttachmentEditor extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            name: null,
            desc: null
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.attachmentEditor}>

                    <Image source={require('../../../resources/images/image.png')} style={{width:200, height: 150, margin: 10}} />

                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center" 
                          underlineColorAndroid="#FFF"
                          value={this.state.name}
                          onTextChange={text=>this.setState({name:text})}
                          onChangeText={text=>this.setState({name:text})}
                          placeholder="Name of the attachment" style={{ flex: 1 }} />
                    </View>
                     <View style={{ width: 350,height: 80, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center" 
                          underlineColorAndroid="#FFF"
                          multiline={true}
                          onTextChange={text=>this.setState({desc:text})}
                          onChangeText={text=>this.setState({desc:text})}
                          value={this.state.desc}
                          placeholder="Description" style={{ flex: 1 }} />
                    </View>

                    <TouchableWithoutFeedback onPress={()=>{ this.props.onSave(this.state.name, this.state.desc)}}>
                        <View style={{paddingTop: 10, paddingBottom:10, paddingRight: 20,paddingLeft: 20, backgroundColor:'#F53333', margin: 10}}>
                            <Text style={{color:'#FFF'}}>Upload</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        );
    }
}

var iconStyles = StyleSheet.create({
    container: {
        width: 100,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    icon: {
        width: 64,
        height: 64
    },
    selected: {
        backgroundColor: '#B0CFFF',
        borderWidth: 1,
        borderColor: '#3D76CE'
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    tile: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        margin: 5
    },
    row: {
        flexDirection: 'row'
    },
    buttonBar: {
        backgroundColor:'#F0F1F3',
        borderLeftColor: '#D8E0F1',
        borderLeftWidth: 1,
        width: 100,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    attachmentEditor: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    incomplete: {
        backgroundColor: '#CCC'
    },
    complete: {
        flex: 0
    }
});

module.exports = Attachments;
