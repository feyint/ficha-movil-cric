import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Appbar,
  Card,
  DataTable,
  FAB,
  Paragraph,
  Subheading,
} from 'react-native-paper';
import {Text} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
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
import {useFNCCONSAL} from '../../../hooks/useFNCCONSAL';
import {useFNCDESARM} from '../../../hooks/useFNCDESARM';
import {useFNCELESAL} from '../../../hooks/useFNCELESAL';
import {useFNCORGANI} from '../../../hooks/useFNCORGANI';

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
  const {countFNCORGANI, syncFNCORGANI, loadingFNCORGANI} = useFNCORGANI();
  const {countFNCDESARM, syncFNCDESARM, loadingFNCDESARM} = useFNCDESARM();
  const {countFNCELESAL, syncFNCELESAL, loadingFNCELESAL} = useFNCELESAL();
  const {countFNCCONSAL, syncFNCCONSAL, loadingFNCCONSAL} = useFNCCONSAL();
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
    if (
      loadingFVCELEVIV ||
      loadingFVCCONVIV ||
      loadingFUCDEPART ||
      loadingFUCMUNICI ||
      loadingFUCTIPTER ||
      loadingFUCBARVER ||
      loadingFUCRESGUA ||
      loadingFUCZONCUI ||
      loadingFNCTIPIDE ||
      loadingFNCOCUPAC ||
      loadingFNCPUEIND ||
      loadingFNCLUNIND ||
      loadingFNCGENERO ||
      loadingFNCELEPER ||
      loadingFNCCONPER ||
      loadingFNCORGANI ||
      loadingFNCDESARM ||
      loadingFNCELESAL ||
      loadingFNCCONSAL
    ) {
    } else {
      // syncFVCELEVIV();
      // syncFVCCONVIV();
      syncFUCDEPART();
      // syncFUCMUNICI();
      // syncFUCTIPTER();
      // syncFUCBARVER();
      // syncFUCRESGUA();
      // syncFUCZONCUI();
      // syncFNCTIPIDE();
      // syncFNCPAREN();
      // syncFNCOCUPAC();
      // syncFNCPUEIND();
      // syncFNCLUNIND();
      // syncFNCGENERO();
      // syncFNCELEPER();
      // syncFNCCONPER();
      // syncFUCPAIS();
      // syncFNCORGANI();
      // syncFNCDESARM();
      // syncFNCELESAL();
      // syncFNCCONSAL();
    }

    //await this.clearPollEntities();
    // this.countEntity();
  }
  function renderRow(
    catalog: string,
    loading: boolean,
    count: number,
    detail: string = '',
  ) {
    return (
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>
          <View>
            <Subheading>{catalog}</Subheading>
            {detail.length > 0 ? <Paragraph>{detail}</Paragraph> : null}
          </View>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          {loading ? 'Cargando..' : count}
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title="Parametrización de información" />
      </Appbar.Header>
      <KeyboardAwareScrollView>
        <Card style={styles.container}>
          <DataTable collapsable={true}>
            <DataTable.Header>
              <DataTable.Title style={styles.titles}>Catalogo</DataTable.Title>
              <DataTable.Title numeric>Registros</DataTable.Title>
            </DataTable.Header>
            {renderRow(
              'FVCELEVIV',
              loadingFVCELEVIV,
              countFVCELEVIV,
              '(Preguntas Nucleo familiar)',
            )}
            {renderRow(
              'FVCCONVIV',
              loadingFVCCONVIV,
              countFVCCONVIV,
              '(Opciones de Respuestas Nucleo familiar)',
            )}
            {renderRow('FUCPAIS (Departamentos)', loadingFUCPAIS, countFUCPAIS)}
            {renderRow(
              'FUCDEPART (Departamentos)',
              loadingFUCDEPART,
              countFUCDEPART,
            )}
            {renderRow(
              'FUCMUNICI (Municipios)',
              loadingFUCMUNICI,
              countFUCMUNICI,
            )}
            {renderRow(
              'FUCTIPTER (tipo territorio)',
              loadingFUCTIPTER,
              countFUCTIPTER,
            )}
            {renderRow(
              'FUCBARVER (centros poblados)',
              loadingFUCBARVER,
              countFUCBARVER,
            )}
            {renderRow(
              'FUCRESGUA (reguardo/c poblado)',
              loadingFUCRESGUA,
              countFUCRESGUA,
            )}
            {renderRow(
              'FUCZONCUI (Zona de cuidado)',
              loadingFUCZONCUI,
              countFUCZONCUI,
            )}
            {renderRow(
              '(FUCZONCUI relación barrios/veredas)',
              loadingFUCZONCUI_FUCBARVER,
              countFUCZONCUI_FUCBARVER,
            )}
            {renderRow(
              'FUCTIPTER_FUCRESGUA',
              loadingFUCTIPTER_FUCRESGUA,
              countFUCTIPTER_FUCRESGUA,
            )}
            {renderRow(
              'FNCTIPIDE (tipo identificacion)',
              loadingFNCTIPIDE,
              countFNCTIPIDE,
            )}
            {renderRow('FNCPAREN (parentezco)', loadingFNCPAREN, countFNCPAREN)}
            {renderRow(
              'FNCOCUPAC (ocupación)',
              loadingFNCOCUPAC,
              countFNCOCUPAC,
            )}
            {renderRow(
              'FNCPUEIND (pueblo indigena)',
              loadingFNCPUEIND,
              countFNCPUEIND,
            )}
            {renderRow(
              'FNCLUNIND (luna indigena)',
              loadingFNCLUNIND,
              countFNCLUNIND,
            )}
            {renderRow('FNCGENERO(genero)', loadingFNCGENERO, countFNCGENERO)}
            {renderRow(
              'FNCELEPER(Person question)',
              loadingFNCELEPER,
              countFNCELEPER,
            )}
            {renderRow(
              'FNCCONPER(Person options)',
              loadingFNCCONPER,
              countFNCCONPER,
            )}
            {renderRow(
              'FNCORGANI(Organizacion)',
              loadingFNCORGANI,
              countFNCORGANI,
            )}
            {renderRow(
              'FNCORGANI(Desarmonia)',
              loadingFNCDESARM,
              countFNCDESARM,
            )}
            {renderRow('FNCELESAL()', loadingFNCELESAL, countFNCELESAL)}
            {renderRow('FNCCONSAL()', loadingFNCCONSAL, countFNCCONSAL)}
          </DataTable>
        </Card>
      </KeyboardAwareScrollView>
      <FAB
        loading={
          loadingFVCELEVIV ||
          loadingFVCCONVIV ||
          loadingFUCDEPART ||
          loadingFUCMUNICI ||
          loadingFUCTIPTER ||
          loadingFUCBARVER ||
          loadingFUCRESGUA ||
          loadingFUCZONCUI ||
          loadingFNCTIPIDE ||
          loadingFNCOCUPAC ||
          loadingFNCPUEIND ||
          loadingFNCLUNIND ||
          loadingFNCGENERO ||
          loadingFNCELEPER ||
          loadingFNCCONPER ||
          loadingFNCORGANI ||
          loadingFNCDESARM ||
          loadingFNCELESAL
        }
        label="Sincronizar Catalogos"
        style={styles.fab}
        icon="arrow-down-circle"
        onPress={() => syncCatalogs()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
  },
  titles: {
    color: 'red',
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  row: {
    marginBottom: 10,
  },
});
export default SyncParametersScreen;
