import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, setDate } from 'date-fns';
import { globalStyles } from '@/styles/global.styles';

interface DatePickerProps {
    initialDate: Date,
    onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ initialDate, onDateChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState<Date>(initialDate);

const handleDateChange = (event: any, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate);
}

    return (
        <View style={globalStyles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>{format(date, 'PPP')}</Text>
                <Ionicons name="calendar-outline" size={20} color="#007AFF" />
            </TouchableOpacity>

            {showDatePicker && Platform.OS !== "ios" && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={'default'}
                    onChange={handleDateChange}
                />
            )}
            {Platform.OS === "ios" && (
                <Modal visible={showDatePicker} transparent={true} animationType="fade">
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                borderRadius: 10,
                                alignItems: "center",
                                width: "80%",
                            }}
                        >
                            <DateTimePicker value={date} mode="date" display="spinner" onChange={handleDateChange} />
                            <Button title="Done" onPress={() => setShowDatePicker(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#555'
    },

    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12
    }

});