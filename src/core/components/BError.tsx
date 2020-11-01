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
  render() {
    return (
      <View>
        {this.props.error ? (
          <HelperText type="error">
            {this.props.error
              ? this.props.error.message
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}

export default withTheme(BError);
