import { StyleSheet, Text, View,ScrollView ,Image,TouchableOpacity, Button} from 'react-native'
import React from 'react'
import {btn1, colors, navbtn,navbtnin,navbtnout, nonveg, veg} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
const ProductScreen = ({navigation,route}) => {
  const data=route.params
  console.log("ProductData-->",data)
  if(route.params==undefined){
    navigation.navigate('Dashboard')
  }
  return (
    <ScrollView style={styles.containerout}>
      <TouchableOpacity style={navbtnout} onPress={()=>navigation.navigate('Dashboard')}>
            <View style={navbtn}>
                <AntDesign name='back' size={25} style={navbtnin}/>
            </View>
        </TouchableOpacity>
        <View style={styles.container1}>
          <View style={styles.s1}>
            <Image source={{uri:data.foodimageurl}} style={styles.cardimagein}/>
          </View>
        </View>
        <View style={styles.s2}>
          <View style={styles.s2in}>
           <Text style={styles.head1}>{data.foodname}</Text>
           <Text style={styles.head2}>&#8377;{data.foodprice}/-</Text>
          </View>
        </View>
        <View style={styles.s3}>
          <View style={styles.s2in}>
           <Text style={styles.head3}>About Food</Text>
           <Text style={styles.head4}>{data.fooddes}</Text>
          </View>
          <View style={styles.s3in}>
          {data.foodtype=='veg'?<Text style={veg}></Text>:<Text style={nonveg}></Text>}
          <Text style={styles.head5}>{data.foodtype}</Text>
        </View>
        </View>
        <View style={styles.btnout}>
          <TouchableOpacity style={styles.btn2}>
            <Text style={styles.btntxt}>Add To Cart</Text>
            {/* <Button title='Add To Cart' style={btn1}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btntxt}>Buy Now</Text>
            {/* <Button title='Buy Now' style={btn1}/> */}
          </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  containerout:{
    flex:1,
   // backgroundColor:'white',
    width:'100%',
},
container1:{
  flex:1,
  backgroundColor:'#fff',
},
s1:{
  width:'100%',
  height:340,
  backgroundColor:'#fff',
  alignItems:'center',
  justifyContent:'center'
},
cardimagein:{
  height:'100%',
  width:'100%'
},
s2:{
  padding:20,
  width:'100%'
},
s2in:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:10
},
head1:{
  fontSize:30,
  fontWeight:'700',
  color:colors.text1,
  width:220,
  marginRight:10
},
head2:{
  fontSize:20,
  fontWeight:'200',
  color:colors.text3
},
s3:{
  flexDirection:'column',
  backgroundColor:colors.text1,
  padding:20,
  borderRadius:20,
  margin:15
},
head3:{
  fontSize:30,
  fontWeight:'300',
  color:colors.col1
},
head4:{
  marginVertical:10,
  fontSize:20,
  fontWeight:'400',
  color:colors.col1
},
s3in:{
  backgroundColor:colors.col1,
  padding:10,
  borderRadius:10,
  width:130,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center'
},
head5:{
  color:colors.text3,
  fontSize:20,
  fontWeight:'200',
  marginLeft:10
},
btnout:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:'100%',
  marginTop:20
},
btn2:{
  width:150,
  height:50,
  backgroundColor:'red',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
  color:colors.col1,
  elevation:10,
  margin:10
},
btntxt:{
  backgroundColor:colors.text1,
  color:colors.col1,
  paddingHorizontal:10,
  paddingVertical:5,
  fontSize:20,
  borderRadius:10,
  width:'90%',
  textAlign:'center'
}
})