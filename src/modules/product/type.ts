export interface ProductModelInterface {

    id?: number;

    name: string;

    price: string;

    slug: string;

    is_approved: boolean;

    UserId: number;

}

export type FilterProduct = Partial<Pick<ProductModelInterface, 'slug' | 'id' | 'UserId' | 'is_approved'>>