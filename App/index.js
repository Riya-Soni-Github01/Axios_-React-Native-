import React, { useState, useRef, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
const App = (props) => {
  const [data, setData] = useState()
  const [updated, setUpdated] = useState()
  const getData = () => {
    axios
      .get('https://api.schoolhealth.com/api/accessories/list?equipment_id=123', {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWU5YjQ1NTdlYmVmM2ZjM2ZlYTNiOTM5OTliYzk4NGZjYTg2MjA2OGNiYjNlZWM3MGI1YTdiYmNjYjM4NDYzMjU0YjY4NThkNWVlZjM0YjEiLCJpYXQiOjE2NDM5NDk4MzcuNzc3MjU4LCJuYmYiOjE2NDM5NDk4MzcuNzc3MjYsImV4cCI6MTY3NTQ4NTgzNy43MTYzNjEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.j5YEBGMYoKnUx8XwozEfvFPpGCQBr8W9kUviqyLtxOk6OalkQgy4pt8aHaVyzsBUGpWULsP5mvc900PPJFhXB9bmilnmVD-DHbykFRxa2UxKhyFA5IXcgt8vkzArPvTQ3PCF4dWQEqQjIR4nRBlBmboFA9DUBM8DDoFVHRNpOXgMVDOusHImSF9i0VAHVxQ8bJ2UTmPnOuUSb_eDLSIWRPQG5cFV5j2bYDL-FH9KsNhhIK5ohz6OSoECzicr3Z0rpPr-CrmXoGx0qp4jzG8ta0Bgwh3XLJKNt5m0F9duJ3g-hdxT5pMdErg2idFEgsFaY9rLCuTNtb_KUrO9kVtCIAmtEZD5SDSF6sYOALJl9l__OlibDcilw3ZTbZ7iU-RSE5DLKotlUBrfaIw2CG8_btvD4iEc1fnl5e3YgjAJ7PS0PLvf3nnS0uI4VWL5G95e_Equ8Pw2BW0IQXykwIyU9EjU_pxM2wiOu4pM4nAp_z_ZFALpKNxSbxjSguGpcNRNpzpPPslMXsjQ1zAcBEXcBFJMlMY8c9LWAQQoCVxxF37iBF4GYg-CTZpQJei_XN3MvB9ZuxcW7Hj1qV7_-x_H965L_-cGVCTT-7IrBsRcdcL6snOWLbyjbkSXx9m8exsK3TgJI1mzr-Hoe_qzJfMdoSScwfRrv1BWYvLnxH8FQ_A`
          , 'Content-type': `application/json`
        }
      })
      .then((response) => {
        let v = response.data["data"]
        console.log('all data', v)
        console.log('IN LOCAL BRANCH')
        setData(v)
      })
      .catch((error) => console.log(error));

  };
  useEffect(() => { getData() }, [])
  useEffect(() => {
    updated ? props.addData(updated) : null
  }
  )
  const modify = () => {
    if (data) {
      const temp = { ...data }
      Object.keys(temp).map((property) => {
        let temp_1 = data[property]["equipment_model_accessory"]["accessory_type"]["id"]
        let accessory_type = data[property]["equipment_model_accessory"]["accessory_type"]
        temp[property]["accessory_type"] = accessory_type
        delete temp[property]["equipment_model_accessory"]["accessory_type"]
        temp[property]["equipment_model_accessory"]["id"] = temp_1;
      });
      setUpdated(temp)
    }
  }
  return (
    <View style={{ marginTop: 100, alignItems: 'center' }}>
      <Button title='Modify' onPress={() => { modify() }} />
      <Button title='See Data' onPress={() => { console.log('value', props.Data) }} />
    </View>

  )
}
const mapStateToProps = (state) => ({ Data: state.Data });
const mapDispatchToProps = (dispatch) => ({
  addData: (data) => {
    dispatch({
      type: 'addData',
      payload: data
    })
  }
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App)
