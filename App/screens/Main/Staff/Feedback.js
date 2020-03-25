
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';


export default class FeedbackScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
        };
    }

    onUpdatePress = async () => {
        const value = await AsyncStorage.getItem('FeedbackID');
        const student = await AsyncStorage.getItem('StudentID');
        var postsRef = firebase.database().ref("Quizzes/" + student + "/" + value);
        postsRef.update({
            feedback: this.state.feedback
        })
        return this.props.navigation.navigate("Staff");
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login");

    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Quiz App</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.feedback}
                        onChangeText={(text) => { this.setState({ feedback: text }) }}
                        placeholder="Feedback"
                        //keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.inputButton} onPress={this.onUpdatePress}>
                    <Text style={styles.loginText}>Update Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} onPress={this.onBackToLoginPress}>
                    <Text style={styles.loginText}>Back to Login...</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
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
    },
    signUpBtn: {
        width: "80%",
        backgroundColor: "blue",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
        display: "flex"
    },
    disappear: {
        display: "none"
    },
    Selected: {
        width: "40%",
        backgroundColor: "green",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 0,
        marginLeft: "25%",
        marginRight: "25%",
        flexDirection: 'row'
    },
    notSelected: {
        width: "40%",
        backgroundColor: "#003f5c",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 0,
        marginLeft: "25%",
        marginRight: "25%",
        flexDirection: 'row'
    },
    loginText: {
        color: "white"
    }
});