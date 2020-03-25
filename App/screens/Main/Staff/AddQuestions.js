
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';


export default class FeedbackScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Question: "",
            Answer1: "",
            Answer2: "",
            Answer3: "",
            Answer4: "",
            correctAns: "",
            Quizzes: [],
            Quiz: ""
        };
    }
    updateQuiz = (Quiz) => {
        this.setState({ Quiz: Quiz })
    }

    componentDidMount = () => {
        const state = this.state;
        fetch('https://native-quiz-app.firebaseio.com/Questions.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Quizzes: responseJson,
                })
                //Alert.alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onUpdatePress = async () => {
        const state = this.state;
        var Quiz = state.Quiz;
        var postsRef = firebase.database().ref("Questions/" + Quiz);
        postsRef.push({
            question: state.Question
        })
        // postsRef.child('answers').update({

        // })
        return this.props.navigation.navigate("Staff");
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;
        var arr = [];
        Object.keys(state.Quizzes).forEach(function (key, index) {
            arr.push(Object.keys(state.Quizzes)[index]);
            //arr3.push(Object.keys(state.Students)[index].email);
            //Alert.alert(Object.keys(state.Student.email))
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.Quiz} onValueChange={this.updateQuiz}>
                            {
                                arr.map((prop, key) => {
                                    //var label = "" + arr3[key].Name + " " + arr3[key].SID
                                    //+ " " + arr3[key].email
                                    return (
                                        <Picker.Item key={key} label={prop} value={prop} />
                                    )
                                })
                            }
                        </Picker>
                    </TouchableOpacity>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Question: text }) }}
                            placeholder="Question"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer1: text }) }}
                            placeholder="Answer 1"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer2: text }) }}
                            placeholder="Answer 2"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer3: text }) }}
                            placeholder="Answer 3"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer4: text }) }}
                            placeholder="Answer 4"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onUpdatePress}>
                        <Text style={styles.loginText}>Add Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToLoginPress}>
                        <Text style={styles.loginText}>Back to Login...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingBottom: 100
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 10
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
