import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Statistics from './screens/Statistics';
import Game from './screens/Game';
import ResultModal from './screens/ResultModal';
const URL = 'http://www.wearetheworld.somee.com/api/Games/GamesList';

// npm install  @react-navigation/native @react-navigation/native-stack

export default function App() {
  const [stats, setStats] = useState([]);
  const [load, setLoad] = useState(true);

  const getFromApi = () => {
    console.log('start getFromApi');

    return fetch(URL, {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data.liststats);
        setStats(data.liststats);
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFromApi();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {load ? null : (
        <Stack.Navigator initialRouteName='Game Screen'>
          <Stack.Group>
            <Stack.Screen name='Game Screen' component={Game} />
            <Stack.Screen
              name='Statics Screen'
              component={Statistics}
              initialParams={{ stats: stats }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'card' }}>
            <Stack.Screen name='Result Modal' component={ResultModal} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

//in package.json - didn't work
//"proxy": "http://localhost:19006"
