import { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    setError('Failed to fetch users');
                }
            } catch (error) {
                setError('Error fetching users');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId));
            } else {
                setError('Failed to delete user');
            }
        } catch (error) {
            setError('Error deleting user');
            console.error('Error:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">User List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Blood Group</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index} className="border-b">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.phone}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.bloodGroup || '-'}</td>
                                <td className="px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;