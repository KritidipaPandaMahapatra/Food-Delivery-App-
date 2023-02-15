import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '../globals/style'
const carouseldata=[
    {
        id:1,
        image:'../assets/delivery.jpg',
    },
    {
        id:2,
        image:'../assets/poff.jpg',
    },
    {
        id:3,
        image:'../assets/tfood.jpg',
    }
]
const OfferSlider = () => {
  return (
    <View>
    <View style={styles.offerSlider}>
      <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true}
      dotColor={colors.text2} activeDotColor={colors.text1}
      nextButton={<Text style={styles.btn}>&gt;</Text>}
      prevButton={<Text style={styles.btn}>&lt;</Text>}
      >
        <View style={styles.slide}>
            <Image source={require('../assets/delivery.jpg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
            <Image source={require('../assets/poff.jpg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
            <Image source={require('../assets/tfood.jpg')} style={styles.image}/>
        </View>
      </Swiper>
    </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerSlider:{
        width:'100%',
        height:180,
        backgroundColor:colors.col1,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    slide:{
        width:'100%',
        height:200,
        backgroundColor:colors.text3,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:20,
    },
    btn:{
        color:colors.text1,
        fontSize:40,
        fontWeight:'500',
        backgroundColor:colors.col1,
        borderRadius:20,
        width:40,
        height:40,
        textAlign:'center',
        lineHeight:40
    },
})