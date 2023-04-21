import { Fragment, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import AuthInstance from "../../utils/Authentication/Instance";
import validator from 'validator';

const Authentication = ({ navigation }) => {
    const [Layout, setLayout] = useState('Login');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RepeatedPassword, setRepeatedPassword] = useState('');
    const [ValidationError, setValidationError] = useState(null);

    const Login = async () => {
        try {
            if (!validator.isEmail(Email)) {
                setValidationError("Please enter a valid email address and try again.");
                return;
            }

            if (Password.length <= 5) {
                setValidationError("Please enter a password that has at least 6 characters.");
                return;
            }

            const Response = await AuthInstance.Local.SignIn(Email, Password);

            if (Response.Success === true) {
                navigation.navigate("Products");
            } else {
                setValidationError(Response.Error);
                return;
            }
        } catch (error) {
            console.log(error);
        }

        setValidationError(null);
    };

    const Register = async () => {
        try {
            if (!validator.isEmail(Email)) {
                setValidationError("Please enter a valid email address and try again.");
                return;
            }

            if (Password.length <= 5) {
                setValidationError("Please enter a password that has at least 6 characters.");
                return;
            }

            if (Password !== RepeatedPassword) {
                setValidationError("Password does not match the repeated password.");
                return;
            }

            const Response = await AuthInstance.Local.SignUp(Email, Password);

            if (Response.Success === true) {
                navigation.navigate("Products");
            } else {
                setValidationError(Response.Error);
                return;
            }
        } catch (error) {
            console.log(error);
        }

        setValidationError(null);
    };

    return (
        <View style={styles.authentication}>
            <View style={styles.head}>
                <Text style={styles.headTitle}>{Layout === "Login" ? "Login" : "Get started"}</Text>
                <Text style={styles.headDescription}>{Layout === "Login" ? "Welcome back! Please login to unlock the full functionnality of the store." : "Hello! Please register to unlock the full functionnality of the store."}</Text>
            </View>

            <TextInput style={styles.email} placeholder="Email address" onChangeText={setEmail} value={Email} />
            <TextInput style={styles.password} secureTextEntry={true} placeholder="Password" onChangeText={setPassword} value={Password} />

            {
                Layout === "Register" && (
                    <TextInput style={styles.password} secureTextEntry={true} placeholder="Repeat password" onChangeText={setRepeatedPassword} value={RepeatedPassword} />
                )
            }

            {
                ValidationError !== null && (
                    <View style={styles.error}>
                        <Text style={styles.errorText}>{ValidationError}</Text>
                    </View>
                )
            }

            {
                Layout == "Register" ? (
                    <Fragment>
                        <Pressable style={styles.loginButton} onPress={() => Register()}>
                            <Text style={styles.loginText}>Register</Text>
                        </Pressable>

                        <Pressable style={styles.secondaryButton} onPress={() => setLayout("Login")}>
                            <Text style={styles.secondaryText}>Sign in instead</Text>
                        </Pressable>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Pressable style={styles.loginButton} onPress={() => Login()}>
                            <Text style={styles.loginText}>Login</Text>
                        </Pressable>

                        <Pressable style={styles.secondaryButton} onPress={() => setLayout("Register")}>
                            <Text style={styles.secondaryText}>Register instead</Text>
                        </Pressable>
                    </Fragment>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    authentication: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center'
    },
    head: {
        marginBottom: 15
    },
    headTitle: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 5
    },
    headDescription: {
        fontSize: 16,
        color: '#666666'
    },
    email: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 4
    },
    password: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        marginBottom: 10
    },
    loginButton: {
        height: 48,
        backgroundColor: 'black',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600
    },
    secondaryButton: {
        height: 48,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    secondaryText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 600
    },
    error: {
        width: '100%'
    },
    errorText: {
        color: '#f44336'
    }
});

export default Authentication;