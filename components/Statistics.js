import React, { useState, useEffect } from 'react';
//import structuredClone from '@ungap/structured-clone';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/statsStyle';
import { mainApp } from '../styles/styles';

import { Button } from 'react-native-paper';

const Statistics = ({ route, navigation }) => {
  const statsArray = route.params?.stats;
  //const copiedStatist = structuredClone(statsArray);
  const copiedStatist = JSON.parse(JSON.stringify(statsArray));

  const shortStats = copiedStatist.reduce((acc, curItem) => {
    const userWins = acc;
    delete acc.game_Number;
    userWins.user1_Wins += curItem.user1_Wins;
    userWins.user2_Wins += curItem.user2_Wins;
    return { ...acc, ['Games']: statsArray.length };
  });

  const statisValues = statsArray.map(function (obj) {
    if (obj.user1_Wins === 1) {
      return [obj.game_Number, 'Player 1', 'Player 2'];
    } else if (obj.user1_Wins === 0 && obj.user2_Wins === 0) {
      return [obj.game_Number, 'none', 'none'];
    } else {
      return [obj.game_Number, 'Player 2', 'Player 1'];
    }
  });
  console.log('stats_Values', statisValues);

  const CONTENT = {
    tableHead: ['Game number', 'Winner', 'Looser'],
    widthArr: [100, 135, 135],
    statisValues,
  };
  function onPressHandler() {
    navigation.replace('Game Screen');
  }
  return (
    <>
      <View style={mainApp.upperContainer}>
        <TouchableOpacity
          style={mainApp.showStatisBtn}
          onPress={() => {
            onPressHandler();
          }}
        >
          <Text style={mainApp.whiteButtonText}>Back to Game Board</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: '#c8e1ff', borderWidth: 3 }}>
              <Row
                data={CONTENT.tableHead}
                widthArr={CONTENT.widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: '#c8e1ff', borderWidth: 3 }}>
                {CONTENT.statisValues.map((dataRow, index) => (
                  <Row
                    key={index}
                    data={dataRow}
                    widthArr={CONTENT.widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#ffffff' },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Statistics;

{
  /* <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={styles.title}>
          <Text>{'item1'}</Text>
        </View>
        <View style={styles.result}>
          <Text>{'item2'}</Text>
        </View>
      </View>
      <Text style={styles.statsText}>
        <span style={styles.title}>Player 1 wins</span>
        <span style={styles.result}>{shortStats.user1_Wins}</span>
      </Text>

      <Text>
        Player 2 wins <span>{shortStats.user2_Wins}</span>
      </Text>
      <Text>
        Total games <span>{shortStats.Games}</span>
      </Text> */
}
