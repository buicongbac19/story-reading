import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Share,
  ToastAndroid,
  Platform,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { booksData } from './HomeScreen';

export default function BookDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId } = route.params || { bookId: '1' };

  const book = booksData.find((b) => b.id === bookId) || {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    content: 'Không tìm thấy nội dung sách.',
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight || 0);
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleViewReviews = () => {
    navigation.navigate('ReviewsScreen', {
      bookId: book.id,
      bookTitle: book.title,
    });
  };

  const handleRate = () => {
    navigation.navigate('RateScreen', {
      bookId: book.id,
      bookTitle: book.title,
    });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Truyện hay lắm, mời bạn tải app về đọc với mình\nhttps://awesome-comics.com/',
        title: book.title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chia sẻ vào lúc này');
    }
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    const message = newFavoriteState
      ? 'Đã thêm vào yêu thích'
      : 'Đã bỏ yêu thích';
    setNotificationMessage(message);
    setShowNotification(true);

    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      Alert.alert(message, '', [{ text: 'OK' }], { cancelable: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {showNotification && (
        <View
          style={[
            styles.notification,
            { backgroundColor: isFavorite ? '#4CAF50' : '#FF5722' },
          ]}
        >
          <Text style={styles.notificationText}>{notificationMessage}</Text>
        </View>
      )}

      <ScrollView style={styles.content}>
        <Text style={styles.contentText}>{book.content}</Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.reviewButton]}
            onPress={handleViewReviews}
          >
            <Text style={styles.actionButtonText}>XEM ĐÁNH GIÁ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rateButton]}
            onPress={handleRate}
          >
            <Text style={styles.actionButtonText}>ĐÁNH GIÁ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Text style={styles.actionButtonText}>CHIA SẺ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isFavorite ? styles.favoriteActiveButton : styles.favoriteButton,
            ]}
            onPress={handleFavorite}
          >
            <Text style={styles.actionButtonText}>
              {isFavorite ? 'ĐÃ THÍCH' : 'YÊU THÍCH'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  notification: {
    padding: 10,
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  reviewButton: {
    backgroundColor: '#3F51B5', // Xanh đậm
  },
  rateButton: {
    backgroundColor: '#2196F3', // Xanh nhạt
  },
  shareButton: {
    backgroundColor: '#FF9800', // Cam
  },
  favoriteButton: {
    backgroundColor: '#F44336', // Đỏ
  },
  favoriteActiveButton: {
    backgroundColor: '#4CAF50', // Xanh lá khi đã yêu thích
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
