import React from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import { colors } from '../globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Categories = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.head}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.box}>
                <FontAwesome5 name={'hamburger'} size={24} style={styles.icon}/>
                <Text style={styles.text}>Burger</Text>
            </View>
            <View style={styles.box}>
                <FontAwesome5 name={'pizza-slice'} size={24} style={styles.icon}/>
                <Text style={styles.text}>Burger</Text>
            </View>
            <View style={styles.box}>
                <MaterialCommunityIcons name={'noodles'} size={24} style={styles.icon}/>
                <Text style={styles.text}>Burger</Text>
            </View>
            <View style={styles.box}>
                <FontAwesome5 name={'hamburger'} size={24} style={styles.icon}/>
                <Text style={styles.text}>Burger</Text>
            </View>
            <View style={styles.box}>
                <FontAwesome5 name={'hamburger'} size={24} style={styles.icon}/>
                <Text style={styles.text}>Burger</Text>
            </View>
        </ScrollView>
    </View>
  )
}

export default Categories;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.col1,
        //alignItems:'center',
        width:'90%',
        elevation:10,
        borderRadius:10,
        marginLeft:15
    },
    head:{
        color:colors.text1,
        fontSize:25,
        fontWeight:'300',
        margin:10,
        alignSelf:'center',
        paddingBottom:5,
        borderBottomColor:colors.text1,
        borderBottomWidth:1
    },
    box:{
        backgroundColor:colors.col1,
        elevation:20,
        margin:10,
        padding:8,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    icon:{
        marginRight:10,
        color:colors.text3
    },
    text:{
        color:colors.text3
    }
})