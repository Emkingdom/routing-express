
class ExpressError extends  Error {
    constructor(messaje, status){
        super();
        this.messaje = messaje;
        this.status = status;
        console.error(this.stack)
    }
}

module.exports = ExpressError;