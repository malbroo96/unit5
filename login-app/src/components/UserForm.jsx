import { useState } from 'react';
import InputField from './InputField';
import Button from './CustomButton';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        bloodGroup: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Data saved successfully!');
                setFormData({ name: '', phone: '', email: '' });
            } else {
                alert('Error saving data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">User Information</h2>
            <div className="space-y-4">
                <InputField
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <InputField
                    type="tel"
                    name="phone"
                    label="Phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <InputField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div>
                    <label className="block text-sm font-medium mb-2">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="mt-6">
                    <Button 
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 py-3 text-lg font-semibold"
                    >
                        Add Contact
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;