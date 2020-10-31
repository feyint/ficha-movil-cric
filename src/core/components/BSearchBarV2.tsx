import React from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Image} from 'react-native';

const App = (props: any) => {
  const {placeholder, onChange} = props;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          {/* <Image
            source={{
              uri:
                'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png',
            }}
            style={styles.imageStyle}
          /> */}
          <Image
            source={{
              uri:
                'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            style={{flex: 1}}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            onChangeText={onChange}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});

export default App;
