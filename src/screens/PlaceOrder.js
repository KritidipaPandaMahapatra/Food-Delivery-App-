import { StyleSheet, Text, TouchableOpacity, View,ScrollView, FlatList } from 'react-native'
import React ,{useEffect,useState} from 'react'
import {colors, hr80, navbtn,navbtnin,btn1} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '../firebase/FirebaseConfig'
const PlaceOrder = ({navigation,route}) => {
    const {cartdata}=route.params
    const [orderdata,setOrderData]=useState([])
    const [totalCost,setTotalCost]=useState('0')
    useEffect(()=>{
      setOrderData(JSON.parse(cartdata))
    },[cartdata])
    console.log("Place Order",orderdata)
    useEffect(()=>{
        if(cartdata!=null){
           const foodprice=JSON.parse(cartdata).cart;
           console.log("cartDATA",foodprice)
          // console.log("CART_",foodprice.data.foodAddonprice);
           let totalfoodprice=0
           foodprice.map((item)=>{
               totalfoodprice=((item.data.foodprice)*(item.quantity))+
               ((item.data.foodAddonprice)*(item.Addonquantity))
               +totalfoodprice;
               console.log("Total price",totalfoodprice)
              setTotalCost(JSON.stringify(totalfoodprice))
           })
          setTotalCost(JSON.stringify(totalfoodprice))
        }
       },[cartdata])
       //---userdata---
       const [userloggeduid,setUserloggeduid]=useState(null)
       const [UserData,setUserData]=useState(null)
       useEffect(()=>{
           const checklogin=()=>{
               firebase.auth().onAuthStateChanged((user)=>{
                   if(user){
                       setUserloggeduid(user)
                   }
                   else{
                       setUserloggeduid(null)
                       //navigation.navigate('login')
                       
                   }
               })
           }
           checklogin()
       },[])
   console.log("userProfile-->",userloggeduid?.uid);
   useEffect(()=>{
   const getUserdata=async()=>{
       const docRef=firebase.firestore().collection(`UserData`).where('uid','==',userloggeduid?.uid)
       console.log("DocRef--->",docRef)
       const doc = await docRef.get()
       if(!doc.empty){
           doc.forEach((doc)=>{
               console.log(doc.data())
               setUserData(doc.data())
           })
       }
           else {
               console.log("No such data")
         //navigation.navigate('Login')
           }
       }
       getUserdata()
   },[userloggeduid])
   console.log("UserProfile!!",UserData)
   const placeNow=()=>{
    const docRef=firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString())
    docRef.set({
        orderid:docRef.id,
        orderdata:orderdata.cart,
        orderstatus:'pending',
        ordercost:totalCost,
        orderdata:firebase.firestore.FieldValue.serverTimestamp(),
        orderaddress:UserData.address,
        orderphone:UserData.phone,
        ordername:UserData.name,
        orderuseruid:userloggeduid?.uid,
        orderpayment:'online',
        paymenttotal:'paid'
    }).then(()=>{
        alert('order placed')
    })  
}
    return (
    <ScrollView style={styles.containerout}>
        <TouchableOpacity onPress={()=>navigation.navigate('DashBoard')}>
        <View style={navbtn}>
        <AntDesign name={'back'} size={25} style={navbtnin}/>
        </View>
        </TouchableOpacity>
       <View style={styles.container}>
        <Text style={styles.head1}>Your order summary</Text>
        <FlatList style={styles.c1} data={orderdata.cart} 
        renderItem={({item})=>{
            return(
                <View style={styles.rowout}>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.qty}>{item.quantity}</Text>
                            <Text style={styles.title}>{item.data.foodname}</Text>
                            <Text style={styles.price1}>&#8377;{item.data.foodprice}</Text>
                        </View>
                            <View style={styles.right}>
                                <Text style={styles.totalprice}>&#8377;{(item.quantity)*(item.data.foodprice)}</Text>
                            </View>
                    </View>
                    {item.Addonquantity>0 &&
                    <View style={styles.row}>
                    <View style={styles.left}>
                            <Text style={styles.qty}>{item.Addonquantity}</Text>
                            <Text style={styles.title}>{item.data.foodAddon}</Text>
                            <Text style={styles.price1}>&#8377;{item.data.foodAddonprice}</Text>
                     </View>
                        <View style={styles.right}>
                                <Text style={styles.totalprice}>&#8377;{(item.Addonquantity)*(item.data.foodAddonprice)}</Text>
                            </View>
                        <View>
                            
                        </View>
                    </View>
                    }
                </View>
            )
        }}/>
        <View style={hr80}></View>
        <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Order Total:</Text>
            </View>
            <View style={styles.left}>
            <Text style={styles.totalprice}>&#8377;{totalCost}</Text> 
            </View>
        </View>
        <View style={hr80}></View>
        <View style={styles.userdataout}>
            <Text style={styles.head1}>Your Details</Text>
            <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{UserData?.name}</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{UserData?.email}</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{UserData?.phone}</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{UserData?.address}</Text>
            </View>
            </View>
        </View>
        <View style={hr80}></View>
        <View>
            <TouchableOpacity style={btn1}>
                <Text style={styles.btntext} onPress={()=>placeNow()}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>
       </View>
    </ScrollView>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center'
    },
    head1:{
        fontSize:30,
        fontWeight:'200',
        color:colors.text1,
        margin:10,
        textAlign:'center'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
        justifyContent:'space-between'
    },
    rowout:{
        flexDirection:'column',
        margin:10,
        elevation:10,
        backgroundColor:colors.col1,
        padding:10,
        borderRadius:10
    },
    left:{
        flexDirection:'row',
        alignItems:'center'
    },
    right:{
        flexDirection:'row',
        alignItems:'center'
    },
    qty:{
        width:40,
        height:30,
        backgroundColor:colors.text1,
        borderRadius:10,
        textAlign:'center',
        textAlignVertical:'center',
        marginRight:10,
        color:colors.col1,
        fontSize:17,
        fontWeight:'bold'
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
        marginRight:10
    },
    price1:{
        fontSize:17,
        fontWeight:'bold',
        marginRight:10,
        color:colors.text1
    },
    totalprice:{
        fontSize:17,
        fontWeight:'bold',
        borderColor:colors.text1,
        borderWidth:1,
        borderRadius:10
    },
    btntext:{
        fontSize:20,
        fontWeight:'bold',
        color:colors.col1,
        margin:10
    }
})