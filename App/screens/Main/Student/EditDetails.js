
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';


export default class EditDetails extends React.Component {
    state = {
        name: "",
        SID: ""
    }

    componentDidMount = () => {
        let that = this;
        var userId = firebase.auth().currentUser.uid;
        var postsRef = firebase.database().ref("Users/" + userId);
        postsRef.once("value")
            .then(function (snapshot) {
                var Name = snapshot.child("Name").val();
                var SID = snapshot.child("SID").val();
                that.setState({
                    name: Name,
                    SID: SID
                })
            })
    }



    editUser = () => {
        var userId = firebase.auth().currentUser.uid;
        var postsRef = firebase.database().ref("Users/" + userId);
        postsRef.update({
            Name: "" + [this.state.name],
            SID: "" + [this.state.SID]
        })
        this.props.navigation.navigate("Student");
    }

    onBackToStudentPress = () => {
        this.props.navigation.navigate("Student");
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Quiz App</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.name}
                        onChangeText={(text) => { this.setState({ name: text }) }}
                        placeholder="Name"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.SID}
                        onChangeText={(text) => { this.setState({ SID: text }) }}
                        placeholder="Student ID"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.inputButton} onPress={this.editUser}>
                    <Text style={styles.loginText}>Confirm Details?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStudentPress}>
                    <Text style={styles.loginText}>Back to Menu...</Text>
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
