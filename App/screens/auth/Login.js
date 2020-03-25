
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../../constants/ApiKeys';

export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
        //firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }


    showAdminButton = () => {
        let that = this; // assign this reference to variable that.
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("Admin");
        ref.once("value")
            .then(function (snapshot) {
                var AdminID = snapshot.child("Admin1/UID").val();
                var isAdmin = snapshot.child("Admin1/Admin").val();
                if (isAdmin === true && AdminID === userId) {
                    //Alert.alert("You are Admin");
                    //this.setState({ isAdmin: true })
                    return that.props.navigation.navigate("Staff");

                }
                else {
                    //Alert.alert("Not Admin");
                    return that.props.navigation.navigate("Student")
                }
            });
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.showAdminButton();
            }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        this.props.navigation.navigate("SignUp")
    }
    onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword")
    }

    render() {
        //let that = this; // assign this reference to variable that.

        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Quiz App</Text>
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
                <TouchableOpacity onPress={this.onForgotPasswordPress} >
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} onPress={this.onLoginPress}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} onPress={this.onCreateAccountPress}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    };
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

//export default (Login)