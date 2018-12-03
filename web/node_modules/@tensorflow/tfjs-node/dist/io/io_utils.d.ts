/// <reference types="node" />
import * as tfc from '@tensorflow/tfjs-core';
export declare function toBuffer(ab: ArrayBuffer): Buffer;
export declare function toArrayBuffer(buf: Buffer | Buffer[]): ArrayBuffer;
export declare function getModelArtifactsInfoForJSON(modelArtifacts: tfc.io.ModelArtifacts): {
    dateSaved: Date;
    modelTopologyType: string;
    modelTopologyBytes: number;
    weightSpecsBytes: number;
    weightDataBytes: number;
};
