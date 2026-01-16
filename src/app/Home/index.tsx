import { View, Image, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';

import { Button }from '@/components/Button'
import {Input } from '@/components/Input'
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]
const ITEMS = [
  {
    id: "1 ",
    status: FilterStatus.DONE,
    descrption: "2 kg de arroz"
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    descrption: "2 kg de açucar"
  },
  {
    id: "3",
    status: FilterStatus.DONE,
    descrption: "2 kg de feiijao"
  },
  {
    id: "4 ",
    status: FilterStatus.DONE,
    descrption: "2 kg de macarrão"
  }
]

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
      <FlatList
      data={ITEMS}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Item data={{status: item.status, description: item.descrption }}
        onRemove={()=> console.log("remove")}
        onStatus={()=> console.log("Troca")}
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
