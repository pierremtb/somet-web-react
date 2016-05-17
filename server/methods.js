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
      mode: 'cascade',
    });
    easyFit.parse(fitBuffer, (err, fitObj) => {
      if (err) {
        future.return(err);
      } else {
        console.log(fitObj.file_id);
        future.return(fitObj);
      }
    });

    return future.wait();
  },
});
