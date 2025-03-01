import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Mock data for news items
const newsData = [
  {
    id: '1',
    title: 'खेजड़ी संरक्षण अभियान का शुभारंभ',
    summary: 'बिश्नोई समाज ने खेजड़ी वृक्षों के संरक्षण के लिए एक नया अभियान शुरू किया है जिसका उद्देश्य राजस्थान में 10,000 नए पेड़ लगाना है।',
    date: '15 फरवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=khejri%20trees%20with%20people%20protecting%20them&aspect=4:3&seed=1',
    category: 'पर्यावरण'
  },
  {
    id: '2',
    title: 'बिश्नोई समाज के वार्षिक सम्मेलन की घोषणा',
    summary: 'इस वर्ष का सम्मेलन जोधपुर में 10-12 जून को आयोजित किया जाएगा। इसमें देशभर से 5,000 से अधिक सदस्यों के भाग लेने की उम्मीद है।',
    date: '10 फरवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=bishnoi%20community%20annual%20meeting%20announcement&aspect=4:3&seed=2',
    category: 'समुदाय'
  },
  {
    id: '3',
    title: 'हिरण संरक्षण परियोजना का विस्तार',
    summary: 'काला हिरण संरक्षण परियोजना का विस्तार अब हरियाणा के कुछ हिस्सों में भी किया जा रहा है, जिससे इनके प्राकृतिक आवास का दायरा बढ़ेगा।',
    date: '5 फरवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=black%20buck%20deer%20conservation%20in%20rajasthan&aspect=4:3&seed=3',
    category: 'पर्यावरण'
  },
  {
    id: '4',
    title: 'बिश्नोई युवा नेतृत्व कार्यक्रम की शुरुआत',
    summary: 'समुदाय के युवाओं को नेतृत्व कौशल में प्रशिक्षित करने के लिए एक नया कार्यक्रम शुरू किया गया है जिसमें मेंटरशिप और प्रशिक्षण शामिल है।',
    date: '28 जनवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=bishnoi%20youth%20leadership%20training%20program&aspect=4:3&seed=8',
    category: 'शिक्षा'
  },
  {
    id: '5',
    title: 'जैविक खेती पर आयोजित कार्यशाला सफल',
    summary: 'बिश्नोई कृषि प्रथाओं पर आधारित जैविक खेती कार्यशाला में 200 से अधिक किसानों ने भाग लिया और पारंपरिक तरीकों को सीखा।',
    date: '20 जनवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=organic%20farming%20workshop%20traditional%20methods&aspect=4:3&seed=9',
    category: 'कृषि'
  },
  {
    id: '6',
    title: 'बिश्नोई साहित्य संग्रह का डिजिटलीकरण',
    summary: 'समुदाय के प्राचीन ग्रंथों और साहित्य का डिजिटलीकरण परियोजना शुरू की गई जिससे इन्हें ऑनलाइन संरक्षित और सुलभ बनाया जा सके।',
    date: '15 जनवरी, 2025',
    image: 'https://api.a0.dev/assets/image?text=digitization%20of%20ancient%20bishnoi%20texts%20and%20manuscripts&aspect=4:3&seed=10',
    category: 'संस्कृति'
  },
];

// Filter categories
const categories = [
  { id: 'all', name: 'सभी' },
  { id: 'environment', name: 'पर्यावरण' },
  { id: 'community', name: 'समुदाय' },
  { id: 'culture', name: 'संस्कृति' },
  { id: 'education', name: 'शिक्षा' },
  { id: 'agriculture', name: 'कृषि' },
];

const News = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredNews = newsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'environment' && item.category === 'पर्यावरण') ||
                           (selectedCategory === 'community' && item.category === 'समुदाय') ||
                           (selectedCategory === 'culture' && item.category === 'संस्कृति') ||
                           (selectedCategory === 'education' && item.category === 'शिक्षा') ||
                           (selectedCategory === 'agriculture' && item.category === 'कृषि');
    
    return matchesSearch && matchesCategory;
  });

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSummary} numberOfLines={2}>{item.summary}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>समाचार</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="समाचार खोजें..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === item.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text 
                style={[
                  styles.categoryItemText,
                  selectedCategory === item.id && styles.selectedCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.newsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#46601C" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={48} color="#ccc" />
            <Text style={styles.emptyText}>कोई समाचार नहीं मिला</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0d1',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0d1',
  },
  selectedCategory: {
    backgroundColor: '#46601C',
    borderColor: '#46601C',
  },
  categoryItemText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  newsList: {
    padding: 16,
    paddingTop: 8,
  },
  newsItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: '#f0f0e0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#46601C',
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    marginTop: 12,
    color: '#999',
    fontSize: 16,
  },
});

export default News;