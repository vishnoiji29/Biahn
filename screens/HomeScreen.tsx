import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  RefreshControl,
  StatusBar,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FeatureCard from '../components/FeatureCard';
import NewsCard from '../components/NewsCard';
import UpcomingEventCard from '../components/UpcomingEventCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f5f0" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=Bishnoi%20Samaj%20logo%20with%20khejri%20tree%20and%20deer%20motifs&aspect=1:1&seed=123' }} 
            style={styles.logo} 
          />
          <Text style={styles.headerTitle}>बिश्नोई समाज</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigateToScreen('Notifications')}>
            <MaterialIcons name="notifications-none" size={24} color="#46601C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Profile')} style={styles.profileButton}>
            <MaterialIcons name="person-outline" size={24} color="#46601C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#46601C" />
        }
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=bishnoi%20people%20protecting%20trees%20and%20animals%20in%20traditional%20clothes&aspect=16:9&seed=42' }} 
            style={styles.heroBannerImage} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <Text style={styles.heroTitle}>पर्यावरण रक्षा का 500+ वर्षों का संकल्प</Text>
            <Text style={styles.heroSubtitle}>संस्कृति | समुदाय | संरक्षण</Text>
          </LinearGradient>
        </View>

        {/* Main Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>मुख्य सुविधाएँ</Text>
          <View style={styles.featuresGrid}>
            <FeatureCard 
              title="समाचार" 
              icon="newspaper" 
              color="#e6b558" 
              onPress={() => navigateToScreen('News')} 
            />
            <FeatureCard 
              title="इतिहास" 
              icon="history" 
              color="#7a9e5c" 
              onPress={() => navigateToScreen('History')} 
            />
            <FeatureCard 
              title="ई-पत्रिका" 
              icon="book-open-page-variant" 
              color="#d87f81" 
              onPress={() => navigateToScreen('Magazine')} 
            />
            <FeatureCard 
              title="कार्यक्रम" 
              icon="calendar-month" 
              color="#6c8cbf" 
              onPress={() => navigateToScreen('Events')} 
            />
            <FeatureCard 
              title="पर्यावरण" 
              icon="leaf" 
              color="#46601C" 
              onPress={() => navigateToScreen('Environment')} 
            />
            <FeatureCard 
              title="सदस्य" 
              icon="account-group" 
              color="#9d7abd" 
              onPress={() => navigateToScreen('Directory')} 
            />
            <FeatureCard 
              title="गैलरी" 
              icon="image-multiple" 
              color="#5dbcd2" 
              onPress={() => navigateToScreen('Gallery')} 
            />
            <FeatureCard 
              title="शिक्षा/कार्य" 
              icon="school" 
              color="#e88756" 
              onPress={() => navigateToScreen('Education')} 
            />
          </View>
        </View>

        {/* Recent News */}
        <View style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ताज़ा समाचार</Text>
            <TouchableOpacity onPress={() => navigateToScreen('News')}>
              <Text style={styles.viewAllLink}>सभी देखें</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsScrollContainer}
          >
            <NewsCard 
              title="खेजड़ी संरक्षण अभियान का शुभारंभ"
              date="15 फरवरी, 2025"
              image="https://api.a0.dev/assets/image?text=khejri%20trees%20with%20people%20protecting%20them&aspect=4:3&seed=1"
              onPress={() => navigateToScreen('NewsDetail')}
            />
            <NewsCard 
              title="बिश्नोई समाज के वार्षिक सम्मेलन की घोषणा"
              date="10 फरवरी, 2025"
              image="https://api.a0.dev/assets/image?text=bishnoi%20community%20annual%20meeting%20announcement&aspect=4:3&seed=2"
              onPress={() => navigateToScreen('NewsDetail')}
            />
            <NewsCard 
              title="हिरण संरक्षण परियोजना का विस्तार"
              date="5 फरवरी, 2025"
              image="https://api.a0.dev/assets/image?text=black%20buck%20deer%20conservation%20in%20rajasthan&aspect=4:3&seed=3"
              onPress={() => navigateToScreen('NewsDetail')}
            />
          </ScrollView>
        </View>

        {/* Upcoming Events */}
        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>आगामी कार्यक्रम</Text>
            <TouchableOpacity onPress={() => navigateToScreen('Events')}>
              <Text style={styles.viewAllLink}>सभी देखें</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventsContainer}>
            <UpcomingEventCard 
              title="बिश्नोई सांस्कृतिक महोत्सव"
              date="25 मार्च, 2025"
              location="जोधपुर, राजस्थान"
              image="https://api.a0.dev/assets/image?text=bishnoi%20cultural%20festival%20with%20traditional%20rajasthani%20colors&aspect=16:9&seed=4"
              onPress={() => navigateToScreen('EventDetail')}
            />
            <UpcomingEventCard 
              title="युवा बिश्नोई सम्मेलन"
              date="15 अप्रैल, 2025"
              location="बीकानेर, राजस्थान"
              image="https://api.a0.dev/assets/image?text=young%20bishnoi%20men%20and%20women%20in%20conference&aspect=16:9&seed=5"
              onPress={() => navigateToScreen('EventDetail')}
            />
          </View>
        </View>

        {/* Environmental Initiative */}
        <TouchableOpacity 
          style={styles.environmentalBanner}
          onPress={() => navigateToScreen('EnvironmentDetail')}
        >
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=bishnoi%20tree%20planting%20initiative%20in%20rajasthan&aspect=16:9&seed=6' }} 
            style={styles.environmentalBannerImage} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.environmentalGradient}
          >
            <Text style={styles.environmentalTitle}>हरित राजस्थान पहल</Text>
            <Text style={styles.environmentalSubtitle}>हमारी नवीनतम पर्यावरण संरक्षण पहल में शामिल हों</Text>
            <View style={styles.environmentalButton}>
              <Text style={styles.environmentalButtonText}>अधिक जानकारी</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* E-Magazine Preview */}
        <View style={styles.magazineSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>नवीनतम ई-पत्रिका</Text>
            <TouchableOpacity onPress={() => navigateToScreen('Magazine')}>
              <Text style={styles.viewAllLink}>अर्काइव देखें</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.magazinePreview}
            onPress={() => navigateToScreen('MagazineDetail')}
          >
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=bishnoi%20samaj%20magazine%20cover%20with%20traditional%20design&aspect=3:4&seed=7' }} 
              style={styles.magazineCover} 
            />
            <View style={styles.magazineInfo}>
              <Text style={styles.magazineTitle}>बिश्नोई वाणी</Text>
              <Text style={styles.magazineIssue}>मार्च 2025 • अंक 42</Text>
              <Text style={styles.magazineDescription}>इस अंक में: बिश्नोई समाज के 29 नियम, आधुनिक परिप्रेक्ष्य में हमारी परंपराएं, और जलवायु परिवर्तन से निपटने के प्राचीन ज्ञान।</Text>
              <View style={styles.magazineButton}>
                <Text style={styles.magazineButtonText}>अभी पढ़ें</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>बिश्नोई समाज अधिकारिक ऐप</Text>
          <Text style={styles.footerText}>© 2025 सर्वाधिकार सुरक्षित</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f7f5f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d1',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#46601C',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    marginLeft: 16,
  },
  heroBanner: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginBottom: 16,
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  featuresSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllLink: {
    color: '#46601C',
    fontSize: 14,
    fontWeight: '500',
  },
  newsScrollContainer: {
    paddingRight: 16,
  },
  eventsSection: {
    padding: 16,
  },
  eventsContainer: {
    gap: 12,
  },
  environmentalBanner: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  environmentalBannerImage: {
    width: '100%',
    height: '100%',
  },
  environmentalGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  environmentalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  environmentalSubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 12,
  },
  environmentalButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  environmentalButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  magazineSection: {
    padding: 16,
  },
  magazinePreview: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  magazineCover: {
    width: width * 0.3,
    height: 180,
  },
  magazineInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  magazineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  magazineIssue: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  magazineDescription: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 12,
  },
  magazineButton: {
    backgroundColor: '#46601C',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  magazineButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
});