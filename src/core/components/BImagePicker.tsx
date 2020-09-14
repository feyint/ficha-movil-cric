import React, { Component } from 'react';
import { HelperText } from 'react-native-paper';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

interface Props {
    value?: string;
    label?: string;
    errorText?: string;
    error?: boolean;
    onBlur?: any;
    onChange?: any;
    onLoad?: any;
}

interface State {
    images: any[];
    modal: boolean;
}

class BImagePicker extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            images: [],
            modal: false
        };
    }

    UNSAFE_componentWillMount() {
        console.log('Init BImagePicker');
    }

    _takePhoto = () => {
        const options = {
            title: 'Seleccionar imagen',
            storageOptions: {
                skipBackup: true,
                path: 'mortalidad'
            }
        }
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response=', response.path);
            console.log('Uri=', response.uri);
            if (response.didCancel) {
                console.log("User cancelled image picker");
                this.setState({ modal: false });
            } else if (response.error) {
                console.log("Image Picker Error", response.error);
            } else {
                const path = `file:///${response.path}`;
                const type = "image/jpg";
                const name = response.fileName;
                const source = { path, type, name };
                console.log('Camera: ', source)
                this.state.images.push(source);
                this.setState({ images: this.state.images });
                this.setState({ modal: false });
            }
        })
    }

    _uploadImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'mortalidad'
            }
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response=', response);
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("Image Picker Error", response.error);
            } else {
                const path = `file:///${response.path}`
                const type = "image/jpg"
                const name = response.fileName
                const source = { path, type, name }
                console.log('ImageLibrary: ', source)
                this.state.images.push(source);
                this.setState({ images: this.state.images });
                this.setState({ modal: false });
            }
        })
    }

    renderLabel = () => {
        return (
            <View>
                <Text>
                    {this.props.label ? this.props.label : 'Cargar imagen'}
                </Text>
            </View>
        );
    }

    itemSeparator = () => { return this.horizontalSeparator() }

    horizontalSeparator() {
        return (
            <View style={stylesSeparator.separatorHorizontal} />
        );
    }

    Image(image: any) {
        console.log('Image: ', image);
        return (
            <View style={stylesDisplayImages.container}>
                <View>
                    <Image style={stylesDisplayImages.cover}
                        source={{ uri: image.path }} />
                </View>
                <View style={stylesDisplayImages.delete}>
                    <Button color="red" icon="trash-can-outline" mode="text" onPress={() => console.log('Delete')}>
                    </Button>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View>
                    {this.renderLabel()}
                    <Button icon="upload" style={styles.buttonUpload} labelStyle={styles.text} mode="outlined" onPress={() => this.setState({ modal: true })}>
                        Adjuntar
                    </Button>

                    <FlatList
                        horizontal
                        ItemSeparatorComponent={this.itemSeparator}
                        data={this.state.images}
                        renderItem={({ item }) => this.Image(item)} />

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modal}
                        onRequestClose={() => { this.setState({ modal: false }) }}>

                        <View style={styles.modalView}>
                            <View style={styles.buttonModalView}>
                                <Button icon="camera" style={styles.input} mode="contained" onPress={() => this._takePhoto()}>
                                    Camara
                                </Button>

                                <Button icon="folder-image" style={styles.input} mode="contained" onPress={() => this._uploadImage()}>
                                    Galería
                                </Button>
                            </View>
                            <Button icon="cancel" style={styles.input} mode="contained" onPress={() => this.setState({ modal: false })}>
                                Cancelar
                            </Button>
                        </View>
                    </Modal>
                </View>
                {
                    this.props.error ? (
                        <HelperText type="error">
                            {this.props.errorText ? this.props.errorText : 'Campo invalido'}
                        </HelperText>
                    ) : null
                }
            </View >
        );
    }
}

const stylesSeparator = StyleSheet.create({
    separatorHorizontal: {
        flex: 1,
        marginHorizontal: 5,
        borderTopColor: 'red'
    }
})

const stylesDisplayImages = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    cover: {
        height: 150,
        width: 100,
        resizeMode: 'contain'
    },
    delete: {
        position: 'absolute',
        left: 0,
        top: 0,
        paddingVertical: 5,
        paddingHorizontal: 7
    },
});

const styles = StyleSheet.create({
    input: {
        margin: 6,
    },
    buttonModalView: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        backgroundColor: 'white',

    },
    modalView: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        height: 120,
    },
    buttonUpload: {
        width: '100%',
        marginBottom: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },

});

export default BImagePicker;
