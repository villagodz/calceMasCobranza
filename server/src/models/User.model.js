import { model, Schema } from 'mongoose';
import customValidations from '../utils/customValidations.js';
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio!"],
        minLength: [3, "El nombre debe tener almenos 3 caracteres."]
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio!"],
        minLength: [3, "El apellido debe tener almenos 3 caracteres."]
    },
    email: {
        type: String,
        required: [true, "¡El email es obligatorio!"],
        trim: true,// borra los espacios al final
        lowercase: true,
        unique: [true, "¡El email ya existe!"],
        validate: [customValidations.validateEmail, "Ingrese un email válido"]

    },
    password: {
        type: String,
        required: [true, "¡El password es obligatorio!"],
        minLength: [6, "El password no puede ser menor a 6 carateres"],
    },
}, { timestamps: true });

//VALIDACIONES DE CONTRASEÑA Y CONFIRMACIÓN DE CONTRASEÑA
UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', '¡Las contraseñas no coinciden!');
    }
    next();
});

//ENCRYPTACIÓN DE CONTRASEÑA
UserSchema.pre('save', function (next) {
    //Si la contraseña es modificada, la encriptamos
    if (this.isModified('password')) {
        try {
            const salt = bcrypt.genSaltSync(10);    //Genera un salt para encriptar la contraseña
            const hash = bcrypt.hashSync(this.password, salt); //Encripta la contraseña
            this.password = hash;   //Asigna la contraseña encriptada al campo password
            next(); //Continua con el proceso
        } catch (error) {
            next(error);    //Si hay un error, lo enviamos al siguiente middleware
        }
    }
    else {
        next(); //Si no hay cambios en la contraseña, continuamos con el proceso
    }
});

// Crea el modelo de User
const User = model("User", UserSchema);

// Exporta el modelo para usarlo en tu aplicación
export default User;