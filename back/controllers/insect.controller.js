import Insect from "../models/insect.model.js";

class InsectController {
  static async getInsectById(req, res) {
    const { id } = req.params;
    try {
      const insect = await Insect.findByPk(id)
      if (insect) {
        res.status(200).json(insect);
      } else {
        res.status(404).json({message: 'No insect found'});
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllInsects(req, res) {
    const {nameSort, batchesSort, priceSort, typeFilter, nameFilter, size} = req.query;
    try {
      let insects = await Insect.findAll()

      insects = insects.filter(insects => insects.name.toLowerCase().includes(nameFilter.toLowerCase().trim()));


      if (typeFilter !== 'all') {
        insects = insects.filter(insects => insects.type === typeFilter);
      }
      if (nameSort === 'a-z') {
        insects.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      } else if (nameSort === 'z-a') {
        insects.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
      }
      if (batchesSort === 'ascending') {
        insects.sort((a, b) => Number(a.batches) - Number(b.batches));
      } else if (batchesSort === 'descending') {
        insects.sort((a, b) => Number(b.batches) - Number(a.batches));
      }

      if (priceSort === 'ascending') {
        insects.sort((a, b) => +a.price - +b.price);
      } else if (priceSort === 'descending') {
        insects.sort((a, b) => +b.price - +a.price);
      }

      if (size) {
        insects = insects.slice(0, +size + 1)
      }

      return res.status(200).json(insects)

    } catch (error) {
      console.log(error);
    }
  }
}

export default InsectController;