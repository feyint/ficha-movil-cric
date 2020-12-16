import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es';
import {HelperText} from 'react-native-paper';
import { BLabel } from '.';

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
  minimumDate?: Date;
}
export default class BDatePickerModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible ? this.props.isVisible : false,
    };
  }
  UNSAFE_componentWillMount() {
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
    return <BLabel>{this.props.label}</BLabel>;
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
          minimumDate={this.props.minimumDate}
          maximumDate={this.props.maximumDate}
          isVisible={this.state.isVisible}
          mode={this.props.mode}
          date={this.props.value ? this.props.value : new Date()}
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
    borderRadius: 5,
    width: '100%',
    color: '#553432',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
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
