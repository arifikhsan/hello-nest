import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.floor((Math.random() * 100) + 1).toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    console.log(product)
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (!title) {
      updatedProduct.title = title;
    }

    if (!description) {
      updatedProduct.description = description;
    }

    if (!price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }
}
