module.exports = class UnregisteredBarcode extends Error {
	constructor(){
		super('unregisteredBarcode')
	}
}
