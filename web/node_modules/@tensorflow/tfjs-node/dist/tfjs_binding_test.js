"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bindings = require("bindings");
var binding = bindings('tfjs_binding.node');
describe('Exposes TF_DataType enum values', function () {
    it('contains TF_FLOAT', function () {
        expect(binding.TF_FLOAT).toEqual(1);
    });
    it('contains TF_INT32', function () {
        expect(binding.TF_INT32).toEqual(3);
    });
    it('contains TF_BOOL', function () {
        expect(binding.TF_BOOL).toEqual(10);
    });
});
describe('Exposes TF_AttrType enum values', function () {
    it('contains TF_ATTR_STRING', function () {
        expect(binding.TF_ATTR_STRING).toEqual(0);
    });
    it('contains TF_ATTR_INT', function () {
        expect(binding.TF_ATTR_INT).toEqual(1);
    });
    it('contains TF_ATTR_FLOAT', function () {
        expect(binding.TF_ATTR_FLOAT).toEqual(2);
    });
    it('contains TF_ATTR_BOOL', function () {
        expect(binding.TF_ATTR_BOOL).toEqual(3);
    });
    it('contains TF_ATTR_TYPE', function () {
        expect(binding.TF_ATTR_TYPE).toEqual(4);
    });
    it('contains TF_ATTR_SHAPE', function () {
        expect(binding.TF_ATTR_SHAPE).toEqual(5);
    });
});
describe('Exposes TF Version', function () {
    it('contains a version string', function () {
        expect(binding.TF_Version).toBeDefined();
    });
});
describe('tensor management', function () {
    it('Creates and deletes a valid tensor', function () {
        var values = new Int32Array([1, 2]);
        var id = binding.createTensor([2], binding.TF_INT32, values);
        expect(id).toBeDefined();
        binding.deleteTensor(id);
    });
    it('throws exception when shape does not match data', function () {
        expect(function () {
            binding.createTensor([2], binding.TF_INT32, new Int32Array([1, 2, 3]));
        }).toThrowError();
        expect(function () {
            binding.createTensor([4], binding.TF_INT32, new Int32Array([1, 2, 3]));
        }).toThrowError();
    });
    it('throws exception with invalid dtype', function () {
        expect(function () {
            binding.createTensor([1], 1000, new Int32Array([1]));
        }).toThrowError();
    });
    it('works with 0-dim tensors', function () {
        var inputId = binding.createTensor([3], binding.TF_INT32, new Int32Array([1, 2, 3]));
        var axesId = binding.createTensor([1], binding.TF_INT32, new Int32Array([0]));
        var attrs = [
            { name: 'keep_dims', type: binding.TF_ATTR_BOOL, value: false },
            { name: 'T', type: binding.TF_ATTR_TYPE, value: binding.TF_INT32 },
            { name: 'Tidx', type: binding.TF_ATTR_TYPE, value: binding.TF_INT32 }
        ];
        var outputMetadata = binding.executeOp('Max', attrs, [inputId, axesId], 1);
        expect(outputMetadata.length).toBe(1);
        expect(outputMetadata[0].id).toBeDefined();
        expect(outputMetadata[0].shape).toEqual([]);
        expect(outputMetadata[0].dtype).toEqual(binding.TF_INT32);
        expect(binding.tensorDataSync(outputMetadata[0].id))
            .toEqual(new Int32Array([3]));
    });
});
describe('executeOp', function () {
    var name = 'MatMul';
    var matMulOpAttrs = [
        { name: 'transpose_a', type: binding.TF_ATTR_BOOL, value: false },
        { name: 'transpose_b', type: binding.TF_ATTR_BOOL, value: false },
        { name: 'T', type: binding.TF_ATTR_TYPE, value: binding.TF_FLOAT }
    ];
    var aId = binding.createTensor([2, 2], binding.TF_FLOAT, new Float32Array([1, 2, 3, 4]));
    var bId = binding.createTensor([2, 2], binding.TF_FLOAT, new Float32Array([4, 3, 2, 1]));
    var matMulInput = [aId, bId];
    it('throws exception with invalid Op Name', function () {
        expect(function () {
            binding.executeOp(null, [], [], null);
        }).toThrowError();
    });
    it('throws exception with invalid TFEOpAttr', function () {
        expect(function () {
            binding.executeOp('Equal', null, [], null);
        }).toThrowError();
    });
    it('throws excpetion with invalid inputs', function () {
        expect(function () {
            binding.executeOp(name, matMulOpAttrs, [], null);
        }).toThrowError();
    });
    it('throws exception with invalid output number', function () {
        expect(function () {
            binding.executeOp(name, matMulOpAttrs, matMulInput, null);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_STRING op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_STRING, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_STRING, value: false }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_STRING, value: 1 }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_STRING, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_STRING, value: [1, 2, 3] }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_INT op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_INT, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_INT, value: false }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_INT, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_INT, value: 'test' }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_INT, value: [1, 2, 3] }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_FLOAT op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_FLOAT, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_FLOAT, value: false }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_FLOAT, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_FLOAT, value: 'test' }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_FLOAT, value: [1, 2, 3] }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_BOOL op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_BOOL, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_BOOL, value: 10 }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_BOOL, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_BOOL, value: 'test' }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_BOOL, value: [1, 2, 3] }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_TYPE op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: 'test' }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: [1, 2, 3] }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('throws exception with invalid TF_ATTR_SHAPE op attr', function () {
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: null }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: new Object() }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
        expect(function () {
            var badOpAttrs = [{ name: 'T', type: binding.TF_ATTR_TYPE, value: 'test' }];
            binding.executeOp(name, badOpAttrs, matMulInput, 1);
        }).toThrowError();
    });
    it('should work for matmul', function () {
        var output = binding.executeOp(name, matMulOpAttrs, matMulInput, 1);
        expect(binding.tensorDataSync(output[0].id)).toEqual(new Float32Array([
            8, 5, 20, 13
        ]));
    });
});
