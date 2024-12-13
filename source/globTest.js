const { globSync } = require("glob");

const getDirectories = function (src) {
    const results = globSync(src + '/**/*.scss');
    console.log(results)
};
// getDirectories('.', function (err, res) {
//     if (err) {
//         console.log('Error', err);
//     } else {
//         console.log(res);
//     }
// });
getDirectories(".");