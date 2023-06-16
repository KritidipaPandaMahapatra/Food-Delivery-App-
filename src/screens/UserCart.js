import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, hr80, navbtn, navbtnin, navbtnout} from '../globals/style';
import {firebase} from '../firebase/FirebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomNav from '../components/BottomNav';
export default function UserCart({navigation}) {
  const [cartdata, setCartData] = useState(null);
  const [totalCost, setTotalCost] = useState('0');
  const getCartData = async () => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = JSON.stringify(doc.data());
          // console.log("UserCart",data)
          setCartData(data);
        } else {
          console.log('No Such Documnet');
        }
      })
      .catch(error => {
        console.log('Error getting document');
      });
  };
  useEffect(() => {
    getCartData();
  }, []);
  useEffect(() => {
    if (cartdata != null) {
      const foodprice = JSON.parse(cartdata).cart;
      console.log('cartDATA', foodprice);
      // console.log("CART_",foodprice.data.foodAddonprice);
      let totalfoodprice = 0;
      foodprice.map(item => {
        console.log('CART_', item.data.foodprice);
        totalfoodprice =
          item.data.foodprice * item.quantity +
          item.data.foodAddonprice * item.Addonquantity +
          totalfoodprice;
        console.log('Total price', totalfoodprice);
        //setTotalCost(JSON.stringify(totalfoodprice))
      });
      setTotalCost(JSON.stringify(totalfoodprice));
    }
  }, [cartdata]);
  const deleteItem = item => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCartData();
  };
  return (
    <SafeAreaView style={styles.containerout}>
      <TouchableOpacity
        style={navbtnout}
        onPress={() => navigation.navigate('Dashboard')}>
        <View style={navbtn}>
          <AntDesign name={'back'} size={25} style={navbtnin} />
        </View>
        <View style={styles.container}>
          <Text style={styles.head1}>Your Cart</Text>
          {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? (
            <Text style={styles.head2}>Your Cart is Empty</Text>
          ) : (
            <FlatList
              style={styles.cardlist}
              data={JSON.parse(cartdata).cart}
              renderItem={({item}) => {
                return (
                  <View style={styles.cartcard}>
                    <Image
                      source={{uri: item.data.foodimageurl}}
                      style={styles.cartimg}
                    />
                    <View style={styles.cartcardin}>
                      <View style={styles.c1}>
                        <Text style={styles.text1}>
                          {item.quantity}&nbsp;{item.data.foodname}
                        </Text>
                        <Text style={styles.text2}>
                          &#8377;{item.data.foodprice}/each
                        </Text>
                      </View>
                      {item.Addonquantity > 0 && (
                        <View style={styles.c2}>
                          <Text style={styles.text3}>
                            {item.Addonquantity}&nbsp;{item.data.foodAddon}
                          </Text>
                          <Text style={styles.text3}>
                            &#8377;{item.data.foodAddonprice}/each
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.c4}
                        onPress={() => deleteItem(item)}>
                        <Text style={styles.text1}>Delete</Text>
                        <AntDesign
                          name={'delete'}
                          size={25}
                          style={styles.delete}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.btncont}>
        <View style={styles.c3}>
          <Text style={styles.txt5}>Total</Text>
          <Text style={styles.txt6}>&#8377;{totalCost}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate('Place order', {cartdata})}>
          <Text style={styles.btntxt}>Place order</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.col1,
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  container: {
    // flex:1,
    //backgroundColor:colors.col1,
    alignItems: 'center',
    width: '100%',
  },
  head1: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.text1,
  },
  head2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '300',
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.col1,
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    paddingVertical: '25%',
    borderRadius: 10,
  },
  cardlist: {
    width: '100%',
  },
  cartcard: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    marginVertical: 5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
  },
  cartimg: {
    width: 150,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  cartcardin: {
    flexDirection: 'column',
    margin: 5,
    width: '58%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  c1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.col1,
    // borderRadius:10,
    // padding:5
  },
  c2: {
    backgroundColor: colors.col1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    flexDirection: 'row',
  },
  text1: {
    fontSize: 16,
    color: colors.text1,
    width: '60%',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
    color: colors.text3,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 15,
    color: colors.text1,
  },
  delete: {
    color: colors.text1,
  },
  c4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    borderColor: colors.text1,
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
  },
  btncont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
    marginBottom: 80,
    borderTopColor: colors.text3,
    borderTopWidth: 0.2,
    position: 'absolute',
    bottom: 0,
  },
  btntxt: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
  },
  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt5: {
    fontSize: 20,
    color: colors.text3,
    marginHorizontal: 5,
  },
  txt6: {
    fontSize: 25,
    color: colors.text3,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
});
