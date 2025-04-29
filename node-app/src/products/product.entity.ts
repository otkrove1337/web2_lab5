import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('float')
    price: number;

    @Column({ nullable: true })
    image: string;

    @Column()
    category_id: number; // збережеться category_id як окреме поле

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' }) // <-- ДОДАТИ ЦЕ, обов'язково!
    category: Category; // тепер цей зв'язок використовує поле category_id

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}