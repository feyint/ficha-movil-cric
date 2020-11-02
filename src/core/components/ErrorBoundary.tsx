import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
interface State {
  hasError: boolean;
  error: any;
  loading: boolean;
}
interface Props {
  onError: Function;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false, error: {}, loading: false};
  }
  componentDidCatch(error: any, info: any) {
    this.setState({hasError: true, error});
    this.props.onError(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <View>
              <Text style={{fontWeight: 'bold'}}>Ha ocurrido un error</Text>
              <Text>{this.state.error.message}</Text>
            </View>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}
