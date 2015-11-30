'use strict';
import React, { View, Text, StyleSheet, } from 'react-native';
import moment from 'moment';

class Calendar extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
          currentDate: moment()
        };
    }
    renderHeader() {
        let _weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"];
        return (
            <View style={styles.header}>
                {_weekDays.map((item, index) => {
                    return (<Text style={styles.weekName}>{item}</Text>);
                })}
            </View>
        );
    }
    renderDays() {
        var _rows = [[],[],[],[],[],[],[]];
        var _weeks = [];

        var date = moment().add(-2, 'month').startOf('month');

        for(var i = 1; i<= moment().daysInMonth(); i++ ) {
            
            if(date.month() != moment(date).add(-1,'week').month() && _rows[date.day()].length == 0) {
              _rows[date.day()].push(0)
            }

            _rows[date.day()].push(date.date());

            date = date.add(1,'day');
        }

        return (
          <View style={{flexDirection:'row',}}>
          {
            _rows.map((item)=> { 
                return (
                    <View style={{flexDirection: 'column', flex: 1, padding: 5}}>
                      {
                        item.map((_day) => {
                            return (
                                <View>
                                  <Text>{_day}</Text>
                                </View>
                            );
                        })
                      }
                    </View>
                );
            })
          }
          </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
              {this.renderHeader()}
              {this.renderDays()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    header: {
      padding: 5,
      flexDirection: 'row'
    },
    weekName: {
       flex: 1,
       fontWeight: 'bold'
    }
});

module.exports = Calendar;
