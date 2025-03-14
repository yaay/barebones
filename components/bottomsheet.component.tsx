import React, { forwardRef, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Modal, Button } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { globalStyles } from '@/styles/global.styles';
import { DatePicker } from './datepicker.componen';

interface AddWeightLogProps {
    onSubmit: (weight: number, date: Date) => void;
}

export const AddWeightLogSheet = forwardRef<ActionSheetRef, AddWeightLogProps>(
    ({ onSubmit }, ref) => {
        const [weight, setWeight] = useState('');
        const [date, setDate] = useState(new Date());

        const handleWeightChange = (weight: string) => {
            const numericWeight = weight.replace(/[^0-9]/g, "");
            setWeight(numericWeight);
        }

        const handleSubmit = () => {
            if (weight.trim() === '') return;
            const weightValue = parseFloat(weight);
            if (isNaN(weightValue)) return;

            onSubmit(weightValue, date);
            setWeight('');
            setDate(new Date());
            (ref as React.RefObject<ActionSheetRef>).current?.hide();
        };

        const onDateChange = (selectedDate: Date) => {
            setDate(selectedDate);
        };

        return (
            <ActionSheet ref={ref} containerStyle={styles.actionSheet}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add Weight</Text>
                    <TouchableOpacity
                        onPress={() => (ref as React.RefObject<ActionSheetRef>).current?.hide()}
                    >
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.inputContainer}>
                    <Text style={styles.label}>Weight (kg)</Text>
                    <TextInput
                        style={styles.input}
                        value={weight}
                        onChangeText={handleWeightChange}
                        keyboardType="numeric"
                        placeholder="Enter weight in kg"
                    />
                </View>

                <DatePicker initialDate={date} onDateChange={onDateChange} />

                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSubmit}>
                    <Text style={globalStyles.primaryButtonText}>Add Weight</Text>
                </TouchableOpacity>
            </ActionSheet>
        );
    }
);

interface AddBodyConditionLogProps {
    onSubmit: (condition: string, date: Date) => void;
}

export const AddBodyConditionLogSheet = forwardRef<ActionSheetRef, AddBodyConditionLogProps>(
    ({ onSubmit }, ref) => {
        const [condition, setCondition] = useState('');
        const [date, setDate] = useState(new Date());

        const conditions = [
            'Underweight', 'Ideal', 'Overweight', 'Obese', 'Very Thin'
        ];

        const handleSubmit = () => {
            if (condition.trim() === '') return;

            onSubmit(condition, date);
            setCondition('');
            setDate(new Date());
            (ref as React.RefObject<ActionSheetRef>).current?.hide();
        };

        const onDateChange = (selectedDate: Date) => {
            setDate(selectedDate);
        };

        return (
            <ActionSheet ref={ref} containerStyle={styles.actionSheet}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add Body Condition</Text>
                    <TouchableOpacity
                        onPress={() => (ref as React.RefObject<ActionSheetRef>).current?.hide()}
                    >
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.inputContainer}>
                    <Text style={styles.label}>Body Condition</Text>
                    <TextInput
                        style={styles.input}
                        value={condition}
                        onChangeText={setCondition}
                        placeholder="Enter body condition"
                    />
                </View>

                <View style={styles.conditionsContainer}>
                    {conditions.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.conditionChip,
                                condition === item && styles.selectedCondition
                            ]}
                            onPress={() => setCondition(item)}
                        >
                            <Text style={[
                                styles.conditionChipText,
                                condition === item && styles.selectedConditionText
                            ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <DatePicker initialDate={date} onDateChange={onDateChange} />


                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSubmit}>
                    <Text style={globalStyles.primaryButtonText}>Add Body Condition</Text>
                </TouchableOpacity>
            </ActionSheet>
        );
    }
);

interface AddVetVisitLogProps {
    onSubmit: (notes: string, date: Date) => void;
}

export const AddVetVisitLogSheet = forwardRef<ActionSheetRef, AddVetVisitLogProps>(
    ({ onSubmit }, ref) => {
        const [notes, setNotes] = useState('');
        const [date, setDate] = useState(new Date());
        const [showDatePicker, setShowDatePicker] = useState(false);

        const handleSubmit = () => {
            if (notes.trim() === '') return;

            onSubmit(notes, date);
            setNotes('');
            setDate(new Date());
            (ref as React.RefObject<ActionSheetRef>).current?.hide();
        };

        const onDateChange = (selectedDate: Date) => {
            setDate(selectedDate);
        };

        return (
            <ActionSheet ref={ref} containerStyle={styles.actionSheet}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add Vet Visit</Text>
                    <TouchableOpacity
                        onPress={() => (ref as React.RefObject<ActionSheetRef>).current?.hide()}
                    >
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.inputContainer}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            Platform.OS === 'ios' && { paddingTop: 12 }
                        ]}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Enter vet visit notes"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <DatePicker initialDate={date} onDateChange={onDateChange} />

                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSubmit}>
                    <Text style={globalStyles.primaryButtonText}>Add Vet Visit</Text>
                </TouchableOpacity>
            </ActionSheet>
        );
    }
);

const styles = StyleSheet.create({
    actionSheet: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 16,
        paddingBottom: 32,
        minHeight: 300
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#555'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16
    },
    textArea: {
        height: 100,
        padding: 12,
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12
    },
    conditionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16
    },
    conditionChip: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8
    },
    selectedCondition: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF'
    },
    conditionChipText: {
        color: '#555'
    },
    selectedConditionText: {
        color: '#fff'
    }
});