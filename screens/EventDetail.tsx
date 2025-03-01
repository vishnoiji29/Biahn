import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const eventDetail = {
  id: '1',
  title: 'बिश्नोई सांस्कृतिक महोत्सव',
  date: '25 मार्च, 2025',
  time: 'सुबह 9:00 - शाम 8:00',
  location: 'जोधपुर, राजस्थान',
  address: 'सांस्कृतिक भवन, खेजड़ी मार्ग, जोधपुर, राजस्थान 342001',
  image: 'https://api.a0.dev/assets/image?text=bishnoi%20cultural%20festival%20with%20traditional%20rajasthani%20colors&aspect=16:9&seed=4',
  description: 'बिश्नोई समाज का वार्षिक सांस्कृतिक महोत्सव इस वर्ष 25 मार्च को आयोजित किया जा रहा है। इस महोत्सव में बिश्नोई परंपराओं, कला, संगीत और नृत्य का प्रदर्शन किया जाएगा। साथ ही, पर्यावरण संरक्षण के प्रति जागरूकता बढ़ाने के लिए विशेष कार्यक्रम भी आयोजित किए जाएंगे। महोत्सव में हस्तशिल्प प्रदर्शनी, पारंपरिक व्यंजनों का स्वाद, और विभिन्न सांस्कृतिक प्रतियोगिताएं भी होंगी।',
  organizer: 'बिश्नोई समाज संगठन, जोधपुर',
  contactPhone: '+91 9876543210',
  contactEmail: 'festival@bishnoisamaj.org',
  registrationRequired: true,
  registrationFee: 'निःशुल्क',
  attendees: 148,
  maxAttendees: 500,
};

const EventDetail = ({ navigation }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${eventDetail.title} \n${eventDetail.date} \n${eventDetail.location} \nबिश्नोई समाज ऐप पर इस कार्यक्रम के बारे में और जानें।`,
      });
    } catch (error) {
      Alert.alert('शेयर नहीं किया जा सका');
    }
  };

  const handleRegister = () => {
    if (!isRegistered) {
      // In a real app, this would be an API call
      setIsRegistered(true);
      Alert.alert(
        'पंजीकरण सफल', 
        'आपका पंजीकरण सफलतापूर्वक हो गया है। इस कार्यक्रम के अपडेट आपको ईमेल और ऐप नोटिफिकेशन के माध्यम से मिलेंगे।'
      );
    } else {
      setIsRegistered(false);
      Alert.alert('पंजीकरण रद्द', 'आपका पंजीकरण रद्द कर दिया गया है।');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: eventDetail.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.imageGradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <MaterialIcons name="share" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.dateContainer}>
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>25</Text>
              <Text style={styles.dateMonth}>मार्च</Text>
            </View>
            <View style={styles.eventStatus}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>आगामी</Text>
            </View>
          </View>

          <Text style={styles.title}>{eventDetail.title}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={20} color="#46601C" />
              <Text style={styles.infoText}>{eventDetail.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#46601C" />
              <Text style={styles.infoText}>{eventDetail.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color="#46601C" />
              <Text style={styles.infoText}>{eventDetail.organizer}</Text>
            </View>
          </View>

          <View style={styles.registrationStatus}>
            <View style={styles.attendeeInfo}>
              <Text style={styles.attendeeCount}>{eventDetail.attendees}/{eventDetail.maxAttendees}</Text>
              <Text style={styles.attendeeLabel}>उपस्थित होंगे</Text>
            </View>
            <View style={styles.registrationInfo}>
              <Text style={styles.registrationLabel}>पंजीकरण</Text>
              <Text style={styles.registrationFee}>{eventDetail.registrationFee}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>विवरण</Text>
            <Text style={styles.description}>{eventDetail.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>संपर्क जानकारी</Text>
            <TouchableOpacity style={styles.contactRow}>
              <MaterialIcons name="phone" size={20} color="#46601C" />
              <Text style={styles.contactText}>{eventDetail.contactPhone}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactRow}>
              <MaterialIcons name="email" size={20} color="#46601C" />
              <Text style={styles.contactText}>{eventDetail.contactEmail}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <Text style={styles.sectionTitle}>स्थान</Text>
            <View style={styles.map}>
              <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=map%20of%20jodhpur%20rajasthan%20location&aspect=16:9&seed=15' }} 
                style={styles.mapImage} 
              />
              <TouchableOpacity style={styles.mapButton}>
                <MaterialIcons name="directions" size={16} color="white" />
                <Text style={styles.mapButtonText}>दिशानिर्देश पाएं</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Register Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[
            styles.registerButton,
            isRegistered && styles.registeredButton
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>
            {isRegistered ? 'पंजीकरण रद्द करें' : 'अभी पंजीकरण करें'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f0',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -30,
    backgroundColor: '#f7f5f0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateBox: {
    backgroundColor: '#46601C',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    width: 70,
  },
  dateDay: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateMonth: {
    color: 'white',
    fontSize: 14,
  },
  eventStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0e0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#46601C',
    marginRight: 6,
  },
  statusText: {
    color: '#46601C',
    fontWeight: '500',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  registrationStatus: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  attendeeInfo: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e0e0d1',
    paddingRight: 16,
  },
  attendeeCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  attendeeLabel: {
    fontSize: 14,
    color: '#666',
  },
  registrationInfo: {
    flex: 1,
    paddingLeft: 16,
  },
  registrationLabel: {
    fontSize: 14,
    color: '#666',
  },
  registrationFee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#46601C',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },
  mapContainer: {
    marginBottom: 80,
  },
  map: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mapButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#46601C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  mapButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0d1',
  },
  registerButton: {
    backgroundColor: '#46601C',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  registeredButton: {
    backgroundColor: '#d87f81',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetail;