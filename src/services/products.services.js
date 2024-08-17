import productsRepository from "../persistences/mongo/repositories/products.repository.js";//Import para persistencia de productos
import { productResponseDto } from "../dto/productResponse.dto.js";//Import de DTO de products
import error from "../errors/customErrors.js"//Import config de errors

const getAll = async (query , options) =>{
    const products = await productsRepository.getAll(query, options);
    if(!products) throw error.productNotFoundError();
    return products;
};//Función asyncrona para buscar todos los productos en la base de datos

const getById = async ( id ) =>{
    const productData = await productsRepository.getById(id);
    if(!productData) throw error.productNotFoundError();
    const product = productResponseDto(productData);
    return product;
};//Función asyncrona para buscar productos en la base de datos por id

const create = async (data) =>{
    const product = await productsRepository.create(data);
    return product;
};//Función asyncrona para agregar un producto a la base de datos

const update = async (id, data) =>{
    const product = await productsRepository.update(id, data);
    return product;
};//Función asyncrona para actualizar un producto a la base de datos

const deleteOne = async ( id ) =>{
    const product = await productsRepository.deleteOne(id);
    if(!product) throw error.productNotFoundError();
    return product;
};//Función asyncrona para borrar un producto a la base de datos

export default { getAll, getById, create, update, deleteOne};//Export de los product services