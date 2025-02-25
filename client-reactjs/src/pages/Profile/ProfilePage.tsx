import { logOut } from '../../features/auth/auth.service.ts';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    getProfileInfo,
    uploadAvatar,
    removeAvatar,
} from '../../features/profile/profile.service.ts';
import { Profile } from '../../features/profile/profile.types.ts';
import { FILE_UPLOAD_PATH } from '../../config';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        (async () => {
            await getProfileInfo({ setProfile });
        })();
    }, []);

    return (
        <>
            <div className="text-center mt-4">
                <p>Avatar:</p>
                <img
                    height={300}
                    width={300}
                    alt="avatar"
                    src={
                        profile?.avatar
                            ? FILE_UPLOAD_PATH + profile.avatar
                            : '/no_avatar.jpg'
                    }
                />
            </div>
            <FileUploader setProfile={setProfile} profile={profile} />
            <div className="text-center mt-4">
                Your profile info is:{' '}
                {profile ? JSON.stringify(profile) : 'loading...'}
            </div>
            <div className="text-center mt-4 mb-4">
                <button className="btn" onClick={() => logOut({ dispatch })}>
                    Logout
                </button>
            </div>
        </>
    );
}

const FileUploader = function ({
    profile,
    setProfile,
}: {
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            {profile?.avatar ? (
                <div className="text-center mt-4">
                    <button
                        className="btn"
                        onClick={(e) => removeAvatar(e, { setProfile })}
                    >
                        Remove Avatar
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-center mt-4">
                        <p>
                            Only images (png, jpg) is allowed, max size is{' '}
                            {1024 * 1024} bytes (1 mb)
                        </p>
                        <div className="input-group">
                            <input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            className="btn"
                            onClick={(e) =>
                                uploadAvatar(e, { file, setFile, setProfile })
                            }
                        >
                            Upload Avatar
                        </button>
                    </div>
                </>
            )}
        </>
    );
};
