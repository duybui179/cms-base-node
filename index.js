// filepath: index.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(express.json());

// Khởi tạo Sequelize với SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Định nghĩa model đơn giản
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

sequelize.sync();

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.listen(3000, () => console.log('Server running on port 3000'));