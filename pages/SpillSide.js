import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { Font } from 'expo-font';

const Styles = StyleSheet.create({
  midtstille: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  score: {
    color: 'white',
    fontSize: 50,
    paddingBottom: 20,
    fontFamily: 'Montserrat-Bold',
  },
  scoretext: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
  },
  direction: {
    fontSize: 50,
    color: '#5A5A5C',
    paddingTop: 138,
    paddingBottom: 138,
    fontFamily: 'Montserrat-Bold',
  },
  scoretimer: {
    height: 21,
    backgroundColor: 'white',
  },
});

// Importerer fonter
class SpillSide extends Component {
  
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

  // Alle verdier jeg trenger å hente ifra
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      backgroundColor: '#FA6853',
      poeng: 0,
      retning: [
        'up',
        'down',
        'left',
        'right',
        'not up',
        'not down',
        'not left',
        'not right',
      ],
      riktig: 1,
      time: 1000,
      nedtelling: 1,
    };
  }

  // Setter ett tilfeldig tall mellom 0-7 riktig sin state til det
  lagOppgave = () => {
    const rett = Math.floor(Math.random() * 8);
    this.setState({ riktig: rett });
  };

  sjekkSvar(gestureName) {
    // Sjekker om swipet er diagonalt og stopper ikke spillet hvis det er.
    if (
      gestureName != 'SWIPE_UP' &&
      gestureName != 'SWIPE_DOWN' &&
      gestureName != 'SWIPE_LEFT' &&
      gestureName != 'SWIPE_RIGHT'
    ) {
      return;
    }

    // Sjekker om swipet tilsvarer retningen det skal
    let skalHaPoeng = false;

    if (this.state.riktig === 0 && gestureName === 'SWIPE_UP') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 1 && gestureName === 'SWIPE_DOWN') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 2 && gestureName === 'SWIPE_LEFT') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 3 && gestureName === 'SWIPE_RIGHT') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 4 && gestureName != 'SWIPE_UP') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 5 && gestureName != 'SWIPE_DOWN') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 6 && gestureName != 'SWIPE_LEFT') {
      skalHaPoeng = true;
    }
    if (this.state.riktig === 7 && gestureName != 'SWIPE_RIGHT') {
      skalHaPoeng = true;
    }

    // Hvis swipet stemmer gir den poeng og reseter timeren
    // Hvis ikke, taper du og scoren blir sendt til ScorePage
    
  if (skalHaPoeng) {
      this.setState(ps => {
        return { poeng: ps.poeng + 1, nedtelling: ps.nedtelling + 0.5 };
      });

      this.stopTimer();
      this.resetTimer();
      this.startTimer();
    } else {
      this.setState(ps => {
        return { poeng: (ps.poeng = 0), nedtelling: ps.nedtelling = 1};
      });
      this.stopTimer();
      this.resetTimer();
      this.props.navigation.navigate('Score', {
        poengsum: this.state.poeng,
      });
    }

    this.lagOppgave();
  }

  startTimer() {
    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.time - this.state.nedtelling,
        }),
      1
    );
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ time: 1000 });
  }

  render() {
    const { navigate } = this.props.navigation;

    // Hvis tiden går ut taper du og scoren blir sendt til ScorePage
    if (this.state.time <= 0) {
      this.setState(ps => {
        return { poeng: (ps.poeng = 0) };
      });
      this.stopTimer();
      this.resetTimer();
      this.lagOppgave();
      this.props.navigation.navigate('Score', {
        poengsum: this.state.poeng,
      });
    }

    
    // Velocity tilsvarer swipe-speed "høyt tall tilsvarer høy hastighet på swipet"
    // Tilsvarer feilmargin på swipet "jo laverer tallet er jo mer nøyaktiv må man swipe"
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 50,
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.sjekkSvar(direction, state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
        }}>
        <View style={Styles.midtstille}>
          {this.state.fontLoaded ? (
            <Text style={Styles.score}>{this.state.poeng}</Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.scoretext}>SCORE</Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={Styles.direction}>
              {this.state.retning[this.state.riktig]}
            </Text>
          ) : null}
          <View style={{ width: this.state.time / 5 }} {...Styles.scoretimer} />
        </View>
      </GestureRecognizer>
    );
  }
}

export default SpillSide;
