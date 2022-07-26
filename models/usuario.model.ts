import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasena es necesaria']
    }
});

usuarioSchema.method('compararPassword', function(_password: string = ''):boolean {
    if(bcrypt.compareSync(_password, this.password)){
        return true;
    }else{
        return false;
    }
});

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar?: string;

    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);