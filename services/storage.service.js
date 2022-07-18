import {homedir} from 'os'
import {join, basename, dirname, extname, relative, isAbsolute, sep} from 'path';
import { promises } from 'fs';


//ця штука бере остатній рядок і показує його не важливо файл це чи папка
// basename();

// ця штука показує усі вложеності папок
// dirname();

// ця штука повертає тільки розширення файла 
// extname();

// ця штука розумно обєднює стрічки в path
// join();

// ця плюшка повератє домашню папку 
// homedir()

// приймає два параметра ця штука виводить 
// весь шлях який треба пройти з одного файла до іншого
// relative()

// повертає буліан коли шлях абсолютний або відносний
// абсолютний це коли від коріня до файла
// ну відносний сам за себе говорить це коли файнл відносно іншого файла
//isAbsolute()

// показує який саме роздільний знак буде розділяти шляхи
// sep()



const filePath = join(homedir(), 'Project/Node.js/weather-data.json') 

const saveKeyValue = async (key, value) => {
    let data = {};
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file)
    }
    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data))
};

const getKeyValue = async (key) => {
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file)
        return data[key];
    }
    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch(e) {
        return false;
    }
}

export { saveKeyValue, getKeyValue }
