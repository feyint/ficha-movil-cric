import React, {Component} from 'react';
import {HelperText, withTheme} from 'react-native-paper';
import {View} from 'react-native';

interface Props {
  error: any;
  theme: any;
}
class BError extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  renderTypeMessage(type: any) {
    switch (type) {
      case 'required':
        return 'Campo es requerido';
      case 'typeError':
        return 'Campo es requerido, ';
      default:
        return 'Campo requerido invalido (' + type + ')';
    }
  }
  render() {
    return (
      <View>
        {this.props.error ? (
          <HelperText type="error">
            {this.props.error && this.props.error.type
              ? this.renderTypeMessage(this.props.error.type)
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}

export default withTheme(BError);
