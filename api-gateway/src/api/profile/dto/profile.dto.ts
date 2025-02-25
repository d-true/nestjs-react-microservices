export class ProfileDto {
    id!: string;
    avatar!: string;
    name!: string;
    email!: string;
    role!: {
        id: number;
        name: string;
    };
}
