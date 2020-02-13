import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {IsEmail} from "class-validator";


// TypeORM tutorial 

@Entity()
export class User {

   // This is what we use internally as a foreign key, but never expose to the public because leaking user counts is 
   // a company trade secrets issue 
   // (Running counter keys make data more local and faster to access) 
   @PrimaryGeneratedColumn()
   id: number;

   // Nice columns for internal statistics and diagnostics
   // We assume all servers tick UTC, but we always preserve timezone for 
   // our sanity when something gets messy   
   @CreateDateColumn({ type: 'timestamptz', name: 'create_date', default: () => 'LOCALTIMESTAMP' })
   createdAt: string;
   
   // Nice columns for internal statistics and diagnostics
   @UpdateDateColumn({ type: 'timestamptz', name: 'update_date', default: () => 'LOCALTIMESTAMP' })
   updatedAt: string;
 
   // Already refer users by this id when in the APIs .
   // (Randomized public ids make data exposure safer)
   @Column({unique: true})
   @Generated("uuid")
   publidId: string;   

   // User's chosen nick, settable by the user
   @Column({length: 50, unique: true})
   displayName: string;

   // Set after the email verification completes
   @Column({length: 50, nullable: true, unique: true})
   @IsEmail()
   confirmedEmail: string;

   // Set on the sign up / email change
   @Column({length: 50, nullable: false})
   @IsEmail()
   pendingEmail: string;

    // When the user registerd / requested email change
    @Column({ type: 'timestamptz', nullable: false })
    emailConfirmationRequestedAt: string;

    // When the user registerd / requested email change
    @Column({ type: 'timestamptz', nullable: true})
    emailConfirmationCompletedAt: string;
    
    // TODO: Phone number field

    // We ignore the password field in the context of this exercise,
    // as asking a truly safe password management routines 
    // from the candidates would be overkill.
    // But please read here: https://github.com/miohtama/opsec/blob/master/source/user/effective-session-kill.rst

}