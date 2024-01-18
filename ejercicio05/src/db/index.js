import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectMongo = async() => {
    try {
        await mongoose.connect('mongodb+srv://Luciano:Luch0PrograMongo@cluster0.rkqpj7y.mongodb.net/ecommerce')
        console.log('MongoDB connected')
    }catch(error) {
        console.log(error)
    }
}

export default connectMongo