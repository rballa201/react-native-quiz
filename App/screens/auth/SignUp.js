
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';


export default class SignUp extends React.Component {
    state = {
        name: "",
        SID: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }




    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                //this.props.navigation.navigate("Login");
                this.createUser();
            }, (error) => { Alert.alert(error.message); });
    }

    createUser = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                var userId = firebase.auth().currentUser.uid;
                var postsRef = firebase.database().ref("Users/" + userId);
                postsRef.update({
                    email: "" + [this.state.email],
                    Name: "" + [this.state.name],
                    SID: "" + [this.state.SID]
                })
                firebase.auth().signOut();
                this.props.navigation.navigate("Login");
            }, (error) => { Alert.alert(error.message); });
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
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                        placeholder="Password Confirmation"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.inputButton} onPress={this.onSignupPress}>
                    <Text style={styles.loginText}>Sign Up</Text>
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
