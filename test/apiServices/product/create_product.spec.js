//Test deps and sets
const chai = require('chai'),
	chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const {expect, assert} = chai;
//Domain imports
const CreateProduct = require('src/apiServices/product/create_product');
describe('CreateProduct test', () => {
	describe('basic product create', () => {
		it('create product', () => {

		});
		it('product persisted', () => {

		});
	});
});
