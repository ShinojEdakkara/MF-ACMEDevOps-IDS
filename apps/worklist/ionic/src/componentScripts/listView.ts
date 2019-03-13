import { BaseService } from "../apiservices/baseService";

export default class ListViewComponent {
    init() {
        console.log('init');
    }

    callAPI(baseurl, verb, datasetInfo, params, callback) {
        const operation = {
            verb,
            baseurl,
            datasetInfo,
            params,
            // query: [],
            // path: [],
          };
        
        let payload = null;  
        if(params) {
            payload = {};
            params.map((item) => {
                payload[item.model] = item.value;
            });
        }

        const serviceInst = BaseService.createProxy(operation, null, null);
        serviceInst.dispatch()
            .then((response) => {
                return callback(null, response);
            }).catch((error) => {
                console.error(`ListViewComponent --> run --> ${error.message}`);
                alert(error.message);
                return callback(error);
            });
    }

    getDisplayValue(item, attributeList) {
        let returnValue = '';
        if(attributeList) {
            attributeList.map((attribute) => {
                if(attribute.key === 'dynamic') {
                    const {value} = attribute;
                    const nestedAttrList = value.split('.');
                    let attrValue = item;
                    nestedAttrList.map((attr, index) => {
                        if(attrValue instanceof Object) {
                            attrValue = attrValue[attr]; 
                        }
                    });
                    returnValue = (returnValue === '')? attrValue : returnValue + ' ' + attrValue; 
                } else {
                    const {value} = attribute;
                    returnValue = (returnValue === '')? value : returnValue + ' ' +  value; 
                }
            });
        }
        return returnValue;
    }

    getDetailAttributesList(responseItem, attributeList) {
        attributeList.map((attribute) => {
            const { parampath } = attribute;
            const pathArry = parampath.split('.');
            let value = responseItem;
            for (let i = 0; i < pathArry.length; i += 1) {
                const path = pathArry[i];
                value = value[path];
            }
            if(value === undefined) {
                value = attribute.default?attribute.default : value;
            }
            attribute.value = value;
        });
        return attributeList;
    }

    getPathParam(responseItem, path) {
        const paramName = path.substring(path.indexOf('{') + 1, path.indexOf('}'));
        let pathValue;
        Object.keys(responseItem).map((key) => {
            if (key === paramName) {
                pathValue = responseItem[key];
            }
        });
        const replaceStr = '{' + paramName + '}';
        path = path.replace(replaceStr, pathValue);

        return path;
    }
}
