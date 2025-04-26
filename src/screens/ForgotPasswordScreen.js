import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0,
  );

  const handleSendCode = () => {
    if (!email.trim()) {
      alert('Vui lòng nhập địa chỉ email');
      return;
    }

    setConfirmationVisible(true);
  };

  const handleBackToLogin = () => {
    setConfirmationVisible(false);
    navigation.navigate('Login');
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
        <Text style={styles.headerTitle}>Quên mật khẩu</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.description}>
            Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={confirmationVisible}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.confirmationContainer}>
          <View
            style={[
              styles.header,
              { marginTop: Platform.OS === 'android' ? statusBarHeight : 0 },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setConfirmationVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quên mật khẩu</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.confirmationContent}>
            <Text style={styles.description}>
              Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu
            </Text>

            <Text style={styles.emailText}>{email}</Text>

            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6357/6357048.png',
              }}
              style={styles.confirmationImage}
            />

            <Text style={styles.confirmationTitle}>
              Kiểm tra hộp thư Email của bạn
            </Text>
            <Text style={styles.confirmationDescription}>
              Vui lòng kiểm tra hộp thư đến và làm theo các hướng dẫn để hoàn
              tất thiết lập đặt lại mật khẩu của bạn.
            </Text>

            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={handleBackToLogin}
            >
              <Text style={styles.backToLoginText}>Quay về đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmationContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  confirmationContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
  },
  confirmationImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  confirmationDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  backToLoginButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backToLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
