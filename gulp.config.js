module.exports = function() {
    var config = {
        // All the js files that I want to vet in the project.
        alljsfiles: [
            './src/**/*.js',
            './*.js'
        ]
    };
    return config;
};