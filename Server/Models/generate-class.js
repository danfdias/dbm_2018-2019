const mustache = require('mustache');
const fs = require('fs');

function createClasses(schemas) {
    schemas.forEach(schema => {
        const schemaName = schema['name'];
        const schemaPath = schema['path'];

        const classSchema = JSON.parse(fs.readFileSync(schemaPath));

        const className = classSchema['title'];
        const classProps = Object.keys(classSchema['properties']);

        const propDictionary = new Array();
        classProps.forEach(element => {
            propDictionary.push({ 'name': element });
        });

        var classRequiredProp = classSchema.required;

        const classNonRequiredProp = classProps.filter(element => !classRequiredProp.includes(element))
            .map(element => '\"' + element + '\"');

        const view = {
            classTitle: className,
            classProperties: classProps.join(),
            classConstructor: propDictionary,
            classNonEnumerables: function () {
                if (classNonRequiredProp.length > 0) {
                    return 'Object.defineProperty(this, ' + classNonRequiredProp.join() + ',{ enumerable: false });'
                }
            }
        }

        fs.readFile('./Server/models/class.mustache', function (err, data) {
            const output = mustache.render(data.toString(), view);

            fs.writeFile('./Publish/Models/' + schemaName + '.js', output, function (err) {
                if (err) throw err;
            });
        });
    });
}

module.exports.createClasses = createClasses;