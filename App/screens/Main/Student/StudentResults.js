import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
export default class StudentResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Quizzes: [],
            QuizzesText: []
        };
    }

    onQuizPress = () => {
        return this.props.navigation.navigate("Quiz");
    }

    onBackToStudentPress = () => {
        return this.props.navigation.navigate("Student");
    }

    componentDidMount = () => {
        var userId = firebase.auth().currentUser.uid;
        const state = this.state;
        fetch('https://native-quiz-app.firebaseio.com/Quizzes/' + userId + '.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Quizzes: responseJson,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;
        var arr = [];
        Object.keys(state.Quizzes).forEach(function (key) {
            arr.push(state.Quizzes[key]);
        });

        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.logo}>Quiz App</Text>
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Quiz ID</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Mark</Text>
                            </View>
                            {/* <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Q1</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Q2</Text>
                            </View> */}
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Feedback</Text>
                            </View>
                        </View>
                        {

                            arr.map((prop, key) => {
                                // var q1;
                                // var q2;
                                // if (prop.Question1 === "true") {
                                //     q1 = "Correct"
                                // }
                                // if (prop.Question1 === "false") {
                                //     q1 = "Incorrect"
                                // }
                                // if (prop.Question2 === "true") {
                                //     q2 = "Correct"
                                // }
                                // if (prop.Question2 === "false") {
                                //     q2 = "Incorrect"
                                // }
                                return (
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <View style={styles.cell}>
                                            {/* <Text style={styles.inputText}>{Object.keys(state.Quizzes)[key]}</Text> */}
                                            <Text style={styles.inputText}>{key + 1}</Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text style={styles.inputText}>{prop.Mark}</Text>
                                        </View>
                                        {/* <View style={styles.cell}>
                                            <Text style={styles.inputText}>{q1}</Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text style={styles.inputText}>{q2}</Text>
                                        </View> */}
                                        <View style={styles.cell}>
                                            <Text style={styles.inputText}>{prop.feedback}</Text>
                                        </View>
                                    </View>
                                )
                                // })
                            })
                        }
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStudentPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    tableButton: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
        marginHorizontal: 5
    },
    table: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
        paddingBottom: 5
    },
    cell: {
        //backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        //alignSelf: 'auto',
        paddingRight: 0,
        //height: 100
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#fb5b5a",
    },
    container3: { backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
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
        color: "white",
        fontSize: 14
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
