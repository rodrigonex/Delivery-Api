import OrderRepository from '../repositories/OrderRepository.js';

class OrderController {
  async index(request, response) {
    const orders = await OrderRepository.findAll();

    if (!orders) {
      return response.status(400).json({ error: 'not found' });
    }

    response.status(200).json(orders);
  }

  async show(request, response) {
    const { id } = request.params;

    const order = await OrderRepository.findById(Number(id));

    if (!order) {
      return response.status(400).json({ error: 'not found' });
    }

    response.status(200).json(order);
  }

  async store(request, response) {
    const { cliente, produto, valor } = request.body;

    const orders = await OrderRepository.findAll();

    if (!orders) {
      return response.status(400).json({ error: 'not found' });
    }

    if (!cliente) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!produto) {
      return response.status(400).json({ error: 'product is required' });
    }

    const order = await OrderRepository.create({
      cliente, produto, valor,
    });

    response.status(201).json(order);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      cliente, produto, valor, entregue,
    } = request.body;

    const order = await OrderRepository.findById(Number(id));

    if (!order) {
      return response.status(400).json({ error: 'Not found' });
    }

    if (!produto) {
      return response.status(400).json({ error: 'produto is required' });
    }

    if (!valor) {
      return response.status(400).json({ error: 'valor is required' });
    }

    if (!cliente) {
      return response.status(400).json({ error: 'Cliente is required' });
    }

    const updateOrder = await OrderRepository.update(Number(id),
      {
        cliente, produto, valor, entregue,
      });

    response.status(200).json(updateOrder);
  }

  async updateDelivery(request, response) {
    const { id } = request.params;
    const { entregue } = request.body;

    if (entregue === undefined) {
      return response.status(400).json({ error: 'entregue is required' });
    }

    if ((entregue === true) || (entregue === false)) {
      const order = await OrderRepository.findById(Number(id));

      if (!order) {
        return response.status(400).json({ error: 'Not Found' });
      }

      const update = await OrderRepository.updateDelivery(Number(id), entregue);

      return response.status(200).json({ update });
    }

    return response.status(400).json({ error: 'delivery value is not valid' });
  }

  async delete(request, response) {
    const { id } = request.params;
    const order = await OrderRepository.findById(Number(id));

    if (!order) {
      return response.status(400).json({ error: 'not found' });
    }

    await OrderRepository.delete(Number(id));

    response.status(202).json({ true: 'order canceled successfully' });
  }

  async showClient(request, response) {
    const { cliente } = request.params;

    if (!cliente) {
      return response.status(400).json({ error: 'Client is required' });
    }

    const ordersClient = await OrderRepository.someClientValue(cliente);

    if (ordersClient === 0) {
      return response.status(400).json({ error: 'Client not encountered' });
    }

    response.status(200).json({ cliente, total: ordersClient });
  }

  async showProduct(request, response) {
    const { product } = request.params;

    if (!product) {
      return response.status(400).json({ error: 'Product is required' });
    }

    const ordersProduct = await OrderRepository.someProductValue(product);

    if (ordersProduct === 0) {
      return response.status(400).json({ error: 'Product not encountered' });
    }

    response.status(200).json({ produto: product, valor: ordersProduct });
  }

  async productOrder(request, response) {
    const ordersProducts = await OrderRepository.findProducts();

    response.status(200).json(ordersProducts);
  }
}

export default new OrderController();
