export class Comment {
    id!: string;
    // delete for user type
    userId?: string;
    text!: string;
    createdAt!: Date;
    deleteOn?: Date;
}
