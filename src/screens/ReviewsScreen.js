import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const sampleReviews = {
  1: [
    {
      id: '1',
      username: 'App2',
      date: '29-05-2023',
      rating: 4,
      comment: 'Tuyệt vời',
    },
    {
      id: '2',
      username: 'nguyen linh',
      date: '21-05-2023',
      rating: 5,
      comment: 'khá hay',
    },
    {
      id: '3',
      username: 'nguyen van',
      date: '19-05-2023',
      rating: 4,
      comment: 'sách ổn hợp cho người nâng cao kiến thức',
    },
    {
      id: '4',
      username: 'Admin',
      date: '16-05-2023',
      rating: 5,
      comment: 'truyện khá hay, nên đọc...',
    },
    {
      id: '5',
      username: 'Quyen duc tran',
      date: '10-05-2023',
      rating: 3,
      comment: 'truyen hay',
    },
  ],
  2: [
    {
      id: '1',
      username: 'Minh Tuan',
      date: '15-04-2023',
      rating: 5,
      comment: 'Sách rất hay và ý nghĩa',
    },
    {
      id: '2',
      username: 'Thanh Hoa',
      date: '10-04-2023',
      rating: 4,
      comment: 'Nên đọc khi còn trẻ',
    },
  ],
  3: [
    {
      id: '1',
      username: 'Khoa học viên',
      date: '20-03-2023',
      rating: 5,
      comment: 'Sách khoa học hay',
    },
  ],
  4: [
    {
      id: '1',
      username: 'Người học tiếng Anh',
      date: '05-02-2023',
      rating: 4,
      comment: 'Từ điển rất hữu ích',
    },
  ],
};

export default function ReviewsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, bookTitle } = route.params || {
    bookId: '1',
    bookTitle: 'Đắc Nhân Tâm',
  };
  const [reviews, setReviews] = useState([]);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setReviews(sampleReviews[bookId] || []);
    setStatusBarHeight(StatusBar.currentHeight || 0);
  }, [bookId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#6c63ff' : '#aaa'}
          style={{ marginRight: 2 }}
        />,
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {renderStars(item.rating)}
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
      <View style={styles.separator} />
    </View>
  );

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
        <Text style={styles.headerTitle}>Thông tin đánh giá</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Chưa có đánh giá nào cho truyện này
            </Text>
          </View>
        }
      />
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
