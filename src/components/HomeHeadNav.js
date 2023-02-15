import React from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../globals/style'
 const HomeHeadNav = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Entypo name={'menu'} size={24} color='black' style={styles.myicon}/>
        <View style={styles.containerin}>
        <Text style={styles.mytext}>Foodie</Text>
        <MaterialCommunityIcons name={'food-outline'} size={24}  style={styles.myicon}/>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} >
        <FontAwesome5 name="user-circle" size={24} style={styles.myicon}/>
        </TouchableOpacity>
    </View>
  )
}
export default HomeHeadNav
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:colors.col1,
        alignItems:'center',
        elevation:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    containerin:{
        flexDirection:'row',
        alignItems:'center'
    },
    myicon:{
        color:colors.text1
    },
    mytext:{
        fontSize:25,
        color:colors.text1
    },
})