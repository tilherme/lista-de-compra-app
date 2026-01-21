import { View, Image, TouchableOpacity, Text, ScrollView, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Button }from '@/components/Button'
import {Input } from '@/components/Input'
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/item';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorange';


const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

export function Home() {
const [items, setItems] = useState<ItemStorage[]>([])
const [filter, setFilter]= useState(FilterStatus.PENDING)
const [ description, setDescription] = useState("")

async function handleAdd(){
  if (!description.trim()){
    return Alert.alert("Adicionar", "Adicione uma descrição")
  }
  const newItem = {
    id: Math.random().toString(36).substring(2),
    description,
    status: FilterStatus.PENDING
  }
  await itemsStorage.add(newItem)
  await itemByStatus()   

  setFilter(FilterStatus.PENDING)
  Alert.alert("Adicionado", `Adicionado ${description}`)
  setDescription("")
}

async function itemByStatus() {
  try {
    const response = await itemsStorage.getByStatus(filter)
    setItems(response)
  }catch(error){
    console.log(error)
    Alert.alert("Erro", "Não foi possivel filtrar items")
  }
  
}
async function handleRemove(id:string) {
  try {
    await itemsStorage.remove(id)
    await itemByStatus()
    
  } catch (error) {
    console.log(error)
    Alert.alert("Remover", "Não foi possivel remover esse item")
  }
  
}
function handleClear(){
  Alert.alert("Limpar", "Deseja remover todos os itema?", [
    {
      text: "Não", style: "cancel"
    },
    { 
      text: "Sim", onPress:() => onClear()
     }
  ])
}

async function onClear() {
  try {
    await itemsStorage.clear()
    setItems([])
  } catch (error) {
    console.log(error)
    Alert.alert("Erro", "Não foi possivel")  
  } 
}

async function handleToogleStatus(id: string) {
  try {
    await itemsStorage.toogleStatus(id)
    await itemByStatus()
  } catch (error) {
    Alert.alert("Erro", "Não foi possivel mudar o status")
    
  }
  
}

useEffect(()=>{
  itemByStatus()
},[filter])

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'
        onChangeText={setDescription}
        value={description}/>
        <Button title='Adicionar' onPress={handleAdd}/>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          { FILTER_STATUS.map((status)=> (
          <Filter key={status} status={status} isActive ={status === filter}
          onPress={() => setFilter(status)}
          />
          )
          )}
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      <FlatList
      data={items}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Item data={item}
        onRemove={()=> handleRemove(item.id)}
        onStatus={()=> handleToogleStatus(item.id)}
        />
      )}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={ styles.separator}
      />}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={() =>(
        <Text style={styles.empty}>nenhum item aqui</Text>
      )}
      />
      </View>

    </View>
  );
}
