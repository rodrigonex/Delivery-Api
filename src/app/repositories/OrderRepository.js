import { promises as fs } from 'fs';

const { readFile } = fs;

class OrderRepository {
  async findAll() {
    const orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    return new Promise((resolve) => resolve(orders.pedidos));
  }

  async findById(id) {
    const orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    return new Promise((resolve) => resolve(orders.pedidos.find(
      (order) => order.id === id,
    )));
  }
}

export default new OrderRepository();
