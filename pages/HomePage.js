import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SpillSide from './SpillSide';
import { Font } from 'expo-font';

const Styles = StyleSheet.create({
  knapp: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA6853',
    borderRadius: 100,
    width: 127,
    height: 127,
    marginTop: 110,
  },
  play: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#5A5A5C',
  },
  epiws: {
    width: 250,
    height: 80,
    marginBottom: 40,
  },
});

class HomePage extends React.Component {
  // Importerer fonter
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#5A5A5C',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
        <Image
            style={Styles.epiws}
            source={require('../assets/ikoner/Logo.png')}
          /> 
        </View>
        <TouchableOpacity
          style={Styles.knapp}
          onPress={() => this.props.navigation.navigate('Game')}>
          {this.state.fontLoaded ? <Text style={Styles.play}>PLAY</Text> : null}
        </TouchableOpacity>
      </View>
    );
  }

  
}

export default HomePage;
