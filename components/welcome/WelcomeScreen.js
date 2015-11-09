/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
  TextInput,
  TouchableWithoutFeedback,
  Navigator,
  BackAndroid,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

export class WelcomeScreen extends React.Component{
  constructor(props) {
     super(props);
     this.state = {
       isLoading: false,
       currentPhase: PHASES.WELCOME,
       scheduled: true
     };
  }
  _onScanButtonPress() {
      this.setState({ isLoading: true });
      setTimeout(()=> {
          this.setState({ isLoading: false, currentPhase: PHASES.CONFIRMATION });
      }, 1000);
  }
  onScheduleConfirm() {
      this.setState({ isLoading: true });
      setTimeout(()=> {
          this.setState({ isLoading: false, currentPhase: PHASES.FINAL });
          setTimeout(() => {
              this.setState({ currentPhase: PHASES.WELCOME });
          }, 5000);
      }, 1000);
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
                    onScanButtonPress = {this._onScanButtonPress.bind(this)}
                    onRegisterPress = { this.onRegisterLinkPress.bind(this) } />);
                break;
              case PHASES.CONFIRMATION:
                return (<ScheduleConfirmation onConfirm={this.onScheduleConfirm.bind(this)} />);
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
            <View style={{flex: 1, backgroundColor: '#', alignItems: 'center'}}>
                <View style={{ padding: 5, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFF', marginTop: 40, alignItems: 'center' }}>
                    <Image source={require('image!logo')} style={{width: 400, height: 160, marginBottom: 20}} />
                    { this.renderPhases() }
                </View>
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
        this.state = {};
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1}}>
                <Image source={{uri: 'http://avenger.kaijuthemes.com/assets/demo/avatar/avatar_02.png'}} style={styles.profileImage} />
                <Text style={styles.profileName}>Billy Duke</Text>
                <Text>Chief Executive Officer</Text>
                <Text>Globex Corporation</Text>
                <View style={styles.scheduleConfirmationNotification}>
                    <Text style={{ fontSize: 20, fontStyle: 'bold' }}> Your meeting is scheduled on Today 10: AM </Text>
                </View>
                <View style={[styles.phoneConfirmationWrapper, { marginBottom: 20 }]}>
                    <Text>Please confirm your mobile number & email id: </Text>
                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 15 }} >
                        <TextInput textAlign="center" underlineColorAndroid="#FFF" keyboardType="numeric" placeholder="052-867-0788" style={{ flex: 1 }} />
                    </View>
                    <View style={{ width: 350,height: 40, borderColor: '#D8D8D8', borderWidth: 1, flexDirection: 'row', marginTop: 10 }} >
                        <TextInput textAlign="center" underlineColorAndroid="#FFF" placeholder="user@domain.com" style={{ flex: 1 }} />
                    </View>
                </View>
                <TouchableHighlight onPress={this.props.onConfirm}>
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
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{margin:10,fontSize: 45, color:'#000'}}>Welcome To Dubai SME</Text>
                <Image source={require('image!emiratesid')} style={{width: 350, height: 220, marginTop: 40, marginBottom: 40}} />
                <TouchableHighlight onPress={this.props.onScanButtonPress}>
                    <View style={{flexDirection: 'row', width: 280, padding: 10, backgroundColor: '#D9232D', borderWidth: 1, borderColor: '#731117', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color:'#FFF', fontSize: 20}}>Scan Your Emirates Id</Text>
                        <Icon name="arrow-right" color="#FFF" size={20} style={{marginTop: 4, marginLeft: 10}} />
                    </View>
                </TouchableHighlight>
                <TouchableWithoutFeedback onPress={ this.props.onRegisterPress }>
                    <View>
                        <Text style={{color:'#766946', fontSize: 17, marginTop: 10}}>I don't have Emirates ID</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    }
    componentWillMount() {
        this.setState({ isMeetingScheduled: this.props.scheduled ? this.props.scheduled: true });
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
                <Text style={{ color: '#766946', fontSize: 32 }}>Sorry we can't find a scheduled meeting for you</Text>
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
      flexDirection: 'column',
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
