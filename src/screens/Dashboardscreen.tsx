import React from 'react';
import { View, TouchableOpacity, Text , ScrollView } from 'react-native';
import DataVisualization from '../components/DataVisualization';
import DataTable from '../components/DataTable';
import { AntDesign } from '@expo/vector-icons';


function DashboardScreen() {
    return (
        <ScrollView>
        <View style={{ paddingTop: 20, flexDirection: 'column' }}>
            <View>
                <DataTable />
            </View>
            <View>
                {/* <DataVisualization /> */}
            </View>
            <View>
                <TouchableOpacity >
                    <View style={{ backgroundColor: 'white', width: 125, padding: 10, margin: 10, flexDirection: 'row', borderRadius: 5 }}>
                        <Text>Aggiorna i dati</Text>
                        <AntDesign name='reload1' size={15} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}
export default DashboardScreen;