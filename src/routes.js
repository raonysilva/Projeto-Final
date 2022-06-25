import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import ping from './lib/ping.js';
import Host from './models/Host.js';
import User from './models/User.js';
import {isAuthenticated} from './middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/signin.html'));

router.get('/hosts', isAuthenticated, async (req, res) => {
  const hosts = await Host.readAll();

  res.json(hosts);
});

router.post('/hosts', isAuthenticated, async (req, res) => {
  const host = req.body;

  const newHost = await Host.create(host);

  res.status(201).json(newHost);
})

router.delete('/hosts/:id', isAuthenticated, (req, res) => {
  const id = Number(req.params.id);

  Host.remove(id);

  res.status(204).send();
});

router.put('/hosts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const host = req.body;

  const newHost = await Host.update(id, host);

  res.status(200).json(newHost);
});

router.get('/users', isAuthenticated, async (req, res) => {
  const users = await User.readAll();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  const newUser = await User.create(user);

  res.status(201).json(newUser);
})

router.delete('/users/:id', isAuthenticated, (req, res) => {
  const id = Number(req.params.id);

  User.remove(id);

  res.status(204).send();
});

router.put('/users/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const user = req.body;

  const newUser = await User.update(id, user);

  res.status(200).json(newUser);
});

router.get('/hosts/:id/times', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const { address } = await Host.readById(id);

  const { times } = await ping(address);

  res.json({ times });
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = await User.readByEmail(email);

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId }, 
        process.env.SECRET, 
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error();
    }
    
  } catch (error) {
    res.status(401).json({ error: "User not found" });
  }
});

router.get('/signout', (req, res) => {
  return res.json({ auth: false, token: null });
});

router.use((req, res, next) => {
  res.status(404).json({
    error: 'Content not found',
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error on Server');
});

export default router;