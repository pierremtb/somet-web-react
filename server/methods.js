import EasyFit from 'easy-fit';
import { check } from 'meteor/check';
import Future from 'fibers/future';

Meteor.methods({
  parseThisFitBufferString(fitBufferString) {
    check(fitBufferString, String);

    const future = new Future();

    const fitBuffer = new Buffer(fitBufferString, 'binary');
    const easyFit = new EasyFit({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'm',
      temperatureUnit: 'celsius',
      elapsedRecordField: true,
      mode: 'both',
    });
    easyFit.parse(fitBuffer, (err, fitObj) => {
      if (err) {
        future.return(err);
      } else {
        future.return(fitObj);
      }
    });

    return future.wait();
  },
});
