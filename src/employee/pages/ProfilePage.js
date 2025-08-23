import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import toast from 'react-hot-toast';

const Styles = () => (
    <style>{`
        .profile-card, .password-card {
            background: #1f2937;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .profile-header h2 { margin-top: 0; }
        .profile-info p { font-size: 1.1rem; color: #d1d5db; }
        .profile-info strong { color: #9ca3af; }
    `}</style>
);

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Simulating login as "employee1"
                const response = await userService.getMyProfile("employee1");
                setProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handlePasswordChange = async (oldPassword, newPassword) => {
        try {
            // NOTE: The backend logic for this is missing, so this will fail
            // We use the admin endpoint as a placeholder
            await userService.updateMyPassword(profile.id, oldPassword, newPassword);
            toast.success("Password updated successfully!");
        } catch (error) {
            toast.error("Failed to update password. (Endpoint not implemented)");
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <>
            <Styles />
            <div className="profile-header">
                <h1>My Profile</h1>
            </div>
            {profile && (
                <div className="profile-card">
                    <div className="profile-info">
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Role:</strong> {profile.role.replace('ROLE_', '')}</p>
                    </div>
                </div>
            )}
            <div className="password-card">
                <h2>Change Password</h2>
                {/* Password change form would go here */}
            </div>
        </>
    );
};

export default ProfilePage;