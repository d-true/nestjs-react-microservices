import { AppResponseError, AppResponseSuccess } from '../app.types.ts';

export type Profile = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: {
        name: string;
    };
};

export type GetProfileInfoResponse = AppResponseSuccess & {
    profile: Profile;
};

export type AddAvatarResponse =
    | (AppResponseSuccess & {
          avatar: string;
      })
    | AppResponseError;
