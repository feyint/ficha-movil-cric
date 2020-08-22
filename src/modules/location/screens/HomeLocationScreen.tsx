import React, {Component, Fragment} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from './components';

interface FormData {
  //FamiliaryNucleus: number;
  //Department: String;
}
class HomeLocationScreen extends Component<any, any> {
  render() {
    return (
      <Fragment>
        <BHeader>1. Ubicacion de la vivienda</BHeader>
        <Department />
        <CareZone />
        <FamiliarNucleus />
        <SafeForm />
      </Fragment>
    );
  }
}
export default HomeLocationScreen;
