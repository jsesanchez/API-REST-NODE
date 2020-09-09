let chai = require('chai');
let chaiHttp = require('chai-http');
let sinon = require('sinon');
let sinonChai  = require('sinon-chai');
let mysqlTest = require('mysql');
let chaiAsPromised = require('chai-as-promised');
let expect = require('chai').expect;
const should = chai.should();
const APIService = require('../../src/service/APIService');
const httpMocks = require('node-mocks-http');
chai.use(chaiAsPromised);

chai.use(sinonChai)
chai.use(chaiHttp);
let req = httpMocks.createRequest();
let reqadd = httpMocks.createRequest();
let reqedit = httpMocks.createRequest();
let reqcal = httpMocks.createRequest();
let res = httpMocks.createResponse();
const locationObj = {
    name: 'Test',
    area_m2: 123
};

var mysqlTestConnection = mysqlTest.createConnection({host: 'localhost'});
var mysqlMock = sinon.mock(mysqlTestConnection);

var id = 51;
req.params.id = id;
reqedit.params.id = id;
var name = 'Test';
var area_m2 = 1;
var cal = [{ num1: 2, num2: 3}];
var results = [{ id: id, name: name , area_m2: area_m2}];
var resultsAll = [{ id: id, name: name , area_m2: area_m2},{ id: id, name: name , area_m2: area_m2}];
var fields = ['id', 'name', 'area_m2'];
reqadd.body = locationObj;
reqedit.body = locationObj;
reqcal.boy = cal;
describe('Calculator Test',()=>{
    it('should +', () => {
        reqcal.params.id=1
        APIService.calculadora(reqcal,res)
        //console.log("Respuesta de mierda ",APIService.calculadora(reqcal,res));
        //expect(APIService.calculadora(reqcal,res)).to.equal(4);
        //APIService.caluladora(reqcal,res).should.eventually.equal(4) ;
        //console.log("results ",res);        
    });
    it('should -', () => {
        reqcal.params.id=2
        APIService.calculadora(reqcal,res);
        //console.log("results ",res);        
    });
    it('should *', () => {
        reqcal.params.id=3
        APIService.calculadora(reqcal,res);
        //console.log("results ",res);        
    });
    it('should /', () => {
        reqcal.params.id=4
        APIService.calculadora(reqcal,res);
        //console.log("results ",res);        
    });


});


 describe('FindID location',()=>{
     it('should find a location by id', () => {
         var expectation = mysqlMock.expects('query')
                  .withArgs('SELECT * FROM location WHERE id=', [ id ])
                  .callsArgWith(2, null, results, fields);
         const mockAPIService = sinon.mock(APIService);
         //mockAPIService.expects("ListarID").once.throws();
         mockAPIService.verify;
         //console.log("stub",stub);
         console.log("expectation ",expectation);
         console.log("results ",results);
         APIService.ListarID(req,results);
         //expect(stub.calledOnce).to.be.true;
     });
 });

//var stub = sinon.stub(APIService, 'conn');
//stub.returns(successConnectionObject);

 describe('FindID location',()=>{
    it('should find a location by id', () => {
        var expectation = mysqlMock.expects('query')
                 .withArgs('SELECT * FROM location WHERE id=', [ id ])
                 .callsArgWith(2, null, results, fields);
        //console.log("expectation ",expectation);
        //console.log("results ",results);
        APIService.ListarID(req,results);
    });
});

describe('Add all location',()=>{
    it('Should add al location', () => {
        var expectation = mysqlMock.expects('query')
                 .withArgs('INSERT INTO location SET ?',[locationObj])
                 .callsArgWith(2, null, resultsAll, fields);
        APIService.add(reqadd,results);
    });
});

describe('Update all location',()=>{
    it('Should update al location', () => {
        var expectation = mysqlMock.expects('query')
                 .withArgs('INSERT INTO location SET ?',[locationObj])
                 .callsArgWith(2, null, resultsAll, fields);
        APIService.update(reqedit,results);
    });
});

describe('Find all locations',()=>{
    it('Should find all location', () => {
        var expectation = mysqlMock.expects('query')
                 .withArgs('SELECT * FROM location')
                 .callsArgWith(2, null, resultsAll, fields);
        APIService.ListarAll(req,resultsAll);
    });
});

describe('Delete locations',()=>{
    it('Should delete a location', () => {
        var expectation = mysqlMock.expects('query')
                 .withArgs('DELETE FROM location WHERE id = ?',[id])
                 .callsArgWith(2, null, resultsAll, fields);
        APIService.delate(req,resultsAll);
    });
});