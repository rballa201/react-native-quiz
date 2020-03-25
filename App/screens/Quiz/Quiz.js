import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert } from "react-native";
import * as firebase from 'firebase';
import { Button, ButtonContainer } from "../../components/Button";
import { Alerts } from "../../components/Alert";
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class Quiz extends React.Component {

  state = {
    Count: 0,
    totalCount: this.props.navigation.getParam("questions", [""]).length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('TotalCount', (JSON.stringify(this.state.totalCount)));
      //Alert.alert(JSON.stringify(this.state.totalCount));
    } catch (error) {
      Alert.alert("Error");
    }
  };

  answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1), JSON.stringify(true));
          nextState.Count = state.Count + 1;
          nextState.answerCorrect = true;
        } else {
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1), JSON.stringify(false));
          nextState.Count = state.Count + 1;
          nextState.answerCorrect = false;
          //AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count), JSON.stringify(nextState.answerCorrect));
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };

  nextQuestion = () => {
    this.setState(state => {
      let nextIndex = state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
        this._storeData();
        //return this.props.navigation.popToTop();
        return this.props.navigation.navigate("QuizEnd");
        //nextIndex === 0;
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };


  render() {

    this._storeData;


    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user = null) {
      return (this.props.navigation.popToTop())
    }
    let questions = this.props.navigation.getParam("questions", [""]);
    let question = questions[this.state.activeQuestionIndex];
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {question.answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this.answer(answer.correct)}
                />
              ))}
            </ButtonContainer>
          </View>

          <Text style={styles.text}>
            {`${this.state.Count}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>
        <Alerts
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default Quiz;
