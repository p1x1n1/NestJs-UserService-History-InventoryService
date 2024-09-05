import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('action_history')
export class ActionHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    action: string;

    @Column({ nullable: true })
    plu: number;

    @Column({ nullable: true })
    shop_id: number;

    @CreateDateColumn()
    date_: Date;

    @Column('jsonb', { nullable: true })
    details: Record<string, any>;
}
