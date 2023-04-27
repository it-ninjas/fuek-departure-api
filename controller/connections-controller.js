import { Connection } from '../model/connection.js';
import { ConnectionAdapter } from '../adapters/connection-adapter.js';

export class ConnectionsController {
  constructor() {
    this.connectionAdapter = new ConnectionAdapter();
  }

  index = async (req, res) => {
    let entries = await this.connectionAdapter.all(req.user.userId);
    res.json(entries || []);
  };

  update = async (req, res) => {
    const connection = Connection.fromJSON(req.body);
    await this.connectionAdapter.update(req.params.id, connection);
    res.json(connection);
  };

  create = async (req, res) => {
    const connection = Connection.fromJSON(req.body);
    await this.connectionAdapter.create(connection, req.user.userId);
    res.json(connection);
  };

  delete = async (req, res) => {
    await this.connectionAdapter.delete(req.params.id, req.user.userId);
    res.json();
  };
}

export const connectionsController = new ConnectionsController();
