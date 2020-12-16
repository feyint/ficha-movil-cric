/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Appbar, Paragraph, Text, withTheme} from 'react-native-paper';
import {useSYNC} from '../hooks';

const SyncScreen = () => {
  const {getAllforSync, countToSync} = useSYNC();
  useEffect(() => {
    forSync();
  }, []);
  async function forSync() {
    await getAllforSync();
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Sincronización de información" />
      </Appbar.Header>
      <Paragraph>Modulo de sincronización de fichas</Paragraph>
      <Text>Fichas por sincronizar: {countToSync}</Text>
    </View>
  );
};

export default withTheme(SyncScreen);
