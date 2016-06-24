import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();

export default router;

export function loadRoutes() {
    fs.readdirSync(__dirname).forEach(function (file) {
        if(file.substr(-3) == '.js' && file !== 'index.js') {
            var fileName = path.join(__dirname, file);
            require(fileName).controller(router);
    	}
    });
}