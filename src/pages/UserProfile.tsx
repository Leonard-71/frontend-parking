import useUserProfile from '../hooks/user-profile/useUserProfile';
import { getGlobalUserId } from '../utils/userIdStore';
import { USER_PROFILE_TEXTS } from '../translations/user-profile/userProfile';
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const userId = getGlobalUserId();
    const { user, loading, error, updateUserProfile } = useUserProfile(userId!);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});


    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName || !lastName) {
            return '';
        }
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const success = await updateUserProfile(formData);
        if (success) {
            setIsEditing(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xl">
                {USER_PROFILE_TEXTS.loading}
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xl">
                {error}
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
                            {getInitials(user?.firstName, user?.lastName)}
                        </div>
                        <div className="ml-6">
                            <h1 className="text-4xl font-bold">{user?.firstName} {user?.lastName}</h1>
                            <p className="text-gray-600">{user?.email}</p>
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
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.name}</strong> {user?.lastName}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.firstName}</strong> {user?.firstName}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.email}</strong> {user?.email}</p>
                            <p className="text-gray-700"><strong>{USER_PROFILE_TEXTS.phone}</strong> {user?.phone}</p>

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
