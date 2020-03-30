import React from "react";
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import spaceQuestions from "../../data/space";
import westernsQuestions from "../../data/westerns";
import computerQuestions from "../../data/computers";

import { RowItem } from "../../components/RowItem";

export default ({ navigation }) => (
  <ScrollView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Computer"
      color="#49475B"
      onPress={() => {
        const questions = {};
        fetch('https://native-quiz-app.firebaseio.com/Questions/Computer1.json')
          .then((response) => response.json())
          .then((responseJson) => {
            //return questions;
            navigation.navigate("Quiz", {
              title: "Computers",
              questions: responseJson,
              color: "#49475B"
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }}
    />
    <View style={styles.container2}>
      <TouchableOpacity style={styles.inputButton} onPress={() => {
        navigation.navigate("Student");
      }}>
        <Text style={styles.loginText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#003f5c',
  }, container2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
  },
  inputButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  }, loginText: {
    color: "white"
  }
});
