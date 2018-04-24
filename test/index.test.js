'use strict';
const core = require('../lib/index');
const fs = require('fs');
const sinon = require('sinon');
const dummy = require('./sinonObjects/writeDirectory.dummy');


test('writeDirectory', (done) => {
    const stub = sinon.stub(fs, 'mkdirSync').callsFake(() => {
        return true;
    });

    const promise = core.WriteDirectory('front_modules', 'petter');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        done();
        stub.restore();
    });
});

test('WriteFile', () => {

    const stub = sinon.stub(fs, 'writeFileSync').callsFake(() => {
       return true;
    });

    const promise = core.WriteFile(dummy.templateHTML,'text/html', 'html');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        stub.restore();
    });
});

/*test('WriteDirectories', (done) => {

    const stubExist = sinon.stub(core, 'fsExistsSync').callsFake(() => {
        return true;
    });

    const stubmkdir = sinon.stub(fs, 'mkdirSync').callsFake(() => {
        throw Error('ERROR FATAL CREATING DIR. YOU NEED TO CRY');
    });

    const stubWrite = sinon.stub(core, 'WriteDirectory').callsFake(() => {
        throw Error('ERROR FATAL CREATING SUB DIR. YOU NEED TO CRY');
    });

    const promise = core.WriteDirectories('test', 'front_modules');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        done();
        stubmkdir.restore();
        stubExist.restore();
        stubWrite.restore();
    });

});*/


test('ReadAllFiles', () => {

    const stub = sinon.stub(core, 'ReadFile').callsFake(() => {

        stub.withArgs('templateHTML', name).returns(templateHTML);
        stub.withArgs('templateCSS', name).returns(templateCSS);
        stub.withArgs('templateJS', name).returns(templateJS);
        stub.withArgs('templateTEST', name).returns(templateTEST);
        stub.withArgs('templateSINON', name).returns(templateSINON);

    });

    expect(core.ReadAllFiles(name)).toEqual([templateHTML, templateCSS, templateJS,templateTEST ,templateSINON]);

});

test('PromiseWriteFile', (done) => {

    const spy = sinon.spy(Promise, 'resolve');
    const promiseTemplate = new Promise((resolve, reject) => { });
    core.PromiseWriteFile([promiseTemplate]);
    done();
    expect(spy.calledOnce).toBe(true);
});
