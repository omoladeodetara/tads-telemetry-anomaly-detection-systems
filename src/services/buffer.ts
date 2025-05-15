// src/services/buffer.ts

export class BufferService {
    private consistentBuffer: any[] = [];
    private intermittentBuffer: any[] = [];

    constructor() {}

    public addToConsistentBuffer(data: any): void {
        this.consistentBuffer.push(data);
    }

    public addToIntermittentBuffer(data: any): void {
        this.intermittentBuffer.push(data);
    }

    public getConsistentBuffer(): any[] {
        return this.consistentBuffer;
    }

    public getIntermittentBuffer(): any[] {
        return this.intermittentBuffer;
    }

    public clearConsistentBuffer(): void {
        this.consistentBuffer = [];
    }

    public clearIntermittentBuffer(): void {
        this.intermittentBuffer = [];
    }
}