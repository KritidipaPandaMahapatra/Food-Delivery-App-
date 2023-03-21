import { StyleSheet, Text, View,ScrollView ,Image,TouchableOpacity, Button, TextInput} from 'react-native'
import React,{useState} from 'react'
import {indecbtn,indecbtninput,indecout, colors, hr80, navbtn,navbtnin,navbtnout, nonveg, veg} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '../firebase/FirebaseConfig'
const ProductScreen = ({navigation,route}) => {
  const [quantity,setQuantity]=useState('1')
  const [addonquantity,setAddonQuantity]=useState('0')
  const data=route.params
  console.log("ProductData-->",data)
  // if(route.params === undefined){
  //   navigation.navigate('Dashboard')
  // }
  const addToCart=()=>{
    const docRef=firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)
    const data1={data,Addonquantity:addonquantity,quantity:quantity}
    console.log("data1-->",data1)
    docRef.get().then((doc)=>{
      if(doc.exists){
        docRef.update({
          cart:firebase.firestore.FieldValue.arrayUnion(data1)
        })
        alert('Added To Cart')
      }
      else{
        docRef.set({
          cart:[data1],
        })
        alert('Added To Cart')
      }
    })
  }
  const increaseQuantity=()=>{
    setQuantity((parseInt(quantity)+1).toString())
  }
  const decreaseQuantity=()=>{
    if(parseInt(quantity)>1){
    setQuantity((parseInt(quantity)-1).toString())
    }
  }
  const increaseAddonQuantity=()=>{
    setAddonQuantity((parseInt(addonquantity)+1).toString())
  }
  const decreaseAddonQuantity=()=>{
    if(parseInt(quantity)>1){
    setAddonQuantity((parseInt(addonquantity)-1).toString())
    }
  }
  const cartdata = JSON.stringify({ cart: [{ Addonquantity: addonquantity, quantity: quantity, data }] });
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
        <View style={styles.container2}>
          <Text style={styles.txt1}>Location</Text>
          <Text style={styles.txt2}>{data.resname}</Text>
          <View style={styles.container2in}>
          <Text style={styles.txt3}>{data.resaddBuilding}</Text>
          <View style={styles.dash}></View>
          <Text style={styles.txt3}>{data.resaddStreet}</Text>
          <View style={styles.dash}></View>
          <Text style={styles.txt3}>{data.resaddcity}</Text>
          </View>
        </View>

        {data?.foodAddonprice &&
        <View style={styles.container3}>
        <View style={hr80}></View>
        <Text style={styles.txt5}>Add Extra</Text>
        <View style={styles.c3in}>
        <Text style={styles.text4}>{data.foodAddon}</Text>
        <Text style={styles.text4}>  &#8377;{data.foodAddonprice}</Text>
        </View>
        <View style={indecout}>
          <Text style={indecbtn} onPress={()=>increaseAddonQuantity()}>+</Text>
          <TextInput value={addonquantity} style={indecbtninput}/>
          <Text style={indecbtn}onPress={()=>decreaseAddonQuantity()}>-</Text>
        </View>
        </View>
            }
        <View style={styles.container3}>
          <View style={hr80}></View>
        <Text style={styles.txt5}>Food Quantity</Text>
        <View style={indecout}>
          <Text style={indecbtn} onPress={()=>increaseQuantity()}>+</Text>
          <TextInput value={quantity} style={indecbtninput}/>
          <Text style={indecbtn}onPress={()=>decreaseQuantity()}>-</Text>
        </View>
        <View style={hr80}></View>
        </View>

        <View style={styles.container4}>
          <View style={styles.c4in}>
          <Text style={styles.txt2}>Total Price</Text>
          {data.foodAddonprice ?<Text style={styles.txt5}>
            &#8377;{(
            (parseInt(data.foodprice)*parseInt(quantity))+parseInt(addonquantity)*parseInt(data.foodAddonprice)).toString()}
            </Text> 
            :
           <Text style={styles.txt5}>
               &#8377;{(
                parseInt(data.foodprice)*parseInt(quantity)
               ).toString()}/-
            </Text>
               }
          </View>
        </View> 

        <View style={styles.btnout}>
          <TouchableOpacity style={styles.btn2} onPress={()=>addToCart()}>
            <Text style={styles.btntxt}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={()=>navigation.navigate('Place order',{cartdata})}>
          <Text style={styles.btntxt}>Buy Now</Text>
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
  fontSize:25,
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
},
container2:{
  width:'96%',
  color:colors.col1,
  padding:20,
  borderRadius:20,
  alignSelf:'center',
  marginVertical:10,
  elevation:10,
  alignItems:'center'
},
txt1:{
  color:colors.text1,
  fontSize:20,
  fontWeight:'200'
},
txt1:{
  color:colors.text1,
  fontSize:20,
  fontWeight:'200',
  marginVertical:10
},
container2in:{
  flexDirection:'row',
  marginHorizontal:15,
  alignItems:'center'
},
txt3:{
  fontSize:16,
  color:colors.text1,
  width:'30%'
},
dash:{
  width:1,
  height:20,
  backgroundColor:colors.text1,
  marginHorizontal:10
},
container3:{
  width:'90%',
  alignItems:'center',
  alignSelf:'center'
},
txt5:{
  color:colors.text1,
  fontSize:16,
  textAlign:'center'
},
c3in:{
  flexDirection:'row',
  justifyContent:'center',
  width:'100%'
},
text4:{
  color:colors.text3,
  fontSize:20,
  marginHorizontal:10
},
container4:{
  width:'90%',
  alignItems:'center',
  alignSelf:'center'
},
c4in:{
  flexDirection:'row',
  justifyContent:'space-evenly',
  width:'100%',
  alignItems:'center'
}
})