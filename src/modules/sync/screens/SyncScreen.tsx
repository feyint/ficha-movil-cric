import React, {Component} from 'react';
import {Alert, View} from 'react-native';
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
  FUCPAIS: number;
  FUCDEPART: number;
  FUCMUNICI: number;
  FUCTIPTER: number;
  FUCRESGUA: number;
  FUCBARVER: number;
  FUCZONA: number;
  FUCUNICUI: number;
  FUCZONCUI: number;
  /* /-------------------- */
  FNCELESAL: number;
  FNCCONSAL: number;
  FNCELEPER: number;
  FNCCONPER: number;
  FNCDESARM: number;
  FNCLUNIND: number;
  FNCELEREP: number;
  FNCCONREP: number;
  FNCPAREN: number;
  FNCOCUPAC: number;
  FNCPUEIND: Number;
  FNCORGANI: Number;
  FNCTIPIDE: Number;
  /* /-------------------- */
}

class SyncScreen extends Component<Props, State> {
  syncCatalogService = new SyncCatalogService();
  constructor(props: Props) {
    super(props);
    this.state = {
      FVCCONVIV: 0,
      FVCELEVIV: 0,
      FUCDEPART: 0,
      FUCMUNICI: 0,
      FUCTIPTER: 0,
      FUCRESGUA: 0,
      FUCBARVER: 0,
      FUCZONA: 0,
      FNCPAREN: 0,
      FNCOCUPAC: 0,
      FNCPUEIND: 0,
      FNCORGANI: 0,
      FUCUNICUI: 0,
      FUCZONCUI: 0,
      FNCELESAL: 0,
      FNCCONSAL: 0,
      FNCELEPER: 0,
      FNCCONPER: 0,
      FNCDESARM: 0,
      FUCPAIS: 0,
      FNCLUNIND: 0,
      FNCELEREP: 0,
      FNCCONREP: 0,
      FNCTIPIDE: 0,
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
          <View style={{height: 100, width: '100%', paddingBottom: 10}}>
            <BButton
              color="secondary"
              value="Sincronizar Catalogos"
              mode="outlined"
              onPress={() => this.syncCatalogs()}
            />
            <Paragraph>
              FVCCONVIV (Opciones de Respuestas) : {this.state.FVCCONVIV}
            </Paragraph>
            <Paragraph>
              FVCELEVIV (Preguntas Nucleo familiar): {this.state.FVCELEVIV}
            </Paragraph>
            {/* ------------------------------------------ */}
            <Paragraph>FNCPUEIND (pueblo) : {this.state.FNCPUEIND}</Paragraph>
            <Paragraph>
              FUCZONCUI (Zona de cuidado) : {this.state.FUCZONCUI}
            </Paragraph>
            <Paragraph>
              FNCORGANI (organizacion) : {this.state.FNCORGANI}
            </Paragraph>
            <Paragraph>
              FNCOCUPAC (Ocupacion) : {this.state.FNCOCUPAC}
            </Paragraph>
            <Paragraph>
              FNCCONSAL (Opciones de Respuestas salud) : {this.state.FNCCONSAL}
            </Paragraph>
            <Paragraph>
              FNCELESAL (Preguntas salud): {this.state.FNCELESAL}
            </Paragraph>
            <Paragraph>
              FNCELEPER (Preguntas persona) : {this.state.FNCELEPER}
            </Paragraph>
            <Paragraph>
              FNCCONPER (respuestas persona): {this.state.FNCCONPER}
            </Paragraph>
            <Paragraph>
              FNCDESARM (respuestas desarmonia): {this.state.FNCDESARM}
            </Paragraph>
            <Paragraph>
              FNCLUNIND (pueblo indigena): {this.state.FNCLUNIND}
            </Paragraph>
            <Paragraph>
              FNCELEREP (preguntas salud sexual y rep): {this.state.FNCELEREP}
            </Paragraph>
            <Paragraph>
              FNCCONREP (respuestas salud sexual y rep): {this.state.FNCCONREP}
            </Paragraph>
            <Paragraph>
              FNCTIPIDE (tipo identificación): {this.state.FNCTIPIDE}
            </Paragraph>
            {/* ------------------------------------------ */}
            <Paragraph>FUCPAIS (Pais) : {this.state.FUCPAIS}</Paragraph>
            <Paragraph>
              FUCDEPART (Departamentos) : {this.state.FUCDEPART}
            </Paragraph>
            <Paragraph>
              FUCMUNICI (Municipios) : {this.state.FUCMUNICI}
            </Paragraph>
            <Paragraph>
              FUCTIPTER (Tipo territorios) : {this.state.FUCTIPTER}
            </Paragraph>
            <Paragraph>
              FUCRESGUA (resguardo) : {this.state.FUCRESGUA}
            </Paragraph>
            <Paragraph>
              FUCBARVER (barrio vereda) : {this.state.FUCBARVER}
            </Paragraph>
            <Paragraph>FUCZONA (Zona) : {this.state.FUCZONA}</Paragraph>
            <Paragraph>FNCPAREN (Parentezco) : {this.state.FNCPAREN}</Paragraph>
            <Paragraph>
              FUCUNICUI (Unidad de cuidado) : {this.state.FUCUNICUI}
            </Paragraph>
            <Paragraph>
              FUCZONCUI (Zona de cuidado) : {this.state.FUCZONCUI}
            </Paragraph>
            {this.state.FVCCONVIV != 0 &&
            this.state.FVCELEVIV != 0 &&
            this.state.FUCDEPART != 0 &&
            this.state.FUCMUNICI != 0 &&
            this.state.FUCTIPTER != 0 &&
            this.state.FUCRESGUA != 0 &&
            this.state.FUCBARVER != 0 &&
            this.state.FUCZONA != 0 &&
            this.state.FNCPAREN != 0 &&
            this.state.FNCOCUPAC != 0 &&
            this.state.FNCPUEIND != 0 &&
            this.state.FNCORGANI != 0 &&
            this.state.FUCUNICUI != 0 &&
            this.state.FUCZONCUI != 0 &&
            this.state.FNCELESAL != 0 &&
            this.state.FNCCONSAL != 0 &&
            this.state.FNCELEPER != 0 &&
            this.state.FNCCONPER != 0 &&
            this.state.FNCDESARM != 0 &&
            this.state.FUCPAIS != 0 &&
            this.state.FNCLUNIND != 0 &&
            this.state.FNCELEREP != 0 &&
            this.state.FNCCONREP != 0 &&
            this.state.FNCTIPIDE != 0
              ? Alert.alert(
                  'Sincronizacion completada',
                  '',
                  [
                    /* {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  }, */
                    {text: 'Aceptar', onPress: () => console.log('ok Pressed')},
                  ],
                  {cancelable: false},
                )
              : null}
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
    //----------------------------------------------------------------------
    let countFNCPUEIND = await this.syncCatalogService.countEntities(
      'FNCPUEIND',
    );
    let countFNCORGANI = await this.syncCatalogService.countEntities(
      'FNCORGANI',
    );
    let countFNCCONSAL = await this.syncCatalogService.countEntities(
      'FNCCONSAL',
    );
    let countFNCELESAL = await this.syncCatalogService.countEntities(
      'FNCELESAL',
    );
    let countFNCELEPER = await this.syncCatalogService.countEntities(
      'FNCELEPER',
    );
    let countFNCCONPER = await this.syncCatalogService.countEntities(
      'FNCCONPER',
    );
    let countFNCDESARM = await this.syncCatalogService.countEntities(
      'FNCDESARM',
    );
    let countFNCELEREP = await this.syncCatalogService.countEntities(
      'FNCELEREP',
    );
    let countFNCCONREP = await this.syncCatalogService.countEntities(
      'FNCCONREP',
    );
    //----------------------------------------------------------------------
    let countFUCDEPART = await this.syncCatalogService.countEntities(
      'FUCDEPART',
    );
    let countPais = await this.syncCatalogService.countEntities('FUCPAIS');
    let countFUCMUNICI = await this.syncCatalogService.countEntities(
      'FUCMUNICI',
    );
    let countFUCTIPTER = await this.syncCatalogService.countEntities(
      'FUCTIPTER',
    );
    let countFUCRESGUA = await this.syncCatalogService.countEntities(
      'FUCRESGUA',
    );
    let countFUCBARVER = await this.syncCatalogService.countEntities(
      'FUCBARVER',
    );
    let countFUCZONA = await this.syncCatalogService.countEntities('FUCZONA');
    let countFNCPAREN = await this.syncCatalogService.countEntities('FNCPAREN');
    let countFNCOCUPAC = await this.syncCatalogService.countEntities(
      'FNCOCUPAC',
    );
    let countFUCUNICUI = await this.syncCatalogService.countEntities(
      'FUCUNICUI',
    );
    let countFUCZONCUI = await this.syncCatalogService.countEntities(
      'FUCZONCUI',
    );
    let countFNCLUNIND = await this.syncCatalogService.countEntities(
      'FNCLUNIND',
    );
    let countFNCTIPIDE = await this.syncCatalogService.countEntities(
      'FNCTIPIDE',
    );
    this.setState({
      FVCCONVIV: countFVCCONVIV,
      FVCELEVIV: countFVCELEVIV,
      //------------------------------
      FNCELESAL: countFNCELESAL,
      FNCCONSAL: countFNCCONSAL,
      FNCELEPER: countFNCELEPER,
      FNCCONPER: countFNCCONPER,
      FNCDESARM: countFNCDESARM,
      //------------------------------
      FUCDEPART: countFUCDEPART,
      FUCMUNICI: countFUCMUNICI,
      FUCTIPTER: countFUCTIPTER,
      FUCRESGUA: countFUCRESGUA,
      FUCBARVER: countFUCBARVER,
      FUCZONA: countFUCZONA,
      FNCPAREN: countFNCPAREN,
      FNCOCUPAC: countFNCOCUPAC,
      FNCPUEIND: countFNCPUEIND,
      FNCORGANI: countFNCORGANI,
      FUCUNICUI: countFUCUNICUI,
      FUCZONCUI: countFUCZONCUI,
      FUCPAIS: countPais,
      FNCLUNIND: countFNCLUNIND,
      FNCELEREP: countFNCELEREP,
      FNCCONREP: countFNCCONREP,
      FNCTIPIDE: countFNCTIPIDE,
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
