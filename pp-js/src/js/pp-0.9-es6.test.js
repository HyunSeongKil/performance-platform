const pp = require('./pp-0.9-es6');


//
test('isNull', ()=>{
    expect(pp.isNull(null)).toBe(true);
});

//
test('isNotNull', ()=>{
    expect(pp.isNotNull(null)).toBe(false);
});

//
test('isEmpty', ()=>{
    expect(pp.isEmpty('')).toBe(true);
});

//
test('isNotEmpty', ()=>{
    expect(pp.isNotEmpty([])).toBe(false);
});

//
test('formatNumber', ()=>{
    expect(pp.formatNumber(1234)).toBe('1,234');
});

//
test('lpad', ()=>{
    expect(pp.lpad(1234, 5, '0')).toBe('01234');
});

//
test('nvl', ()=>{
    expect(pp.nvl(null, 'x')).toBe('x');
});
