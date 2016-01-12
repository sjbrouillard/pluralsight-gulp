module.exports = function() {
    var client = './src/client/';

    var config = {
        temp: './.tmp',

        ///////////////////////////////////////
        ///                                 ///
        ///        Input file paths.        ///
        ///                                 ///
        ///////////////////////////////////////
        alljsfiles: [
            './src/**/*.js',
            './*.js'
        ],

        less: client + 'styles/styles.less'
    };
    return config;
};
