/**
 * @author Jasim
 */
var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

import {Sidebar} from '../meeting/Sidebar';
import {CalendarView} from '../ux/CalendarView';

 var {
     StyleSheet,
     View,
     Text,
 } = React;

export class Schedule extends React.Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row'}}>
                <Sidebar />
                <View>
                    <CalendarView />
                </View>
            </View>
         );
     }
}


 var styles = StyleSheet.create({ });
