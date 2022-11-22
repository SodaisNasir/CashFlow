import React, { createContext, useContext, useState } from "react";
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});


export const AuthProvider = ({ children }: any) => {
    const navigation: any = useNavigation();
    const [error, setError] = useState<any>()
    const LoginUser = (event: any, Email: string, Password: string) => {
        event.preventDefault();
        axios.post('https://cashflow.albasoftsolutions.it/api/auth/token', {
            "client_secret": "30639096bfe4ec4b9f17696ef1d02b9t",
            "username": Email,
            "password": Password,
            "app_mobile" : "true"
        }).then(response => {
            if (response.status == 200) {
                AsyncStorage.setItem('token', response.data['token'])
                navigation.navigate('company')
            }
            else{
                Alert.alert("email or password is incorrect")
            }
            
        }).catch(err => {
            Alert.alert("email or password is incorrect")
        });
    }

    let LogoutUser = () => {
        AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }
    let contextData = {
        LoginUser: LoginUser,
        LogoutUser: LogoutUser,
        error: error,
        setError: setError,
    }
    return (
        <AuthContext.Provider
            value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)