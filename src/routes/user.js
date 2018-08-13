import express from 'express';
import User from '../database/models/user';

const router = express.Router();
const passport = require('../passport');

const arrayToObject = (array) => {
  const fields = {};
  array.forEach((field) => {
    fields[field] = 1;
    return fields;
  }, {});
  return fields;
};

router.get('/', async (req, res) => {
  const { fields, page, per_page: perPage } = req.query;

  const dict = fields ? arrayToObject(fields.split(',')) : null;

  const rangeStart = +page * +perPage;

  const usersCount = await User.count({});

  const users = await User.find()
    .skip(rangeStart)
    .limit(+perPage)
    .select(dict);
  if (users) {
    let paginationMetaData = {};
    if (page && perPage) {
      const maxPage = usersCount % +perPage === 0 ? usersCount / +perPage : Math.floor((usersCount / +perPage));
      const nextPage = page <= maxPage ? page : +page + 1;
      const prevPage = page > maxPage ? maxPage : page - 1;

      paginationMetaData = {
        page,
        per_page: perPage,
        total_count: usersCount,
        page_count: maxPage,
        links: {
          last_page: `/api/v1/users?page=${maxPage}&per_page=${perPage}`,
          next_page: page < maxPage ? `/api/v1/users?page=${nextPage}&per_page=${perPage}` : null,
          prev_page: page > 0 ? `/api/v1/users?page=${prevPage}&per_page=${perPage}` : null,
        },
      };
    }
    res.status(users.length < perPage ? 206 : 200);
    res.send({ _metadata: paginationMetaData, users });
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  let dict = {};

  if (fields) {
    dict = arrayToObject(fields.split(','));
  }

  const user = await User.findById(id).select(dict);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;
