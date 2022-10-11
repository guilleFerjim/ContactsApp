import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import * as Contacts from'expo-contacts';

export default function App() {
  
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(      
        { fields: [Contacts.Fields.PhoneNumbers] }    
      );
      if (data.length > 0){
        setContacts(data);
      }   
      console.log(data);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data = {contacts}
        renderItem={({item}) =>
          <View>
            {item.phoneNumbers && (<Text>{item.name}, {item.phoneNumbers[0].number}</Text>)}
          </View>
        } 
          
      />
      <Button style={{marginBotton: 20}} title='Show Contact numbers' onPress={getContacts}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
