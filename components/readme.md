# Building Truly Native Application With React Native

React native is a fantastic way to build cross platform native mobile application using JavaScript and CSS.  It enables you to use standard platform components from IOS and Android. This means that with react native you can have the full speed and power of native application. Even react native is cross platform, it does not mean that write once and run-anywhere tool. It is aiming to be learn-once and write anywhere. In same time you can share a big amount of code between the platforms.
All operation between the React code and native platform are performed asynchronously and the native modules can also make use of additional threads as well. This tutorial show you how to write a simple Flickr photo search application using react native, but here i cover mostly android part but you could port the application very easily once you understand the concepts.

## Getting Started
React Native uses node js to build your application. You can use command line interface to create your application. Install the React Native CLI using node package manager with following command:
```
npm install -g react-native-cli
```
Navigate to the folder where you would like to develop the application and create your react  native  project using CLI as follows:
```
react-native init FlickrPhotoSearch
```
The above command creates a simple ready to build react native application. You should have Xcode 6.3 or higher if you want to target IOS platform. Also to write React Native apps for Android, you will need to install the Android SDK and an android emulator like Genymotion, if you want to run your app without using a physical device. Note that, don't forget to include the Android SDK in to your system environment variables.

If you look at the newly created project, you can find the directory structure something similar to following.
```
|- android
|- ios
|- index.android.js
|- index.ios.js
|- node_modules
|- package.json
```
 node_modules folder contains react native framework and other node dependencies used in the  application. Native Android Studio Project can be found in android folder. IOS folder contains your Xcode project.  Finally index.andrdoid.js and index.ios.js ares the skeletal app created by the CLI.

To run this application in IOS simulator open the project inside IOS folder using Xcode then click build and run. You might notice that a terminal window will popup with a message that says React Native Packager is Ready. Leave that window running in the background.  Simulator will start with the application loaded into it. We will check what react native packager does shortly in next section.

In android  workflow is different. First you need to run the packager manually. For this move the project folder in terminal and run the packager with following command:
```
npm run start
```
this will start the same terminal window mentioned above. Leave the terminal running in backround. In another  terminal run the following command to launch your android application
```
react-native run-android
```
 > React native gives only experimental support for windows and linux platform for development. So in windows you should change the scripts section in your package.json as follows before you start the packager:
 > ```node node_modules/react-native/packager/packager.js```

When you are running on android devices, if you are using devices running android 5.0 or above then run the following command in your terminal:adb reverse tcp:8081 tcp:8081

Shake the device to get the development menu. then press reload js. To configure your device to connect to development server via WIFI, Shake your device and Open Dev Settings from menu then Go to ```Debug server host for device``` Option. Type in your machine's IP Address and Reload JS. On device dev settings you can also find Auto Reload On JS Change option make this checked in order to synchronise and reload your application whenever you make some changes to the application.


## Hello World React Native
Creating a  react native project is very simple. In terminal navigate to the folder you'd like to save your project and then run the following command:

```
react-native init FlickrPhotoSearch
```
The above command tells react native cli to create construct a  react native projects with name FlickrPhotoSearch that is ready to run as is.
To run this application navigate into the project directory start live development server with following: ``` npm run start ```. Note that if you are on windows  you should make some changes in ```package.json``` in order to run the development server. On windows platform open  the package.json then change the scripts section as follows:
```
"scripts": {
  "node node_modules/react-native/packager/packager.js"
}
```
React Native application loads the JavaScript application from this development server. Make sure that the server is running properly by accessing ``` http://localhost:8081/index.ios.bundle?platform=ios``` for ios and ```http:localhost:8081/index.android.bundle``` for android.Leave the development server keep running in background. In another terminal window navigate to project directory then run the react native application on device as follows:
```
react-native run-android
```
Please make sure that you have enabled the USB debugging in your device prior to running the application.

### Accessing the development server from the device
When you run the application for first time in the device you may get a error in red screen saying that unable to load the JS bundle. It means that the application inside device could not connect to the development server. If you are on an android device with android 5.0+ or above and your device is connected via USB with debugging enabled, then run the following command in your terminal:
```
adb reverse tcp:8081 tcp:8081
```
Tap reload js on the device.

To access the development server via WIFI, shake the device or run the following command in temrinal ```adb shell input keyevent 82 ```, go to dev settings -> debug server host for device then type your machine's IP address then Reload JS. You can enable live sync of the JavaScript application by checking Auto reload on JS change option to true. Then whenever you make changes to the react native application it will be automatically syncronized and reloaded into the  device.

***Specify About Common Error Messages***
***You will need mac for developing ios application ***
***specify about windows and linux problem ****

### Debugging Application


### How Does it work
React native uses JavaScriptCore, JavaScript engine that powers safari on ios and android simulators and devices. But when you using chrom debugging it runs the code within the chrome itself by using v8 engine and communicates with the native code with web sockets.

When you open index.android.js you can find the code that build your initial application UI. You will find code blocks similar to following.

First it makes the strict mode using following line
'Use strict'. Then we import the react native library into our view. Next we use destructing assignment which enables you extract items from array or object into local variables. In this case from React native  library. This line is optional but this enables you not to write fully qualified name of a class each and every time. For example you can access Component class directly instead of Writing React.Component.

```
var SmartReception = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

```
This creates a react component that has only function called render.  This method return the output to render on the screen. Here in this code <View /> tag is same as div in the web. Text tag is used to output the text content on the screen.   You can style the components using style attribute either inline or with StyleSheet class. The styles used in this class can be created as follows:
```
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```
Syntax for creating style sheet is almost same as the standard css. But not every css properties are supported in react native. you can find the list of supported css property in the react native documentation.

Styles can be defined inline as follows:
```
<View style={{textAlign: center}}></View>
```

Multiple styles groups can be applied as follows:
```
<View style={[styles.container, { textAlign: 'center' }]}></View>
```
And finally index page register our initial component which defines the entry point to the application:
```
AppRegistry.registerComponent('SmartReception', () => SmartReception);
```
## Adding Navigation And Routing to the Application
Flickr Search Application uses standard stack based navigation. To accomplish this react native provides two components called Navigator and NavigatorIOS.  Navigator Component works both on IOS and android. It allows you to manage the navigation in your app between various scenes similar to html5 history API. You should provide a route objects to the navigator to identify each scene, and also renderScene method that navigator can use to render for a given route.

Add the following class below the FlickrPhotoSearch class
```
var _navigator = null;

 class FlickrPhotoSearchApp extends React.Component {
	renderScene(route, navigator)
	{
		_navigator = navigator;
		switch(route.id) {
			case 'home':
				return (<FlickrPhotoSearch />);
		}
	}
    render() {
      return (
          <Navigator
	          initialRoute={{id:'home', title: 'Home' }}
	          renderScene={this.renderScene.bind(this)}
          />
      );
    }
  }
```
As you can see, this class uses ES2015 syntax. React native is shipped with babel transformer from the version 0.5.0 itself. So you can use most of the ES6 and ES 7 features in your react native application.  This class render the navigator on the screen.  it has two attributes. initial route is for the initial scene to be displayed on the screen. renderScene function takes two parameter route and navigator. whenever we change a route this function will be executed and this checks for the route id then shows corresponding view to the screen.

Replace the Entry point with this Class
```
AppRegistry.registerComponent('SmartReception', () => SmartReceptionApp);
```

React native uses a stack based navigation which means that navigator object keeps a stack of your routes it always displays the last added item in the  screen. So if you want to change the route you may push new route object into the navigator. and that route should be configured in the renderScene method.
```
navigator.push({ id: 'dashboard', title: 'Dashboard', ...});
```

you can go the previous screen just by popping out the last route from the navigator as follows:
```
navigator.pop({ id: 'dashboard', title: 'Dashboard'});
```

### Handling Android Back Button
React native's BackAndroid module detects the hardware back button press and programmatically invoke the android back button functionality if there is no listener attached or none of the listeners are true. Here you can go your previous screen when you press the back button  using navigator and BackAndroid module.

Add this to the top of the page

```
var {
	...
	BackAndroid,
} = React;
```
Then add listener to the BackButton android
```
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});
```
## Building Search Page
Add new file called search.js to the application. Add the following code to the file.
```
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
} = React;
export SearchPage extends React.Component {
	constructor(args) {
		super(args);
		this.state = {};
	}
	render() {
		return (
			 <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
      </View>
		);
	}
```
This creates a simple component called seachpage with two text fields. Next add the stylesheet required to style this component as follows
```
var styles = StyleSheet.creaye ({});
```
The search component should have a search textfiled and a button to invoke the search functinality. Lets add this to oyr search component.
Change your render method as follows
```
```
Then add corresponding stylesheet to style object as follows
```
```
Now we have created our search page. we need to show this page on application starts. So open index.android.js on the top import the search page component as follows
```
Import {SearchPage} from '';
```
Notify the navigator object to show the Search page on route change

```
```

### Brief about flex box layout
For layout react native implements flexbox layout system. When using flexbox we can arrange our child items of container either horizontally or vertically. By default flexbox arranges it's children vertically. this can be managed by style property called flexDirection. When flexDirection is column which is default then container will arrange it's children vertically. When it's row then it will arrange children horizontally. You can expand a component to fit the available space in the container using the flex property.
Aligning items inside the flexbox can be done using the alignItems style property.  It's value can be center, flex-start, flex-end or strecth.
***Give an example and explanation***

## Component State

If your have ever used React Js before on web you may know about state. in React Js , state is a key value store that is used to store the data related to view. Whenever you change a state variable using setState method the render method will be executed.  Let's add out SearchPage component's initial state object. for this add a constructor to the class as follows:
constructor(props) {
  super(props);
  this.state = {
    searchText: 'london',
    isSearching: false
  };
}

you can access your component state using this.state.propertyname and you can set the value using this.setState({propertyName: propertyValue});

To make use of this component state add the searchText state into the EditText Field as follows:
<TextInput
  style={styles.searchInput}
  value={this.state.searchString}
  placeholder='Search via name or postcode'/>

Here we set only the initial state of the textfield. but we need to change the value of the state whenever user types the in the text field. to do this change the textfield declaration as follows in your render method;

<TextInput
  style={styles.searchInput}
  value={this.state.searchString}
  onChange={this.textChanged.bind(this)}
  placeholder='Search via name or postcode'/>

Next define textChanged function as following:
textChanged (event) {
	this.setState({ searchText: event.nativeEvent.text});
}

> Note that when you use ES 6 syntax you should not forget to bind the event handler function to current context.

## Performing Flickr Search

Update the initial state inside SearchPage with ```status``` varaible.
this.initialState = {
	searchText: '',
	status: '',
	isLoading: false
}

** add the image **
Add the following to the bottom of the UI. This text component is used to display the status messages when performing the api request.
<Text style={styles.description}>{this.state.status}</Text>

Next add the event handler for the search button.  Add onPress attribute to the TouchableHighlight compoent:

onPress = this._onSearchButtonPress	.bind(this)

add the _onSearchButtonPress event handler fuction to SearchPage class:

_onSearchButtonPressed() {
	this.setState({ isLoading: true, msg: 'Searching flickr please wait' });
}

**Add the loading image **

Add following code to onSearchButtonPress method
_onSearchButtonPressed() {
	this.setState({ isLoading: true, msg: 'Searching flickr please wait' });
    var param  = {
        method: 'flickr.photos.search',
        api_key: '',
        tags: 'flower',
        per_page: 5
    }
    var querystring = Object.keys(param)
    .map(key => key + '=' + encodeURIComponent(param[key]))
    .join('&');
    let url = 'http://api.flickr.com/services/rest/?'  + querystring;

    fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
}

describe functionality


_handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
    console.log('Properties found: ' + response.listings.length);
    this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: response.listings}
});
  } else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
}

Add the list
style the list
details page
share the image with share component
    installing third party component
Accessing the local module
Creating custom local module
Creating Custom UI Component
Summary
