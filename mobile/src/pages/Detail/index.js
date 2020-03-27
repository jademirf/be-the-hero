import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import Style from './style'

export default function Detail () {
    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}", com o valor de: ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function navigateBack () {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={Style.container}>
            <View style={Style.header}>
                <Image source={ logoImg } />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={ Style.incident}>
                <Text style={[Style.incidentProperty, { marginTop: 0}]}>ONG:</Text>
                <Text style={Style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={Style.incidentProperty}>CASO:</Text>
                <Text style={Style.incidentValue}>{incident.title}</Text>

                <Text style={Style.incidentProperty}>VALOR:</Text>
                <Text style={Style.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

            </View>

            <View style={ Style.contactBox }>
                <Text style={Style.heroTitle}>Salve o dia!</Text>
                <Text style={Style.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={Style.heroDescription}>Entre em contato:</Text>

                <View style={Style.actions}>
                    <TouchableOpacity style={Style.action} onPress={sendWhatsapp}>
                        <Text style={Style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.action} onPress={sendMail}>
                        <Text style={Style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}