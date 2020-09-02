import React, {Component} from 'react';
import {HelperText, withTheme} from 'react-native-paper';
import {View} from 'react-native';

interface Props {
  errorText?: string;
  error?: boolean;
  theme: any;
  text?: string;
}
class BError extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View
        /* style={this.props.error ? styles.containerError : styles.container} */
        >
          {this.props.error ? (
            <HelperText type="error">
              {this.props.errorText ? null : this.props.text}
            </HelperText>
          ) : null}
        </View>
      </View>
    );
  }
}

export default withTheme(BError);
