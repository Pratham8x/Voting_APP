import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'

type UnitForm = {
  name: string
  description: string
}

type UnitModalProps = {
  visible: boolean
  onSubmit: (form: UnitForm) => void
  onClose: () => void
}

const UnitModal: React.FC<UnitModalProps> = ({ visible, onSubmit, onClose }) => {
  const [form, setForm] = useState<UnitForm>({
    name: '',
    description: '',
  })

  const handleChange = (key: keyof UnitForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = () => {
    onSubmit(form)
    // Reset form after submit
    setForm({
      name: '',
      description: '',
    })
  }

  const handleClose = () => {
    onClose()
    // Reset form when closing
    setForm({
      name: '',
      description: '',
    })
  }

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Unit</Text>

          <TextInput 
            placeholder="Unit Name" 
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={(text) => handleChange('name', text)}
            value={form.name}
          />

          <TextInput 
            placeholder="Description" 
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={(text) => handleChange('description', text)}
            value={form.description}
            multiline
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#0f172a',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#38bdf8',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default UnitModal