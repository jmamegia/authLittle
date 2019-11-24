require('dotenv').config()

require('./database')
app = require('./app')


app.listen(app.get('port'), function () {
    console.log('Server on PORT: ' + app.get('port'));
});
