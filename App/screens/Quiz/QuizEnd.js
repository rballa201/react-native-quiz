import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Questions from "../../data/computers"
import { AsyncStorage } from 'react-native';


export default class QuizEnd extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newEmail: "",
            totalCount: 0,
            answers: [],
            //totalCount: Questions.length,
        };
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TotalCount');
            this.setState({
                totalCount: value
            })
            await AsyncStorage.removeItem('TotalCount')
            for (let index = 1; index <= this.state.totalCount; index++) {
                try {
                    const value = await AsyncStorage.getItem('Question' + index);
                    // this.setState({
                    //     totalCount: value
                    // })
                    //
                    //Alert.alert(JSON.stringify(value));
                    this.state.answers.push(value);
                    await AsyncStorage.removeItem('Quesion' + index)
                } catch (error) {
                    // Error retrieving data
                }
            }
            //Alert.alert(JSON.stringify(this.state.answers[0]));
            this.onQuizPress();
        } catch (error) {
            // Error retrieving data
        }
    };

    onQuizPress = () => {
        var userId = firebase.auth().currentUser.uid;
        let that = this;

        //Alert.alert(JSON.stringify(this.state.answers.length));
        var postsRef = firebase.database().ref("Quizzes/" + userId);
        var newPostRef = postsRef.push();
        var postId = newPostRef.key;
        //let db = firebase.firestore();
        //let docRef = db.collection('Quizzes').doc(uid).collection();


        var correct = 0
        var totalCount = this.state.answers.length

        for (let index = 0; index < this.state.answers.length; index++) {
            if (that.state.answers[index] === "true") {
                correct = correct + 1
            }
        }

        var total = correct / totalCount * 100;
        var total = Math.round((total + Number.EPSILON) * 100) / 100
        var Percentage = "" + total + "/100"
        //var obj = {};


        postsRef.child("" + postId).update({
            Mark: "" + [Percentage],
        })


        for (let index = 0; index < this.state.answers.length; index++) {
            var data1 = index + 1;
            var data = "Question" + data1;
            var value = that.state.answers[index]
            postsRef.child("" + postId).update({ [data]: [] + [value] })
        }
        postsRef.child("" + postId).update({
            feedback: ""
        })
        this.props.navigation.popToTop();
    }

    render() {

        // var user = firebase.auth().currentUser;
        // var name, email, photoUrl, uid, emailVerified;

        // if (user != null) {
        //     name = user.password;
        //     email = user.email;
        //     //photoUrl = user.photoURL;
        //     //emailVerified = user.emailVerified;
        //     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        //     // this value to authenticate with your backend server, if
        // }
        return (


            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.inputButton} onPress={this._retrieveData}>
                        <Text style={styles.loginText}>Submit Quiz</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.inputButton} onPress={this.onSignoutPress}>
                        <Text style={styles.loginText}>Sign Out</Text>
                    </TouchableOpacity> */}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
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
