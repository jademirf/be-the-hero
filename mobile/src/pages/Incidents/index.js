import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text } from 'react-native'

import logoImg from '../../assets/logo.png'

import api from '../../services/api'

import Style from './style'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Incidents () {
    const [incidents, setIncidents] = useState([]) 
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigateToDetail (incident) {
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents () {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total ) {
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={Style.container}>
            <View style={Style.header}>
                <Image source={ logoImg } />
                <Text style={Style.headerText} >
                    Total de <Text source={Style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={Style.title}>Bem vindo!</Text>
            <Text style={Style.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={Style.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={ false }
                renderItem={({ item: incident }) => (
                    <View style={Style.incident}>
                        <Text style={Style.incidentProperty}>ONG:</Text>
                        <Text style={Style.incidentValue}>{incident.name}</Text>

                        <Text style={Style.incidentProperty}>CASO:</Text>
                        <Text style={Style.incidentValue}>{incident.title}</Text>

                        <Text style={Style.incidentProperty}>VALOR:</Text>
                        <Text style={Style.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity 
                        style={ Style.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={Style.detailsButtonText}>
                                Ver mais detalhes
                            </Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}