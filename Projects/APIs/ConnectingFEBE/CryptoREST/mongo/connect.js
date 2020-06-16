mongoose = require('mongoose'),

module.exports = function connectDB (uri) {
    
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )

    mongoose.connection.on( 'open', () => {
        
        console.log(`Database Connected at:\n${uri}\n\n`);
        
    })

    mongoose.connection.on( 'error', (err) => {
        
        console.log(`\nERROR: ${err}\n`);
        
    })

    mongoose.connection.on( 'connected', (err) => {
        
        console.log(`\nConnecting To Database\n`);
        
    })

    mongoose.connection.on( 'disconnected', (err) => {
        
        console.log(`\nThe Application has been disconnected from the database;\n`);
        
    })
}
