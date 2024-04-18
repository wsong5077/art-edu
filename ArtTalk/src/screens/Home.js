import React from 'react'
import {View, Text, Image, ImageBackground} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

const Home = ({navigation}) => {
    return(
        <ScrollView style={{ backgroundColor: '#FFF', flex: 1 }}>

        <ScrollView style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor:"#00a46c",
               height:"18%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
               <Image
                    source={require('../images/1.png')}
                    style={{
                        height:10,
                        width:20,
                        marginTop:10
                    }}
               />
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>
                   <View style={{width:"70%"}}>
                        <Text style={{
                            fontSize:25,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Start an ArtTalk Conversation!</Text>
                   </View>
                 
               </View>
           </View>
           <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:25,
                   maxWidth:350,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}
                   />
                   <Image
                    source={require('../images/3.png')}
                    style={{height:20,width:20}}
                   />
               </View>
            </LinearGradient>


               <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>Recommended Artworks</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"#b1e5d3",
                            width:115,
                            marginTop:5
                        }}>

                        </View>

                   </View>
                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <View style={{
                            backgroundColor:"#00a46c",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>More</Text>
                        </View>
                   </View>
               </View>

            
        
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingBottom: 10 }} // Adjust padding to handle content size
                    >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            height:100,
                            marginTop:220,
                            top:0
                        }}
                    />
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Detailmodule', {
                        artwork: {
                        title: 'Mona Lisa',
                        artist: 'Leonardo Da Vinci',
                        description: 'The Mona Lisa is a world-renowned painting by Leonardo da Vinci and is considered an archetypal masterpiece of the Italian Renaissance. It features a portrait of a woman with an enigmatic expression.',
                        imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
                        }
                    })}                        
                    style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/1.jpeg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Mona Lisa</Text>
                            
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"#b1e5d3",
                            paddingTop:3
                        }}>
                            Leonardo da Vinci
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('Detailmodule', { artwork: { title: 'Starry Night', artist: 'Vincent van Gogh', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' } })}
                        style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/starry.jpg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Starry Night</Text>
                           
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"#b1e5d3",
                            paddingTop:3
                        }}>
                            Vincent van Gogh
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('Detailmodule', { artwork: { title: 'Water Lilies and the Japanese bridge', artist: 'Claude Monet', imageUri: 'https://puam-loris.aws.princeton.edu/loris/y1972-15.jp2/full/!1200,630/0/default.jpg' } })}
                        style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/Monet1.jpg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Water Lilies and the Japanese bridge</Text>
                            
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontWeight:"bold",
                            color:"#b1e5d3",
                            paddingTop:3
                        }}>
                            Claude Monet
                        </Text>
                    </TouchableOpacity>

                </ScrollView>            

                

        <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center",
                   marginTop:-10
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>Featured Artists</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"#b1e5d3",
                            width:115,
                            marginTop:5
                        }}>

                        </View>

                   </View>
                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <View style={{
                            backgroundColor:"#00a46c",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>More</Text>
                        </View>
                   </View>
               </View>

            
        
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingBottom: 10 }} // Adjust padding to handle content size
                    >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            height:100,
                            marginTop:220,
                            top:0
                        }}
                    />
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detailmoduleartist', {
                            artwork: {
                                title: 'Leonardo da Vinci',
                                artist: 'Leonardo da Vinci',
                                description: 'Leonardo da Vinci was an Italian polymath whose areas of interest included invention, painting, sculpting, architecture, science, music, mathematics, engineering, literature, anatomy, geology, astronomy, botany, writing, history, and cartography.',
                                imageUri: 'https://www.worldhistory.org/img/r/p/500x600/12518.jpg?v=1691868603'
                            }
                        })}                             
                        style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/davinci.jpg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Leonardo da Vinci</Text>
                            
                        </View>
                       
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detailmoduleartist', {
                            artwork: {
                                title: 'Vincent van Gogh',
                                artist: 'Vincent van Gogh',
                                description: 'Vincent van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.',
                                imageUri: 'https://hips.hearstapps.com/hmg-prod/images/vincent_van_gogh_self_portrait_painting_musee_dorsay_via_wikimedia_commons_promojpg.jpg'
                            }
                        })}                        
                        style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/images.jpeg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Vincent van Gogh</Text>
                           
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detailmoduleartist', {
                            artwork: {
                                title: 'Claude Monet',
                                artist: 'Claude Monet',
                                description: 'Claude Monet was a founder of French Impressionist painting, and the most consistent and prolific practitioner of the movement\'s philosophy of expressing one\'s perceptions before nature.',
                                imageUri: 'https://www.myartprints.com/kunst/claude_monet/Selbstbildnis-mit-Barett.jpg'
                            }
                        })}                        
                        style={{
                            height:300,
                            elevation:2,
                            backgroundColor:"#FFF",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:200
                        }}
                    >
                        <Image
                            source={require('../images/monet.jpg')}
                            style={{
                                height: 200, // set the height you want
                                width: '100%', // set the width you want
                                resizeMode: 'cover', // or 'contain' if you want to see the whole image without cropping
                              }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Claude Monet</Text>
                            
                        </View>
                        
                    </TouchableOpacity>

                </ScrollView>                    
              
        </ScrollView>
        </ScrollView>

    )
}
export default Home;