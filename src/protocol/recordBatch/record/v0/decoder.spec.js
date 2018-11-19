const Decoder = require('../../../decoder')
const recordDecoder = require('./decoder')

describe('Protocol > RecordBatch > Record > v0', () => {
  test('decodes', async () => {
    const decoder = new Decoder(Buffer.from(require('../../fixtures/v0_record.json')))

    expect(
      recordDecoder(decoder, {
        firstOffset: '0',
        firstTimestamp: '1509827900073',
        magicByte: 2,
      })
    ).toEqual({
      offset: '0',
      magicByte: 2,
      attributes: 0,
      timestamp: '1509827900073',
      headers: { 'header-key-0': Buffer.from('header-value-0') },
      key: Buffer.from('key-0'),
      value: Buffer.from('some-value-0'),
      isControlRecord: false, // Default to false
    })
  })

  test('decodes control record', async () => {
    const decoder = new Decoder(Buffer.from(require('../../fixtures/v0_record.json')))

    expect(
      recordDecoder(decoder, {
        firstOffset: '0',
        firstTimestamp: '1509827900073',
        magicByte: 2,
        isControlBatch: true,
      })
    ).toEqual({
      offset: '0',
      magicByte: 2,
      attributes: 0,
      timestamp: '1509827900073',
      headers: { 'header-key-0': Buffer.from('header-value-0') },
      key: Buffer.from('key-0'),
      value: Buffer.from('some-value-0'),
      isControlRecord: true,
    })
  })
})
