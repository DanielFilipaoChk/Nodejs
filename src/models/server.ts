import express, { Application, Request, Response, NextFunction } from 'express';
import sequelize from '../database/connection';
import RProduct from '../routes/product';
import RUser from '../routes/user';
import { User } from './user';
import { Product } from './product';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3016', 10);
        this.middlewares();
        this.routes();
        this.listen();
        this.DBconnect();
    }

    private middlewares(): void {
        // Middleware to parse JSON request bodies
        this.app.use(express.json());
        
        // Error handling middleware
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!' });
        });
    }

    private routes(): void {
        // Mount the user routes at the root path
        this.app.use('/', RUser);
        this.app.use('/', RProduct);
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    private async DBconnect(): Promise<void> {
        try {

            //Creacion de las tablas
            await User.sync({ alter:true })
            await Product.sync({ alter:true })



            // await sequelize.authenticate();
            // console.log('Database connection successful');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1); // Exit the process if database connection fails
        }
    }
}

export default Server;
