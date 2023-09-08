export default class InvalidProductRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidProductRequestError';
    }
}