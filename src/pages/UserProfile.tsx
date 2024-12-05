import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USER_PROFILE_TEXTS } from '../translations/user-profile/userProfile';

const UserProfile = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const mockUserData = {
        id: userId,
        email: 'Roy.Doyle66@hotmail.com',
        firstName: 'Filip',
        lastName: 'Leo',
        phone: '+1 (712) 9449',
        role: 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    useEffect(() => {
        const fetchUserData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUser(mockUserData);
            setFormData(mockUserData);
        };

        fetchUserData();
    }, [userId]);

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        setUser(formData);
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="w-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xl">
                {USER_PROFILE_TEXTS.loading}
            </div>
        );
    }

    return (
        <div className=" w-full flex flex-col bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="flex-grow flex flex-col items-center p-10 space-y-10">
                <div className="bg-white text-gray-900 w-full max-w-5xl rounded-lg shadow-2xl p-8">
                    <div className="flex items-center mb-6">
                        <div
                            className="rounded-full w-32 h-32 flex items-center justify-center text-white text-5xl font-bold"
                            style={{ backgroundColor: '#4A90E2' }}
                        >
                            {getInitials(user.firstName, user.lastName)}
                        </div>
                        <div className="ml-6">
                            <h1 className="text-4xl font-bold">{user.firstName} {user.lastName}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-gray-900 w-full max-w-5xl rounded-lg shadow-2xl p-8">
                    <h3 className="text-2xl font-semibold mb-4">{USER_PROFILE_TEXTS.infoTitle}</h3>
                    {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2"
                                placeholder={USER_PROFILE_TEXTS.firstName}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2"
                                placeholder={USER_PROFILE_TEXTS.name}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2"
                                placeholder={USER_PROFILE_TEXTS.email}
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2"
                                placeholder={USER_PROFILE_TEXTS.phone}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.name}</strong> {user.lastName}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.firstName}</strong> {user.firstName}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.email}</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.phone}</strong> {user.phone}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.createdAt}</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.updatedAt}</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-5xl flex justify-center">
                    {isEditing ? (
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                            >
                                {USER_PROFILE_TEXTS.saveChanges}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
                            >
                                {USER_PROFILE_TEXTS.cancel}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            {USER_PROFILE_TEXTS.editProfile}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
