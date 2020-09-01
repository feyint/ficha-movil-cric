import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {SyncCatalogService} from '../../../services';
import {Paragraph} from 'react-native-paper';

interface Props {
  navigation: NavigationProp<any>;
  theme: ReactNativePaper.Theme;
}

interface State {
  FVCCONVIV: number;
  FVCELEVIV: number;
}

class SyncScreen extends Component<Props, State> {
  syncCatalogService = new SyncCatalogService();
  constructor(props: Props) {
    super(props);
    this.state = {
      FVCCONVIV: 0,
      FVCELEVIV: 0,
    };
    this.countEntity();
  }
  UNSAFE_componentWillMount() {}
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="Sincronización de información" />
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Icon
            name="sync-outline"
            size={60}
            color={this.props.theme.colors.secondary}
          />
          <View style={{height: 100, width: '100%'}}>
            <BButton
              color="secondary"
              value="Sincronizar Catalogos"
              mode="outlined"
              onPress={() => this.syncCatalogs()}
            />
            <Paragraph>FVCCONVIV : {this.state.FVCCONVIV}</Paragraph>
            <Paragraph>FVCELEVIV : {this.state.FVCELEVIV}</Paragraph>
          </View>
        </View>
      </View>
    );
  }
  async syncCatalogs() {
    await this.clearPollEntities();
    await this.syncEntities();
    this.countEntity();
  }
  async countEntity() {
    let countFVCCONVIV = await this.syncCatalogService.countEntities(
      'FVCCONVIV',
    );
    let countFVCELEVIV = await this.syncCatalogService.countEntities(
      'FVCELEVIV',
    );
    this.setState({
      FVCCONVIV: countFVCCONVIV,
      FVCELEVIV: countFVCELEVIV,
    });
  }
  async clearPollEntities() {
    await this.syncCatalogService.clearEntities();
    this.countEntity();
  }
  async syncEntities() {
    await this.syncCatalogService.syncEntities();
  }
}

export default withTheme(SyncScreen);
