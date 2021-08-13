import OrderRepository from '../repositories/OrderRepository.js';

class OrderController {
  async index(request, response) {
    const orders = await OrderRepository.findAll();

    response.status(200).json(orders);
  }

  async show(request, response) {
    const { id } = request.params;
    const order = await OrderRepository.findById(Number(id));

    if (!order) {
      response.status(400).json({ error: 'not found' });
    }

    response.status(200).json(order);
  }

  store() {}
}

export default new OrderController();
