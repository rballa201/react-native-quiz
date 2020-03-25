import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity, Platform } from 'react-native';
import * as firebase from 'firebase';
import computerQuestions from "../../../data/computers";
//import questions from '../../data/computers';

export default class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    onLoadQuestions = () => {
        let that = this;
        var dataString = JSON.stringify(computerQuestions);
        var data = JSON.parse(dataString);

        this.setState({
            results: data
        });
    }

    // Occurs when signout is pressed...
    onBackToStaffPress = () => {
        return (this.props.navigation.navigate("Staff"))
    }


    render() {
        let that = this;
        const state = this.state;
        var arr = [];
        this.state.results.map(function (item) {
            arr.push(item)
        })
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onLoadQuestions} >
                        <Text style={styles.loginText}>Show questions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStaffPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                    {
                        /* <Text style={styles.inputText}>{this.state.sampleText}</Text> */
                        arr.map((prop, key) => {
                            return (
                                <View>
                                    <Text style={styles.inputText}>{prop.question}</Text>
                                    <Text style={styles.inputText}>{prop.answers[0]}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        paddingVertical: 40,
        paddingHorizontal: 5
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    container2: {
        //flex: 1,
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
