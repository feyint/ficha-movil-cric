import React, { Component } from 'react';
import { RadioButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface State {
    selectedValue: string;
}
interface Props {
    items?: { label: string; value: string }[],
    onChange?: any,
    value?: string;
}
class BRadioButton extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedValue: this.props.value ? this.props.value : '',
        };

    }

    componentDidMount() {
        this.props.onChange(this.state.selectedValue);
        console.log('BRadioButton componentDidMount: ', this.state);
    }

    render() {
        return (
            <View style={styles.flexDirection}>
                <RadioButton.Group value={this.state.selectedValue}
                    onValueChange={(selectedValue) => {

                        this.setState({ selectedValue: selectedValue }, () =>
                            this.props.onChange(selectedValue),
                        );

                    }}>

                    {this.props.items?.map(item => {
                        return (
                            <View >
                                <RadioButton.Item
                                    style={styles.flexDirection}
                                    label={item.label}
                                    value={item.value} />
                            </View>
                        );
                    })
                    }
                </RadioButton.Group>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexDirection: {
        flexDirection: 'row'
    }
});

export default BRadioButton;