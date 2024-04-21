const request = require('supertest');
const app = require('../app');

describe('Item API Integration Tests', () => {
    let newItemData = {
        content: "Test item",
        count: 5,
        state: "CANCELED",
    };

    let itemId;

    test('Create item', async () => {
        const response = await request(app)
            .post('/shoppingItem/create')
            .send(newItemData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        itemId = response.body._id;
        expect(response.body.content).toBe(newItemData.content);
    });

    test('Update item', async () => {
        const updatedData = {
            content: "Updated item",
            count: 10,
            state: "DELIVERED",
        };

        const response = await request(app)
            .put(`/shoppingItem/update/${itemId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.content).toBe(updatedData.content);
        expect(response.body.count).toBe(updatedData.count);
    });

    test('Get items', async () => {
        const response = await request(app)
            .get('/shoppingItem/list')
            .query({ state: 'DELIVERED' })
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: itemId })]));
    });

    test('Delete item', async () => {
        await request(app)
            .delete(`/shoppingItem/delete/${itemId}`)
            .expect(200);

        // Verify the item is actually deleted
        await request(app)
            .get(`/shoppingItem/list`)
            .expect(200)
            .then(response => {
                expect(response.body).not.toEqual(expect.arrayContaining([expect.objectContaining({ _id: itemId })]));
            });
    });
});
