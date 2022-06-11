module.exports = class AlreadyRegisteredBarcode extends Error {
	constructor(){
		super('already registered barcode')
	}
}
