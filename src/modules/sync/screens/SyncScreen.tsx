/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Card,
  DataTable,
  FAB,
  Paragraph,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {useSYNC} from '../hooks';
import {FububivivListSync} from '../models/FububivivListSync';
import SyncService from '../service/SyncService';

const SyncScreen = () => {
  const {
    countFububivivToSync,
    countFnbnucvivToSync,
    countFnbnucvivFvcconvivToSync,
    countFnbnucvivFncpersonToSync,
    countFncpersonToSync,
    countFnbinfsalsonToSync,
    getAllCountForSync,
    getObjectToSync,
    resetSync,
  } = useSYNC();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    forSync();
  }, []);
  async function forSync() {
    await getAllCountForSync();
  }
  async function sync() {
    setIsLoading(true);
    try {
      const fububivivListSync: FububivivListSync = await getObjectToSync();
      console.log(JSON.stringify(fububivivListSync));
      const result = await new SyncService().sendPackageToSincronize(
        fububivivListSync,
      );
      console.log(JSON.stringify(result));
    } catch (e) {}
    Alert.alert('Sincronización exitosa ', 'La sincronización ha finalizado');
    resetSync();
    setIsLoading(false);
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
    <View>
      <Appbar.Header>
        <Appbar.Content title="Sincronización de información" />
      </Appbar.Header>
      <Card style={styles.container}>
        <DataTable collapsable={true}>
          <DataTable.Header>
            <DataTable.Title>Catálogo</DataTable.Title>
            <DataTable.Title numeric>Cantidad por sincronizar</DataTable.Title>
          </DataTable.Header>
          {renderRow('FUBUBIVIV', loading, countFububivivToSync)}
          {renderRow('FNBNUCVIV', loading, countFnbnucvivToSync)}
          {renderRow(
            'FNBNUCVIV_FVCCONVIV',
            loading,
            countFnbnucvivFvcconvivToSync,
          )}
          {renderRow(
            'FNBNUCVIV_FNCPERSON',
            loading,
            countFnbnucvivFncpersonToSync,
          )}
          {renderRow('FNCPERSON', loading, countFncpersonToSync)}
          {renderRow('FNBINFSAL', loading, countFnbinfsalsonToSync)}
        </DataTable>
      </Card>
      <FAB
        loading={loading}
        label="Sincronizar"
        style={styles.fab}
        icon="arrow-up-circle"
        onPress={() => sync()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
    height: '70%',
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
export default withTheme(SyncScreen);
