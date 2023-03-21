import { FlatList, StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { veg,nonveg ,colors } from '../globals/style'
export default function CardSlider({title,data,navigation}) {
  //console.log("Fetch Data::--",data)
 const openProductpage=(item)=>{
  console.log("item-->",item)
  navigation.navigate('Product',item)
 }
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>
      <FlatList style={styles.cardout}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({item})=>
      <TouchableOpacity key={item.index} onPress={()=>openProductpage(item)}>
        <View style={styles.card}>
            <View style={styles.s1}>
                <Image source={{uri:item.foodimageurl}} style={styles.cardimage}/>
            </View>
            <View style={styles.s2}>
            <Text style={styles.text1}>{item.foodname}</Text>
            <View style={styles.s2in}>
              <Text style={styles.text2}>Rs.{item.foodprice}</Text>
              {item.foodtype=='veg'?<Text style={veg}></Text>:<Text style={nonveg}></Text>}
            </View>
            </View>
            <View style={styles.s3}>
            <Text style={styles.buybtn}>Buy</Text>
            </View>
        </View>
        </TouchableOpacity>
      }/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
   marginVertical:20
  },
  cardouthead:{
    color:colors.text3,
    width:'90%',
    fontSize:20,
    fontWeight:'300',
    borderRadius:10,
    marginHorizontal:8
  },
  cardout:{
    width:'100%',
    //height:250
  },
  card:{
    width:300,
    height:300,
    margin:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#e8e8e8',
    backgroundColor:colors.col1
  },
  cardimage:{
    width:'100%',
    height:200,
    borderRadius:10,
  },
  s2:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  text1:{
    fontSize:18,
    color:colors.text3,
    marginHorizontal:5,
    width:150
  },
  text2:{
    fontSize:15,
    color:colors.text2,
    marginRight:10
  },
  s2in:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10
  },
  s3:{
    alignItems:'center',
    position:'absolute',
    bottom:1,
    width:'100%'
  },
  buybtn:{
    backgroundColor:colors.text1,
    color:colors.col1,
    paddingHorizontal:10,
    paddingVertical:5,
    fontSize:20,
    borderRadius:10,
    width:'90%',
    textAlign:'center'
  },
})