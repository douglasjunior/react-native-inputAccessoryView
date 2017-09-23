/**
* MIT License
* 
* Copyright (c) 2017 Douglas Nassif Roma Junior
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE. 
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Switch,
} from 'react-native';

import KeyboardManager from 'react-native-keyboard-manager'

KeyboardManager.setEnable(true);
KeyboardManager.setToolbarPreviousNextButtonEnable(true);
KeyboardManager.setToolbarDoneBarButtonItemText("Close");

const inputStyle = { minHeight: 40, borderColor: "#000000", borderWidth: 1, borderRadius: 2, paddingLeft: 5 };

const inputKeys = ['input1', 'input2', 'input3', 'input4', 'input5', 'textarea1',];

class ReactNativeInputAccessoryView extends Component {

    state = {
        enableDisable: true
    };

    render() {
        const self = this;

        var inputs = [];

        for (let i = 0; i < inputKeys.length; i++) {
            let ref = inputKeys[i];
            let nextRef = i < inputKeys.length - 1 ? inputKeys[i + 1] : '';

            let nextFocus = () => {
                console.log(nextRef);
                self.refs[nextRef] ? self.refs[nextRef].focus() : null
            };

            const multiline = ref.startsWith('textarea');

            inputs.push((
                <View key={i} style={{ padding: 10 }}>
                    <Text >{ref}</Text>

                    <TextInput style={inputStyle}
                        ref={ref}
                        value={this.state[ref]}
                        onChangeText={text => {
                            let state = {};
                            state[ref] = text;
                            self.setState(state)
                        }}
                        blurOnSubmit={false}
                        onSubmitEditing={nextFocus}
                        multiline={multiline}
                        numberOfLines={multiline ? 10 : 1}
                        returnKeyType={multiline ? 'default' : 'next'}
                        onLayout={() => {
                            // When the input size changes, it updates the keyboard position.
                            KeyboardManager.reloadLayoutIfNeeded();
                        }}
                    />
                </View>
            ))
        }

        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <ScrollView>

                    <View>{inputs}</View>

                </ScrollView>
            </View>
        )
    }
}


AppRegistry.registerComponent('ReactNativeInputAccessoryView', () => ReactNativeInputAccessoryView);