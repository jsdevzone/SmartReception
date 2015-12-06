'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
                "January", "February", "March","April", "May", "June", "July", "August", 
                "September", "October", "November", "December"
            ];

class Calendar extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            year: 2015,
            month: 11,
            selectedDate: moment()
        };
    }
    onDaySelected(day) {
        if(this.props.onDaySelected) {
            this.props.onDaySelected(moment([this.state.year, this.state.month, day]));
        }
    }
    onNext() {
        let _currentMonth = this.state.month;
        let _currentYear = this.state.year;

        if(_currentMonth == 11){
            _currentMonth = 0;
            _currentYear = _currentYear + 1;
        }
        else
            _currentMonth = _currentMonth + 1;

        this.setState({ month: _currentMonth, year: _currentYear });
    }
    onPrevious() {
        let _currentMonth = this.state.month;
        let _currentYear = this.state.year;

        if(_currentMonth == 0){
            _currentMonth = 11;
            _currentYear = _currentYear - 1;
        }
        else
            _currentMonth = _currentMonth - 1;

        this.setState({ month: _currentMonth, year: _currentYear });   
    }
    renderCalendar() {
            
            var startDay = moment([this.state.year, this.state.month]);
            var days = {};
            for(var i=0;i<startDay.day();i++) {
                if(!days[weekDays[i]]) {
                   days[weekDays[i]] = new Array();
                }
                days[weekDays[i]].push(0);
            }     
            for(var i=1;i<=startDay.daysInMonth();i++) {
                if(!days[weekDays[startDay.day()]]) {
                   days[weekDays[startDay.day()]] = new Array();
                }
                days[weekDays[startDay.day()]].push(i);
                startDay = startDay.add(1, 'day');
            }     
        var _arr = [];
        
        return (
            <View style={{flexDirection:'row'}}>
                {weekDays.map((item) => {
            return (<View><Text style={styles.weekHeader}>{item}</Text>{
                
            days[item].map((d) => {
                var cur={};

                var text = d;
                if(d == 0)
                    text = "";
                return <TouchableWithoutFeedback onPress={()=>{this.onDaySelected(d)}}><Text style={[{width:30,height:30}]}>{text}</Text></TouchableWithoutFeedback>;
            })}
            </View>);
        })}       
            </View>
        );
    }
    renderHeader() {
        return (
            <View style={styles.headerWrapper}>
                <View style={styles.navigation}>
                    <TouchableWithoutFeedback onPress={this.onPrevious.bind(this)}>
                        <Icon name="arrow-circle-left" size={20} color="#000" />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.header}>
                    <Text style={styles.month}>{months[this.state.month]}</Text>
                    <Text style={styles.year}>{this.state.year}</Text>
                </View>
                <View style={styles.navigation}>
                    <TouchableWithoutFeedback onPress={this.onNext.bind(this)}>
                        <Icon name="arrow-circle-right" size={20} color="#000" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View>
                {this.renderHeader()}
                {this.renderCalendar()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }, 
    headerWrapper: {
        padding: 10,
        flexDirection: 'row'
    },
    week: {
        flexDirection: 'column',
        width: 50, 
    },
    weekHeader: {
        fontWeight: "bold"
    },
    navigation: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    month: {
        fontSize: 18,
        color: '#000'
    },
    year: {
        fontSize: 18,
        color: '#000',
        marginLeft: 10
    }
});

module.exports = Calendar;
