import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import cors from 'cors';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
//FileUpload
server.app.use(fileUpload({useTempFiles:true}));
//Solucion a problemas con CORS 
server.app.use(cors({origin: true, credentials: true}));
//rutas de mi usuario
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
//conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if(err) throw err;
    console.log('Base de datos ONLINE');
    
})
//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en port ${server.port}`);
    
});