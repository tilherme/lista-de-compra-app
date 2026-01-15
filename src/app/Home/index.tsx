import { View, Image, TouchableOpacity, Text } from 'react-native';

import { Button }from '@/components/Button'
import {Input } from '@/components/Input'
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/item';
const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]
export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title='Adicionar' onPress={()=> console.log("ok")}/>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          { FILTER_STATUS.map((status)=> (
          <Filter key={status} status={status} isActive/>
          )
          )}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <Item 
          data={{status: FilterStatus.DONE, description:"Arroz"}}
          onRemove={()=> console.log("remove")}
          onStatus={()=> console.log("muda")}/>
      </View>

    </View>
  );
}
