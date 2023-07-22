import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';




import { useForm, Controller } from "react-hook-form"

import {Amplify} from "@aws-amplify/core"
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export default function Signup({image}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
        firstName: "",
        lastName: "",
    },
    })
    const onSubmit = (data) => console.log(data)

    return(
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="First name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="firstName"
            />
            {errors.firstName && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Last name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="lastName"
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}