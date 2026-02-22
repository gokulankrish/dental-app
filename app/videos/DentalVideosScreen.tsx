// DentalVideosScreen.tsx
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Type definitions
interface Video {
  id: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

interface GroupedVideos {
  [key: string]: Video[];
}

const videoData: Video[] = [
  // KIDS WATCH VIDEOS (5 videos)
  {
    id: '1',
    category: 'Kids Videos',
    categoryIcon: '🧒',
    categoryColor: '#FF9A9E',
    title: 'How to Brush Your Teeth Properly',
    description: 'Learn how to brush your teeth to keep them clean, shiny, and healthy every day.',
    url: 'https://www.youtube.com/watch?v=vcNAhUqH9U0',
    thumbnail: 'https://img.youtube.com/vi/vcNAhUqH9U0/0.jpg',
  },
  {
    id: '2',
    category: 'Kids Videos',
    categoryIcon: '🧒',
    categoryColor: '#FF9A9E',
    title: 'Brush Your Teeth Song',
    description: 'Sing along and learn when and how to brush your teeth.',
    url: 'https://www.youtube.com/watch?v=wCio_xVlgQ0',
    thumbnail: 'https://img.youtube.com/vi/wCio_xVlgQ0/0.jpg',
  },
  {
    id: '3',
    category: 'Kids Videos',
    categoryIcon: '🧒',
    categoryColor: '#FF9A9E',
    title: 'Why Brushing Teeth is Important',
    description: 'A fun story teaching children why brushing daily keeps cavities away.',
    url: 'https://www.youtube.com/watch?v=WTfPAiedj-o',
    thumbnail: 'https://img.youtube.com/vi/WTfPAiedj-o/0.jpg',
  },
  {
    id: '4',
    category: 'Kids Videos',
    categoryIcon: '🧒',
    categoryColor: '#FF9A9E',
    title: 'Dolly and Friends Learn Brushing',
    description: 'Watch Dolly and friends learn good brushing habits.',
    url: 'https://www.youtube.com/watch?v=TB-GWhHyoCo',
    thumbnail: 'https://img.youtube.com/vi/TB-GWhHyoCo/0.jpg',
  },
  {
    id: '5',
    category: 'Kids Videos',
    categoryIcon: '🧒',
    categoryColor: '#FF9A9E',
    title: 'Step-by-Step Tooth Brushing',
    description: 'An engaging animation showing tooth brushing in a fun way.',
    url: 'https://www.youtube.com/watch?v=l08MKKjBVxo',
    thumbnail: 'https://img.youtube.com/vi/l08MKKjBVxo/0.jpg',
  },
  
  // PARENTS EDUCATION VIDEOS (3 videos)
  {
    id: '6',
    category: 'Parents Education',
    categoryIcon: '👨‍👩‍👧',
    categoryColor: '#A8E6CF',
    title: 'Correct Tooth Brushing Technique',
    description: 'Explained clearly for children and adults.',
    url: 'https://www.youtube.com/watch?v=BapR9J86ZZw',
    thumbnail: 'https://img.youtube.com/vi/BapR9J86ZZw/0.jpg',
  },
  {
    id: '7',
    category: 'Parents Education',
    categoryIcon: '👨‍👩‍👧',
    categoryColor: '#A8E6CF',
    title: 'Why Brushing is Essential',
    description: 'Learn why brushing prevents cavities and gum problems.',
    url: 'https://www.youtube.com/watch?v=aOebfGGcjVw',
    thumbnail: 'https://img.youtube.com/vi/aOebfGGcjVw/0.jpg',
  },
  {
    id: '8',
    category: 'Parents Education',
    categoryIcon: '👨‍👩‍👧',
    categoryColor: '#A8E6CF',
    title: 'Professional Brushing Guidance',
    description: 'Proper brushing method and oral hygiene care.',
    url: 'https://www.youtube.com/watch?v=xm9c5HAUBpY',
    thumbnail: 'https://img.youtube.com/vi/xm9c5HAUBpY/0.jpg',
  },
  
  // AFTER-TREATMENT VIDEOS (4 videos)
  {
    id: '9',
    category: 'After Treatment',
    categoryIcon: '🦷',
    categoryColor: '#FFD3B6',
    title: 'After Tooth Removal Instructions',
    description: 'Important instructions for faster and safe healing.',
    url: 'https://www.youtube.com/watch?v=Bi2Fqwwak4U',
    thumbnail: 'https://img.youtube.com/vi/Bi2Fqwwak4U/0.jpg',
  },
  {
    id: '10',
    category: 'After Treatment',
    categoryIcon: '🦷',
    categoryColor: '#FFD3B6',
    title: 'What to Eat After Extraction',
    description: 'Learn what to eat and avoid after tooth extraction.',
    url: 'https://www.youtube.com/watch?v=1f9g9lZlCF8',
    thumbnail: 'https://img.youtube.com/vi/1f9g9lZlCF8/0.jpg',
  },
  {
    id: '11',
    category: 'After Treatment',
    categoryIcon: '🦷',
    categoryColor: '#FFD3B6',
    title: 'After Filling Care',
    description: 'Guidance on eating, sensitivity, and care after filling.',
    url: 'https://www.youtube.com/watch?v=I0FC_uOnXF4',
    thumbnail: 'https://img.youtube.com/vi/I0FC_uOnXF4/0.jpg',
  },
  {
    id: '12',
    category: 'After Treatment',
    categoryIcon: '🦷',
    categoryColor: '#FFD3B6',
    title: 'Post-Cleaning Care Tips',
    description: 'Reduce sensitivity and keep gums healthy after cleaning.',
    url: 'https://www.youtube.com/watch?v=VdZc5fM9l1Q',
    thumbnail: 'https://img.youtube.com/vi/VdZc5fM9l1Q/0.jpg',
  },
  
  // DENTAL EMERGENCY VIDEOS (5 videos)
  {
    id: '13',
    category: 'Dental Emergency',
    categoryIcon: '🚨',
    categoryColor: '#FF8A80',
    title: 'Knocked Out Tooth Emergency',
    description: 'What to do immediately if a tooth is knocked out.',
    url: 'https://www.youtube.com/watch?v=TkwCG2apCb0',
    thumbnail: 'https://img.youtube.com/vi/TkwCG2apCb0/0.jpg',
  },
  {
    id: '14',
    category: 'Dental Emergency',
    categoryIcon: '🚨',
    categoryColor: '#FF8A80',
    title: 'Parents Emergency Guide',
    description: 'Step-by-step instructions for knocked-out tooth.',
    url: 'https://www.youtube.com/watch?v=sGX79KHJvhg',
    thumbnail: 'https://img.youtube.com/vi/sGX79KHJvhg/0.jpg',
  },
  {
    id: '15',
    category: 'Dental Emergency',
    categoryIcon: '🚨',
    categoryColor: '#FF8A80',
    title: 'Can a Knocked-Out Tooth Be Saved?',
    description: 'Learn when and how a tooth can be put back.',
    url: 'https://www.youtube.com/watch?v=OnZXjdBNxi8',
    thumbnail: 'https://img.youtube.com/vi/OnZXjdBNxi8/0.jpg',
  },
  {
    id: '16',
    category: 'Dental Emergency',
    categoryIcon: '🚨',
    categoryColor: '#FF8A80',
    title: 'First Aid for Dental Injuries',
    description: 'Guidance for dental injuries in children.',
    url: 'https://www.youtube.com/watch?v=ulLO6v5CfUY',
    thumbnail: 'https://img.youtube.com/vi/ulLO6v5CfUY/0.jpg',
  },
  {
    id: '17',
    category: 'Dental Emergency',
    categoryIcon: '🚨',
    categoryColor: '#FF8A80',
    title: 'Quick Emergency Guide',
    description: 'Quick guide for knocked-out tooth emergency.',
    url: 'https://www.youtube.com/shorts/eWh1IZRToME',
    thumbnail: 'https://img.youtube.com/vi/eWh1IZRToME/0.jpg',
  },
  
  // FEAR REDUCTION VIDEOS (6 videos)
  {
    id: '18',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'Visiting the Dentist is Fun',
    description: 'Friendly dentists help keep teeth healthy.',
    url: 'https://www.youtube.com/watch?v=0z1vYxkX8vA',
    thumbnail: 'https://img.youtube.com/vi/0z1vYxkX8vA/0.jpg',
  },
  {
    id: '19',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'Gentle Cartoon Dental Visit',
    description: 'Shows what happens during a dental visit.',
    url: 'https://www.youtube.com/watch?v=6E0g6pJZp3Q',
    thumbnail: 'https://img.youtube.com/vi/6E0g6pJZp3Q/0.jpg',
  },
  {
    id: '20',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'How Dentists Help Us Smile',
    description: 'Learn how dental visits help us smile better.',
    url: 'https://www.youtube.com/watch?v=Fq5Zp5z8pYQ',
    thumbnail: 'https://img.youtube.com/vi/Fq5Zp5z8pYQ/0.jpg',
  },
  {
    id: '21',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'Friendly Dentist Explains Tools',
    description: 'Dental tools explained in a calm way for kids.',
    url: 'https://www.youtube.com/watch?v=ZK3pV9k8g7Q',
    thumbnail: 'https://img.youtube.com/vi/ZK3pV9k8g7Q/0.jpg',
  },
  {
    id: '22',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'Brave Child at the Dentist',
    description: 'Reassuring story about going to the dentist.',
    url: 'https://www.youtube.com/watch?v=KZK0M6c9Q6w',
    thumbnail: 'https://img.youtube.com/vi/KZK0M6c9Q6w/0.jpg',
  },
  {
    id: '23',
    category: 'Reduce Dental Fear',
    categoryIcon: '🌈',
    categoryColor: '#B39DDB',
    title: 'Dental Treatment Doesn\'t Hurt',
    description: 'Understanding that dentists are helpers.',
    url: 'https://www.youtube.com/watch?v=4J3Rk9R9Q1A',
    thumbnail: 'https://img.youtube.com/vi/4J3Rk9R9Q1A/0.jpg',
  },
];

// Get unique categories
const categories: string[] = [...new Set(videoData.map(video => video.category))];

const DentalVideosScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategory, setExpandedCategory] = useState<Record<string, boolean>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const playVideo = async (url: string): Promise<void> => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this video');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open the video');
    }
  };

  const toggleCategory = (category: string): void => {
    setExpandedCategory(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const scrollToCategory = (category: string): void => {
    // This is a simplified version - in a real app you'd use refs to scroll
    Alert.alert('Scroll to', category);
  };

  // Filter videos based on search
  const filteredVideos: Video[] = videoData.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered videos by category
  const groupedVideos: GroupedVideos = {};
  filteredVideos.forEach(video => {
    if (!groupedVideos[video.category]) {
      groupedVideos[video.category] = [];
    }
    groupedVideos[video.category].push(video);
  });

  const renderVideoCard = (video: Video): React.ReactElement => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => playVideo(video.url)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`Watch video: ${video.title}`}
      accessibilityHint={`Opens YouTube video about ${video.description}`}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
        <Text style={styles.videoDescription} numberOfLines={2}>
          {video.description}
        </Text>
        <View style={styles.playButton}>
          <MaterialIcons name="play-circle-filled" size={20} color="#4A90E2" />
          <Text style={styles.playText}>Watch Now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      
      <LinearGradient
        colors={['#4A90E2', '#63B8FF']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🦷 Dental Care Videos</Text>
        <Text style={styles.headerSubtitle}>
          {videoData.length} educational videos for kids & parents
        </Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {Object.keys(groupedVideos).map(category => {
          const categoryVideos = groupedVideos[category];
          const categoryColor = categoryVideos[0]?.categoryColor || '#4A90E2';
          const categoryIcon = categoryVideos[0]?.categoryIcon || '🦷';
          const isExpanded = expandedCategory[category] || false;
          const displayVideos = isExpanded ? categoryVideos : categoryVideos.slice(0, 3);

          return (
            <View key={category} style={styles.categorySection}>
              <TouchableOpacity 
                style={[styles.categoryHeader, { backgroundColor: categoryColor }]}
                onPress={() => toggleCategory(category)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityLabel={`${category} category`}
                accessibilityHint={`${isExpanded ? 'Collapse' : 'Expand'} to show ${categoryVideos.length} videos`}
              >
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryIcon}>{categoryIcon}</Text>
                  <Text style={styles.categoryTitle}>{category}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={styles.videoCount}>{categoryVideos.length} videos</Text>
                  <MaterialIcons 
                    name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                    size={24} 
                    color="#fff" 
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.videoGrid}>
                {displayVideos.map(video => renderVideoCard(video))}
              </View>

              {categoryVideos.length > 3 && !isExpanded && (
                <TouchableOpacity 
                  style={styles.showMoreButton}
                  onPress={() => toggleCategory(category)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.showMoreText}>
                    + {categoryVideos.length - 3} more videos
                  </Text>
                  <MaterialIcons name="arrow-downward" size={16} color="#4A90E2" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {Object.keys(groupedVideos).length === 0 && (
          <View style={styles.noResults}>
            <MaterialIcons name="videocam-off" size={60} color="#ccc" />
            <Text style={styles.noResultsText}>No videos found</Text>
            <Text style={styles.noResultsSubtext}>Try different keywords</Text>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>🦷 Healthy teeth = Happy smiles!</Text>
        </View>
      </ScrollView>

      {/* Quick Category Jump Buttons */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 8 : 5,
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 70,
  },
  categorySection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoCount: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginRight: 8,
  },
  videoGrid: {
    padding: 10,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  thumbnail: {
    width: 100,
    height: 80,
    backgroundColor: '#ddd',
  },
  videoInfo: {
    flex: 1,
    padding: 10,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 14,
    marginBottom: 6,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playText: {
    fontSize: 11,
    color: '#4A90E2',
    marginLeft: 4,
    fontWeight: '500',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  showMoreText: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
    marginRight: 5,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 10,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
    marginTop: 5,
  },
  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  quickJump: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    maxHeight: 50,
  },
  quickJumpContent: {
    paddingHorizontal: 5,
  },
  jumpButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  jumpButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DentalVideosScreen;