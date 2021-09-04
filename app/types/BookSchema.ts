export interface BookSchema {
    _id: { $oid: string };
    title: string;
    description: string;
    author: string;
    link: string;
}