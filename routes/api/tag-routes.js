const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async(req, res) => {
  try {
      const tagsData = await Tag.findAll({
          include: [{ model: Product, through: ProductTag}],
      });
      res.status(200).json(tagsData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
      const tagsData = await Tag.findByPk(req.params.id, {
          include: [{ model: Product, through: ProductTag }],
      });

      if (!tagsData) {
          res.status(404).json({ message: 'No tag found with that id!' });
          return;
      }
      res.status(200).json(tagsData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
      const tagsData = await Tag.create();

      res.status(201).json(tagsData);
  } catch (err) {
      req.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
      const tagsData = await Tag.update({
          tag_name: req.body.tag_name,
      }, {
          where: {
              id: req.params.id
          },
      });

      res.status(200).json(tagsData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
      const tagsData = await Tag.destroy({
          where: {
              id: req.params.id,
          },
      });
      if (!tagsData) {
          res.status(404).json({ message: "No tag found with that id!" });
          return;
      }

      res.status(200).json(tagsData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
