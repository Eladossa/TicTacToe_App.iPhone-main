import { Text, View, LogBox, TouchableOpacity } from 'react-native';
import { mainApp } from '../styles/styles';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state.',
// ]);
LogBox.ignoreAllLogs();

export default function ResultModal({ route, navigation }) {
  const { result, newGame } = route.params;
  //const navigation = useNavigation();

  function onPressHandler() {
    navigation.replace('Statics Screen');
    //navigation.goBack();
    newGame();
  }
  const removeModal = () => {
    newGame();
    navigation.goBack();
  };
  return (
    <View>
      <View style={mainApp.modalView}>
        <Text style={mainApp.h2}> {result}</Text>
        <TouchableOpacity
          style={mainApp.purpleButton}
          onPress={() => {
            removeModal();
          }}
        >
          <Text style={mainApp.whiteButtonText}>Start a new game</Text>
        </TouchableOpacity>
      </View>
      <View style={mainApp.modalView}>
        <TouchableOpacity style={mainApp.blueButton} onPress={onPressHandler}>
          <Text style={mainApp.whiteButtonText}>show statistics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
