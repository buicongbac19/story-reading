import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { booksData } from './HomeScreen';

export default function RateScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, bookTitle } = route.params || {
    bookId: '1',
    bookTitle: 'Đắc Nhân Tâm',
  };

  const book = booksData.find((b) => b.id === bookId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn số sao đánh giá');
      return;
    }

    console.log('Đánh giá:', { bookId, rating, comment });

    Alert.alert('Thành công', 'Cảm ơn bạn đã đánh giá!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starContainer}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={30}
            color={i <= rating ? '#6c63ff' : '#aaa'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.header,
            { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đánh giá truyện</Text>
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.starsContainer}>{renderStars()}</View>

          <TextInput
            style={styles.input}
            placeholder="Nhập đánh giá (tùy chọn)"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  sendButton: {
    padding: 8,
  },
  sendButtonText: {
    color: '#6c63ff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  starContainer: {
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    height: 120,
    fontSize: 16,
  },
});
