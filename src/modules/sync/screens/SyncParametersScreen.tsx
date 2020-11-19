import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Paragraph} from 'react-native-paper';
import {BButton, BHeader} from '../../../core/components';
import {
  useFNCCONPER,
  useFNCELEPER,
  useFNCGENERO,
  useFNCLUNIND,
  useFNCOCUPAC,
  useFNCPAREN,
  useFNCPUEIND,
  useFNCTIPIDE,
  useFUCBARVER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCPAIS,
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
  const {countFNCTIPIDE, syncFNCTIPIDE, loadingFNCTIPIDE} = useFNCTIPIDE();
  const {countFNCPAREN, syncFNCPAREN, loadingFNCPAREN} = useFNCPAREN();
  const {countFNCOCUPAC, syncFNCOCUPAC, loadingFNCOCUPAC} = useFNCOCUPAC();
  const {countFNCPUEIND, syncFNCPUEIND, loadingFNCPUEIND} = useFNCPUEIND();
  const {countFNCLUNIND, syncFNCLUNIND, loadingFNCLUNIND} = useFNCLUNIND();
  const {countFNCGENERO, syncFNCGENERO, loadingFNCGENERO} = useFNCGENERO();
  const {countFNCELEPER, syncFNCELEPER, loadingFNCELEPER} = useFNCELEPER();
  const {countFNCCONPER, syncFNCCONPER, loadingFNCCONPER} = useFNCCONPER();
  const {countFUCPAIS, syncFUCPAIS, loadingFUCPAIS} = useFUCPAIS();
  const {
    countFUCZONCUI_FUCBARVER,
    loadingFUCZONCUI_FUCBARVER,
  } = useFUCZONCUI_FUCBARVER();
  const {
    countFUCTIPTER_FUCRESGUA,
    loadingFUCTIPTER_FUCRESGUA,
  } = useFUCTIPTER_FUCRESGUA();
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
    syncFNCTIPIDE();
    syncFNCPAREN();
    syncFNCOCUPAC();
    syncFNCPUEIND();
    syncFNCLUNIND();
    syncFNCGENERO();
    syncFNCELEPER();
    syncFNCCONPER();
    syncFUCPAIS();
    //await this.clearPollEntities();
    // this.countEntity();
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Sincronización de información" />
      </Appbar.Header>

      <BHeader>Sincronización de catalogos</BHeader>
      
      <View  style={styles.container1}>
      <Paragraph>
        FVCELEVIV (Preguntas Nucleo familiar):{' '}
        {loadingFVCELEVIV ? 'Cargando..' : countFVCELEVIV}
      </Paragraph>
      <Paragraph>
        FVCCONVIV (Opciones de Respuestas Nucleo familiar) :{' '}
        {loadingFVCCONVIV ? 'Cargando..' : countFVCCONVIV}
      </Paragraph>
      <Paragraph>
        FUCPAIS (Departamentos) : {loadingFUCPAIS ? 'Cargando..' : countFUCPAIS}
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
      <Paragraph>
        FNCTIPIDE (tipo identificacion):{' '}
        {loadingFNCTIPIDE ? 'Cargando..' : countFNCTIPIDE}
      </Paragraph>
      <Paragraph>
        FNCPAREN (parentezco): {loadingFNCPAREN ? 'Cargando..' : countFNCPAREN}
      </Paragraph>
      <Paragraph>
        FNCOCUPAC (ocupación):{loadingFNCOCUPAC ? 'Cargando..' : countFNCOCUPAC}
      </Paragraph>
      <Paragraph>
        FNCPUEIND (pueblo indigena):
        {loadingFNCPUEIND ? 'Cargando..' : countFNCPUEIND}
      </Paragraph>
      <Paragraph>
        FNCLUNIND (luna indigena):
        {loadingFNCLUNIND ? 'Cargando..' : countFNCLUNIND}
      </Paragraph>
      <Paragraph>
        FNCGENERO(genero):
        {loadingFNCGENERO ? 'Cargando..' : countFNCGENERO}
      </Paragraph>
      <Paragraph>
        FNCELEPER(Person question):
        {loadingFNCELEPER ? 'Cargando..' : countFNCELEPER}
      </Paragraph>
      <Paragraph>
        FNCCONPER(Person options):
        {loadingFNCCONPER ? 'Cargando..' : countFNCCONPER}
      </Paragraph>
      </View>
      <BButton
        color="primary"
        value="Sincronizar Catalogos"

        onPress={() => syncCatalogs()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container1: {
    marginTop: 20, 
    marginBottom: 20,
  },
});
export default SyncParametersScreen;
