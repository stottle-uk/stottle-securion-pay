var securionpay = require('securionpay')(process.env.SECURIONPAY_API_KEY);

class SecurionPayService {

    async createPlan() {
        return await securionpay.plans.create({
            amount: 2000,
            currency: 'GBP',
            interval: 'month',
            name: 'my first plan'
        }).then(result => {
            console.log(result);
            return result;
        });
    }

    async createCustomer() {
        return await securionpay.customers.create({
            email: 'user@example.com',
            description: 'User description'
        }).then(result => {
            console.log(result);
            return result;
        });
    }

    async createCard(customer) {
        return await securionpay.cards.create(customer.id, {
            number: '4242424242424242',
            expMonth: '12',
            expYear: '2020',
            cvc: '123',
            cardholderName: 'John Smith'
        }).then(result => {
            console.log(result);
        });
    }

    async subscribeToPlan(customer, plan) {
        await securionpay.subscriptions.create(customer.id, {
            'planId': plan.id
        }).then(result => {
            console.log(result);
        });
    }

}

const go = async () => {
    const payService = new SecurionPayService();
    const plan = await payService.createPlan();
    const customer = await payService.createCustomer();
    await payService.createCard(customer); //needs active card to create subscription
    await payService.subscribeToPlan(customer, plan);
}

go();