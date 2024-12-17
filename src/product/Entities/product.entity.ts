import { CategoryEntity } from "src/category/Entities/category.entity"; 
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'category_id', nullable: false})
    categoryId: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'image'})
    image: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (CategoryEntity) => CategoryEntity.products)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category?: CategoryEntity;
}
