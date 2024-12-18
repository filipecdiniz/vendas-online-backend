import { CartEntity } from "src/cart/Entities/cart.entity";
import { ProductEntity } from "src/product/Entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "cart_product"})
export class CartProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: "cart_id", nullable: false})
    cartId: number;

    @Column({name: "product_id", nullable: false})
    productId: number;

    @Column({name: "amount", nullable: false})
    amount: number;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @CreateDateColumn({name: "updated_at"})
    updatedAt: Date;

    @ManyToOne(() => ProductEntity, (product) => product.cartProduct)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: ProductEntity;

    @ManyToOne(() => CartEntity, (cart) => cart.cartProduct)
    @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
    cart?: CartEntity;
}