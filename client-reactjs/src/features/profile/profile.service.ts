import fetchRequest from '../fetch/fetch-request.ts';
import { AddAvatarResponse, GetProfileInfoResponse } from './profile.types.ts';
import React, { SetStateAction } from 'react';
import { Profile } from './profile.types.ts';
import fetchErrorHandler from '../fetch/fetch-error-handler.ts';

export async function getProfileInfo({
    setProfile,
}: {
    setProfile: React.Dispatch<SetStateAction<Profile | null>>;
}) {
    try {
        const result = await fetchRequest<GetProfileInfoResponse>('/profile', {
            method: 'GET',
        });

        if (result.message === 'OK') {
            setProfile(result.profile);
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function uploadAvatar(
    e: React.MouseEvent<HTMLButtonElement>,
    {
        file,
        setFile,
        setProfile,
    }: {
        file: File | null;
        setFile: React.Dispatch<SetStateAction<File | null>>;
        setProfile: React.Dispatch<SetStateAction<Profile | null>>;
    },
): Promise<void> {
    const target = e.target as HTMLButtonElement;

    // if upload avatar
    if (!file) {
        alert('No file uploaded');
        return;
    }

    target.disabled = true;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const result = await fetchRequest<AddAvatarResponse>(
            '/profile/avatar',
            {
                method: 'POST',
                headers: {},
                body: formData,
            },
        );

        if (result.message === 'OK') {
            setTimeout(() => {
                setProfile((prevState) =>
                    prevState
                        ? { ...prevState, avatar: result.avatar }
                        : prevState,
                );
            }, 200);
        } else {
            fetchErrorHandler(result);
        }
        target.disabled = false;
        setFile(null);
    } catch (e) {
        fetchErrorHandler(e);
        target.disabled = false;
        setFile(null);
    }
}

export async function removeAvatar(
    e: React.MouseEvent<HTMLButtonElement>,
    {
        setProfile,
    }: {
        setProfile: React.Dispatch<SetStateAction<Profile | null>>;
    },
) {
    const target = e.target as HTMLButtonElement;
    target.disabled = true;

    try {
        const result = await fetchRequest<AddAvatarResponse>(
            '/profile/avatar',
            {
                method: 'DELETE',
            },
        );

        if (result.message === 'OK') {
            setProfile((prevState) =>
                prevState ? { ...prevState, avatar: '' } : prevState,
            );
        } else {
            fetchErrorHandler(result);
        }
        target.disabled = false;
    } catch (e) {
        target.disabled = false;
        fetchErrorHandler(e);
    }
}
