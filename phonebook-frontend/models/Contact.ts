interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    categoryId: number;
    categoryName: string;
}

interface PagedList<T> {
    records: T[];
    totalCount: number;
}