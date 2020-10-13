import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es';
import {HelperText} from 'react-native-paper';

interface State {
  isVisible: boolean;
}
interface Props {
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
  value?: Date;
  error?: any;
  onChange?: any;
  onLoad?: any;
  disabled?: boolean;
  isVisible?: boolean;
  format?: string;
  maximumDate?: Date;
}
export default class BDatePickerModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible ? this.props.isVisible : false,
    };
  }
  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount (BDatePickerModal)');
    if (this.props.onLoad) {
      this.props.onLoad(true);
    }
  }
  hideDatePicket = () => {
    this.setState({isVisible: false});
  };
  showDatePicket = () => {
    this.setState({isVisible: true});
  };
  handleConfirm = (date: Date) => {
    this.hideDatePicket();
    this.props.onChange(date);
  };
  renderLabel() {
    return (
      <View>
        <Text>{this.props.label ? this.props.label : 'Fecha'}</Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        {this.renderLabel()}
        <View
          style={[
            this.props.error ? styles.inputerror : styles.input,
            styles.datepicker,
          ]}>
          <TouchableOpacity onPress={this.showDatePicket}>
            <Text style={styles.textDate}>
              {this.props.value
                ? moment(this.props.value).format(
                    this.props.format ? this.props.format : 'DD-MM-YYYY',
                  )
                : 'Seleccione...'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          maximumDate={this.props.maximumDate}
          isVisible={this.state.isVisible}
          mode={this.props.mode}
          date={this.props.value}
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicket}
        />
        {this.props.error ? (
          <HelperText type="error">
            {this.props.error.type
              ? this.props.error.type
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
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
    color: '#553432',
    paddingHorizontal: 20,
  },
  inputerror: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    width: '100%',
    color: '#553432',
    paddingHorizontal: 20,
  },
  datepicker: {
    justifyContent: 'center',
  },
  textDate: {
    color: '#969696',
    fontSize: 15,
  },
});
