import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {db} from "../../firebase";
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import { Button, Input, LinearProgress} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';



const FriendsPage = () => {
    
    const [friends,setFriends]= useState([]);
    const [modalVisible, setVisible] = useState(false)
    const navigation = useNavigation();
    const [friendUN, setFriendUN] = useState('');

    const fetchFriends = () => {
        db
        .collection('friend_test')
        .onSnapshot(querySnap => {
            setFriends([]);
            querySnap.docs.forEach( doc => {
                    setFriends(friends => friends.concat(doc.data()));
                    //console.log(habits);
            });
        });
    }

    const addFriendToUser = (userUID, friendUID, friendName, friendUsername) => {
        db.collection(userUID).doc('friends list')
        .collection('friends collection')
        .doc(friendUID)
        .set({
            subtitle: friendUsername, 
            icon: 'user', 
            name: friendName
        })
    };

    const getUserProfileFromUID = async(uid) => {
        console.log(uid);
        const profile = (await db.collection(uid).doc('user profile').get()).data();
        console.log(profile);
        return profile;
    };

    /**
     * Adds friends information to current user
     */
    const searchAndAddFriend = () => {
        const temp = db.collection('users').doc(friendUN).get()         
        .then((docsnap) => {
            if(docsnap.exists){
                const friendUID = docsnap.data().uid;
                getUserProfileFromUID(friendUID).then((profile) => {
                    const friendName = profile.FirstName + ' ' + profile.lastName;
                    addFriendToUser(auth.currentUser.uid, friendUID, friendName, friendUN);
                    console.log('here: ' + profile.FirstName);
                })
            }
            
        })
        .catch(error => 
            alert(error.message)) ;
    }

    useEffect(() => {
        fetchFriends();
      }, [])

    if(friends[0] == undefined){
        return null
    }

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="long-arrow-left"
                                size={35}
                                color="white"
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#2e2d2d',
                            height: 50,
                            width: 70,
                            marginBottom: 60,
                            marginHorizontal: 10,
                                }}

                        onPress={()=>{
                                navigation.navigate('Profile');
                        }}
                    />

                    <Text style={styles.header}>Friends List</Text>
                </View>
                <View style={styles.bottom}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Enter a username</Text>
                                <Input
                                    placeholder='Username'
                                    onChangeText={value => setFriendUN(value)}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setVisible(!modalVisible);
                                        searchAndAddFriend();
                                    }}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                {
                    friends.map((item, i) => (
                        <ListItem key={i} bottomDivider containerStyle={{backgroundColor: '#9c9c9c'}}>
                            <Icon name={item.icon} />
                                <ListItem.Content>
                                <ListItem.Title style={{ color: '#d15a5a'}}>{item.name}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: 'white'}}>{item.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
                    <Button
                        type="solid"
                        icon={
                            <Icon
                                name="plus"
                                size={25}
                                color="black"
                            />
                        }
                        iconRight

                        buttonStyle= {{
                            backgroundColor: '#d15a5a',
                            height: 50,
                            width: 70,
                            alignSelf: 'center',
                            marginTop: 20,
                        }}

                        onPress={() => setVisible(!modalVisible)}
                    />     
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
        flex: 1,
        backgroundColor: '#d15a5a',
        justifyContent: 'flex-end',
    },
    bottom: {
        flex: 3,
        paddingTop: 10,
        backgroundColor: '#2e2d2d',
    },
    overall: {
        backgroundColor: '#2e2d2d',
    },
    header: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 30,
        alignSelf: 'center',
        color: "#2e2d2d"
    },
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    record_buttons: {
        flex: 3,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 5,
        height: 200, 
        width: 300, 
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
    },
    shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default FriendsPage;