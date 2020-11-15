import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Appbar, Paragraph} from 'react-native-paper';
import {BButton} from '../../../core/components';
import {
  useFUCBARVER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCRESGUA,
  useFUCTIPTER,
  useFUCTIPTER_FUCRESGUA,
  useFUCZONCUI,
  useFUCZONCUI_FUCBARVER,
  useFVCCONVIV,
  useFVCELEVIV,
} from '../../../hooks';

const SyncParametersScreen = () => {
  const {countFVCELEVIV, syncFVCELEVIV, loadingFVCELEVIV} = useFVCELEVIV();
  const {countFVCCONVIV, syncFVCCONVIV, loadingFVCCONVIV} = useFVCCONVIV();
  const {countFUCDEPART, syncFUCDEPART, loadingFUCDEPART} = useFUCDEPART();
  const {countFUCMUNICI, syncFUCMUNICI, loadingFUCMUNICI} = useFUCMUNICI();
  const {countFUCTIPTER, syncFUCTIPTER, loadingFUCTIPTER} = useFUCTIPTER();
  const {countFUCBARVER, syncFUCBARVER, loadingFUCBARVER} = useFUCBARVER();
  const {countFUCRESGUA, syncFUCRESGUA, loadingFUCRESGUA} = useFUCRESGUA();
  const {countFUCZONCUI, syncFUCZONCUI, loadingFUCZONCUI} = useFUCZONCUI();
  const {
    countFUCZONCUI_FUCBARVER,
    syncFUCZONCUI_FUCBARVER,
    loadingFUCZONCUI_FUCBARVER,
  } = useFUCZONCUI_FUCBARVER();
  const {countFUCTIPTER_FUCRESGUA, loadingFUCTIPTER_FUCRESGUA} = useFUCTIPTER_FUCRESGUA();
  useEffect(() => {}, []);
  function syncCatalogs() {
    syncFVCELEVIV();
    syncFVCCONVIV();
    syncFUCDEPART();
    syncFUCMUNICI();
    syncFUCTIPTER();
    syncFUCBARVER();
    syncFUCRESGUA();
    syncFUCZONCUI();
    //await this.clearPollEntities();
    // this.countEntity();
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Sincronización de información" />
      </Appbar.Header>
      <BButton
        color="secondary"
        value="Sincronizar Catalogos"
        mode="outlined"
        onPress={() => syncCatalogs()}
      />
      <Paragraph>
        FVCELEVIV (Preguntas Nucleo familiar):{' '}
        {loadingFVCELEVIV ? 'Cargando..' : countFVCELEVIV}
      </Paragraph>
      <Paragraph>
        FVCCONVIV (Opciones de Respuestas Nucleo familiar) :{' '}
        {loadingFVCCONVIV ? 'Cargando..' : countFVCCONVIV}
      </Paragraph>
      <Paragraph>
        FUCDEPART (Departamentos) :{' '}
        {loadingFUCDEPART ? 'Cargando..' : countFUCDEPART}
      </Paragraph>
      <Paragraph>
        FUCMUNICI (Municipios) :{' '}
        {loadingFUCMUNICI ? 'Cargando..' : countFUCMUNICI}
      </Paragraph>
      <Paragraph>
        FUCTIPTER (tipo territorio) :{' '}
        {loadingFUCTIPTER ? 'Cargando..' : countFUCTIPTER}
      </Paragraph>
      <Paragraph>
        FUCBARVER (centros poblados) :{' '}
        {loadingFUCBARVER ? 'Cargando..' : countFUCBARVER}
      </Paragraph>
      <Paragraph>
        FUCRESGUA (reguardo / centro poblados) :{' '}
        {loadingFUCRESGUA ? 'Cargando..' : countFUCRESGUA}
      </Paragraph>
      <Paragraph>
        FUCZONCUI (Zona de cuidado):{' '}
        {loadingFUCZONCUI ? 'Cargando..' : countFUCZONCUI}
      </Paragraph>
      <Paragraph>
        (Zona de cuidado relacion barrios/veredas):{' '}
        {loadingFUCZONCUI_FUCBARVER ? 'Cargando..' : countFUCZONCUI_FUCBARVER}
      </Paragraph>
      <Paragraph>
       FUCTIPTER_FUCRESGUA ():{' '}
        {loadingFUCTIPTER_FUCRESGUA ? 'Cargando..' : countFUCTIPTER_FUCRESGUA}
      </Paragraph>
    </View>
  );
};
export default SyncParametersScreen;
