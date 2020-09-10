import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BError from './BError';
import moment from 'moment';
import "moment/locale/es";

interface State {
    value: Date;
    isVisible: boolean;
}
interface Props {
    mode?: 'date' | 'time' | 'datetime';
    label?: string;
    value?: Date;
    errorText?: string;
    error?: boolean;
    onChange?: any;
    onBlur?: any;
    disabled?: boolean;
    isVisible?: boolean;
    format?: string;
}
export default class BDatePickerModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : new Date(),
            isVisible: this.props.isVisible ? this.props.isVisible : false,
        };
    }
    hideDatePicket = () => {
        this.setState({ isVisible: false })
    }
    showDatePicket = () => {
        this.setState({ isVisible: true })
    }
    handleConfirm = (date: Date) => {
        this.hideDatePicket();
        this.props.onChange(date);
        this.setState({ value: date });
    };
    renderLabel() {
        return (
            <View>
                <Text>
                    {this.props.label ? this.props.label : 'Fecha'}
                </Text>
            </View>
        );
    }
    render() {
        return (
            <View>
                {this.renderLabel()}
                <View style={[styles.input, styles.datepicker]}>
                    <TouchableOpacity onPress={this.showDatePicket}>
                        <Text style={styles.textDate}>
                            {moment(this.state.value).format(this.props.format ? this.props.format : 'DD-MM-YYYY')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode={this.props.mode}
                    date={this.props.value}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicket}
                />
                <BError text="Campo Invalido" error={this.props.error} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: '100%',
        marginBottom: 5,
        color: '#000',
        paddingHorizontal: 20,
    },
    datepicker: {
        justifyContent: 'center'
    },
    textDate: {
        color: '#969696',
        fontSize: 15
    },
});
