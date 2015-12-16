/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React, { StyleSheet, Text, View, Image,
  TouchableHighlight, TextInput, TouchableWithoutFeedback, NativeModules, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import ClientStore from '../../stores/clientStore';

export default class ClientHome extends React.Component{
  constructor(props) {
     super(props);
     this.state = {
       isLoading: false,
       currentPhase: PHASES.WELCOME,
       scheduled: true,
       meeting: {}
     };
  }
  onClientMeetingReceived(meeting) {
    this.setState({ isLoading: false });
  }
  onScanButtonPress(identity) {
      this.setState({ isLoading: true });
      ClientStore.getClientMeeting(identity).then(json => {
        if(json) {
          this.setState({ currentPhase: PHASES.CONFIRMATION, isLoading: false, meeting: json  })
        }
        else
        {
          this.setState({ currentPhase: PHASES.FINAL, isLoading: false, scheduled: false});
          setTimeout(() => { this.setState({ currentPhase: PHASES.WELCOME }); }, 5000);
        }
      });
  }
  onScheduleConfirm() {
      this.setState({ isLoading: false, currentPhase: PHASES.FINAL });
      var clientName = "";
      if(this.state.meeting.Clients)
        clientName = "("+ this.state.meeting.Clients. FirstName + " " + this.state.meeting.Clients.LastName +")";
      NativeModules.SmartReception.createNotification("New Meeting", "You have a client "+ clientName +" waiting for your next meeting.");
      NativeModules.SmartReception.notifySound();
      NativeModules.SmartReception.vibrate(1000);
      setTimeout(() => {
          this.setState({ currentPhase: PHASES.WELCOME });
      }, 5000);
  }
  onRegister() {
      this.setState({ isLoading: true, scheduled: false });
      setTimeout(()=> {
          this.setState({ isLoading: false, currentPhase: PHASES.FINAL});
          setTimeout(() => {
              this.setState({ currentPhase: PHASES.WELCOME });
          }, 5000);
      }, 1000);
  }
  onRegisterLinkPress() {
      this.setState({ isLoading: true });
      setTimeout(()=> {
          this.setState({ isLoading: false, currentPhase: PHASES.REGISTER });
      }, 1000);
  }
  renderPhases() {
      if(this.state.isLoading) {
          return (<LoadMask />);
      }
      else {
          switch(this.state.currentPhase) {
              case PHASES.WELCOME:
                return (<SplashScreen
                    onScanButtonPress = {this.onScanButtonPress.bind(this)}
                    onRegisterPress = { this.onRegisterLinkPress.bind(this) } />);
                break;
              case PHASES.CONFIRMATION:
                return (<ScheduleConfirmation meeting={this.state.meeting} onConfirm={this.onScheduleConfirm.bind(this)} />);
                break;
              case PHASES.FINAL:
                return (<FinalConfirmation scheduled={this.state.scheduled} />);
                break;
            case PHASES.REGISTER:
                return (<RegisterUser onRegister={this.onRegister.bind(this)} />);
                break;
          }
      }
  }
  render() {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../../resources/images/logo.png')} style={{width: 400, height: 160, marginBottom: 20}} />
            </View>
            <View style={{ padding: 5, backgroundColor: '#F4F4F4', flex: 1 }}>
                { this.renderPhases() }
            </View>
        </View>
    );
  }
}

/**
 * @class LoadMask
 */
class LoadMask extends React.Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style= {{ flexDirection: 'column', alignItems: 'center', flex: 1}}>
                <Image
                    source={{uri: 'https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif'}}
                    style={{width:200,height: 100, marginLeft: 100}}/>
                <Text style={{marginLeft: 100}}>Scanning your identity, Please wait...</Text>
            </View>
        );
    }
}

/**
 * @class ScheduleConfirmation
 */

class ScheduleConfirmation extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
          mobile: null,
          email: null
        };
        if(this.props.meeting) {
          this.state.mobile = this.props.meeting.Clients.Mobile;
          this.state.email = this.props.meeting.Clients.Email;
        }
    }
    onConfirm() {
      if(this.props.onConfirm)
      {
        var client = this.props.meeting.Clients;
        client.Mobile = this.state.mobile;
        client.Email = this.state.email;
        ClientStore.updateClientContacts(client).then(json => {
          this.props.onConfirm(json)
        })
      }
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1}}>
                <Image source={{uri: 'http://avenger.kaijuthemes.com/assets/demo/avatar/avatar_02.png'}} style={styles.profileImage} />
                <Text style={styles.profileName}>{this.props.meeting.Clients.FirstName + " " + this.props.meeting.Clients.LastName}</Text>
                <Text>{this.props.meeting.Clients.Position}</Text>
                <Text>{this.props.meeting.Clients.Companies.Name}</Text>
                <View style={styles.scheduleConfirmationNotification}>
                    <Text style={{ fontSize: 20, fontStyle: 'bold' }}> Your meeting is scheduled on Today {Moment(this.props.meeting.DateOfMeeting).format('HH:MM A')} </Text>
                </View>
                <View style={[styles.phoneConfirmationWrapper, { marginBottom: 20 }]}>
                    <Text>Please confirm your mobile number & email id: </Text>
                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 15 }} >
                        <TextInput textAlign="center" underlineColorAndroid="#FFF"
                          value={this.state.mobile}
                          keyboardType="numeric"
                          placeholder="052-867-0788"
                          onChangeText={text=>this.setState({ mobile: text})}
                          style={{ flex: 1 }} />
                    </View>
                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center"
                          underlineColorAndroid="#FFF" value={this.state.email}
                          onChangeText={text=>this.setState({ email: text})}
                          placeholder="user@domain.com" style={{ flex: 1 }} />
                    </View>
                </View>
                <TouchableHighlight onPress={this.onConfirm.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Confirm</Text>
                        <Icon name="arrow-right" color="#FFF" size={20} style={{marginTop: 4, marginLeft: 10}} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

/**
 * @class SplashScreen
 */

class SplashScreen extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            identity: ""
        };
    }
    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={{backgroundColor: '#FFF', padding: 20, borderWidth: 1, borderColor: '#d5d5d5', borderTopColor: '#427fed', borderTopWidth: 5, alignItems: 'center', justifyContent: 'center', width: 300}}>
                    <Image source={require('../../../resources/images/app-logo.png')} style={{width: 100, height: 100, marginBottom: 10}} />
                    <View style={{alignItems:'center', justifyContent:'center', marginTop:20, marginBottom:20}}>
                        <Text style={{textAlign:'center'}}>Please scan your emirates id or enter your emirates id below</Text>
                    </View>
                    <View style={{backgroundColor: '#fbfbfb', borderColor: '#d5d5d5', borderWidth: 1, height: 40, width: 250, borderRadius: 4, marginBottom: 20 }} placeholder="Enter Your Emirates Id">
                        <TextInput style={{flex: 1}} underlineColorAndroid="#fbfbfb"
                            value = {this.state.identity}
                            onChangeText={ text => this.setState({ identity: text }) }
                            placeholder="Emirates Id #" keyboardType="numeric" />
                    </View>
                    <TouchableHighlight onPress={() => this.props.onScanButtonPress(this.state.identity) }>
                        <View style={{flexDirection: 'row', width: 200, paddingTop: 10, paddingBottom: 10, padding: 5, backgroundColor: '#427fed', borderWidth: 1, borderColor: '#427fed', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color:'#FFF'}}>Login</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{backgroundColor: '#FFF', padding: 10, borderWidth: 1, borderColor: '#d5d5d5', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: 300 }}>
                    <TouchableWithoutFeedback onPress={ this.props.onRegisterPress }>
                        <View>
                            <Text>I don''t have Emirates ID</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

/**
 * @class FinalConfirmation
 */

class FinalConfirmation extends React.Component {
    constructor(args) {
        super(args);
        this.state= {
            seconds: 59,
            isMeetingScheduled: true
        };
        this.state.isMeetingScheduled = this.props.scheduled != undefined ? this.props.scheduled : true;
    }
    componentWillMount() {
        setInterval(() => { this.setState({ seconds: this.state.seconds - 1 })}, 1000);
    }
    renderMeetingScheduled() {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{ color: '#766946', fontSize: 32 }}> Thank you for your patience</Text>
                <Text style={{ color: '#000', fontSize: 32 }}>Your meeting Will Start in </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 25 }}>
                    <View style={{ padding: 20, backgroundColor: '#766946', margin: 10, alignItems: 'center'}}>
                        <Text style={{ fontSize: 30, color: '#FFF' }}>15</Text>
                        <Text style={{ color: '#FFF' }}>Minutes</Text>
                    </View>
                    <View style={{ padding: 20, backgroundColor: '#766946', margin: 10, alignItems: 'center'}}>
                        <Text style={{ fontSize: 30, color: '#FFF' }}>{this.state.seconds}</Text>
                        <Text style={{ color: '#FFF' }}>Seconds</Text>
                    </View>
                </View>
                <Text style={{ color: '#000', fontSize: 32 }}> Please wait in waiting area </Text>
            </View>
        );
    }
    renderWalkin() {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{ color: '#766946', fontSize: 32 }}>Sorry we can''t find a scheduled meeting for you</Text>
                <Text style={{ color: '#000', fontSize: 32 }}>Please proceed to the reception staff </Text>
                <Text style={{ color: '#000', fontSize: 32 }}>Thank you for choosing SME Smart Reception Service</Text>
            </View>
        );
    }
    renderConfirmation() {
        if(this.state.isMeetingScheduled == true) {
            return this.renderMeetingScheduled();
        }
        else{
            return this.renderWalkin();
        }
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1, flexDirection: 'column'}}>
                { this.renderConfirmation() }
            </View>
        );
    }
}

/**
 * @class RegisterUser
 */

class RegisterUser extends React.Component {
    constructor(args) {
        super(args);
        this.state = {};
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{margin:10,fontSize: 35, color:'#696868', marginTop: 0 }}>Please register your details </Text>
                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="user" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="First Name" style={{ flex: 1 }} />
                </View>
                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="user-plus" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="Last Name" style={{ flex: 1 }} />
                </View>

                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="book" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="Passport Number" style={{ flex: 1 }} />
                </View>
                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="flag" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="Nationality" style={{ flex: 1 }} />
                </View>
                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="envelope" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="Email" style={{ flex: 1 }} />
                </View>
                <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 5 }} >
                    <Icon name="mobile" color="#696868" size={18} style={{marginTop: 4, marginLeft: 10}} />
                    <TextInput underlineColorAndroid="#FFF" placeholder="Phone" style={{ flex: 1 }} />
                </View>
                <TouchableHighlight onPress={this.props.onRegister}>
                    <View style={[styles.button, { marginTop: 25 }]}>
                        <Text style={styles.buttonText}>Register</Text>
                        <Icon name="arrow-right" color="#FFF" size={20} style={{marginTop: 4, marginLeft: 10}} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

/**
 * @const PHASES
 */

const PHASES = {
    WELCOME: 0,
    LOADING: 1,
    CONFIRMATION: 2,
    REGISTER: 3,
    FINAL: 4
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFF'
  },
  profileImage: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      borderColor: '#F1EDED',
      borderWidth: 5,
      marginTop: 5,
      marginBottom: 5
  },
  profileName: {
      fontSize: 25,
      color: '#5D626D',
      fontWeight: 'bold'
  },
  scheduleConfirmationNotification: {
      marginTop: 20,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'center'
  },
  phoneConfirmationWrapper: {
      flexDirection: 'column',
      alignItems: 'center'
  },
  button: {
      flexDirection: 'row',
      width: 280,
      padding: 10,
      backgroundColor: '#D9232D',
      borderWidth: 1,
      borderColor: '#731117',
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      color:'#FFF',
       fontSize: 20
   }
});
