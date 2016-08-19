// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://afan-blog.daoapp.io/',
        mail: {},
        database: {
            client: 'mysql',
            connection: {
                host     : process.env.MYSQL_PORT_3306_TCP_ADDR,
                port     : process.env.MYSQL_PORT_3306_TCP_PORT,
                user     : process.env.MYSQL_USERNAME,
                password : process.env.MYSQL_PASSWORD,
                database : process.env.MYSQL_INSTANCE_NAME,
                charset  : 'utf8'
            },
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: '2368'
        },
        qiniu: {
            bucketname: 'afanweb', //七牛云的目录名
            ACCESS_KEY: '35bMF5rT5-q3PYhVvJ793vaTwq5d8BU2EShyLkGC', //七牛云的ak
            SECRET_KEY: '8A1haHkt71OY4VikO4X4zhtpx_N7gJkuTGnEW-KD', //七牛云的sk
            root: '/image/',
            prefix: 'http://7xid3l.com1.z0.glb.clouddn.com' //七牛的空间域名
        },
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example refferer policy
        // Visit https://www.w3.org/TR/referrer-policy/ for instructions
        // default 'origin-when-cross-origin',
        // referrerPolicy: 'origin-when-cross-origin',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                port     : '3306',
                user     : 'root',
                database : 'ghostblog',
                charset  : 'utf8'
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        },
        qiniu: {
            bucketname: 'afanweb', //七牛云的目录名
            ACCESS_KEY: '35bMF5rT5-q3PYhVvJ793vaTwq5d8BU2EShyLkGC', //七牛云的ak
            SECRET_KEY: '8A1haHkt71OY4VikO4X4zhtpx_N7gJkuTGnEW-KD', //七牛云的sk
            root: '/image/',
            prefix: 'http://7xid3l.com1.z0.glb.clouddn.com' //七牛的空间域名
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            },
            pool: {
                afterCreate: function (conn, done) {
                    conn.run('PRAGMA synchronous=OFF;' +
                        'PRAGMA journal_mode=MEMORY;' +
                        'PRAGMA locking_mode=EXCLUSIVE;' +
                        'BEGIN EXCLUSIVE; COMMIT;', done);
                }
            },
            useNullAsDefault: true
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
