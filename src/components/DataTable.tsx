import React, { useEffect, useState  } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
 Dimensions

} from "react-native";
import { BarChart } from 'react-native-chart-kit';
import TableDetails from "./TableDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { colors } from "react-native-elements";

function DataTable() {
  const [show, setShow] = useState(false);
  const [entrate, setEntrate] = useState("");
  const [uscite, setUscite] = useState("");
  const [numberMPS, onChangeNumberMPS] = React.useState("");
  const [Saldi, setSaldi] = React.useState([]);
  const [numberSpark, onChangeNumberSpark] = React.useState("");
  const [numberUscite, onChangeUscite] = React.useState("");
  const [isEditableMPS, setIsEditableMPS] = useState(false);
  const [isEditableSpark, setIsEditableSpark] = useState(false);
  const [isEditableUscite, setIsEditableUscite] = useState(false);
   
  let sum = Saldi.reduce(function(prev, current) {
    return prev + +current.saldo
  }, 0);
  let minus =  entrate - uscite;
  let finalValue =  sum - uscite;
  console.log(finalValue);
  console.log(minus);
 
    async function getDataBalances() {
        const email = await AsyncStorage.getItem("email2");
        const password = await AsyncStorage.getItem("password");
        const token = await AsyncStorage.getItem("token");
        const company = await AsyncStorage.getItem("company");
        console.log("token : " + token + " " + "company : " + company);
        axios
          .post("https://cashflow.albasoftsolutions.it/api/balances/getData", {
            email: email,
            db: company,
            password : password,
            token: token,
          })
          .then(
            (res) => (
                setSaldi(res.data.saldi)
                
                // setUscite(res.data.bilancio.uscite)
            )
          )
          .catch((err) => console.info(err));
      }

 
  
  async function getDataSoldi() {
    const email = await AsyncStorage.getItem("email2");
    const token = await AsyncStorage.getItem("token");
    const company = await AsyncStorage.getItem("company");

    console.log("token : " + token + " " + "company : " + company);
    axios
      .post("https://cashflow.albasoftsolutions.it/api/amounts/getData", {
        email: email,
        db: company,
        token: token,
        daData: "2022-07-25",
        aData: "2022-07-31",
      })
      .then(
        (res) => (
          setEntrate(res.data.bilancio.entrate),
          setUscite(res.data.bilancio.uscite)
        )
      )
      .catch((err) => console.info(err));
  }
  
  useEffect(() => {
    getDataSoldi();
    getDataBalances();
  }, []);
  return (
    <ScrollView>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            setShow(!show);
          }}
        >
          <View
            style={{
              height: 800,
              backgroundColor: "rgba(52, 52, 52, 0.9)",
              justifyContent: "center",
            }}
          >
            <View>
              <TableDetails />
            </View>
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  width: 80,
                  borderRadius: 10,
                }}
                onPress={() => setShow(!show)}
              >
                <Text>Close x</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
        <View
            style={{ flexDirection: "row", marginLeft:14, }}
          >
            <View style={{ padding: 10 ,fontWeight: 200, }}>
              <Text style={{fontSize: 16,
    fontWeight: "bold"}} >Saldi odierni</Text>
            </View>
          </View>
        <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ padding: 10 }}>
              <Text>Name c/c :</Text>
            </View>
            <View style={{ padding: 10 }}>
                 
              <Text>Saldo c/c</Text>
            </View>
          </View>
        
        {Saldi.map((item , index) => {
            return (
                <>
                  <View style={styles.container12}  key={index}   >
                  <View
              style={[{padding: 10,  paddingLeft: 14, backgroundColor: index == "1" ? '#ffff' : '#f8f9fa' }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.descrizione}</Text>
                  <Text style={{color:"green"}} >{item.saldo}</Text>
              </View>
            </View>
            </View>
                </>
            )
        } )}
        <View style={styles.container} >
        <View style={{ backgroundColor: "#ffff", padding: 10 }}>  
          <View
              style={{ flexDirection: "row", justifyContent: "space-between" }} >
              <Text>Totale</Text>
              <Text style={{color:"green"}}>{sum},00</Text>
            </View>
            </View>
            </View>
      
    
        
       


        <View>
          <View
            style={{ flexDirection: "row", marginLeft:14, }}
          >
            <View style={{ padding: 10  }}>
              <Text style={{fontSize: 16,
    fontWeight: "bold"}} >Preview fine mese</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View
              style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                paddingLeft: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Disponibilita</Text>
                  <Text style={{color:"green"}} >{sum},00</Text>
              </View>
            </View>
            <View style={{ padding: 10, paddingLeft: 20  }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                  <Text>Entrate</Text>
                <Text style={{color:"blue"}}>{!entrate && "00.0" } </Text>  
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                paddingLeft: 20,
               
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Uscite</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Text style={{color:"blue"}} >{uscite}</Text> */}
                  <Text style={{color:"blue"}} >{uscite}</Text>
                </View>
              </View>
            </View>
            <View style={{ padding: 10, paddingLeft: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Totale </Text>
                </View>
               <Text style={{color:"red"}} >{minus}</Text>
              </View>
            </View>
            <View style={{ padding: 10, paddingLeft: 20 , backgroundColor: "#f8f9fa" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Fido di cassa</Text>
                </View>
               <Text style={{color:"blue"}} >0,00</Text>
              </View>
            </View>
            <View style={{ padding: 10, paddingLeft: 20 , backgroundColor: "#ffff" }}>
              <View
                style={{    
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Saldo finale</Text>
                </View>
               <Text style={{color:"red"}} >{finalValue},00</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            width: 150,
            borderRadius: 5,
            backgroundColor: "white",
          }}
          onPress={() => setShow(true)}>
          <View>
            <Text>Open Table Details</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      <View>
            {/* <View>
                <Text style={{ padding: 10 }}>Data Visualization :</Text>
            </View> */}
            {/* <View style={styles.container12}>
                <BarChart data={{
                    labels: ['2019', '2020'],
                    datasets: [
                        {
                            data: [parseInt(finalValue) , parseInt(sum) , parseInt(minus) ],
                            colors: [
                                (opacity = 1 ) => `#BE95FF`,
                            ]  
                        },
                    ],
                }}

                    width={Dimensions.get('window').width-10}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor:"white",
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View> */}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container12: {
      margin: 0,
      padding: 5,
      lineHeight: 5,
      borderRadius: 5,
      flexDirection: "column",
  
    },
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "column",
  },
  Table: { borderTopWidth: 2, marginTop: 20, borderColor: "#f8f9fD" },
  Title: { fontWeight: "bold" },
  TouchButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "space-between",
    borderColor: "#f8f9fa",
  },
  NumberInput: {
    fontSize: 16,
  },
  head: { height: 40 },
  wrapper: { flexDirection: "row" },
  title: { flex: 1 },
  row: { height: 28, borderTopWidth: 1 },
});

export default DataTable;
