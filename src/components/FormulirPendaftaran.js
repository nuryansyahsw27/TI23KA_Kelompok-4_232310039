import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FormulirPendaftaran = () => {
  const navigation = useNavigation(); 
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [usia, setUsia] = useState('');
  const [lulusan, setLulusan] = useState('');
  const [tempatKelahiran, setTempatKelahiran] = useState('');
  const [namaOrangTua, setNamaOrangTua] = useState('');
  const [alasanMasukKampus, setAlasanMasukKampus] = useState('');
  const [biayaPendaftaran, setBiayaPendaftaran] = useState('');

  const handleSubmit = async () => {
    if (!nama || !alamat || !usia || !lulusan || !tempatKelahiran || !namaOrangTua || !alasanMasukKampus || !biayaPendaftaran) {
      Alert.alert('Error', 'Semua kolom harus diisi');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.13/CRMChatbot/pendaftaran.php', {
        nama,
        alamat,
        usia,
        lulusan,
        tempat_kelahiran: tempatKelahiran,
        nama_orang_tua: namaOrangTua,
        alasan_masuk_kampus: alasanMasukKampus,
        biaya_pendaftaran: parseFloat(biayaPendaftaran),
      });

      if (response.data.status === 'success') {
        Alert.alert(
          'Pendaftaran Berhasil',
          'Untuk lebih lanjut, silahkan kunjungi kampus.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('ChatbotScreen'),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Pendaftaran gagal, coba lagi nanti.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi nanti.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'android' ? 'padding' : 'height'}
              style={styles.flex}
              keyboardVerticalOffset={60}>
             
      <ScrollView contentContainerStyle={{ padding: 5 }} keyboardShouldPersistTaps="handled">
        
        <View style={styles.chatWrapper}>

          <Text style={styles.formHeader}>Formulir Pendaftaran</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              placeholder="Masukkan nama lengkap"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Alamat</Text>
            <TextInput
              style={styles.input}
              value={alamat}
              onChangeText={setAlamat}
              placeholder="Masukkan alamat"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Usia</Text>
            <TextInput
              style={styles.input}
              value={usia}
              onChangeText={setUsia}
              placeholder="Masukkan usia"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Lulusan</Text>
            <TextInput
              style={styles.input}
              value={lulusan}
              onChangeText={setLulusan}
              placeholder="Masukkan lulusan"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tempat Kelahiran</Text>
            <TextInput
              style={styles.input}
              value={tempatKelahiran}
              onChangeText={setTempatKelahiran}
              placeholder="Masukkan tempat kelahiran"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nama Orang Tua</Text>
            <TextInput
              style={styles.input}
              value={namaOrangTua}
              onChangeText={setNamaOrangTua}
              placeholder="Masukkan nama orang tua"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Alasan Masuk Kampus</Text>
            <TextInput
              style={styles.input}
              value={alasanMasukKampus}
              onChangeText={setAlasanMasukKampus}
              placeholder="Masukkan alasan"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Biaya Pendaftaran</Text>
            <TextInput
              style={styles.input}
              value={biayaPendaftaran}
              onChangeText={setBiayaPendaftaran}
              placeholder="Masukkan biaya pendaftaran"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Kirim Pendaftaran</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
       </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A1B9A',
    padding: 20,
  },
  chatWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 20,
  },
});

export default FormulirPendaftaran;
