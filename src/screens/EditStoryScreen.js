import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditStoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode, post } = route.params || { mode: 'create', post: null };

  const [title, setTitle] = useState(post?.title || '');
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [description, setDescription] = useState(post?.description || '');
  const [content, setContent] = useState(post?.content || '');
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight || 0);
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên truyện');
      return;
    }

    if (!imageUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập link ảnh bìa');
      return;
    }

    const updatedStory = {
      id: post?.id || Date.now().toString(),
      title: title.trim(),
      image: imageUrl.trim(),
      description: description.trim(),
      content: content.trim(),
    };

    const successMessage =
      mode === 'create'
        ? 'Thêm truyện thành công'
        : 'Cập nhật truyện thành công';
    Alert.alert('Thành công', successMessage, [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
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
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === 'create' ? 'Tạo truyện mới' : 'Chỉnh sửa truyện'}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tên truyện</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Nhập tên truyện"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Link ảnh bìa</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Nhập link ảnh bìa"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mô tả</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Nhập mô tả truyện"
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nội dung truyện</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Nhập nội dung..."
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#6c63ff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  contentInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
  },
});
