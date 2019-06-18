/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

import ConvertController from '../controllers/convertController';

export default class ApiRoutes {
  public convertController: ConvertController = new ConvertController();
  public routes(app): void {
    app.route('/api/convert').get((req, res) => {
      const input = req.query.input;
      const initNum = this.convertController.getNum(input);
      const initUnit = this.convertController.getUnit(input);

      if (!initNum && !initUnit) return res.send('invalid number and unit');
      if (!initUnit) return res.send('invalid unit');
      if (!initNum) return res.send('invalid number');

      const returnNum = this.convertController.convert(initNum, initUnit);
      const returnUnit = this.convertController.getReturnUnit(initUnit);
      const toString = this.convertController.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    });
  }
}
