import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity, Picker } from 'react-native';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default class StudentEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Quizzes: [],
            Students: [],
            Student: ""
        };
    }

    updateStudent = (Student) => {
        this.setState({ Student: Student })
    }

    componentDidMount = () => {
        const state = this.state;
        fetch('https://native-quiz-app.firebaseio.com/Users.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Students: responseJson,
                })
                //Alert.alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onFeedbackPress = async (data, data1) => {
        try {
            await AsyncStorage.setItem('FeedbackID', data);
            await AsyncStorage.setItem('StudentID', data1);
            //Alert.alert(JSON.stringify(this.state.totalCount));
        } catch (error) {
            Alert.alert("Error");
        }
        this.goToFeedback();
    }

    loadData = () => {
        var userId = firebase.auth().currentUser.uid;
        const state = this.state;
        var Student = state.Student;
        fetch('https://native-quiz-app.firebaseio.com/Quizzes/' + Student + '.json')
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

    loadStudentData = () => {
        const state = this.state;
        fetch('https://native-quiz-app.firebaseio.com/Users.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Students: responseJson,
                })
                //Alert.alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    goToFeedback = () => {
        return this.props.navigation.navigate("Feedback");
    }


    // Occurs when signout is pressed...
    onBackToStaffPress = () => {
        return (this.props.navigation.navigate("Staff"))
    }

    onQuizPress = () => {
        return this.props.navigation.navigate("QuizList");
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;
        var arr = [];
        var arr2 = [];
        var arr3 = [];
        //this.loadStudentData();
        if (!state.Quizzes == []) {
            Object.keys(state.Quizzes).forEach(function (key) {
                arr.push(state.Quizzes[key]);
                //Alert.alert(JSON.stringify(state.Quizzes[key]))
            });
        }
        Object.keys(state.Students).forEach(function (key, index) {
            arr2.push(Object.keys(state.Students)[index]);
            //arr3.push(Object.keys(state.Students)[index].email);
            //Alert.alert(Object.keys(state.Student.email))
        });
        Object.keys(state.Students).forEach(function (key, index) {
            arr3.push(state.Students[key]);
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.Student} onValueChange={this.updateStudent}>
                            {
                                arr2.map((prop, key) => {
                                    var label = "" + arr3[key].Name + " " + arr3[key].SID
                                    //+ " " + arr3[key].email
                                    return (
                                        <Picker.Item label={label} value={prop} />
                                    )
                                })
                            }
                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.loadData}>
                        <Text style={styles.loginText}>Show Student Results</Text>
                    </TouchableOpacity>
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
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Edit?</Text>
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
                                // if (prop === "false") {
                                //     q2 = "Incorrect"
                                // }
                                return (
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
                                        <View style={styles.cell}>
                                            <TouchableOpacity style={styles.tableButton} onPress={() => that.onFeedbackPress(Object.keys(state.Quizzes)[key], state.Student)}>
                                                <Text style={styles.loginText}>Edit?</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })

                        }
                    </View>
                    {/* <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz List</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStaffPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    Select: {
        height: 50,
        width: "100%",
        color: "white",
        fontSize: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    tableButton: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: "80%",
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
        alignSelf: 'auto',
        paddingBottom: 5,
        paddingTop: 20
    },
    cell: {
        //backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        alignSelf: 'auto',
        paddingRight: 0,
        height: 50
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 13,
        color: "#fb5b5a",
    },
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
        marginBottom: 40
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
        //paddingRight: 10,
        color: "white",
        fontSize: 14,
        //flex: 1,
        //flexWrap: 'wrap'
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
    selectBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
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
