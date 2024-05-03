import React, {useState} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const artworks = [
    {
      title: 'Mona Lisa',
      artist: 'Leonardo Da Vinci',
      description: 'The Mona Lisa is a world-renowned painting by Leonardo da Vinci and is considered an archetypal masterpiece of the Italian Renaissance. It features a portrait of a woman with an enigmatic expression.',
      localImage: 'monalisa',
      imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
    },
    {
        title: 'Starry Night',
        artist: 'Vincent van Gogh',
        description: 'Starry Night is one of Vincent van Gogh\'s most famous works and depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an idealized village.',
        localImage: 'starry',
        imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
    },
    {
        title: 'Water Lilies and the Japanese Bridge',
        artist: 'Claude Monet',
        description: 'Water Lilies and Japanese Bridge represents two of Monet\'s greatest achievements: his gardens at Giverny and the paintings they inspired. Monet painted the subject in 1899 and it became a continuous focus for him thereafter.',
        localImage: 'lilly',
        imageUri: 'https://puam-loris.aws.princeton.edu/loris/y1972-15.jp2/full/!1200,630/0/default.jpg'
    },
    {
        title: 'Claude Monet',
        artist: 'Claude Monet',
        description: 'Claude Monet was a founder of French Impressionist painting, and the most consistent and prolific practitioner of the movement\'s philosophy of expressing one\'s perceptions before nature.',
        localImage: 'monet',
        imageUri: 'https://www.myartprints.com/kunst/claude_monet/Selbstbildnis-mit-Barett.jpg'
    },
    {
        title: 'Vincent van Gogh',
        artist: 'Vincent van Gogh',
        description: 'Vincent van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.',
        localImage: 'van',
        imageUri: 'https://hips.hearstapps.com/hmg-prod/images/vincent_van_gogh_self_portrait_painting_musee_dorsay_via_wikimedia_commons_promojpg.jpg'
    },
    {
        title: 'Leonardo da Vinci',
        artist: 'Leonardo da Vinci',
        description: 'Leonardo da Vinci was an Italian polymath whose areas of interest included invention, painting, sculpting, architecture, science, music, mathematics, engineering, literature, anatomy, geology, astronomy, botany, writing, history, and cartography.',
        localImage: 'vinci',
        imageUri: 'https://www.worldhistory.org/img/r/p/500x600/12518.jpg?v=1691868603'
    }
    
  ];
  

const Home = ({navigation}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [viewAll, setViewAll] = useState(null); // null, 'artworks', 'artists'


    const handleSearch = () => {
        const filteredData = artworks.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArtworks(filteredData);
        setShowResults(true); // Show results when search icon is clicked
    };

    const handleViewAll = (type) => {
        setViewAll(type);
        setShowResults(false);
    };

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
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                        onSubmitEditing={handleSearch}
                   />
                   <TouchableOpacity onPress={handleSearch}>
                        <Image
                            source={require('../images/3.png')}
                            style={{height:20,width:20}}
                        />
                   </TouchableOpacity>
                   
               </View>
                    {showResults ? (
                <FlatList
                style={styles.resultList}
                data={filteredArtworks}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => {
                    setShowResults(false);
                    navigation.navigate('Detailmodule', { artwork: item });
                    }}>
                    <Text style={styles.itemText}>{item.title} - {item.artist}</Text>
                    </TouchableOpacity>
                )}
                />
            ) : (
                <View style={styles.otherContent}>
                
                </View>
            )}
  


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
                            <TouchableOpacity onPress={() => handleViewAll('artworks')}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>More</Text>
                            </TouchableOpacity>
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
                        localImage: 'monalisa',
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
                            source={require('../images/monalisa.jpg')}
                            style={{
                                height: 200, 
                                width: '100%',
                                resizeMode: 'cover', 
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
                            onPress={() => navigation.navigate('Detailmodule', {
                                artwork: {
                                    title: 'Starry Night',
                                    artist: 'Vincent van Gogh',
                                    description: 'Starry Night is one of Vincent van Gogh\'s most famous works and depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an idealized village.',
                                    localImage: 'starry',
                                    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
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
                            source={require('../images/starry.jpg')}
                            style={{
                                height: 200, 
                                width: '100%',
                                resizeMode: 'cover', 
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
                        onPress={() => navigation.navigate('Detailmodule', {
                            artwork: {
                                title: 'Water Lilies and the Japanese Bridge',
                                artist: 'Claude Monet',
                                description: 'Water Lilies and Japanese Bridge represents two of Monet\'s greatest achievements: his gardens at Giverny and the paintings they inspired. Monet painted the subject in 1899 and it became a continuous focus for him thereafter.',
                                localImage: 'lilly',
                                imageUri: 'https://puam-loris.aws.princeton.edu/loris/y1972-15.jp2/full/!1200,630/0/default.jpg'
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
                            source={require('../images/Monet1.jpg')}
                            style={{
                                height: 200, 
                                width: '100%', 
                                resizeMode: 'cover', 
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
                            <TouchableOpacity onPress={() => handleViewAll('artworks')}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>More</Text>
                            </TouchableOpacity>
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
                                localImage: 'vinci',
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
                                height: 200, 
                                width: '100%', 
                                resizeMode: 'cover', 
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
                                localImage: 'van',
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
                            source={require('../images/van.jpeg')}
                            style={{
                                height: 200, 
                                width: '100%', 
                                resizeMode: 'cover', 
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
                                localImage: 'monet',
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
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
    flex: 1
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
    zIndex: 1,  // Ensures that the search bar is above the results list if they overlap
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#FFF', // Ensures the item has a white background
  },
  itemText: {
    fontSize: 16,
  },
  resultList: {
    position: 'absolute', 
    top: 60,  
    left: 0,  
    right: 0, 
    backgroundColor: '#f8f8f8',  
    borderColor: '#ccc',  
    borderWidth: 1,
    borderRadius: 5,  
    maxHeight: 300,  
    zIndex: 2,  
  },
});

  
  export default Home;