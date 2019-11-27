import mongoose from 'mongoose';

type TInput = {
  dbUri: string;
};

// export const connectMongo = ({ dbPath }: TInput) => {
//   const connect = () => {
//     mongoose
//       .connect(dbPath, { useNewUrlParser: true })
//       .then(() => {
//         return console.info(`Successfully connected to ${dbPath}`);
//       })
//       .catch(error => {
//         console.error('Error connecting to database: ', error);
//         return process.exit(1);
//       });
//   };
//   connect();

//   mongoose.connection.on('disconnected', connect);
// };
mongoose.Promise = Promise;

export const connectMongo = ({ dbUri }: TInput) => {
  const connect = () => {
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    mongoose
      .connect(dbUri, mongooseOpts)
      .then(() => {
        return console.info(`Successfully connected to ${dbUri}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        mongoose
          .connect(dbUri, mongooseOpts)
          .then(() => {
            return console.info(`Successfully Reconnected to ${dbUri}`);
          })
          .catch(error => {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
          });
      }
      console.log(e);
    });

    // mongoose.connection.once('open', () => {
    //   console.log(`MongoDB successfully connected to ${dbUri}`);
    // });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
