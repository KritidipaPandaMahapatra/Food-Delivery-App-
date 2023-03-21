import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/FirebaseConfig'
import {colors, navbtn,navbtnin,navbtnout,btn1} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
const UserProfile = ({navigation}) => {
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
useEffect(()=>{
    getUserdata()
},[userloggeduid])
console.log("UserProfile!!",UserData)
const [edit, setEdit] = useState(false);
const [newname, setNewName] = useState('');
const [newaddress, setNewAddress] = useState('');


const updateuser = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid?.uid)
    const doc = await docRef.get();
    if (!doc.empty) {
        if (newname !== '') {
            doc.forEach((doc) => {
                doc.ref.update({
                    name: newname
                })
            })
        }
        if (newaddress !== '') {
            doc.forEach((doc) => {
                doc.ref.update({
                    address: newaddress
                })
            })
        }
        alert('your user data is updated');
        getUserdata();
        setEdit(false);
        setPasswordedit(false);
    }
    else {
        console.log('no user data');
    }
}


const [Passwordedit, setPasswordedit] = useState(false);
const [oldpassword, setOldPassword] = useState('');
const [newpassword, setNewPassword] = useState('');


const updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldpassword);
        return user.reauthenticateWithCredential(cred);
    }
    let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid?.uid)
    let doc = await docRef.get();
    reauthenticate(oldpassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newpassword).then(() => {
            // alert("Password updated!");

            if (!doc.empty) {
                doc.forEach((doc) => {
                    doc.ref.update({
                        password: newpassword
                    })
                })
                alert('your password is updated');
            }
        }).catch((error) => { alert('Server Issue'); });
    }).catch((error) => { alert('Wrong Password'); });
}


const logoutuser = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert('you are logged out');
        navigation.navigate('Login');
    }).catch((error) => {
        // An error happened.
        alert('Server Issue');
    });
}
return (
    <View style={styles.containerout}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <View style={navbtn}>
                <AntDesign name="back" size={24} color="black" style={navbtnin} />
            </View>
        </TouchableOpacity>
        {edit == false && Passwordedit == false && <View style={styles.container}>
            <Text style={styles.head1}>Your Profile</Text>
            <View style={styles.containerin}>
                <Text style={styles.head2}>Name: {UserData ? <Text style={styles.head2in}>
                    {UserData.name}
                </Text> : 'loading'}</Text>

                <Text style={styles.head2}>Email: {UserData ? <Text style={styles.head2in}>
                    {UserData.email}
                </Text> : 'loading'}</Text>

                <Text style={styles.head2}>Phone: {UserData ? <Text style={styles.head2in}>
                    {UserData.phone}
                </Text> : 'loading'}</Text>

                <Text style={styles.head2}>Address: {UserData ? <Text style={styles.head2in}>
                    {UserData.address}
                </Text> : 'loading'}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                setEdit(!edit)
                setPasswordedit(false)
            }}>
                <View style={btn1}>
                    <Text style={styles.btntxt}>Edit Details</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setPasswordedit(!Passwordedit)
                setEdit(false)
            }
            }>
                <View style={btn1}>
                    <Text style={styles.btntxt}>Change Password</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logoutuser()}>
            <View style={btn1}>
                <Text style={styles.btntxt}>Logout</Text>
            </View>
        </TouchableOpacity>

        </View>
        }
        {edit == true &&
            <View style={styles.container}>
                <Text style={styles.head1}>Edit Profile</Text>
                <View style={styles.containerin}>
                    <TextInput style={styles.input} placeholder='Name' onChangeText={(e) => setNewName(e)} />
                    <TextInput style={styles.input} placeholder='Address' onChangeText={(e) => setNewAddress(e)} />
                </View>
                <TouchableOpacity onPress={() => updateuser()}>
                    <View style={btn1}>
                        <Text style={styles.btntxt}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        {Passwordedit == true &&
            <View style={styles.container}>
                <Text style={styles.head1}>Change your Password</Text>
                <View style={styles.containerin}>
                    <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e) => setOldPassword(e)} />
                    <TextInput style={styles.input} placeholder='New Password' onChangeText={(e) => setNewPassword(e)} />
                </View>
                <TouchableOpacity onPress={() => updatepassword()}>
                    <View style={btn1}>
                        <Text style={styles.btntxt}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

    </View>
)
}

export default UserProfile

const styles = StyleSheet.create({
containerout: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    width: '100%',
},
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
},
head1: {
    fontSize: 40,
    fontWeight: '200',
    marginVertical: 20,
    color: colors.text1,
},
containerin: {
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text1,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
},
head2: {
    fontSize: 20,
    fontWeight: '200',
    marginTop: 20,

},
head2in: {
    fontSize: 20,
    fontWeight: '300',
},
inputout: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignSelf: 'center',
    elevation: 20,
},
btntxt: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    padding: 10
},
input: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
}
})