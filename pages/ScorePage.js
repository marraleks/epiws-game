import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Font } from 'expo-font';

const Styles = StyleSheet.create({
  yougot: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    marginTop: 80,
  },
  record: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    marginTop: 110,
  },
  highscore: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    paddingTop: 40
  },
  highscorepoeng: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
  },
  poeng: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    paddingBottom: 20,
  },
  sidestilt: {
    flexDirection: 'row',
    padding: 40,
  },
});

class ScorePage extends React.Component {
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


  //Henter poengsum og benytter den til å sette highscore
  storeData = async (poeng) => {
  try {
    //await AsyncStorage.clear()
    const tidligereHS = await AsyncStorage.getItem('@EPIWS_HighScore')
    if(Number(JSON.parse(poeng)) > tidligereHS) {
      await AsyncStorage.setItem('@EPIWS_HighScore', JSON.stringify(poeng))       
    } else {
      this.setState({hs: tidligereHS, })    
    }
  } catch (e) {
    // saving error
  }
}

  render() {
    const { navigate } = this.props.navigation;

    const { navigation } = this.props;
    const poengsum = navigation.getParam("poengsum");



    let img = <Image
            style={{ width: 120, height: 120, marginTop: 100 }}
            source={require('../assets/ikoner/grin-beam-solid.png')}
          /> 
        if(this.state.hs + 1 > poengsum) {
          img = <Image
                style={{ width: 120, height: 120, marginTop: 100 }}
                source={require('../assets/ikoner/sad-cry.png')}
              />  
        }

    let content = <View>
          {this.state.fontLoaded ? (
            <Text style={Styles.record}>New record!</Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.poeng}>
              {poengsum}
            </Text>
          ) : null}
        </View>

       if(this.state.hs + 1 > poengsum) {
         content = <View>
          {this.state.fontLoaded ? (
            <Text style={Styles.yougot}>You got!</Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.poeng}>
              {poengsum}
            </Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.highscore}>Highscore:</Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.highscorepoeng}>
              {this.state.hs}
            </Text>
          ) : null}
        </View>
       }
      
      this.storeData(poengsum)


    
        
    
    

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5A5A5C',
        }}>
        <View style={{alignItems: 'center',}}>
          {img}   
          {content}


        </View>
        <View style={Styles.sidestilt}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Game')}>
            <Image
              style={{ width: 35, height: 35, margin: 50,}}
              source={require('../assets/ikoner/undo-solid.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Image
              style={{ width: 45, height: 35, margin: 50,}}
              source={require('../assets/ikoner/home-solid.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ScorePage;
