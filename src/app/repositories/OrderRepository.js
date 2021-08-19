import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

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

  async create({ cliente, produto, valor }) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const order = {
      id: orders.nextId,
      cliente,
      produto,
      valor,
      entregue: false,
      timestamp: new Date(),
    };

    orders.nextId += 1;

    orders.pedidos.push(order);

    await writeFile('pedidos.json', JSON.stringify(orders));

    return new Promise((resolve) => resolve(order));
  }

  async update(id, {
    cliente, produto, valor, entregue,
  }) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const orderId = orders.pedidos.find(
      (order) => order.id === id,
    );

    const orderUpdate = {
      id: orderId.id,
      cliente,
      produto,
      valor,
      entregue,
      timestamp: orderId.timestamp,
    };

    orders.pedidos.map((order) => (order.id === id ? orderUpdate : order));

    await writeFile('pedidos.json', JSON.stringify(orders));

    return new Promise((resolve) => resolve(orderUpdate));
  }

  async updateDelivery(id, entregue) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const orderId = orders.pedidos.find(
      (order) => order.id === id,
    );

    const updateOrder = {
      id: orderId.id,
      cliente: orderId.cliente,
      produto: orderId.produto,
      valor: orderId.valor,
      entregue,
      timestamp: orderId.timestamp,
    };

    orders.pedidos.map((order) => (order.id === id ? updateOrder : order));

    await writeFile('pedidos.json', JSON.stringify(orders));

    return new Promise((resolve) => resolve(updateOrder));
  }

  async delete(id) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const orderId = orders.pedidos.filter(
      (order) => order.id !== id,
    );

    orders.pedidos = orderId;

    await writeFile('pedidos.json', JSON.stringify(orders));

    return new Promise((resolve) => resolve());
  }

  async someClientValue(value) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const clientOrders = orders.pedidos.filter((order) => order.cliente === value);

    const total = clientOrders.reduce((accumulator, order) => {
      if (order.entregue === true) {
        return accumulator + order.valor;
      }

      return accumulator;
    }, 0);

    return new Promise((resolve) => resolve(total));
  }

  async someProductValue(value) {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const clientOrders = orders.pedidos.filter((order) => order.produto === value);

    const total = clientOrders.reduce((accumulator, order) => {
      if (order.entregue === true) {
        return accumulator + order.valor;
      }

      return accumulator;
    }, 0);

    return new Promise((resolve) => resolve(total));
  }

  async ordersProducts() {
    let orders = JSON.parse(await readFile('pedidos.json', 'utf-8'));

    const lista = [];

    orders.pedidos.filter(order => order.entregue).forEach(order => {
      const index = lista.findIndex(it => it.produto === order.produto);

      if(index === -1){
        lista.push({produto: order.produto, quantidade: 1})
      }else{
        lista[index].quantidade++;
      }
    })
    lista.sort((a, b) => b.quantidade - a.quantidade);

    return new Promise((resolve) => resolve(lista.map(it => {
      return `${it.produto} - ${it.quantidade}`
    })))
  }
}

export default new OrderRepository();
