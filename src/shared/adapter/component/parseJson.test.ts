
import { describe, it, expect } from 'vitest';
import { parseJson } from './parseJson';

describe('parseJson()', () => {
  it('Debería devolver el objeto parseado cuando se nos proporcione un JSON valido', async () => {
    // Arrange
    const mockData = { id: 1 , name:'Rick Sanchez'}
    const mockResponse={
        text:async()=>JSON.stringify(mockData)
    } as Response


    // Act
    const result = await parseJson(mockResponse);

    // Assert
    expect(result).toEqual(mockData);
  });
  it('Debería devolver un valor falso cuando se nos proporcione una cadena vacia', async () => {
    // Arrange
    const mockData = ''
    const mockResponse={
        text:async()=>mockData
    } as Response


    // Act
    const result = await parseJson(mockResponse);

    // Assert
    expect(result).toBeFalsy();
  });
  it('Debería devolver un Error cuando se nos proporcione algo distinto a un JSON', async () => {
    // Arrange
    const mockData = 'esto no es un JSON'
    const mockResponse={
        text:async()=>mockData
    } as Response


    // Act
    const result =()=> parseJson(mockResponse);

    // Assert
    expect(result).rejects.toThrow();
  });
});